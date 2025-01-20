import { motion } from "framer-motion";

const roadmapItems = [
  {
    phase: "Phase 1",
    title: "Community Building",
    items: ["Launch Discord community", "Social media presence", "Whitelist events"]
  },
  {
    phase: "Phase 2",
    title: "Collection Launch",
    items: ["Public mint event", "Secondary market listing", "Community rewards"]
  },
  {
    phase: "Phase 3",
    title: "Impact Initiatives",
    items: ["Peace-building events", "Community grants", "Holder meetups"]
  },
  {
    phase: "Phase 4",
    title: "Future Development",
    items: ["Platform expansion", "Partnership programs", "Community governance"]
  }
];

export const Roadmap = () => {
  return (
    <section id="roadmap" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Project Roadmap</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our journey towards promoting peace through digital art
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {roadmapItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-6"
            >
              <span className="text-gold text-sm font-medium mb-2 block">
                {item.phase}
              </span>
              <h3 className="text-xl font-bold mb-4">{item.title}</h3>
              <ul className="space-y-2">
                {item.items.map((listItem, itemIndex) => (
                  <li key={itemIndex} className="text-gray-400 flex items-center">
                    <span className="w-1.5 h-1.5 bg-gold rounded-full mr-2" />
                    {listItem}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};