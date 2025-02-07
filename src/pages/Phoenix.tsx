import { Hero } from "@/components/Hero";
import { Collection } from "@/components/Collection";
import { Navbar } from "@/components/Navbar";
import { useState } from "react";

const LA = () => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar collection="la" />
      <Hero 
        collection="la"
        currentPage={currentPage}
      />
      <Collection 
        totalNFTs={800}
        basePath="/la"
        onPageChange={setCurrentPage}
      />
    </main>
  );
};

export default LA; 