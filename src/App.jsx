import React, { useState, lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { useScrollSpy } from './hooks/useScrollSpy';
import { Navbar } from './components/Navbar/Navbar';
import { Hero } from './components/Hero/Hero';
import { About } from './components/About/About';
import { Education } from './components/Education/Education';
import { Portfolio } from './components/Portfolio/Portfolio';
import { Services } from './components/Services/Services';
import { Skills } from './components/Skills/Skills';
import { Experience } from './components/Experience/Experience';
import { References } from './components/References/References';
import { Contact } from './components/Contact/Contact';
import { Footer } from './components/Footer/Footer';
import './styles/global.css';

const Global3DBackground = lazy(() =>
  import('./components/3D/Global3DBackground').then((m) => ({ default: m.Global3DBackground }))
);
const CVModal = lazy(() =>
  import('./components/CVModal/CVModal').then((m) => ({ default: m.CVModal }))
);

const SECTION_META = {
  home: {
    title: 'Nirmali L.P.R.N. Ranawaka | 3D Digital Fashion Architect',
    description: 'Official portfolio & 3D digital couture studio of Nirmali Ranawaka. Specializing in CLO 3D, Marvelous Designer, and Unreal Engine 5 virtual runways.'
  },
  about: {
    title: 'Nirmali Ranawaka | Studio Vision & Manifesto — 3D Fashion',
    description: 'Exploring digital garments as architectural forms in virtual spaces—unconstrained by physical gravity or raw material yield.'
  },
  education: {
    title: 'Nirmali Ranawaka | Academic Pedigree & Credentials',
    description: 'Central Saint Martins and Parsons School of Design pedigree. Specializing in parametric pattern drafting, zero-gravity cloth dynamics, and digital textiles.'
  },
  portfolio: {
    title: 'Nirmali Ranawaka | Selected Works — 3D Digital Fashion',
    description: 'A curated archive of commercial, spatial, and conceptual 3D digital couture, metahuman AR garments, and Unreal Engine 5 virtual runways.'
  },
  services: {
    title: 'Nirmali Ranawaka | Specialized 3D Design Services',
    description: 'Bespoke 3D digital fashion solutions for luxury couture brands, spatial game studios, and metaverse fashion week producers.'
  },
  skills: {
    title: 'Nirmali Ranawaka | Technical Proficiency & 3D Matrix',
    description: 'Quantifying 3D fashion engineering expertise across CLO 3D, Marvelous Designer, Unreal Engine 5, Substance 3D, and Houdini Vellum.'
  },
  experience: {
    title: 'Nirmali Ranawaka | Career Chronicle & Experience',
    description: 'Over 8+ years of experience leading 3D fashion architecture, parametric pattern drafting, and spatial runway direction for luxury fashion houses.'
  },
  references: {
    title: 'Nirmali Ranawaka | Industry Endorsements & References',
    description: 'Endorsements and recommendations from creative directors and heads of digital apparel across Paris and international 3D fashion studios.'
  },
  contact: {
    title: 'Nirmali Ranawaka | Contact & 3D Commissions',
    description: 'Direct WhatsApp, email, and commission inquiry portal for Lead 3D Digital Fashion Architect Nirmali L.P.R.N. Ranawaka.'
  }
};

export function App() {
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const sectionIds = [
    'home',
    'about',
    'education',
    'portfolio',
    'services',
    'skills',
    'experience',
    'references',
    'contact'
  ];

  const { activeSection, scrollToSection } = useScrollSpy(sectionIds, 120);

  const handleOpenCvModal = () => setIsCvModalOpen(true);
  const handleCloseCvModal = () => setIsCvModalOpen(false);

  const currentMeta = SECTION_META[activeSection] || SECTION_META.home;

  return (
    <div className="app-main-wrapper">
      {/* Dynamic SEO Title & Meta Description Per Active Section */}
      <Helmet>
        <title>{currentMeta.title}</title>
        <meta name="description" content={currentMeta.description} />
        <meta property="og:title" content={currentMeta.title} />
        <meta property="og:description" content={currentMeta.description} />
      </Helmet>

      {/* Transparent Interactive 3D Particle Constellation Canvas */}
      {isMounted && (
        <Suspense fallback={null}>
          <Global3DBackground />
        </Suspense>
      )}

      {/* Sticky Locked Navigation Bar */}
      <Navbar
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        onOpenCvModal={handleOpenCvModal}
      />

      {/* Hero Section */}
      <Hero
        scrollToSection={scrollToSection}
        onOpenCvModal={handleOpenCvModal}
      />

      {/* Studio Vision & Manifesto */}
      <About />

      {/* Academic & Technical Pedigree */}
      <Education />

      {/* Selected Works & Interactive Modal */}
      <Portfolio />

      {/* Core Specialized Services */}
      <Services />

      {/* Technical Matrix & Competency Capacity */}
      <Skills />

      {/* Career History & Chronicle Timeline */}
      <Experience />

      {/* Industry Endorsements & References */}
      <References />

      {/* Direct Contact (WhatsApp + Email Form) */}
      <Contact />

      {/* Footer */}
      <Footer scrollToSection={scrollToSection} />

      {/* In-Site Interactive CV Preview Modal */}
      {isMounted && (
        <Suspense fallback={null}>
          {isCvModalOpen && (
            <CVModal
              isOpen={isCvModalOpen}
              onClose={handleCloseCvModal}
            />
          )}
        </Suspense>
      )}
    </div>
  );
}

export default App;

