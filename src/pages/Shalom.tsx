import { Hero } from "@/components/Hero";
import { Collection } from "@/components/Collection";
import { Navbar } from "@/components/Navbar";

const Shalom = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar collection="shalom" />
      <Hero 
        collection="shalom"
      />
      <Collection 
        totalNFTs={500}
        basePath="/shalom"
      />
    </main>
  );
};

export default Shalom;