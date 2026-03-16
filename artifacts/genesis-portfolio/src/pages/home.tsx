import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Brands } from "@/components/brands";
import { Gallery } from "@/components/gallery";
import { Services } from "@/components/services";
import { Method } from "@/components/method";
import { Testimonials } from "@/components/testimonials";
import { Favorites } from "@/components/favorites";
import { Collabs } from "@/components/collabs";
import { Contact } from "@/components/contact";
import { FloatingCTA } from "@/components/floating-cta";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <Navbar />
      
      <main>
        <Hero />
        <Brands />
        <Gallery />
        <Services />
        <Method />
        <Testimonials />
        <Favorites />
        <Collabs />
        <Contact />
      </main>
      <FloatingCTA />
    </div>
  );
}

