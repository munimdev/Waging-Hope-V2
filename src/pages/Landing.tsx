import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Landing = () => {
  const collections = [
    {
      title: "Imagine Salaam/Shalom",
      image: "/highlight/phoenix.jpeg",
      path: "/imagine",
    },
    {
      title: "LA Phoenix",
      image: "/highlight/shalom.jpeg",
      path: "/la",
    },
  ];

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">Waging Hope Collective</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {collections.map((collection) => (
            <motion.div
              key={collection.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Link to={collection.path}>
                <div className="relative group overflow-hidden rounded-lg">
                  <img
                    src={collection.image}
                    alt={collection.title}
                    className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">
                      {collection.title}
                    </h2>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Landing; 