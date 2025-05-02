"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { MapPin, Mail, Phone, Clock, ArrowRight } from "lucide-react"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import Logo from "../../assets/logo_black.jpg"

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

const AboutUs = () => {
  return (
    <div className="bg-white w-screen ">
        <Header/>
      <Hero />
      <OurStory />
      <CoreValues />
      <TeamSection />
      <Contact />
      
      <Footer/>
    </div>
  )
}

const Hero = () => {
  const heroRef = useRef(null)

  useEffect(() => {
    if (!heroRef.current) return
    
    // Clear any existing animations
    gsap.context(() => {
      // Create a new timeline
      const tl = gsap.timeline()
      
      // Set initial states
      gsap.set(heroRef.current.querySelector("h1"), { y: 50, opacity: 0 })
      gsap.set(heroRef.current.querySelector("p"), { y: 30, opacity: 0 })

      // Animate
      tl.to(heroRef.current.querySelector("h1"), {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
      }).to(
        heroRef.current.querySelector("p"),
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.6",
      )
    }, heroRef)

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section ref={heroRef} className="relative bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900">
            About <span className="text-black">STETH</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl lg:text-2xl text-gray-500">
            Redefining medical wear with comfort, functionality, and style for healthcare professionals who deserve the
            best.
          </p>
        </div>
      </div>
    </section>
  )
}

const OurStory = () => {
  const storyRef = useRef(null)

  useEffect(() => {
    if (!storyRef.current) return

    // Create a context to prevent conflicts
    gsap.context(() => {
      // Set initial states
      gsap.set(storyRef.current.querySelector("h2"), { y: 50, opacity: 0 })
      gsap.set(storyRef.current.querySelectorAll("p"), { y: 30, opacity: 0 })
      gsap.set(storyRef.current.querySelector("img"), { x: 50, opacity: 0 })

      // Create animations
      gsap.to(storyRef.current.querySelector("h2"), {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: storyRef.current,
          start: "top 80%",
        },
      })

      gsap.to(storyRef.current.querySelectorAll("p"), {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: storyRef.current,
          start: "top 70%",
        },
      })

      gsap.to(storyRef.current.querySelector("img"), {
        x: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: storyRef.current,
          start: "top 70%",
        },
      })
    }, storyRef)

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section ref={storyRef} className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900">Our Story</h2>
            <p className="mt-4 text-base md:text-lg lg:text-xl text-gray-500">
            Steth was born in the hallways of hospitals, the quiet corners of on-call rooms, and the never-ending rhythm of 24-hour shifts. As doctors, we lived it all - the back-to-back patients, the emotional highs and lows, and the long hours spent in scrubs that never felt quite right.
            We knew what was missing.
            </p>
              <p className="mt-4 text-base md:text-lg lg:text-xl text-gray-500">
              Most medical apparel felt like an afterthought - uncomfortable fabrics, awkward fits, and zero personality. So we decided to do something about it.
              Steth is a brand crafted by doctors, for doctors - created with one clear mission: to craft high-quality medical apparel that actually works for the people who wear it every day.
              We obsess over details: the fit, the feel, and the function of the fabric that can live up to the prestige of the profession, every stitch designed to move with you, breathe with you, and support you through the longest shifts.
              But Steth is more than just clothing. 
            </p>
            <p className="mt-4 text-base md:text-lg lg:text-xl text-gray-500">
            It's a community. A shared belief that what you wear at work should empower you, not slow you down. We believe comfort and style aren't luxuries - they're essentials for those who give their all, every single day.
              We're proud to stand behind the professionals who show up, suit up, and never give up.
              Welcome to Steth. You deserve to feel your best while you give your best.
            </p>
          </div>
          <div className="mt-10 lg:mt-0">
            <img
              className="shadow-xl rounded-lg"
              src={Logo}
              alt="STETH medical wear"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

const CoreValues = () => {
  const valuesRef = useRef(null)

  useEffect(() => {
    if (!valuesRef.current) return

    gsap.context(() => {
      const elements = valuesRef.current.querySelectorAll(".value-item")
      
      // Set initial states
      gsap.set(valuesRef.current.querySelector(".values-title"), { y: 50, opacity: 0 })
      gsap.set(valuesRef.current.querySelector(".values-subtitle"), { y: 30, opacity: 0 })
      gsap.set(elements, { y: 50, opacity: 0 })

      // Create animations
      gsap.to(valuesRef.current.querySelector(".values-title"), {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: valuesRef.current,
          start: "top 80%",
        },
      })

      gsap.to(valuesRef.current.querySelector(".values-subtitle"), {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.2,
        scrollTrigger: {
          trigger: valuesRef.current,
          start: "top 80%",
        },
      })

      gsap.to(elements, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: valuesRef.current,
          start: "top 70%",
        },
      })
    }, valuesRef)

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const values = [
    {
      icon: "⚡",
      title: "Collaboration",
      description:
        "Collaboration is the process of two or more people or organizations working together to complete a task or achieve a goal.",
    },
    {
      icon: "🕒",
      title: "Transparency",
      description:
        "Transparency, as used in science is operating in such a way that it is easy for others to see what actions are performed.",
    },
    {
      icon: "↗️",
      title: "Trust",
      description:
        "Trust will help us foster a positive and productive environment that delivers value to our users and customers.",
    },
    {
      icon: "🔷",
      title: "Integrity",
      description:
        "Collaboration is the process of two or more people or organizations working together to complete a task or achieve a goal.",
    },
  ]

  return (
    <section ref={valuesRef} className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="values-title text-3xl md:text-4xl text-black lg:text-5xl font-bold text-center mb-3 md:mb-4">
          Our Core Values
        </h2>
        <p className="values-subtitle text-base md:text-lg lg:text-xl text-gray-600 text-center max-w-3xl mx-auto mb-12 md:mb-16 px-4">
          Our values shape the culture of our organization and define the character of our company.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto px-4">
          {values.map((value, index) => (
            <div key={index} className="value-item bg-gray-50 p-6 md:p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gray-200 flex items-center justify-center mb-4 md:mb-6 text-xl md:text-2xl">
                <span className="text-black text-2xl md:text-3xl">{value.icon}</span>
              </div>
              <h3 className="text-xl md:text-2xl lg:text-3xl text-black font-bold mb-2 md:mb-3">{value.title}</h3>
              <p className="text-gray-600 text-sm md:text-base lg:text-lg">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Completely revised Team section with simpler animation and updated image heights
const TeamSection = () => {
  const [activeIndex, setActiveIndex] = useState(null)
  const teamRef = useRef(null)

  // Team members data
  const teamMembers = [
    {
      name: "Wayne Romano",
      position: "Product Designer",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    },
    {
      name: "Sarah Johnson",
      position: "UX Designer",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    },
    {
      name: "Michael Chen",
      position: "Developer",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    },
    {
      name: "Emma Wilson",
      position: "Marketing Lead",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
    },
    {
      name: "Alex Parker",
      position: "Project Manager",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=761&q=80",
    },
  ]

  return (
    <section ref={teamRef} className="py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 mb-12 md:mb-16">
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl lg:text-5xl text-black font-bold leading-tight">
              Experience and integrity
              <br />
              by our team
            </h2>
          </div>
          <div className="md:w-1/2">
            <p className="text-base md:text-lg lg:text-xl text-gray-600">
              The right tools wielded by the right people to make anything possible. From year to year we strive to
              invent the most innovative technology produced by our creative people.
            </p>
          </div>
        </div>

        <div className="relative">
          {/* Decorative dots - top left */}
          <div className="absolute -top-10 -left-4 grid grid-cols-3 gap-2">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="w-1 h-1 bg-gray-400 rounded-full"></div>
            ))}
          </div>

          {/* Team grid - mobile view is vertical stack, desktop is horizontal row */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-2">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className={`relative overflow-hidden rounded-lg transition-all duration-300 h-[200px] sm:h-[400px] md:h-[400px] lg:h-[500px] ${
                  activeIndex === index ? "sm:flex-[1.8]" : activeIndex !== null ? "sm:flex-[0.7]" : "flex-1"
                }`}
                style={{ minWidth: "100px" }}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  crossOrigin="anonymous"
                />
                <div className="absolute bottom-6 left-6 z-20 text-white">
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold">{member.name}</h3>
                  <p className="text-sm md:text-base lg:text-lg text-white/80">{member.position}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Decorative dots - bottom right */}
          <div className="absolute -bottom-10 -right-4 grid grid-cols-3 gap-2">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="w-1 h-1 bg-gray-400 rounded-full"></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const Contact = () => {
  const contactRef = useRef(null)

  useEffect(() => {
    if (!contactRef.current) return

    gsap.context(() => {
      // Set initial states
      gsap.set(contactRef.current.querySelector("h2"), { y: 50, opacity: 0 })
      gsap.set(contactRef.current.querySelectorAll(".contact-info"), { y: 30, opacity: 0 })
      gsap.set(contactRef.current.querySelector("form"), { y: 50, opacity: 0 })

      // Create animations
      gsap.to(contactRef.current.querySelector("h2"), {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: contactRef.current,
          start: "top 80%",
        },
      })

      gsap.to(contactRef.current.querySelectorAll(".contact-info"), {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
          trigger: contactRef.current,
          start: "top 70%",
        },
      })

      gsap.to(contactRef.current.querySelector("form"), {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.3,
        scrollTrigger: {
          trigger: contactRef.current,
          start: "top 70%",
        },
      })
    }, contactRef)

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section ref={contactRef} className="py-16 bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900">Get in Touch</h2>
            <p className="mt-4 text-base md:text-lg lg:text-xl text-gray-500">
              Have questions about STETH medical wear? Contact our team for information on products, bulk orders, or
              custom designs.
            </p>

            <div className="mt-8 space-y-6">
              
              <div className="contact-info flex items-center">
                <Mail className="h-6 w-6 text-black" />
                <span className="ml-3 text-sm md:text-base lg:text-lg text-gray-500">contact@stethwear.com</span>
              </div>
              <div className="contact-info flex items-center">
                <Phone className="h-6 w-6 text-black" />
                <span className="ml-3 text-sm md:text-base lg:text-lg text-gray-500">+1 (800) 555-STETH</span>
              </div>
              
            </div>
          </div>

          <div className="mt-10 lg:mt-0">
            <div className="bg-white shadow-md p-6">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Send us a message</h3>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm md:text-base lg:text-lg font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="mt-1 block w-full border-gray-300 shadow-sm bg-white text-black focus:ring-black focus:border-black text-sm md:text-base p-2 border"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm md:text-base lg:text-lg font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="mt-1 block w-full border-gray-300 shadow-sm bg-white text-black focus:ring-black focus:border-black text-sm md:text-base p-2 border"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm md:text-base lg:text-lg font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    className="mt-1 block w-full border-gray-300 bg-white text-black shadow-sm focus:ring-black focus:border-black text-sm md:text-base p-2 border"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm md:text-base font-medium shadow-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                >
                  Send Message
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const CTA = () => {
  const ctaRef = useRef(null)

  useEffect(() => {
    if (!ctaRef.current) return

    gsap.context(() => {
      // Set initial states
      gsap.set(ctaRef.current.querySelector("h2"), { y: 30, opacity: 0 })
      gsap.set(ctaRef.current.querySelector("p"), { y: 20, opacity: 0 })
      gsap.set(ctaRef.current.querySelectorAll("a"), { y: 20, opacity: 0 })

      // Create animations
      gsap.to(ctaRef.current.querySelector("h2"), {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 80%",
        },
      })

      gsap.to(ctaRef.current.querySelector("p"), {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.2,
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 80%",
        },
      })

      gsap.to(ctaRef.current.querySelectorAll("a"), {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        delay: 0.4,
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 80%",
        },
      })
    }, ctaRef)

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section ref={ctaRef} className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-black shadow-xl overflow-hidden">
          <div className="px-6 py-12 sm:px-12 lg:py-16 lg:px-16">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white">Experience STETH Quality</h2>
                <p className="mt-4 text-base md:text-lg lg:text-xl text-gray-200">
                  Join thousands of healthcare professionals who trust STETH for comfortable, durable, and professional
                  medical wear.
                </p>
              </div>
              <div className="mt-8 lg:mt-0 lg:flex lg:justify-end">
                <div className="inline-flex shadow">
                  <a
                    href="/"
                    className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-sm md:text-base lg:text-lg font-medium text-black bg-white hover:bg-gray-100"
                  >
                    Shop Collection
                  </a>
                </div>
                <div className="lg:ml-3 md:ml-3 mt-2 sm:ml-0 inline-flex shadow">
                  <a
                    href="#"
                    className="inline-flex items-center justify-center  px-5 py-3 border border-transparent text-sm md:text-base lg:text-lg font-medium text-white bg-gray-900 hover:bg-black"
                  >
                    Request Catalog
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutUs