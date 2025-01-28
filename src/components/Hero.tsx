import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "./ui/button";
import { useRef } from "react";
import { ArrowDown } from "lucide-react";

interface HeroProps {
  title: string;
  description: string;
}

export const Hero = ({ title, description }: HeroProps) => {
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
      className="relative mt-10 overflow-hidden pt-20"
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-white text-center">
              {title}
            </h1>
            <p className="text-white text-md max-w-2xl mx-auto text-justify">
              {description}
            </p>
            <br />
            <p className="text-whhite text-md max-w-2xl mx-auto text-justify">
              Imagine Salaam/Shalom benefits two non-profit organizations:
              Parents Circle Families Forum (PCFF) and Physicians for Human
              Rights (PHR). PCFF is a joint Israeli-Palestinian organization of
              over 700 families, all of whom have lost an immediate family
              member to the ongoing conflict. It focuses on the process of
              reconciliation between nations as a prerequisite for achieving
              sustainable peace. PHR works to promote principles of human
              rights, medical ethics, and social justice for all people,
              including the occupied Palestinian territory.
            </p>
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
