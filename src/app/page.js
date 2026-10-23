'use client';

import Header from './components/Header';
import Hero from './components/Hero';
import Solution from './components/Solution';
import ProductCards from './components/ProductCards';
import Segments from './components/Segments';
import Consultative from './components/Consultative';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

export default function Home() {
  const openModal = () => {
    const tryOpenRD = () => {
      const rdButton = document.getElementById('rd-floating_button-ly8tcuoc');

      if (rdButton) {
        rdButton.click();
        return true;
      }

      return false;
    };

    if (tryOpenRD()) return;

    const interval = setInterval(() => {
      if (tryOpenRD()) {
        clearInterval(interval);
      }
    }, 300);

    setTimeout(() => {
      clearInterval(interval);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onOpenModal={openModal} />

      <main>
        <Hero onOpenModal={openModal} />
        <ProductCards onOpenModal={openModal} />
        <Solution />
        <Segments onOpenModal={openModal} />
        <Consultative onOpenModal={openModal} />
        <FinalCTA onOpenModal={openModal} />
      </main>

      <Footer onOpenModal={openModal} />
    </div>
  );
}