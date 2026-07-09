import Hero from "@/components/landing/hero";
import Navbar from "@/components/layout/navbar";
import Features from "@/components/landing/features";
import Footer from "@/components/layout/footer";
export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Footer/>
    </>
  );
}