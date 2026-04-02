'use client';
import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Solution from './components/Solution';
import ProductCards from './components/ProductCards';
import Segments from './components/Segments';
import Consultative from './components/Consultative';
import FinalCTA from './components/FinalCTA';
import ModalForm from './components/ModalForm';
import Footer from './components/Footer';
import WhatsButton from './components/WhatsButton';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-white">
      <Header onOpenModal={openModal} />
      
      <main>
        <Hero onOpenModal={openModal} />
        <ProductCards onOpenModal={openModal} />
        <Solution  />
        <Segments onOpenModal={openModal} />
        <Consultative onOpenModal={openModal} />
        <FinalCTA onOpenModal={openModal} />
      </main>
      
      <Footer onOpenModal={openModal} />
      
      <ModalForm isOpen={isModalOpen} onClose={closeModal} />
      <WhatsButton onOpenModal={openModal} />
    </div>
  );
}
