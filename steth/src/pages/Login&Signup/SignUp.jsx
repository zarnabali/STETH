"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Eye, EyeOff, ArrowRight, Mail, Lock, User, X, UserRound } from "lucide-react"
import { useNavigate } from "react-router-dom"
import Header from "../../components/Header"

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const formRef = useRef(null)
  const titleRef = useRef(null)
  const inputsRef = useRef([])
  const buttonRef = useRef(null)
  const dividerRef = useRef(null)
  const googleButtonRef = useRef(null)
  const errorRef = useRef(null)

  const navigate = useNavigate()

  // Initialize animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial animation
      gsap.fromTo(formRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" })

      // Staggered animation for inputs
      gsap.fromTo(
        inputsRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, delay: 0.3, ease: "power2.out" },
      )

      // Button animation
      gsap.fromTo(
        buttonRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, delay: 0.6, ease: "power2.out" },
      )

      // Divider and Google button
      gsap.fromTo(
        [dividerRef.current, googleButtonRef.current],
        { opacity: 0 },
        { opacity: 1, duration: 0.5, delay: 0.7, stagger: 0.1, ease: "power2.out" },
      )
    })

    return () => ctx.revert() // Cleanup
  }, [])

  // Error animation
  useEffect(() => {
    if (error && errorRef.current) {
      gsap.fromTo(errorRef.current, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.3 })
    }
  }, [error])

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)

      // Validation
      if (!email.includes("@")) {
        setError("Please enter a valid email address")
        return
      }

      if (password.length < 6) {
        setError("Password must be at least 6 characters")
        return
      }

      if (password !== confirmPassword) {
        setError("Passwords don't match")
        return
      }

      // Create user object
      const userData = {
        username,
        email,
        password,
      }

      // Successful signup would redirect
      console.log("Form submitted:", userData)
      navigate("/login")
    }, 1500)
  }

  const handleGoogleLogin = () => {
    setIsLoading(true)

    // Simulate Google login
    setTimeout(() => {
      setIsLoading(false)
      console.log("Google signup initiated")
    }, 1000)
  }

  const addToInputsRef = (el) => {
    if (el && !inputsRef.current.includes(el)) {
      inputsRef.current.push(el)
    }
  }

  const clearError = () => {
    if (error) {
      gsap.to(errorRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.3,
        onComplete: () => setError(""),
      })
    }
  }

  return (
    <div className="min-h-screen w-screen flex-col items-center justify-center bg-gray-50 ">
         <Header/>
         <div className="flex items-center justify-center bg-gray-50 px-4 py-12">
      <div ref={formRef} className="w-full max-w-md md:max-w-lg bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Form Header */}
        <div className="p-6 sm:p-8 bg-black text-white">
          <h2 ref={titleRef} className="text-2xl md:text-3xl font-bold">
            Create an account
          </h2>
          <p className="mt-2 text-gray-300 text-sm md:text-base">
            Fill in the form to get started with our platform
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div
            ref={errorRef}
            className="mx-6 sm:mx-8 mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md flex items-center justify-between"
          >
            <span className="text-sm md:text-base">{error}</span>
            <button onClick={clearError}>
              <X size={16} />
            </button>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4 md:space-y-6">
          {/* Username Field */}
          <div ref={addToInputsRef} className="space-y-1">
            <label htmlFor="username" className="block text-sm md:text-base font-medium text-gray-700">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User size={18} className="text-gray-400" />
              </div>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 md:py-3 text-sm md:text-base border bg-white border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                placeholder="johndoe"
                required
              />
            </div>
          </div>

          {/* Email Field */}
          <div ref={addToInputsRef} className="space-y-1">
            <label htmlFor="email" className="block text-sm md:text-base font-medium text-gray-700">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail size={18} className="text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 md:py-3 text-sm md:text-base border border-gray-300 bg-white rounded-md shadow-sm focus:ring-black focus:border-black"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div ref={addToInputsRef} className="space-y-1">
            <label htmlFor="password" className="block text-sm md:text-base font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={18} className="text-gray-400" />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-10 py-2 md:py-3 text-black text-sm md:text-base border bg-white border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff size={18} className="text-gray-400 hover:text-gray-500" />
                ) : (
                  <Eye size={18} className="text-gray-400 hover:text-gray-500" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div ref={addToInputsRef} className="space-y-1">
            <label htmlFor="confirmPassword" className="block text-sm md:text-base font-medium text-gray-700">
              Confirm Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={18} className="text-gray-400" />
              </div>
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="block w-full pl-10 pr-10 py-2 md:py-3 text-black text-sm md:text-base border bg-white border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff size={18} className="text-gray-400 hover:text-gray-500" />
                ) : (
                  <Eye size={18} className="text-gray-400 hover:text-gray-500" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div ref={buttonRef}>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center py-2 md:py-3 px-4 border border-transparent rounded-md shadow-sm text-sm md:text-base font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors duration-200"
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
                  Create account
                  <ArrowRight size={16} className="ml-2" />
                </>
              )}
            </button>
          </div>

          {/* Divider */}
          <div ref={dividerRef} className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm md:text-base">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* Google Login Button */}
          <div ref={googleButtonRef}>
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex justify-center items-center py-2 md:py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm md:text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors duration-200"
            >
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </button>
          </div>
        </form>

        {/* Link to Login */}
        <div className="px-6 sm:px-8 pb-6 sm:pb-8 text-center">
          <p className="text-sm md:text-base text-gray-600">
            Already have an account?
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="ml-1 font-medium text-black hover:text-gray-800 bg-white"
            >
              Sign in
            </button>
          </p>
        </div>
        </div>
      </div>
    </div>
    
  )
}

export default Signup