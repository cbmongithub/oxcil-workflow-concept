import { BentoGrid } from "@/components/bento-grid";
import { Comparison } from "@/components/comparison";
import { FAQ } from "@/components/faq";
import { FinalCTA } from "@/components/final-cta";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { HowItWorks } from "@/components/how-it-works";
import { LogoCloud } from "@/components/logo-cloud";
import { Pricing } from "@/components/pricing";
import { TerminalDemo } from "@/components/terminal-demo";
import { Testimonials } from "@/components/testimonials";

export default function Home() {
  return (
    <div className="bg-background min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <LogoCloud />
        <BentoGrid />
        <HowItWorks />
        <TerminalDemo />
        <Testimonials />
        <Comparison />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
