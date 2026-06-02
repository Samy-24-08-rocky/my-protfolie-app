"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import About from "@/components/About";
import Skills from "@/components/Skills";
import ServicesSection from "@/components/ServicesSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import Projects from "@/components/Projects";
import FeaturedProjects from "@/components/FeaturedProjects";
import ProcessSection from "@/components/ProcessSection";
import TechStackSection from "@/components/TechStackSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import IndustriesSection from "@/components/IndustriesSection";
import Gallery from "@/components/Gallery";
import FAQSection from "@/components/FAQSection";
import LeadFormSection from "@/components/LeadFormSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CalendlyModal from "@/components/CalendlyModal";

export default function Home() {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

  return (
    <main style={{ position: "relative" }}>
      <Navbar />
      
      {/* Hero section above the fold (id="home") */}
      <HeroSection onBookClick={() => setIsCalendlyOpen(true)} />
      
      {/* Supporting agency metrics */}
      <StatsSection />
      
      {/* Biography block (id="about") */}
      <About />
      
      {/* Technical catalog capabilities (id="skills") */}
      <Skills />
      
      {/* 6 Key core services */}
      <ServicesSection />
      
      {/* Unique Selling Points */}
      <WhyChooseUs />
      
      {/* Dynamic Projects Grid (id="projects") */}
      <Projects />
      
      {/* Showcase results-oriented case studies */}
      <FeaturedProjects />
      
      {/* Workflow Timeline Stepper */}
      <ProcessSection />
      
      {/* Target Stack Selection Grid */}
      <TechStackSection />
      
      {/* Social Trust testimonial quotes */}
      <TestimonialsSection />
      
      {/* Industrial target verticals */}
      <IndustriesSection />
      
      {/* Gallery Showcase (id="gallery") */}
      <Gallery />
      
      {/* Pre-sales accordion FAQ list */}
      <FAQSection />
      
      {/* Contact capture intake sheet (id="contact") */}
      <LeadFormSection />
      
      <Footer />

      {/* Persistent global floating widgets */}
      <WhatsAppButton />
      <CalendlyModal isOpen={isCalendlyOpen} onClose={() => setIsCalendlyOpen(false)} />
    </main>
  );
}
