import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { useAccount, useWriteContract, useWatchContractEvent } from "wagmi";
import { createPublicClient, formatEther, parseEther, http, parseAbiItem, decodeEventLog } from "viem";
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
import {
  shalomNFTContract,
  phoenixNFTContract,
  publicClient,
  transportUrl,
  activeChain,
} from "@/config";
import { mint } from "viem/chains";
import { simulateContract } from "viem/actions";
import { BaseError, ContractFunctionRevertedError } from "viem";

interface CollectionProps {
  totalNFTs: number;
  basePath: string;
  collectionType: "shalom" | "phoenix";
  onPageChange?: (page: number) => void;
  onError?: (error: string | null) => void;
}

interface MintState {
  idsMinted: number[];
}

const FIRST_PAGE_ITEMS = 15;
const OTHER_PAGES_ITEMS = 20;
const mintPrice = parseEther("0.03");

const generateNFTs = (total: number, basePath: string) =>
  Array.from({ length: total }, (_, i) => ({
    id: i + 1,
    name: `#${i + 1}`,
    image: `${basePath}/${i + 1}.jpg`,
    price: "0.03 ETH",
  }));


export const Collection = ({
  totalNFTs,
  basePath,
  collectionType,
  onPageChange,
  onError,
}: CollectionProps) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { openConnectModal } = useConnectModal();
  const [selectedNFT, setSelectedNFT] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mintState, setMintState] = useState<MintState>({
    idsMinted: [],
  });

  const {
    data: hash,
    error: mintError,
    writeContractAsync,
  } = useWriteContract();
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
      const itemsAfterFirstPage =
        (page - 2) * OTHER_PAGES_ITEMS + FIRST_PAGE_ITEMS;
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

    // Update URL params first
    setSearchParams({ page: page.toString() });

    // If we're on page 1, do a two-step scroll
    if (currentPage === 1) {
      // First scroll to top smoothly
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      // Then after a short delay, scroll to collection
      setTimeout(() => {
        const collectionElement = document.getElementById("collection");
        if (collectionElement) {
          collectionElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 300); // Adjust this delay if needed
    } else {
      // For other pages, just scroll smoothly to collection
      const collectionElement = document.getElementById("collection");
      if (collectionElement) {
        collectionElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
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

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (isDialogOpen) {
        if (e.key === "ArrowLeft") {
          handlePrevNFT();
        } else if (e.key === "ArrowRight") {
          handleNextNFT();
        }
      }
    },
    [isDialogOpen, selectedNFT]
  );

  // Add keyboard navigation
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
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
        // Check if user is on the right chain
        const chainId = await publicClient.getChainId();
        if (chainId !== activeChain.id) {
          toast.error(`Please switch to the ${activeChain.name} chain`);
          return;
        }

        // Get user's balance and check if sufficient
        const balance = await publicClient.getBalance({ address });        
        if (balance < mintPrice) {
          toast.error("Insufficient balance for minting");
          return;
        }

        // Estimate gas for the transaction
        const contract = collectionType === "shalom" ? shalomNFTContract : phoenixNFTContract;
        const request = {
          ...contract,
          functionName: "mint",
          args: [BigInt(id)],
          value: mintPrice,
          account: address,
          chain: activeChain,
        } as const;

        // Simulate the transaction first
        const { request: simulatedRequest } = await simulateContract(publicClient, {
          ...request,
        });

        // If simulation succeeds, proceed with actual mint
        const loadingToastId = toast.loading(`Minting NFT #${id}...`);
        try {
          const tx = await writeContractAsync(simulatedRequest);
          
          // Wait for transaction confirmation
          await publicClient.waitForTransactionReceipt({ hash: tx });
          
          // Manually update minted IDs
          setMintState(prev => ({
            idsMinted: [...new Set([...prev.idsMinted, id])]
          }));

          toast.dismiss(loadingToastId);
          toast.success(`Successfully minted NFT #${id}!`);
        } catch (error) {
          toast.dismiss(loadingToastId);
          throw error; // Re-throw to be caught by outer catch block
        }

      } catch (error) {
        console.error("Minting failed:", error);
        if (error instanceof BaseError) {
          const revertError = error.walk(
            (err) => err instanceof ContractFunctionRevertedError
          );
          if (revertError instanceof ContractFunctionRevertedError) {
            toast.error(`Minting failed: ${revertError.data?.args?.[0] || 'Unknown error'}`);
          } else {
            toast.error("Failed to mint NFT");
          }
        } else {
          toast.error("Failed to mint NFT");
        }
      }
    },
    [
      address,
      openConnectModal,
      setIsDialogOpen,
      writeContractAsync,
      collectionType,
    ]
  );

  // Watch for NFT minting events
  useWatchContractEvent({
    address: collectionType === "shalom" ? shalomNFTContract.address : phoenixNFTContract.address,
    abi: collectionType === "shalom" ? shalomNFTContract.abi : phoenixNFTContract.abi,
    eventName: "NFTMinted",
    onLogs(logs) {
      console.log("NFT minted event:", logs);
      setMintState((prev) => {
        const newTokenIds = logs.map((log) => Number(log.args.tokenId));
        const idsMintedSet = new Set([...prev.idsMinted, ...newTokenIds]);
        return {
          idsMinted: Array.from(idsMintedSet),
        };
      });
    },
  });

  // Fetch past minted events on component mount
  useEffect(() => {
    const fetchMintedNFTs = async () => {
      try {
        const contract = collectionType === "shalom" ? shalomNFTContract : phoenixNFTContract;
        const eventFilter = parseAbiItem("event NFTMinted(address indexed to, uint256 indexed tokenId)");

        const logs = await publicClient.getLogs({
          address: contract.address,
          event: eventFilter,
          fromBlock: 0n,
          toBlock: 'latest'
        });

        const mintedIds = logs.map(log => {
          const decodedLog = decodeEventLog({
            abi: contract.abi,
            data: log.data,
            topics: log.topics,
          }) as { args: { tokenId: bigint } };
          return Number(decodedLog.args.tokenId);
        });

        setMintState(prev => ({
          idsMinted: [...new Set([...prev.idsMinted, ...mintedIds])]
        }));
      } catch (error) {
        console.error("Error fetching minted NFTs:", error);
      }
    };

    fetchMintedNFTs();
  }, [collectionType]);

  // Update the button text based on mint state
  const getMintButtonText = (nftId: number) => {
    if (mintState.idsMinted.includes(nftId)) {
      return "Already Minted";
    }
    return !address ? "Connect Wallet" : `Mint for ${formatEther(mintPrice)} ETH`;
  };

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
                      disabled={mintState.idsMinted.includes(selectedNFT || nft.id)}
                    >
                      {getMintButtonText(selectedNFT || nft.id)}
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
