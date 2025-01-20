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
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Collection</h2>
          <p className="text-gray-300 mb-4">Discover our unique peace tokens</p>
          <p className="text-sm text-gray-400">
            {TOTAL_NFTS} unique NFTs celebrating peace and harmony
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
                  alt={nft.name}
                  className="w-full aspect-square object-cover rounded-lg mb-4 transition-transform duration-200 group-hover:shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-end justify-center pb-4">
                  <p className="text-white text-sm font-medium">{nft.name}</p>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold truncate">{nft.name}</h3>
                <div className="flex justify-between items-center">
                  <p className="text-gray-300">{nft.price}</p>
                  <p className="text-xs text-gray-400">#{nft.id}</p>
                </div>
                <button
                  onClick={() => handleMint(nft.id)}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-colors duration-200 ${
                    address 
                      ? "bg-[#FFD700] hover:bg-[#FFD700]/90 text-black shadow-lg shadow-[#FFD700]/20" 
                      : "bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10"
                  }`}
                >
                  {address ? "Mint Now" : "Connect Wallet to Mint"}
                </button>
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
                    currentPage === pageNumber ? "bg-[#FFD700] hover:bg-[#FFD700]/90 text-black" : ""
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

        <div className="mt-4 text-center text-sm text-gray-400">
          Showing {startIndex + 1}-{Math.min(startIndex + NFTS_PER_PAGE, TOTAL_NFTS)} of {TOTAL_NFTS} NFTs
        </div>
      </div>
    </section>
  );
};