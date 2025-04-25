"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ArrowLeft, ArrowRight, Mail } from "lucide-react"
import { useNavigate } from "react-router-dom"
import Header from "../../components/Header"

const OTP = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [email, setEmail] = useState("j***@example.com") // Masked email
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [timeLeft, setTimeLeft] = useState(30)
  const [canResend, setCanResend] = useState(false)

  const containerRef = useRef(null)
  const titleRef = useRef(null)
  const descriptionRef = useRef(null)
  const inputRefs = useRef([])
  const buttonRef = useRef(null)
  const timerRef = useRef(null)
  const errorRef = useRef(null)

  const navigate = useNavigate()


  // Initialize animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main container animation
      gsap.fromTo(containerRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" })

      // Title and description
      gsap.fromTo(
        [titleRef.current, descriptionRef.current],
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, delay: 0.3, ease: "power2.out" },
      )

      // OTP inputs staggered animation
      gsap.fromTo(
        inputRefs.current,
        { opacity: 0, y: 10, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.08,
          delay: 0.5,
          ease: "back.out(1.7)",
        },
      )

      // Button animation
      gsap.fromTo(
        buttonRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, delay: 1, ease: "power2.out" },
      )

      // Timer animation
      gsap.fromTo(timerRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5, delay: 1.1, ease: "power2.out" })
    })

    return () => ctx.revert() // Cleanup
  }, [])

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else {
      setCanResend(true)
    }
  }, [timeLeft])

  // Error animation
  useEffect(() => {
    if (error && errorRef.current) {
      gsap.fromTo(errorRef.current, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.3 })
    }
  }, [error])

  const handleOtpChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return

    const newOtp = [...otp]

    // Allow pasting full OTP
    if (value.length > 1) {
      const pastedValues = value.split("").slice(0, 6)
      for (let i = 0; i < pastedValues.length; i++) {
        if (i + index < 6) {
          newOtp[i + index] = pastedValues[i]
        }
      }
      setOtp(newOtp)

      // Focus on the last field or the next empty field
      const nextIndex = Math.min(index + pastedValues.length, 5)
      inputRefs.current[nextIndex]?.focus()
      return
    }

    // Handle single digit input
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        // If current field is empty, focus previous field
        const newOtp = [...otp]
        newOtp[index - 1] = ""
        setOtp(newOtp)
        inputRefs.current[index - 1]?.focus()
      }
    }

    // Handle left arrow
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }

    // Handle right arrow
    if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Check if OTP is complete
    if (otp.some((digit) => digit === "")) {
      setError("Please enter the complete verification code")
      setIsLoading(false)
      return
    }

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)

      // For demo purposes, any 6-digit code is valid except 000000
      const otpString = otp.join("")
      if (otpString === "000000") {
        setError("Invalid verification code")

        // Shake animation for error
        gsap.to(inputRefs.current, {
          x: [-5, 5, -5, 5, 0],
          duration: 0.4,
          ease: "power2.inOut",
        })
        return
      }

      // Successful verification
      console.log("OTP verified:", otpString)

      // Redirect to password recovery page
      navigate("/password-recovery")
    }, 1500)
  }

  const handleResendOtp = () => {
    if (!canResend) return

    // Reset timer and disable resend button
    setTimeLeft(30)
    setCanResend(false)

    // Simulate sending new OTP
    console.log("Resending OTP...")

    // Success animation
    gsap.to(timerRef.current, {
      scale: 1.1,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
    })
  }

  const handleGoBack = () => {
    navigation.navigate("/login");
  }

  return (
    <div className="min-h-screen w-screen flex-col items-center justify-center bg-gray-50 ">
      <Header/>
      <div  className="flex items-center justify-center bg-gray-50 px-4 py-12">
      <div ref={containerRef} className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="p-6 sm:p-8 bg-black text-white">
          <button
            onClick={handleGoBack}
            className="mb-4 flex items-center text-sm text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to login
          </button>

          <h2 ref={titleRef} className="text-2xl font-bold">
            Verification code
          </h2>
          <p ref={descriptionRef} className="mt-2 text-gray-300 flex items-center">
            <Mail size={16} className="mr-2" />
            We sent a code to {email}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div ref={errorRef} className="mx-6 sm:mx-8 mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 sm:p-8">
          {/* OTP Input Fields */}
          <div className="flex justify-between mb-6">
            {otp.map((digit, index) => (
              <div key={index} className="w-12 h-14">
                <input
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength={6}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-full h-full text-center text-xl  bg-white text-black font-semibold border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                  autoFocus={index === 0}
                />
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <div ref={buttonRef}>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors duration-200"
            >
              {isLoading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <>
                  Verify
                  <ArrowRight size={16} className="ml-2" />
                </>
              )}
            </button>
          </div>

          {/* Resend Timer */}
          <div ref={timerRef} className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {canResend ? (
                <button type="button" onClick={handleResendOtp} className="font-medium text-black hover:text-gray-800">
                  Resend code
                </button>
              ) : (
                <>
                  Resend code in <span className="font-medium">{timeLeft}s</span>
                </>
              )}
            </p>
          </div>
        </form>
      </div>
      </div>
    </div>
  )
}

export default OTP
