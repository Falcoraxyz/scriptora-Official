import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { ProblemSection } from "@/components/problem-section"
import { FeaturesSection } from "@/components/features-section"
import { HowItWorks } from "@/components/how-it-works"
import { ProductShowcase } from "@/components/product-showcase"
import { ComparisonSection } from "@/components/comparison-section"
import { WhoIsItFor } from "@/components/who-is-it-for"
import { PricingSection } from "@/components/pricing-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { ReferralTracker } from "@/components/referral-tracker"

export const metadata = {
  title: "Scriptora — AI Academic Writing IDE",
  description: "AI-powered academic IDE that structures, formats, cites, and exports your thesis automatically.",
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <ReferralTracker />
      <Navbar />
      <Hero />
      <ProblemSection />
      <FeaturesSection />
      <HowItWorks />
      <ProductShowcase />
      <ComparisonSection />
      <WhoIsItFor />
      <PricingSection />
      <CTASection />
      <Footer />
    </main>
  );
}
