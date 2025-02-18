import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "./ui/button";
import { useMemo, useRef } from "react";
import { ArrowDown } from "lucide-react";
import ReactMarkdown from 'react-markdown';

// Hardcode the title and description for each collection
const titles = {
  imagine: "Imagine Salaam/Shalom",
  la: "LA Phoenix",
};

const descriptions = {
  imagine: `
**Imagine Salaam/Shalom** (“Peace” in Arabic/Hebrew a ’la Yoko Ono's "Imagine Peace") is a Charity NFT Collection that draws on the unique perspective of the [Live Encyclopedia: Large Nature Model](https://dataland.art/about/large-nature-model). In 500 unique digital pieces, the project hallucinates imagined possibilities when two male soldiers, one Israeli and one Palestinian, are disarmed, stripped of their uniforms, and subsequently transported to a utopian shared space. Removed from their locals of Gaza, Tel Aviv, or Jerusalem, the men become reacquainted in an underwater biblical Garden of Eden falling into the depth of the Mediterranean Sea. Their human, sensual, and intimate lives are revealed and showcased with a generative AI model dedicated to the natural world. As witnesses, we are invited to Imagine Peace and Wage Hope.  

Imagine Salaam/Shalom benefits two non-profit organizations: Parents Circle Families Forum ([PCFF](https://www.theparentscircle.org/en/about_eng-2/)) and Doctors Without Borders/Médecins Sans Frontières ([MSF](https://www.doctorswithoutborders.org/msf-operations-gaza)). PCFF is a joint Israeli-Palestinian organization of over 700 families, all of whom have lost an immediate family member to the ongoing conflict. It focuses on the process of reconciliation between nations as a prerequisite for achieving sustainable peace. MSF staff has been working in Gaza's hospitals and clinics throughout the war, with teams also providing logistic and medical equipment. 
`,
  la: `
**LA Phoenix** is a Charity NFT Collection comprised of 800 unique digital artworks. Utilizing the [Live Encyclopedia: Large Nature Model](https://dataland.art/about/large-nature-model), the project imagines via the generative AI Large Nature Model a futuristic bio-sustainable Los Angeles. Voyaging from the Hollywood Sign to Griffith Observatory, from Santa Monica Pier to DTLA, we witness the harmony and love of the diverse Angelino community, who create their own unique utopia in a climate-safe environment.

LA Phoenix benefits the LA Arts Community Fire Relief [Fund](https://www.getty.edu/about/development/LAArtsReliefFund2025.html) and the Refik Anadol Studios Web3 [Fund](https://refikanadol.com/). Both initiatives provide urgent support to artists and art workers in Los Angeles who have lost homes, studios, and/or livelihood due to the devastating January 2025 fires.
`
};

interface HeroProps {
  collection: string;
  currentPage?: number;
}

export const Hero = ({ collection, currentPage = 1 }: HeroProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.8], [0, 50]);

  // Only show content on the first page
  if (currentPage !== 1) {
    return null;
  }

  return (
    <motion.div
      ref={ref}
      id="hero"
      style={{ opacity, scale, y }}
      className="relative mt-10 overflow-hidden pt-20 min-h-[100vh] md:min-h-0"
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-white text-center">
              {titles[collection]}
            </h1>
            <div className="prose prose-invert max-w-4xl mx-auto">
              <ReactMarkdown
                components={{
                  p: ({ children }) => (
                    <p className="text-white text-xl text-justify mb-6">
                      {children}
                    </p>
                  ),
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-blue-400 hover:text-blue-300"
                    >
                      {children}
                    </a>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-bold">
                      {children}
                    </strong>
                  ),
                }}
              >
                {descriptions[collection]}
              </ReactMarkdown>
            </div>
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
