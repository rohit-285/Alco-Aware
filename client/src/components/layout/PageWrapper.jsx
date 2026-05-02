import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import DisclaimerBanner from '../ui/DisclaimerBanner';
import { useDrunkMode } from '../../context/DrunkModeContext';

const PageWrapper = ({ children }) => {
  const { isDrunkMode } = useDrunkMode();

  return (
    <div className={`flex flex-col min-h-screen ${isDrunkMode ? 'drunk-mode' : ''}`}>
      <Navbar />
      {isDrunkMode && (
        <div className="fixed top-16 left-0 right-0 z-40 bg-danger text-white text-center py-3 font-semibold">
          You should stop drinking. Use SOS or call a buddy if you feel unsafe.
        </div>
      )}
      <main className="flex-grow pt-16 relative">
        {children}
      </main>
      <Footer />
      <DisclaimerBanner />
    </div>
  );
};

export default PageWrapper;
