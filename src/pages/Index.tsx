import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Collection } from "@/components/Collection";

const Index = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Hero />
      <About />
      <Collection />
    </main>
  );
};

export default Index;