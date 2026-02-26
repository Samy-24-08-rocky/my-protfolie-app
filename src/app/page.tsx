import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main style={{ position: "relative" }}>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Gallery />
      <Contact />
      <Footer />
    </main>
  );
}
