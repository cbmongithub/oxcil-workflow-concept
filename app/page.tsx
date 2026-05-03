import { WorkflowShowcase } from "@/components/previews/workflow-showcase";
import { ProductGrid } from "@/components/sections/product-grid";
import { Compare } from "@/components/sections/compare";
import { FAQ } from "@/components/sections/faq";
import { CTA } from "@/components/sections/cta";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { LogoCloud } from "@/components/sections/logo-cloud";
import { Pricing } from "@/components/sections/pricing";
import { AnimatedTerminal } from "@/components/sections/animated-terminal";
import { Testimonials } from "@/components/sections/testimonials";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";

export default function Home() {
  return (
    <div className="relative isolate min-h-screen">
      <Header />
      <main className="relative z-10">
        <Hero />
        <LogoCloud />
        <ProductGrid />
        <HowItWorks />
        <WorkflowShowcase />
        <AnimatedTerminal />
        <Testimonials />
        <Compare />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
