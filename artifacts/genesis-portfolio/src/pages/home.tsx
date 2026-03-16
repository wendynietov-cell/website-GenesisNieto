import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Brands } from "@/components/brands";
import { Gallery } from "@/components/gallery";
import { Services } from "@/components/services";
import { Collabs } from "@/components/collabs";
import { Contact } from "@/components/contact";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <Navbar />
      
      <main>
        <Hero />
        <Brands />
        <Gallery />
        <Services />
        <Collabs />
        <Contact />
      </main>
    </div>
  );
}
