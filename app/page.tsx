"use client"
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
import { useEffect } from "react"
import { initializeReferralTracking } from "@/lib/referral"

export default function Home() {
  useEffect(() => {
    const init = async () => {
      await initializeReferralTracking();
    }
    init();
  }, []);

  return (
    <main className="min-h-screen">
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
