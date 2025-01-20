import { motion } from "framer-motion";

export const About = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div className="glass-card p-8">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-gray-300 mb-4">
              Salaam Shalom is more than an NFT collection - it's a bridge between communities, a symbol of hope, and a testament to the power of unity.
            </p>
            <p className="text-gray-300">
              Each NFT represents a unique moment of peace, capturing the shared humanity between Israeli and Palestinian soldiers.
            </p>
          </div>
          <div className="glass-card p-8">
            <h2 className="text-3xl font-bold mb-6">The Vision</h2>
            <p className="text-gray-300 mb-4">
              Through art and technology, we aim to create a lasting impact on peace-building efforts in the region.
            </p>
            <p className="text-gray-300">
              A portion of all proceeds goes directly to organizations promoting peace and dialogue between communities.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};