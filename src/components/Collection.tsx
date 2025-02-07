import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { useAccount, useWriteContract } from "wagmi";
import { createPublicClient, formatEther, parseEther, http } from "viem";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
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
  onPageChange?: (page: number) => void;
  onError?: (error: string | null) => void;
}

const FIRST_PAGE_ITEMS = 15;
const OTHER_PAGES_ITEMS = 20;

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

export const Collection = ({ totalNFTs, basePath, onPageChange, onError }: CollectionProps) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { openConnectModal } = useConnectModal();
  const [selectedNFT, setSelectedNFT] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { data: hash, error: mintError, writeContractAsync } = useWriteContract();
  const { address, isConnected } = useAccount();

  // Get page from URL or default to 1
  const urlPage = parseInt(searchParams.get("page") || "1");
  const [currentPage, setCurrentPage] = useState(urlPage);

  const allNFTs = generateNFTs(totalNFTs, basePath);
  
  // Calculate total pages based on different items per page
  const remainingNFTs = totalNFTs - FIRST_PAGE_ITEMS;
  const additionalPages = Math.ceil(remainingNFTs / OTHER_PAGES_ITEMS);
  const totalPages = 1 + additionalPages;

  // Validate current page on mount and when URL changes
  useEffect(() => {
    const page = parseInt(searchParams.get("page") || "1");
    if (isNaN(page) || page < 1 || page > totalPages) {
      const errorMessage = `Invalid page number. Please return to the first page.`;
      setError(errorMessage);
      onError?.(errorMessage);
      return;
    }
    setError(null);
    onError?.(null);
    setCurrentPage(page);
    onPageChange?.(page);
  }, [searchParams, totalPages, onError, onPageChange]);

  // Calculate start and end indices based on current page
  const getPageIndices = (page: number) => {
    if (page === 1) {
      return {
        start: 0,
        end: FIRST_PAGE_ITEMS,
      };
    } else {
      const itemsAfterFirstPage = (page - 2) * OTHER_PAGES_ITEMS + FIRST_PAGE_ITEMS;
      return {
        start: itemsAfterFirstPage,
        end: Math.min(itemsAfterFirstPage + OTHER_PAGES_ITEMS, totalNFTs),
      };
    }
  };

  const { start, end } = getPageIndices(currentPage);
  const displayedNFTs = allNFTs.slice(start, end);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) {
      const errorMessage = `Invalid page number. Please return to the first page.`;
      setError(errorMessage);
      onError?.(errorMessage);
      return;
    }
    setError(null);
    onError?.(null);
    setSearchParams({ page: page.toString() });
    // Scroll to the collection section
    const collectionElement = document.getElementById('collection');
    if (collectionElement) {
      collectionElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePrevNFT = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedNFT && selectedNFT > 1) {
      setSelectedNFT(selectedNFT - 1);
      // If we're at the start of the current page, go to previous page
      if (selectedNFT === start + 1 && currentPage > 1) {
        handlePageChange(currentPage - 1);
      }
    }
  };

  const handleNextNFT = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedNFT && selectedNFT < totalNFTs) {
      setSelectedNFT(selectedNFT + 1);
      // If we're at the end of the current page, go to next page
      if (selectedNFT === end && currentPage < totalPages) {
        handlePageChange(currentPage + 1);
      }
    }
  };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (isDialogOpen) {
      if (e.key === 'ArrowLeft') {
        handlePrevNFT();
      } else if (e.key === 'ArrowRight') {
        handleNextNFT();
      }
    }
  }, [isDialogOpen, selectedNFT]);

  // Add keyboard navigation
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

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

  if (error) {
    return null;
  }

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
                    onClick={handlePrevNFT}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full z-10"
                    disabled={selectedNFT === 1}
                    hidden={selectedNFT === 1}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={handleNextNFT}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full z-10"
                    disabled={selectedNFT === totalNFTs}
                    hidden={selectedNFT === totalNFTs}
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

        {/* Updated Pagination */}
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
