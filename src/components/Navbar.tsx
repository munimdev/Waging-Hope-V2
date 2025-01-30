import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { Link } from "react-router-dom";

export const Navbar = ({ collection }: { collection: string }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const { isConnected } = useAccount();
  const [headerName, setHeaderName] = useState<string | null>(null);

  useEffect(() => {
    if (collection === "shalom") {
      setHeaderName("Imagine Salaam Shalom");
    } else if (collection === "phoenix") {
      setHeaderName("LA Phoenix");
    }
  }, [collection]);

  useEffect(() => {
    // Handle navbar background on scroll
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    // Set up intersection observer for sections
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px", // Trigger when section is 20% from top and 60% from bottom
      threshold: [0, 0.2, 0.4, 0.6, 0.8, 1], // Multiple thresholds for smoother transitions
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      // Find the section that is most visible
      const visibleSections = entries.filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (visibleSections.length > 0) {
        setActiveSection(visibleSections[0].target.id);
      } else {
        // If no section is visible and we're at the top of the page, set hero as active
        if (window.scrollY < 100) {
          setActiveSection("hero");
        }
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections including hero
    document.querySelectorAll("section[id], div[id='hero']").forEach((section) => {
      observer.observe(section);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const navHeight = 80; // Height of fixed navbar
    const sectionTop = section.offsetTop;
    const targetPosition = sectionTop - navHeight;

    // First set the active section
    setActiveSection(sectionId);

    // Then scroll with a slight delay to ensure smooth transition
    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });

    // Update active section again after scroll completes
    setTimeout(() => {
      setActiveSection(sectionId);
    }, 100);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const sectionId = href.replace("#", "");
    scrollToSection(sectionId);
    setIsMenuOpen(false);
  };

  const navItems = [
    { href: "#hero", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#collection", label: "Collection" },
    { href: "#roadmap", label: "Roadmap" },
    { href: "#team", label: "Team" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
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
            <div className="flex items-center space-x-2">
              <Link 
                to="/"
                className="text-2xl font-bold text-white"
              >
                Waging Hope
              </Link>
              <span className="text-2xl font-bold text-white">|</span>
              <a 
                href="#hero" 
                onClick={(e) => handleNavClick(e, "#hero")} 
                className="text-2xl font-bold text-white hover:text-yellow-400 transition-colors"
              >
                {headerName}
              </a>
            </div>
          </motion.div>

          <div className="flex items-center space-x-4">
            <div className="transition-colors duration-300">
              <ConnectButton.Custom>
                {({
                  account,
                  chain,
                  openAccountModal,
                  openChainModal,
                  openConnectModal,
                  mounted,
                }) => {
                  const ready = mounted;
                  const connected = ready && account && chain;

                  return (
                    <div
                      {...(!ready && {
                        "aria-hidden": true,
                        style: {
                          opacity: 0,
                          pointerEvents: "none",
                          userSelect: "none",
                        },
                      })}
                    >
                      {(() => {
                        if (!connected) {
                          return (
                            <button
                              onClick={openConnectModal}
                              className="bg-white text-black font-bold py-2 px-6 rounded-lg transition-all duration-200 shadow-lg shadow-[#FFD700]/20"
                            >
                              Connect Wallet
                            </button>
                          );
                        }

                        return (
                          <div className="bg-[#FFD700]/10 backdrop-blur-sm border border-[#FFD700]/20 rounded-lg p-1 flex items-center gap-2">
                            <button
                              onClick={openChainModal}
                              className="flex items-center gap-1 px-2 py-1 rounded hover:bg-[#FFD700]/5"
                            >
                              {chain.hasIcon && (
                                <div className="w-5 h-5">
                                  {chain.iconUrl && (
                                    <img
                                      alt={chain.name ?? "Chain icon"}
                                      src={chain.iconUrl}
                                      className="w-5 h-5"
                                    />
                                  )}
                                </div>
                              )}
                              <span className="text-sm font-medium text-gray-200">
                                {chain.name}
                              </span>
                            </button>

                            <button
                              onClick={openAccountModal}
                              className="px-2 py-1 rounded hover:bg-[#FFD700]/5 text-sm font-medium text-gray-200"
                            >
                              {account.displayName}
                            </button>
                          </div>
                        );
                      })()}
                    </div>
                  );
                }}
              </ConnectButton.Custom>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};