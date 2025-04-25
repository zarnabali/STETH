"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ArrowLeft, ArrowRight, Eye, EyeOff, Check, X, AlertCircle } from "lucide-react"
import { useNavigate } from "react-router-dom"
import Header from "../../components/Header"

const PasswordRecovery = () => {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  const containerRef = useRef(null)
  const titleRef = useRef(null)
  const descriptionRef = useRef(null)
  const formRef = useRef(null)
  const buttonRef = useRef(null)
  const errorRef = useRef(null)
  const strengthBarRef = useRef(null)
  const strengthTextRef = useRef(null)

  const navigate = useNavigate()

  // Check for mobile view
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkDevice()

    // Add event listener for resize
    window.addEventListener('resize', checkDevice)

    // Cleanup
    return () => {
      window.removeEventListener('resize', checkDevice)
    }
  }, [])

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

      // Form elements
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, delay: 0.5, ease: "power2.out" },
      )

      // Button animation
      gsap.fromTo(
        buttonRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, delay: 0.7, ease: "power2.out" },
      )
    })

    return () => ctx.revert() // Cleanup
  }, [])

  // Password strength checker
  useEffect(() => {
    // Simple password strength calculation
    let strength = 0

    if (password.length > 0) {
      // Length check
      strength += password.length >= 8 ? 1 : 0

      // Complexity checks
      strength += /[A-Z]/.test(password) ? 1 : 0 // Has uppercase
      strength += /[a-z]/.test(password) ? 1 : 0 // Has lowercase
      strength += /[0-9]/.test(password) ? 1 : 0 // Has number
      strength += /[^A-Za-z0-9]/.test(password) ? 1 : 0 // Has special char
    }

    setPasswordStrength(strength)

    // Animate strength bar
    if (strengthBarRef.current) {
      const percentage = (strength / 5) * 100
      gsap.to(strengthBarRef.current, {
        width: `${percentage}%`,
        duration: 0.5,
        ease: "power2.out",
      })

      // Change color based on strength
      let color = "bg-red-500"
      if (strength >= 4) color = "bg-green-500"
      else if (strength >= 3) color = "bg-yellow-500"
      else if (strength >= 2) color = "bg-orange-500"

      strengthBarRef.current.className = `h-full ${color} transition-all duration-300`
    }
  }, [password])

  // Error animation
  useEffect(() => {
    if (error && errorRef.current) {
      gsap.fromTo(errorRef.current, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.3 })
    }
  }, [error])

  const getStrengthText = () => {
    if (password.length === 0) return ""
    if (passwordStrength >= 4) return "Strong"
    if (passwordStrength >= 3) return "Good"
    if (passwordStrength >= 2) return "Fair"
    return "Weak"
  }

  const getStrengthColor = () => {
    if (password.length === 0) return "text-gray-400"
    if (passwordStrength >= 4) return "text-green-500"
    if (passwordStrength >= 3) return "text-yellow-500"
    if (passwordStrength >= 2) return "text-orange-500"
    return "text-red-500"
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Validation
    if (password.length < 8) {
      setError("Password must be at least 8 characters long")
      setIsLoading(false)
      return
    }

    if (passwordStrength < 3) {
      setError("Please choose a stronger password")
      setIsLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)

      // Success animation before redirect
      gsap.to(containerRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          // Redirect to login page
          navigate("/login")
        },
      })
    }, 1500)
  }

  const handleGoBack = () => {
    navigate('/otp')
  }

  return (
    <div className="min-h-screen w-screen flex-col items-center justify-center bg-gray-50">
      <Header />
      
      <div className="flex items-center justify-center bg-gray-50 px-4 py-12">
        <div 
          ref={containerRef} 
          className={`w-full ${isMobile ? 'max-w-sm' : 'max-w-md'} bg-white rounded-lg shadow-lg overflow-hidden`}
        >
          {/* Header */}
          <div className={`p-4 sm:p-6 md:p-8 bg-black text-white`}>
            <button
              onClick={handleGoBack}
              className={`mb-2 md:mb-4 flex items-center ${isMobile ? 'text-xs' : 'text-sm'} text-gray-300 hover:text-white transition-colors`}
            >
              <ArrowLeft size={isMobile ? 14 : 16} className="mr-1" />
              Back to verification
            </button>

            <h2 
              ref={titleRef} 
              className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold`}
            >
              Reset password
            </h2>
            <p 
              ref={descriptionRef} 
              className={`mt-1 md:mt-2 ${isMobile ? 'text-sm' : 'text-base'} text-gray-300`}
            >
              Create a new password for your account
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div
              ref={errorRef}
              className={`mx-4 sm:mx-6 md:mx-8 mt-3 md:mt-4 p-2 md:p-3 bg-red-50 border border-red-200 text-red-700 rounded-md flex items-center ${isMobile ? 'text-xs' : 'text-sm'}`}
            >
              <AlertCircle size={isMobile ? 14 : 16} className="mr-2 flex-shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-4 sm:p-6 md:p-8">
            <div ref={formRef} className="space-y-3 md:space-y-4">
              {/* New Password Field */}
              <div className="space-y-1">
                <label 
                  htmlFor="password" 
                  className={`block ${isMobile ? 'text-xs' : 'text-sm'} font-medium text-gray-700`}
                >
                  New Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`block w-full pr-10 py-2 px-3 border bg-white text-black border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black ${isMobile ? 'text-xs' : 'text-sm'}`}
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center mr-2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff size={isMobile ? 16 : 18} className="text-gray-400 hover:text-gray-500" />
                    ) : (
                      <Eye size={isMobile ? 16 : 18} className="text-gray-400 hover:text-gray-500" />
                    )}
                  </button>
                </div>

                {/* Password Strength Indicator */}
                <div className="mt-2">
                  <div className="flex justify-between items-center mb-1">
                    <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-500`}>Password strength</div>
                    <div 
                      ref={strengthTextRef} 
                      className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium ${getStrengthColor()}`}
                    >
                      {getStrengthText()}
                    </div>
                  </div>
                  <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div ref={strengthBarRef} className="h-full bg-gray-400" style={{ width: "0%" }}></div>
                  </div>
                </div>

                {/* Password Requirements */}
                <ul className="mt-2 space-y-1">
                  <li className={`flex items-center ${isMobile ? 'text-xs' : 'text-sm'} text-gray-500`}>
                    {password.length >= 8 ? (
                      <Check size={isMobile ? 10 : 12} className="mr-1 text-green-500" />
                    ) : (
                      <X size={isMobile ? 10 : 12} className="mr-1 text-gray-400" />
                    )}
                    <span className={isMobile ? "text-xs" : "text-sm"}>At least 8 characters</span>
                  </li>
                  <li className={`flex items-center ${isMobile ? 'text-xs' : 'text-sm'} text-gray-500`}>
                    {/[A-Z]/.test(password) ? (
                      <Check size={isMobile ? 10 : 12} className="mr-1 text-green-500" />
                    ) : (
                      <X size={isMobile ? 10 : 12} className="mr-1 text-gray-400" />
                    )}
                    <span className={isMobile ? "text-xs" : "text-sm"}>At least one uppercase letter</span>
                  </li>
                  <li className={`flex items-center ${isMobile ? 'text-xs' : 'text-sm'} text-gray-500`}>
                    {/[0-9]/.test(password) ? (
                      <Check size={isMobile ? 10 : 12} className="mr-1 text-green-500" />
                    ) : (
                      <X size={isMobile ? 10 : 12} className="mr-1 text-gray-400" />
                    )}
                    <span className={isMobile ? "text-xs" : "text-sm"}>At least one number</span>
                  </li>
                  <li className={`flex items-center ${isMobile ? 'text-xs' : 'text-sm'} text-gray-500`}>
                    {/[^A-Za-z0-9]/.test(password) ? (
                      <Check size={isMobile ? 10 : 12} className="mr-1 text-green-500" />
                    ) : (
                      <X size={isMobile ? 10 : 12} className="mr-1 text-gray-400" />
                    )}
                    <span className={isMobile ? "text-xs" : "text-sm"}>At least one special character</span>
                  </li>
                </ul>
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-1">
                <label 
                  htmlFor="confirmPassword" 
                  className={`block ${isMobile ? 'text-xs' : 'text-sm'} font-medium text-gray-700`}
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`block w-full pr-10 py-2 px-3 border bg-white text-black ${
                      confirmPassword && password !== confirmPassword
                        ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 focus:ring-black focus:border-black"
                    } rounded-md shadow-sm ${isMobile ? 'text-xs' : 'text-sm'}`}
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center mr-2"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={isMobile ? 16 : 18} className="text-gray-400 hover:text-gray-500" />
                    ) : (
                      <Eye size={isMobile ? 16 : 18} className="text-gray-400 hover:text-gray-500" />
                    )}
                  </button>
                </div>
                {confirmPassword && password !== confirmPassword && (
                  <p className={`mt-1 ${isMobile ? 'text-xs' : 'text-sm'} text-red-600`}>Passwords do not match</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div ref={buttonRef} className="mt-4 md:mt-6">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm ${isMobile ? 'text-xs' : 'text-sm'} font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors duration-200`}
              >
                {isLoading ? (
                  <svg
                    className={`animate-spin ${isMobile ? 'h-4 w-4' : 'h-5 w-5'} text-white`}
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
                    Reset password
                    <ArrowRight size={isMobile ? 14 : 16} className="ml-2" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default PasswordRecovery