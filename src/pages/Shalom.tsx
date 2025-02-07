import { Hero } from "@/components/Hero";
import { Collection } from "@/components/Collection";
import { Navbar } from "@/components/Navbar";

const Imagine = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar collection="imagine" />
      <Hero 
        collection="imagine"
      />
      <Collection 
        totalNFTs={500}
        basePath="/imagine"
      />
    </main>
  );
};

export default Imagine;