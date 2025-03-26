import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Mousewheel } from 'swiper/modules';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/mousewheel';

// Import product images
import product1Img1 from '../../../assets/product/product1_img1.png';
import product1Img2 from '../../../assets/product/product1_img2.png';
import product2Img1 from '../../../assets/product/product2_img1.png';
import product2Img2 from '../../../assets/product/product2_img2.png';
import product3Img1 from '../../../assets/product/product3_img1.png';
import product3Img2 from '../../../assets/product/product3_img2.png';
import product4Img1 from '../../../assets/product/product4_img1.png';
import product4Img2 from '../../../assets/product/product4_img2.png';
import product5Img1 from '../../../assets/product/product5_img1.png';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Product data with two images per product
const bestSellingProducts = [
  {
    id: 1,
    name: 'High Waisted Isabel Wide Leg Scrub Pants',
    price: 58.00,
    image1: product1Img1,
    image2: product1Img2,
    colors: ['purple', 'blue', 'black', 'gray'],
    isNew: true
  },
  {
    id: 2,
    name: 'Catarina One-Pocket Scrub Top™',
    price: 38.00,
    image1: product2Img1,
    image2: product2Img2,
    colors: ['mint', 'gray', 'blue', 'black'],
    isNew: false
  },
  {
    id: 3,
    name: 'High Waisted Isabel Wide Leg Scrub Pants',
    price: 58.00,
    image1: product3Img1,
    image2: product3Img2,
    colors: ['blue', 'purple', 'black', 'gray'],
    isNew: true
  },
  {
    id: 4,
    name: 'Rafaela Oversized Scrub Top™',
    price: 38.00,
    image1: product4Img1,
    image2: product4Img2,
    colors: ['purple', 'blue', 'black', 'gray'],
    isNew: false
  },
  {
    id: 5,
    name: 'Catarina One-Pocket Scrub Top™',
    price: 38.00,
    image1: product5Img1,
    image2: product5Img1,
    colors: ['mint', 'gray', 'blue', 'black'],
    isNew: false
  },
  {
    id: 6,
    name: 'High Waisted Isabel Wide Leg Scrub Pants',
    price: 58.00,
    image1: product1Img1,
    image2: product1Img2,
    colors: ['purple', 'blue', 'black', 'gray'],
    isNew: true
  },
  {
    id: 7,
    name: 'Catarina One-Pocket Scrub Top™',
    price: 38.00,
    image1: product2Img1,
    image2: product2Img2,
    colors: ['mint', 'gray', 'blue', 'black'],
    isNew: false
  },
  {
    id: 8,
    name: 'High Waisted Isabel Wide Leg Scrub Pants',
    price: 58.00,
    image1: product3Img1,
    image2: product3Img2,
    colors: ['blue', 'purple', 'black', 'gray'],
    isNew: true
  }
];

const ProductCard = ({ product }) => {
  const cardRef = useRef(null);
  const imageContainerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    
    gsap.fromTo(card, 
      { 
        y: 20,
        opacity: 0 
      },
      { 
        y: 0,
        opacity: 1,
        duration: 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top bottom-=100",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    
    const imageContainer = imageContainerRef.current;
    if (isHovered) {
      gsap.to(imageContainer, {
        '--hover-progress': 1,
        duration: 0.3,
        ease: "power1.inOut"
      });
    } else {
      gsap.to(imageContainer, {
        '--hover-progress': 0,
        duration: 0.3,
        ease: "power1.inOut"
      });
    }
  }, [isHovered, isLoaded]);

  const handleImagesLoaded = () => {
    setIsLoaded(true);
  };

  useEffect(() => {
    const img1 = new Image();
    const img2 = new Image();
    let loadedCount = 0;

    const checkAllLoaded = () => {
      loadedCount++;
      if (loadedCount === 2) {
        handleImagesLoaded();
      }
    };

    img1.onload = checkAllLoaded;
    img2.onload = checkAllLoaded;
    img1.src = product.image1;
    img2.src = product.image2;
  }, [product.image1, product.image2]);

  return (
    <div 
      ref={cardRef} 
      className="group cursor-pointer w-full h-full flex flex-col"
    >
      {/* Image Container */}
      <div 
        ref={imageContainerRef}
        className="relative w-full aspect-[2.5/4] mb-4 bg-[#F8F8F8] overflow-hidden rounded-lg"
        style={{
          '--hover-progress': 0
        }}
        onMouseEnter={() => isLoaded && setIsHovered(true)}
        onMouseLeave={() => isLoaded && setIsHovered(false)}
      >
        {/* Base Image */}
        <img
          src={product.image1}
          alt={`${product.name} - First Image`}
          className={`absolute inset-0 w-full h-full object-cover object-center z-10 transform transition-transform duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={{
            transform: `translateX(calc(-100% * var(--hover-progress)))`,
            transition: 'transform 0.8s ease-in-out, opacity 0.3s ease-in-out'
          }}
        />

        {/* Hover Image */}
        <img
          src={product.image2}
          alt={`${product.name} - Second Image`}
          className={`absolute inset-0 w-full h-full object-cover object-center z-9 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={{
            transform: `translateX(calc(100% * (1 - var(--hover-progress))))`,
            transition: 'transform 0.8s ease-in-out, opacity 0.3s ease-in-out'
          }}
        />

        {product.isNew && (
          <div className="absolute top-4 left-4 bg-black text-white text-xs px-3 py-1 rounded-full z-20">
            NEW
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="px-1 mt-auto">
        <h3 className="text-base font-medium mb-2 text-gray-900 leading-tight">
          {product.name}
        </h3>
        <p className="text-base font-bold text-gray-900">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

const MenBestSellers = () => {
  const [swiper, setSwiper] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-[90%] mx-auto px-4 md:px-8">
        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-black mb-8">
          Men's Best Sellers
        </h2>

        {/* Swiper Container */}
        {isMounted && (
          <div className="relative">
            <Swiper
              modules={[FreeMode, Mousewheel]}
              spaceBetween={24}
              slidesPerView="auto"
              freeMode={{
                enabled: true,
                momentum: true,
                momentumRatio: 0.5,
              }}
              mousewheel={{
                forceToAxis: true,
              }}
              onSwiper={setSwiper}
              className="!overflow-visible"
              breakpoints={{
                0: {
                  slidesPerView: 1.2,
                  spaceBetween: 16
                },
                480: {
                  slidesPerView: 2.2,
                  spaceBetween: 20
                },
                768: {
                  slidesPerView: 3.2,
                  spaceBetween: 24
                },
                1024: {
                  slidesPerView: 4.2,
                  spaceBetween: 24
                },
                1280: {
                  slidesPerView: 5,
                  spaceBetween: 24
                }
              }}
              watchOverflow={true}
              observer={true}
              observeParents={true}
              resizeObserver={true}
            >
              {bestSellingProducts.map((product) => (
                <SwiperSlide 
                  key={product.id}
                  className="!h-auto"
                >
                  <ProductCard product={product} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </section>
  );
};

export default MenBestSellers;