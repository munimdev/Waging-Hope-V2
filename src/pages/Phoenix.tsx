import { Hero } from "@/components/Hero";
import { Collection } from "@/components/Collection";
import { Navbar } from "@/components/Navbar";

const Phoenix = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero 
        collection="phoenix"
        title="LA Phoenix"
        description="LA Phoenix is a groundbreaking NFT collection that captures the essence of Los Angeles' resilience and rebirth. Through 800 unique digital artworks, this collection celebrates the city's diverse culture, its ability to rise from challenges, and its constant evolution. Each piece tells a story of transformation, hope, and the indomitable spirit of LA."
      />
      <Collection 
        totalNFTs={800}
        basePath="/phoenix"
        collectionName="phoenix"
      />
    </main>
  );
};

export default Phoenix; 