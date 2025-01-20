import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is Salaam Shalom?",
    answer: "Salaam Shalom is a unique NFT collection featuring 500 pieces that celebrate peace and harmony between Israeli and Palestinian soldiers. Each piece is carefully crafted to represent unity and understanding."
  },
  {
    question: "How can I purchase an NFT?",
    answer: "To purchase an NFT, connect your wallet using the 'Connect Wallet' button, then navigate to our collection page. Each NFT can be minted directly through our website."
  },
  {
    question: "What blockchain is used?",
    answer: "Our NFTs are minted on the Ethereum blockchain, ensuring security and authenticity for all collectors."
  },
  {
    question: "How are funds distributed?",
    answer: "30% of all proceeds go directly to peace-building initiatives in the region. The remaining funds are used for project development and community growth."
  }
];

export const FAQ = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400">
            Everything you need to know about Salaam Shalom
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="glass-card p-6"
        >
          <Accordion type="single" collapsible>
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-400">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};