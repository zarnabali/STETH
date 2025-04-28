import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import logo from '../assets/logo.png';

const Header = ({ className = '', isLoggedIn = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Women");
  const headerRef = useRef(null);
  const logoRef = useRef(null);
  const navItemsRef = useRef([]);
  const searchRef = useRef(null);
  const iconsRef = useRef(null);
  const sliderRef = useRef(null);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Prevent body scroll when menu is open
    document.body.style.overflow = isMenuOpen ? 'auto' : 'hidden';
  };

  // Clean up effect
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    // Text Slider Animation
    const slider = sliderRef.current;
    if (!slider) return;

    const sliderContent = slider.querySelector('.slider-content');
    if (!sliderContent) return;

    // Clone the content for seamless loop
    const originalContent = sliderContent.innerHTML;
    sliderContent.innerHTML = originalContent + originalContent;

    // Create the infinite scroll animation with increased speed
    const tl = gsap.timeline({
      repeat: -1,
      defaults: { ease: "none" }
    });

    tl.to(sliderContent, {
      x: "-50%",
      duration: 8, // Animation duration
      ease: "none"
    });

    // Cleanup
    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    // GSAP animations on mount for header elements
    gsap.fromTo(
      headerRef.current,
      { y: -100, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        ease: "power3.out" 
      }
    );

    gsap.fromTo(
      logoRef.current,
      { scale: 0.8, opacity: 0 },
      { 
        scale: 1, 
        opacity: 1, 
        duration: 0.6, 
        delay: 0.3, 
        ease: "back.out(1.7)" 
      }
    );

    // Animate nav items one by one
    navItemsRef.current.forEach((item, index) => {
      gsap.fromTo(
        item,
        { y: -20, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.4, 
          delay: 0.4 + (index * 0.1), 
          ease: "power2.out" 
        }
      );
    });

    gsap.fromTo(
      searchRef.current,
      { width: "0%", opacity: 0 },
      { 
        width: "100%", 
        opacity: 1, 
        duration: 0.8, 
        delay: 0.7, 
        ease: "power2.inOut" 
      }
    );

    gsap.fromTo(
      iconsRef.current,
      { x: 20, opacity: 0 },
      { 
        x: 0, 
        opacity: 1, 
        duration: 0.5, 
        delay: 0.9, 
        ease: "power2.out" 
      }
    );
  }, []);
  
  // Animation for mobile menu
  useEffect(() => {
    if (isMenuOpen) {
      gsap.fromTo(
        ".mobile-menu-container",
        { y: "100%", opacity: 0 },
        { 
          y: "0%", 
          opacity: 1, 
          duration: 0.4, 
          ease: "power2.out" 
        }
      );
    }
  }, [isMenuOpen]);

  return (
    <>
      {/* Text Slider - Added on top */}
      <div 
        ref={sliderRef} 
        className="w-full bg-black text-white overflow-hidden"
      >
        <div className="slider-content flex whitespace-nowrap">
          <div className="flex-shrink-0 px-4 md:px-8 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium">
            Free Shipping Over $50 and Returns
          </div>
          <div className="flex-shrink-0 px-4 md:px-8 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium">
            Free Shipping Over $50 and Returns
          </div>
        </div>
      </div>
      
      <header ref={headerRef} className={`w-full z-50 sticky top-0 ${className}`}>
        {/* Desktop Header */}
        <div className="hidden md:flex items-center justify-between py-4 border-b bg-white shadow-md px-10">
          <div className="flex items-center space-x-8">
            <a href="/" className="flex items-center" ref={logoRef}>
              <img src={logo} alt="STETH Logo" className="h-20 w-auto ml-10" />
            </a>
          </div>
          
          {/* Center Navigation */}
          <nav className="hidden lg:flex justify-center space-x-10 absolute left-1/2 transform -translate-x-1/2">
            {["Women", "Men", "Students", "About STETH"].map((item, index) => (
              <a 
                key={item}
                href={item === "About STETH" ? "/aboutus" : `/${item.toLowerCase().replace(" ", "-")}`} 
                className="text-gray-700 hover:text-gray-900 transition-colors text-lg font-medium"
                ref={(el) => (navItemsRef.current[index] = el)}
              >
                {item}
              </a>
            ))}
          </nav>
          
          <div className="flex items-center space-x-4 mr-10">
            <div className="relative w-64" ref={searchRef}>
              <input 
                type="text" 
                placeholder="Search" 
                className="w-full px-4 py-2 pl-12 rounded-3xl bg-gray-200 border-gray-200 focus:border-navy-blue focus:outline-none transition-colors text-gray-700"
              />
              <svg 
                className="absolute left-4 top-2.5 h-5 w-5 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            <div className="flex items-center space-x-4" ref={iconsRef}>
              {isLoggedIn ? (
                <a href="/profile" className="hover:text-gray-900 transition-colors">
                  <svg className="h-6 w-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </a>
              ) : (
                <a href="/login" className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors text-sm font-medium">
                  Login
                </a>
              )}
              <a href="/cart" className="hover:text-gray-900 transition-colors">
                <svg className="h-6 w-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between px-4 py-3 border-b bg-white">
          <button 
            onClick={toggleMenu} 
            className="text-black bg-white p-2 hover:text-gray-600 transition-colors z-50"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          <a href="/" className="flex items-center">
            <img src={logo} alt="STETH Logo" className="h-12" />
          </a>
          
          <div className="flex items-center px-3">
            
            <a href="/cart">
              <svg className="h-6 w-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </a>
          </div>
        </div>
        
        {/* Mobile Menu Overlay - Simplified */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-white z-[9999]">
            {/* Top Navigation */}
            <div className="border-b">
              <div className="px-4 py-3 flex items-center justify-between">
                <button 
                  onClick={toggleMenu} 
                  className="p-2 bg-white"
                >
                  <svg className="h-6 w-6 bg-white text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                {/* Keep the logo in the mobile menu header */}
                <a href="/" className="flex items-center">
                  <img src={logo} alt="STETH Logo" className="h-10" />
                </a>
                
                <div className="w-6"></div> {/* Spacer for alignment */}
              </div>
            </div>

            {/* Simplified Mobile Menu */}
            <div className="h-[calc(100vh-120px)] overflow-y-auto px-4 py-4 bg-white">
              <nav className="space-y-6">
                <a href="/women" className="block text-lg font-medium py-2 text-black hover:bg-gray-100 transition-colors rounded px-2">
                  WOMENS
                </a>
                <a href="/men" className="block text-lg font-medium py-2 text-black hover:bg-gray-100 transition-colors rounded px-2">
                  MENS
                </a>
                <a href="/aboutus" className="block text-lg font-medium py-2 text-black hover:bg-gray-100 transition-colors rounded px-2">
                  ABOUT US
                </a>
                <a href="/students" className="block text-lg font-medium py-2 text-black hover:bg-gray-100 transition-colors rounded px-2">
                  STUDENTS
                </a>
                
                <div className="pt-4 border-t border-gray-200">
                  {!isLoggedIn && (
                    <a href="/login" className="block text-lg font-medium py-2 text-black hover:bg-gray-100 transition-colors rounded px-2">
                      LOGIN
                    </a>
                  )}
                  <a href="/cart" className="block text-lg font-medium py-2 text-black hover:bg-gray-100 transition-colors rounded px-2">
                    CART
                  </a>
                </div>
              </nav>
            </div>
          </div>
        )}
        
        {/* Mobile Search */}
        <div className="md:hidden px-4 py-2 border-b bg-white">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search" 
              className="w-full px-4 py-2 pl-12 rounded-3xl bg-gray-200 border-gray-200 focus:border-gray-400 focus:outline-none transition-colors"
            />
            <svg 
              className="absolute left-4 top-3 h-5 w-5 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;