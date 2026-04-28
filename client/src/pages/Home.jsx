import React from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import Hero from '../components/sections/Hero';
import Calculator from '../components/sections/Calculator';
import BACResult from '../components/sections/BACResult';
import DrinkTimeline from '../components/sections/DrinkTimeline';
import PersonalityEngine from '../components/sections/PersonalityEngine';
import HumorEngine from '../components/sections/HumorEngine';
import Safety from '../components/sections/Safety';
import Education from '../components/sections/Education';
import StrengthComparison from '../components/sections/StrengthComparison';
import Reviews from '../components/sections/Reviews';
import { BACProvider } from '../context/BACContext';

const Home = () => {
  return (
    <BACProvider>
      <PageWrapper>
        <Hero />
        
        {/* Main Content Area */}
        <div className="relative">
          {/* subtle background separating hero from content */}
          <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-bg-surface/50 to-bg-base pointer-events-none" />
          
          <div id="calculator" className="py-20 z-10 relative">
            <Calculator />
          </div>

          <BACResult />
          <DrinkTimeline />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto px-4">
             <PersonalityEngine />
             <HumorEngine />
          </div>

          <Safety />
          <Education />
          <StrengthComparison />
          <Reviews />
          
        </div>

      </PageWrapper>
    </BACProvider>
  );
};

export default Home;
