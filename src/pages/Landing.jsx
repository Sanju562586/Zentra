import SpotlightHero from "@/components/landing/SpotlightHero";
import Footer from "@/components/common/Footer";

export default function Landing() {
  return (
    <main className="relative overflow-hidden bg-background text-foreground">
      {/* Hero */}
      <section className="relative">
        <SpotlightHero />
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
