"use client"

import { useEffect, useRef, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { FreeMode, Mousewheel, Autoplay } from "swiper/modules"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Import Swiper styles
import "swiper/css"
import "swiper/css/free-mode"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Color tile data
const colorTiles = [
  {
    id: 1,
    name: "BLACK",
    image: "/images/black.png",
    color: "#222222",
  },
  {
    id: 2,
    name: "NAVY",
    image: "/images/black.png",
    color: "#1D3461",
  },
  {
    id: 3,
    name: "MOSS",
    image: "/images/black.png",
    color: "#4A5D23",
  },
  {
    id: 4,
    name: "CHARCOAL",
    image: "/images/black.png",
    color: "#36454F",
  },
  {
    id: 5,
    name: "BURGUNDY",
    image: "/images/black.png",
    color: "#800020",
  },
  {
    id: 6,
    name: "SLATE",
    image: "/images/black.png",
    color: "#708090",
  },
  {
    id: 7,
    name: "INDOCYANINE GREEN",
    image: "/images/black.png",
    color: "#006B54",
  },
  {
    id: 8,
    name: "CHAMBRAY",
    image: "/images/black.png",
    color: "#9BBBCC",
  },
  {
    id: 9,
    name: "GRAPHITE",
    image: "/images/black.png",
    color: "#383838",
  },
  {
    id: 10,
    name: "CEIL BLUE",
    image: "/images/black.png",
    color: "#92A1CF",
  },
]

const ColorTile = ({ tile }) => {
  const tileRef = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined" || !tileRef.current) return

    const animation = gsap.fromTo(
      tileRef.current,
      {
        y: 15,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0,
        ease: "power1.out",
        scrollTrigger: {
          trigger: tileRef.current,
          start: "top bottom-=50",
          toggleActions: "play none none none",
        },
      }
    )

    const img = new Image()
    img.onload = () => setIsLoaded(true)
    img.src = tile.image

    return () => {
      if (animation) animation.kill()
    }
  }, [tile.image])

  return (
    <div 
      ref={tileRef} 
      className="group cursor-pointer flex flex-col items-center  mt-10"
    >
      {/* Image Container */}
      <div
        className="relative w-[170px] h-[170px] mb-3 overflow-hidden rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105"
        style={{ backgroundColor: tile.color }}
      >
        <img
          src={tile.image || "/placeholder.svg"}
          alt={`${tile.name} color theme`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 transition-opacity duration-300 group-hover:bg-opacity-10"></div>
      </div>

      {/* Color Name */}
      <div className="text-center w-full">
        <h3 className="text-sm font-medium text-gray-900 tracking-wider">{tile.name}</h3>
      </div>
    </div>
  )
}

const ColorTileSlider = () => {
  const sectionRef = useRef(null)
  const [isMounted, setIsMounted] = useState(false)
  const swiperRef = useRef(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true)
      
      if (sectionRef.current) {
        sectionRef.current.style.opacity = 1;
      }
    }

    return () => {
      setIsMounted(false)
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-16 bg-white">
      <div className="max-w-[90%] mx-auto px-4 md:px-8">
        {/* Swiper Container */}
        {isMounted && (
          <div className="relative">
            <Swiper
              ref={swiperRef}
              modules={[FreeMode, Mousewheel, Autoplay]}
              spaceBetween={24}
              slidesPerView="auto"
              freeMode={{
                enabled: true,
                sticky: false,
                momentum: true,
                momentumRatio: 0.9,
                momentumVelocityRatio: 0.9,
                minimumVelocity: 0.02,
              }}
              mousewheel={{
                forceToAxis: true,
                sensitivity: 1,
                releaseOnEdges: true,
              }}
              autoplay={{
                delay: 2800,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
                waitForTransition: true,
              }}
              speed={1000} // Back to original slower, smoother speed
              loop={true}
              loopAdditionalSlides={colorTiles.length * 3} // Tripling for smoother looping
              loopFillGroupWithBlank={false}
              centeredSlides={false}
              grabCursor={true}
              cssMode={false}
              className="!overflow-visible"
              breakpoints={{
                0: {
                  slidesPerView: 1.3,
                  spaceBetween: 16,
                },
                480: {
                  slidesPerView: 2.3,
                  spaceBetween: 16,
                },
                768: {
                  slidesPerView: 3.3,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 4.3,
                  spaceBetween: 20,
                },
                1280: {
                  slidesPerView: 5.3,
                  spaceBetween: 24,
                },
              }}
              preventClicks={false}
              preventClicksPropagation={false}
              simulateTouch={true}
              touchRatio={1}
              touchAngle={45}
              effect="slide"
              watchOverflow={true}
              observer={true}
              observeParents={true}
              resizeObserver={true}
              roundLengths={true}
              updateOnWindowResize={true}
              watchSlidesProgress={true}
            >
              {/* Create a very large array of slides to make looping smoother */}
              {Array(3).fill(colorTiles).flat().map((tile, index) => (
                <SwiperSlide 
                  key={`${tile.id}-${index}`} 
                  className="!w-auto !h-auto flex justify-center"
                  style={{ width: "190px" }}
                >
                  <ColorTile tile={tile} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </section>
  )
}

export default ColorTileSlider