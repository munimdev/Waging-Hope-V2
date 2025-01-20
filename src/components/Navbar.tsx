import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center space-x-8"
          >
            <a href="/" className="text-2xl font-bold text-gradient">
              Salaam Shalom
            </a>
            <div className="hidden md:flex space-x-6">
              <a href="#about" className="text-gray-300 hover:text-white transition-colors">
                About
              </a>
              <a href="#collection" className="text-gray-300 hover:text-white transition-colors">
                Collection
              </a>
              <a href="#roadmap" className="text-gray-300 hover:text-white transition-colors">
                Roadmap
              </a>
              <a href="#team" className="text-gray-300 hover:text-white transition-colors">
                Team
              </a>
            </div>
          </motion.div>

          <div className="flex items-center space-x-4">
            <ConnectButton />
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};