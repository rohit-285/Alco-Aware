import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import DisclaimerBanner from '../ui/DisclaimerBanner';

const PageWrapper = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-16 relative">
        {children}
      </main>
      <Footer />
      <DisclaimerBanner />
    </div>
  );
};

export default PageWrapper;
