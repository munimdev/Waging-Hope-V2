import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "./ui/button";
import { useRef } from "react";
import { ArrowDown } from "lucide-react";

export const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end -50%"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

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
    <motion.div
      ref={ref}
      id="hero"
      style={{ opacity, scale, y }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-20"
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-[#FFD700]">
              Salaam Shalom
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-4">
              500 NFTs Celebrating Peace & Unity
            </p>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              A unique collection bridging communities through digital art, 
              representing the shared hopes of Israeli and Palestinian soldiers 
              for a peaceful future.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col md:flex-row gap-4 justify-center items-center"
          >
            <Button
              size="lg"
              className="bg-[#FFD700] hover:bg-[#FFD700]/90 text-black font-bold px-8 shadow-lg shadow-[#FFD700]/20"
            >
              View Collection
            </Button>
            {/* <Button
              size="lg"
              variant="outline"
              className="border-[#FFD700]/20 hover:bg-[#FFD700]/10"
            >
              Learn More
            </Button> */}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-2 text-gray-400"
            >
              <span className="text-sm">Scroll to explore</span>
              <ArrowDown className="w-4 h-4" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black/0" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#FFD700]/20 via-transparent to-transparent"
        />
      </div>
    </motion.div>
  );
};