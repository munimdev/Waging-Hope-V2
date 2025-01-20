import { motion } from "framer-motion";

const teamMembers = [
  {
    name: "Sarah Cohen",
    role: "Founder & Creative Director",
    image: "https://images.unsplash.com/photo-1438565434616-3ef039228b15"
  },
  {
    name: "Ahmed Hassan",
    role: "Community Lead",
    image: "https://images.unsplash.com/photo-1469041797191-50ace28483c3"
  },
  {
    name: "Maya Patel",
    role: "Peace Ambassador",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027"
  },
  {
    name: "David Al-Rashid",
    role: "Technical Lead",
    image: "https://images.unsplash.com/photo-1501286353178-1ec881214838"
  }
];

export const Team = () => {
  return (
    <section id="team" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Team</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Meet the visionaries behind Salaam Shalom
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-6 text-center hover-scale"
            >
              <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">{member.name}</h3>
              <p className="text-gray-400">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};