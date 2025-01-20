import { motion } from "framer-motion";
import { useAccount } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";

const DUMMY_NFTS = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  name: `Peace Token #${i + 1}`,
  image: "https://via.placeholder.com/300",
  price: "0.1 ETH",
}));

export const Collection = () => {
  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();

  const handleMint = (id: number) => {
    if (!address) {
      openConnectModal?.();
      return;
    }
    // Implement minting logic here
    console.log("Minting NFT:", id);
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Collection</h2>
          <p className="text-gray-300">Discover our unique peace tokens</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DUMMY_NFTS.map((nft) => (
            <motion.div
              key={nft.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="glass-card p-4 hover-scale"
            >
              <img
                src={nft.image}
                alt={nft.name}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold mb-2">{nft.name}</h3>
              <p className="text-gray-300 mb-4">{nft.price}</p>
              <button
                onClick={() => handleMint(nft.id)}
                className="w-full py-2 px-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
              >
                {address ? "Mint Now" : "Connect Wallet to Mint"}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};