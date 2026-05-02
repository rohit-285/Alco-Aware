import React, { useState } from 'react';
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
import BehaviorSimulator from '../components/sections/BehaviorSimulator';
import HealthDashboard from '../components/sections/HealthDashboard';
import AIAdvisor from '../components/sections/AIAdvisor';
import LegalMap from '../components/sections/LegalMap';
import LiveSessionTracker from '../components/sections/LiveSessionTracker';
import EmergencySOSPanel from '../components/sections/EmergencySOSPanel';
import HangoverPredictor from '../components/sections/HangoverPredictor';
import MedicationChecker from '../components/sections/MedicationChecker';
import SobrietyTracker from '../components/sections/SobrietyTracker';
import CommunityFeed from '../components/sections/CommunityFeed';
import ToleranceProfile from '../components/sections/ToleranceProfile';
import PersonalStats from '../components/sections/PersonalStats';
import { BACProvider } from '../context/BACContext';
import { useBAC } from '../context/BACContext';
import { useAuth } from '../context/AuthContext';

const PlatformSections = () => {
  const { calculationResult } = useBAC();
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('calculator');
  const tabs = [
    { id: 'calculator', label: 'Calculator' },
    { id: 'result', label: 'BAC Result' },
    { id: 'health', label: 'Health' },
    { id: 'tools', label: 'Tools' },
    { id: 'law', label: 'Law' },
    { id: 'stats', label: 'My Stats' },
    { id: 'learn', label: 'Learn' }
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 pb-14">
      <div className="sticky top-16 z-30 bg-bg-base/95 backdrop-blur-xl border-y border-border py-4 mb-8">
        <div className="flex gap-3 overflow-x-auto justify-start md:justify-center px-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`shrink-0 rounded-xl px-5 py-4 text-base font-semibold border transition-colors ${activeTab === tab.id ? 'bg-primary text-black border-primary' : 'bg-white/5 text-text-muted border-border hover:text-white hover:bg-white/10'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div className="pt-6">
        {activeTab === 'calculator' && (
          <div id="calculator" className="relative">
            <Calculator onCalculated={() => setActiveTab('result')} />
          </div>
        )}
        {activeTab === 'result' && (
          <>
            <BACResult />
            <LiveSessionTracker calculationResult={calculationResult} />
          </>
        )}
        {activeTab === 'health' && (
          <>
            <BehaviorSimulator />
            <HealthDashboard />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <HangoverPredictor />
              <ToleranceProfile />
            </div>
          </>
        )}
        {activeTab === 'tools' && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <MedicationChecker />
              <SobrietyTracker />
            </div>
            <AIAdvisor />
          </>
        )}
        {activeTab === 'law' && <LegalMap />}
        {activeTab === 'stats' && (
          <>
            {isAuthenticated ? (
              <>
                <PersonalStats />
                <CommunityFeed />
              </>
            ) : (
              <div className="glass-panel rounded-2xl p-8 text-center">
                <h3 className="text-2xl font-sora font-bold text-white">Login required</h3>
                <p className="text-text-muted mt-3">Please use the Login button in the top-right corner to view your personal drinking stats.</p>
              </div>
            )}
          </>
        )}
        {activeTab === 'learn' && (
          <>
            <DrinkTimeline />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <PersonalityEngine />
              <HumorEngine />
            </div>
            <Safety />
            <Education />
            <StrengthComparison />
            <Reviews />
          </>
        )}
      </div>
    </section>
  );
};

const Home = () => {
  return (
    <BACProvider>
      <PageWrapper>
        <Hero />
        
        {/* Main Content Area */}
        <div className="relative">
          {/* subtle background separating hero from content */}
          <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-bg-surface/50 to-bg-base pointer-events-none" />
          
          <PlatformSections />
          <EmergencySOSPanel />
          
        </div>

      </PageWrapper>
    </BACProvider>
  );
};

export default Home;
