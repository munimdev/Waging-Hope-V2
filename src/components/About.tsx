import { motion } from "framer-motion";
import { Heart, Handshake, Globe } from "lucide-react";

const features = [
  {
    icon: Heart,
    title: "Unity Through Art",
    description:
      "Each NFT represents a unique story of peace, combining symbols and art styles from both cultures to create something truly special.",
  },
  {
    icon: Handshake,
    title: "Building Bridges",
    description:
      "Our collection aims to foster understanding and dialogue between communities, showing that peace is possible through shared experiences.",
  },
  {
    icon: Globe,
    title: "Global Impact",
    description:
      "By owning this NFT, you become part of a worldwide movement supporting peace and understanding between Israeli and Palestinian communities.",
  },
];

export const About = () => {
  return (
    <section id="about" className="pb-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-400/10 via-transparent to-transparent"
        />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold mb-6"
          >
            About The Project
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-300 text-lg"
          >
            Salaam Shalom is more than just an NFT collection - it's a movement towards peace and understanding. 
            Our 500 unique digital artworks represent the shared hopes and dreams of Israeli and Palestinian soldiers 
            who believe in a future of harmony and cooperation.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-yellow-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-yellow-400/20 transition-colors duration-300">
                <div className="w-12 h-12 rounded-lg bg-yellow-400 text-black flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 text-center max-w-4xl mx-auto"
        >
          <blockquote className="text-2xl font-medium text-gray-300 italic">
            "Through art and technology, we're creating a bridge between communities, 
            proving that peace is not just a dream but a possibility we can build together."
          </blockquote>
          <div className="mt-4 text-yellow-400 font-medium">Our Mission</div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
          {[
            { label: "NFTs", value: "500" },
            { label: "Communities", value: "2" },
            { label: "Mission", value: "1" },
            { label: "Future", value: "∞" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-yellow-400 mb-2">{stat.value}</div>
              <div className="text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};