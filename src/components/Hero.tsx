import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-background via-background to-black/40" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span className="px-4 py-1 rounded-full border border-white/10 text-sm mb-4 inline-block">
            500 Unique Peace Tokens
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">
            Salaam Shalom
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            A unique NFT collection celebrating peace and harmony between Israeli and Palestinian soldiers
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="glass-card px-8 py-4 text-lg font-medium hover:bg-white/20 transition-colors"
          >
            Explore Collection
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};