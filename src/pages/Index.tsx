import { Hero } from "@/components/Hero";
import { Collection } from "@/components/Collection";
import { Navbar } from "@/components/Navbar";

const Index = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero 
        title="Imagine Salaam Shalom"
        description="Imagine Salaam/Shalom ('Peace' in Arabic/Hebrew) a 'la Yoko Ono's 'Imagine Peace' is a Charity NFT Collection that draws on the unique perspective of the Large Nature Model. In 500 unique digital art pieces, each representing a single day since the 2023 Israel-Hamas War started, the project hallucinates imagined possibilities when two male soldiers, one Israeli and one Palestinian, are disarmed, stripped of their uniforms, and subsequently transported to a utopian shared space. Removed from their locals of Gaza, Tel Aviv, or Jerusalem, the men become reacquainted in an underwater biblical Garden of Eden falling into the depth of the Mediterranean Sea. Their human, sensual, intimate lives are revealed and showcased with a generative AI model dedicated to the natural world. As witnesses, we are invited to Imagine Peace and Wage Hope."
      />
      <Collection 
        totalNFTs={500}
        basePath="/shalom"
      />
    </main>
  );
};

export default Index;