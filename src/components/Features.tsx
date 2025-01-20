import { motion } from "framer-motion";
import { Shield, Heart, Coins, Users } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Verified Authenticity",
    description: "Each NFT is uniquely verified and authenticated on the blockchain"
  },
  {
    icon: Heart,
    title: "Community Impact",
    description: "30% of proceeds go to peace-building initiatives in the region"
  },
  {
    icon: Coins,
    title: "Fair Launch",
    description: "Equal opportunity minting process for all community members"
  },
  {
    icon: Users,
    title: "Exclusive Access",
    description: "NFT holders gain access to peace-building events and meetups"
  }
];

export const Features = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Salaam Shalom</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            More than just digital art, each NFT represents a step towards peace
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-6 hover-scale"
            >
              <feature.icon className="w-12 h-12 mb-4 text-gold" />
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};