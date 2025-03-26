import React, { useEffect } from 'react';
import Header from './Components/Header';
import Hero from './Components/Hero';
import BestSellers from './Components/WomenBestSellers';

import FeatureSection from './Components/FeatureSection';
import MensBestSellers from './Components/MensBestSeller';
import RewardsCTA from './Components/DiscountOffers';
import NewsletterSignup from './Components/ContactUs';
import AwsomeHumansFooter from './Components/Footer';
const Homepage = ({ children }) => {
  // Add fonts and styles directly without API calls
  useEffect(() => {
    // Add local styles to fix layout issues and add fonts
    const style = document.createElement('style');
    style.textContent = `
      @font-face {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 300;
        font-display: swap;
        src: url('/fonts/poppins-v20-latin-300.woff2') format('woff2');
      }
      
      @font-face {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('/fonts/poppins-v20-latin-regular.woff2') format('woff2');
      }
      
      @font-face {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 500;
        font-display: swap;
        src: url('/fonts/poppins-v20-latin-500.woff2') format('woff2');
      }
      
      @font-face {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 600;
        font-display: swap;
        src: url('/fonts/poppins-v20-latin-600.woff2') format('woff2');
      }
      
      @font-face {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url('/fonts/poppins-v20-latin-700.woff2') format('woff2');
      }
      
      html, body, #root {
        height: 100%;
        margin: 0;
        padding: 0;
        width: 100%;
        overflow-x: hidden;
      }
      
      .font-poppins {
        font-family: 'Poppins', sans-serif;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="font-poppins min-h-screen flex flex-col w-full bg-white">
      <Header />
      <Hero />
      <FeatureSection />
      <BestSellers />
      <MensBestSellers />
      <RewardsCTA />
      <NewsletterSignup />
      <AwsomeHumansFooter />
      <main className="flex-grow">{children}</main>
    </div>
  );
};

export default Homepage;