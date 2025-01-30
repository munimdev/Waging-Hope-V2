import { Hero } from "@/components/Hero";
import { Collection } from "@/components/Collection";
import { Navbar } from "@/components/Navbar";

const Phoenix = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar collection="phoenix" />
      <Hero 
        collection="phoenix"
      />
      <Collection 
        totalNFTs={800}
        basePath="/phoenix"
        // collectionName="phoenix"
      />
    </main>
  );
};

export default Phoenix; 