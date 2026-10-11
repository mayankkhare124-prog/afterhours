import React, { useState } from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Challenges from './components/Challenges.jsx';
import Schedule from './components/Schedule.jsx';
import Prizes from './components/Prizes.jsx';
import Rules from './components/Rules.jsx';
import FAQ from './components/FAQ.jsx';
import RegistrationModal, { RegisterSection } from './components/Register.jsx';
import BuilderTools from './components/BuilderTools.jsx';
import Footer from './components/Footer.jsx';

function Ticker() {
  const items = [
    'BUILD BEYOND THE OBVIOUS',
    'LESS SLIDES · MORE RUNTIME',
    'SHIP BEFORE THE CLOCK DIES',
    '36 HOURS · ONE DEADLINE',
  ];
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker__track">
        {[0, 1].map((copy) => (
          <React.Fragment key={copy}>
            {items.map((t) => (
              <span key={`${copy}-${t}`}>
                {t}
                <i>※</i>
              </span>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export default function App() {
  const [registerOpen, setRegisterOpen] = useState(false);

  return (
    <>
      <Header onRegister={() => setRegisterOpen(true)} />
      <main>
        <Hero
          onExplore={() => scrollTo('challenges')}
          onSchedule={() => scrollTo('schedule')}
        />
        <Ticker />
        <About />
        <Challenges />
        <Schedule />
        <Prizes />
        <Rules />
        <FAQ />
        <RegisterSection onOpenModal={() => setRegisterOpen(true)} />
        <BuilderTools />
      </main>
      <Footer onRegister={() => setRegisterOpen(true)} />
      <RegistrationModal open={registerOpen} onClose={() => setRegisterOpen(false)} />
    </>
  );
}
