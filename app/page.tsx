import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import QuickAccess from "@/components/QuickAccess";
import Industries from "@/components/Industries";
import About from "@/components/About";
import CareersCta from "@/components/CareersCta";
import Footer from "@/components/Footer";
import AssistantLauncher from "@/components/assistant/AssistantLauncher";
import AssistantPanel from "@/components/assistant/AssistantPanel";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <QuickAccess />
        <Industries />
        <About />
        <CareersCta />
      </main>
      <Footer />
      <AssistantLauncher />
      <AssistantPanel />
    </>
  );
}
