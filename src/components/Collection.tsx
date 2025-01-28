import { useState } from "react";
import { motion } from "framer-motion";
import { useAccount } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

// Generate 500 NFTs
const TOTAL_NFTS = 500;
const NFTS_PER_PAGE = 12;

const generateNFTs = () =>
  Array.from({ length: TOTAL_NFTS }, (_, i) => ({
    id: i + 1,
    name: `Peace Token #${i + 1}`,
    image: "https://via.placeholder.com/300",
    price: "0.1 ETH",
  }));

export const Collection = () => {
  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();
  const [currentPage, setCurrentPage] = useState(1);

  const allNFTs = generateNFTs();
  const totalPages = Math.ceil(TOTAL_NFTS / NFTS_PER_PAGE);
  const startIndex = (currentPage - 1) * NFTS_PER_PAGE;
  const displayedNFTs = allNFTs.slice(startIndex, startIndex + NFTS_PER_PAGE);

  const handleMint = (id: number) => {
    if (!address) {
      openConnectModal?.();
      return;
    }
    // Implement minting logic here
    console.log("Minting NFT:", id);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section id="collection" className="py-20">
      <div className="">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {displayedNFTs.map((nft, index) => (
            <motion.div
              key={nft.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-4 hover:scale-[1.02] transition-transform duration-200"
            >
              <div className="relative group">
                <img
                  src={nft.image}
                  alt={`#${nft.id}`}
                  className="w-full aspect-square object-cover rounded-lg mb-4 transition-transform duration-200 group-hover:shadow-lg"
                />
              </div>
            </motion.div>
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
                {currentPage < totalPages - 3 && <span className="text-gray-400">...</span>}
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