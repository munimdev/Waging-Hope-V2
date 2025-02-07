import { Hero } from "@/components/Hero";
import { Collection } from "@/components/Collection";
import { Navbar } from "@/components/Navbar";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Imagine = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  if (error) {
    return (
      <main className="min-h-screen bg-background flex flex-col items-center justify-center">
        <div className="text-center space-y-6">
          <h2 className="text-4xl font-bold text-white">Oops!</h2>
          <p className="text-xl text-white/80">{error}</p>
          <button
            onClick={() => {
              setSearchParams({ page: "1" });
              setError(null);
            }}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8"
          >
            Go to First Page
          </button>
        </div>
      </main>
    );
  }

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
        onError={setError}
      />
    </main>
  );
};

export default Imagine;