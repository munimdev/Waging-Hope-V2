import { motion } from "framer-motion";
import { Button } from "./ui/button";

export const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background NFTs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 -left-10 w-72 h-72 glass-card rotate-12 opacity-20">
          <img src="https://images.unsplash.com/photo-1517022812141-23620dba5c23" alt="Peace NFT" className="w-full h-full object-cover rounded-lg" />
        </div>
        <div className="absolute top-40 right-10 w-64 h-64 glass-card -rotate-12 opacity-20">
          <img src="https://images.unsplash.com/photo-1438565434616-3ef039228b15" alt="Peace NFT" className="w-full h-full object-cover rounded-lg" />
        </div>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <span className="px-4 py-1 rounded-full border border-white/10 text-sm mb-4 inline-block">
            500 Unique Peace Tokens
          </span>
          <h1 className="text-4xl md:text-7xl font-bold mb-6 text-gradient">
            Salaam Shalom
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            A groundbreaking NFT collection celebrating peace and harmony between Israeli and Palestinian soldiers. Each piece tells a story of unity.
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              variant="default"
              size="lg"
              className="glass-card px-8 py-6 text-lg font-medium hover:bg-white/20 transition-colors"
            >
              Explore Collection
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-6 text-lg font-medium border-white/10 hover:bg-white/10"
            >
              Learn More
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};