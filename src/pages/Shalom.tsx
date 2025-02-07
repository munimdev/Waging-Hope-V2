import { Hero } from "@/components/Hero";
import { Collection } from "@/components/Collection";
import { Navbar } from "@/components/Navbar";
import { useState } from "react";

const Imagine = () => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar collection="imagine" />
      <Hero 
        collection="imagine"
        currentPage={currentPage}
      />
      <Collection 
        totalNFTs={500}
        basePath="/imagine"
        onPageChange={setCurrentPage}
      />
    </main>
  );
};

export default Imagine;