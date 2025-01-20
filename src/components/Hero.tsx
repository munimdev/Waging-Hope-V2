import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "./ui/button";
import { useRef } from "react";

export const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 100]);

  const backgroundNFTs = [
    {
      src: "https://images.unsplash.com/photo-1517022812141-23620dba5c23",
      position: "top-20 -left-10 w-72 h-72 rotate-12",
    },
    {
      src: "https://images.unsplash.com/photo-1438565434616-3ef039228b15",
      position: "top-40 right-10 w-64 h-64 -rotate-12",
    },
    {
      src: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09",
      position: "bottom-20 left-1/4 w-80 h-80 rotate-6",
    },
  ];

  return (
    <section ref={containerRef} className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Animated Background NFTs */}
      <div className="absolute inset-0 overflow-hidden">
        {backgroundNFTs.map((nft, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.2, scale: 1 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            whileHover={{ opacity: 0.4, scale: 1.05 }}
            className={`absolute glass-card ${nft.position}`}
          >
            <img src={nft.src} alt="Peace NFT" className="w-full h-full object-cover rounded-lg" />
          </motion.div>
        ))}
      </div>

      {/* Gradient Overlay */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background"
      />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="px-4 py-1 rounded-full border border-white/10 text-sm mb-4 inline-block backdrop-blur-sm"
          >
            500 Unique Peace Tokens
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl md:text-7xl font-bold mb-6 text-gradient"
          >
            Salaam Shalom
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8"
          >
            A groundbreaking NFT collection celebrating peace and harmony between Israeli and Palestinian soldiers. Each piece tells a story of unity.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              variant="default"
              size="lg"
              className="glass-card px-8 py-6 text-lg font-medium hover:bg-white/20 transition-all hover:scale-105"
            >
              Explore Collection
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-6 text-lg font-medium border-white/10 hover:bg-white/10 transition-all hover:scale-105"
            >
              Learn More
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-12 text-gray-400"
          >
            <p className="animate-bounce">Scroll to explore</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};