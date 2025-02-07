import { Hero } from "@/components/Hero";
import { Collection } from "@/components/Collection";
import { Navbar } from "@/components/Navbar";

const LA = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar collection="la" />
      <Hero 
        collection="la"
      />
      <Collection 
        totalNFTs={800}
        basePath="/la"
      />
    </main>
  );
};

export default LA; 