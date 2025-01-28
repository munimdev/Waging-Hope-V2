import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Features } from "@/components/Features";
import { Collection } from "@/components/Collection";
import { Roadmap } from "@/components/Roadmap";
import { Team } from "@/components/Team";
import { FAQ } from "@/components/FAQ";
import { Navbar } from "@/components/Navbar";

const Index = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <Collection />
    </main>
  );
};

export default Index;