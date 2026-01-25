import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Programs from './components/Programs';
import About from './components/About';
import Experience from './components/Experience';
import Gallery from './components/Gallery';
// import Results from './components/Results'; // Your Transformation Slider
import Contact from './components/Contact';
import TransformationSlider from './components/TransformationSlider';
import Footer from './components/Footer';
import FAQ from './components/FAQ';
function App() {
  return (
    <div className="bg-zinc-950 selection:bg-emerald-500 selection:text-white">
  
      <Navbar />
      <main>
        <Hero />
        <Programs />
        <About />
        <Experience />
        <Gallery />
        <TransformationSlider />
        <FAQ />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}

export default App;