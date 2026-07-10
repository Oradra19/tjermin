import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Newsletter } from "@/components/sections/Newsletter";
import { CatalogSection } from "./CatalogSection";
export function CatalogPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <CatalogSection />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
