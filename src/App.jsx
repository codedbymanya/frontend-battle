import Hero from "./components/Hero";
import Features from "./components/Features";
import PipelineSimulator from "./components/PipelineSimulator";
import WasteCalculator from "./components/WasteCalculator";
import PolicyBuilder from "./components/PolicyBuilder";
import OCRDemo from "./components/OCRDemo";
import Pricing from "./components/Pricing";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      {/* Skip-to-content for keyboard / screen reader users */}
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <header role="banner">
        <Hero />
      </header>

      <main id="main-content">
        <Features />
        <PipelineSimulator />
        <WasteCalculator />
        <PolicyBuilder />
        <OCRDemo />
        <Pricing />
      </main>

      <Footer />
    </>
  );
}

export default App;
