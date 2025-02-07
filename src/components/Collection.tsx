import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useAccount, useWriteContract } from "wagmi";
import { createPublicClient, formatEther, parseEther, http } from "viem";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "./ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { toast } from "sonner";
import { nftContract, publicClient, transportUrl } from "@/config";
import { activeChain } from "@/config";
import { mint } from "viem/chains";
import { simulateContract } from "viem/actions";

interface CollectionProps {
  totalNFTs: number;
  basePath: string;
}

const NFTS_PER_PAGE = 20;

const generateNFTs = (total: number, basePath: string) =>
  Array.from({ length: total }, (_, i) => ({
    id: i + 1,
    name: `#${i + 1}`,
    image: `${basePath}/${i + 1}.jpg`,
    price: "0.03 ETH",
  }));

const nftAddress = {
  shalom: "0x0000000000000000000000000000000000000000",
  phoenix: "0x0000000000000000000000000000000000000000",
} as const;

const nftABI = [
  {
    name: "mint",
    type: "function",
    stateMutability: "payable",
    inputs: [{ name: "tokenId", type: "uint256" }],
    outputs: [],
  },
] as const;

export const Collection = ({ totalNFTs, basePath }: CollectionProps) => {
  const { openConnectModal } = useConnectModal();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedNFT, setSelectedNFT] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: hash, error, writeContractAsync } = useWriteContract();
  const { address, isConnected } = useAccount();

  const allNFTs = generateNFTs(totalNFTs, basePath);
  const totalPages = Math.ceil(totalNFTs / NFTS_PER_PAGE);
  const startIndex = (currentPage - 1) * NFTS_PER_PAGE;
  const displayedNFTs = allNFTs.slice(startIndex, startIndex + NFTS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePrevNFT = () => {
    if (selectedNFT && selectedNFT > 1) {
      setSelectedNFT(selectedNFT - 1);
    }
  };

  const handleNextNFT = () => {
    if (selectedNFT && selectedNFT < totalNFTs) {
      setSelectedNFT(selectedNFT + 1);
    }
  };

  const handleConnectOrMint = useCallback(
    async (id: number) => {
      if (!address) {
        setIsDialogOpen(false);
        setTimeout(() => {
          openConnectModal?.();
        }, 100);
        return;
      }

      try {
        const request = {
          ...nftContract,
          functionName: "buyNFT",
          args: [BigInt(id), true] as const,
          value: parseEther("0.03"),
          chain: activeChain,
          account: address,
        } as const;

        await writeContractAsync(request);
        toast.success("NFT minted successfully!");
      } catch (error) {
        console.error("Minting failed:", error);
        toast.error("Failed to mint NFT");
      }
    },
    [address, openConnectModal, setIsDialogOpen, writeContractAsync]
  );

  return (
    <section id="collection" className="py-20">
      <div className="">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {displayedNFTs.map((nft) => (
            <Dialog
              key={nft.id}
              open={selectedNFT === nft.id && isDialogOpen}
              onOpenChange={(open) => {
                setIsDialogOpen(open);
                if (!open) setSelectedNFT(null);
              }}
            >
              <DialogTrigger asChild>
                <div
                  className="relative group cursor-pointer"
                  onClick={() => {
                    setSelectedNFT(nft.id);
                    setIsDialogOpen(true);
                  }}
                >
                  <img
                    src={nft.image}
                    alt={`#${nft.id}`}
                    className="w-full aspect-square object-cover rounded-lg mb-4 transition-transform duration-200 group-hover:shadow-lg"
                  />
                </div>
              </DialogTrigger>
              <VisuallyHidden>
                <DialogTitle>
                  <span className="text-lg font-semibold">#{nft.id}</span>
                </DialogTitle>
              </VisuallyHidden>
              <DialogContent className="max-w-[95vw] h-[95vh] p-0 overflow-hidden">
                <div className="relative h-full flex flex-col">
                  {/* Navigation buttons */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrevNFT();
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full z-10"
                    disabled={selectedNFT === 1}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNextNFT();
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full z-10"
                    disabled={selectedNFT === totalNFTs}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>

                  {/* Main image */}
                  <div className="flex-1 flex items-center justify-center p-4 overflow-hidden">
                    <img
                      src={`${basePath}/${selectedNFT}.jpg`}
                      alt={`#${selectedNFT}`}
                      className="max-h-[calc(95vh-100px)] w-auto object-contain"
                    />
                  </div>

                  {/* Bottom bar */}
                  <div className="w-full bg-background p-4 border-t flex items-center justify-between">
                    <span className="text-lg font-semibold">
                      #{selectedNFT}
                    </span>
                    <Button
                      onClick={() => handleConnectOrMint(selectedNFT || nft.id)}
                      className="px-8"
                    >
                      {!address ? "Connect Wallet" : `Mint for ${nft.price}`}
                    </Button>
                    <div className="w-[100px]" /> {/* Spacer for alignment */}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-12 flex justify-center items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex items-center space-x-2">
            {/* Always show first page */}
            {currentPage > 3 && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(1)}
                  className="min-w-[40px]"
                >
                  1
                </Button>
                {currentPage > 4 && <span className="text-gray-400">...</span>}
              </>
            )}

            {/* Show current page and surrounding pages */}
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNumber;
              if (totalPages <= 5) {
                pageNumber = i + 1;
              } else if (currentPage <= 3) {
                pageNumber = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNumber = totalPages - 4 + i;
              } else {
                pageNumber = currentPage - 2 + i;
              }

              return (
                <Button
                  key={pageNumber}
                  variant={currentPage === pageNumber ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(pageNumber)}
                  className={`min-w-[40px] ${
                    currentPage === pageNumber ? "bg-white text-black" : ""
                  }`}
                >
                  {pageNumber}
                </Button>
              );
            })}

            {/* Always show last page */}
            {currentPage < totalPages - 2 && (
              <>
                {currentPage < totalPages - 3 && (
                  <span className="text-gray-400">...</span>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(totalPages)}
                  className="min-w-[40px]"
                >
                  {totalPages}
                </Button>
              </>
            )}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};
