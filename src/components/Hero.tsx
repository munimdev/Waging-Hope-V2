import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "./ui/button";
import { useMemo, useRef } from "react";
import { ArrowDown } from "lucide-react";
import ReactMarkdown from 'react-markdown';

// Hardcode the title and description for each collection
const titles = {
  shalom: "Imagine Salaam Shalom",
  phoenix: "LA Phoenix",
};

const descriptions = {
  shalom: `
**Imagine Salaam/Shalom** (“Peace” in Arabic/Hebrew a ’la Yoko Ono’s “Imagine Peace”) is a Charity NFT Collection that draws on the unique perspective of the Live Encyclopedia: Large Nature Model. In 500 unique digital pieces, the project hallucinates imagined possibilities when two male soldiers, one Israeli and one Palestinian, are disarmed, stripped of their uniforms, and subsequently transported to a utopian shared space. Removed from their locals of Gaza, Tel Aviv, or Jerusalem, the men become reacquainted in an underwater biblical Garden of Eden falling into the depth of the Mediterranean Sea. Their human, sensual, intimate lives are revealed and showcased with a generative AI model dedicated to the natural world. As witnesses, we are invited to Imagine Peace and Wage Hope.  

Imagine Salaam/Shalom benefits two non-profit organizations: Parents Circle Families Forum ([PCFF](https://www.theparentscircle.org/en/about_eng-2/)) and Doctors Without Borders/Médecins Sans Frontières ([MSF](https://www.doctorswithoutborders.org/msf-operations-gaza)). PCFF is a joint Israeli-Palestinian organization of over 700 families, all of whom have lost an immediate family member to the ongoing conflict. It focuses on the process of reconciliation between nations as a prerequisite for achieving sustainable peace. MSF staff has been working in Gaza’s hospitals and clinics throughout the war, with teams also providing logistic and medical equipment. 
`,
  phoenix: `
**LA Phoenix** is a Charity NFT Collection comprised of 800 unique digital artworks. Utilizing the Live Encyclopedia, the project imagines via the generative AI Large Nature Model a futuristic bio-sustainable Los Angeles. Voyaging from the Hollywood Sign to Griffith Observatory, from Santa Monica Pier to DTLA, we witness the harmony and love of the diverse Angelino community, who create their own unique utopia in a climate-safe environment.

LA Phoenix benefits the LA Arts Community Fire Relief [Fund](https://www.getty.edu/about/development/LAArtsReliefFund2025.html) and the Refik Anadol Studios Web3 [Fund](https://refikanadol.com/). Both initiatives provide urgent support to artists and art workers in Los Angeles who have lost homes, studios, and/or livelihood due to the devastating fires.
`
};

export const Hero = ({ collection }: { collection: string }) => {
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
              {titles[collection]}
            </h1>
            <div className="prose prose-invert max-w-2xl mx-auto">
              <ReactMarkdown
                components={{
                  p: ({ children }) => (
                    <p className="text-white text-md text-justify mb-4">
                      {children}
                    </p>
                  ),
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
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
