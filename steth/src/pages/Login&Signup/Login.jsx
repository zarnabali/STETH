"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Eye, EyeOff, ArrowRight, Mail, Lock, X } from "lucide-react"
import { useNavigate } from "react-router-dom"
import Header from "../../components/Header"

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [googleLoading, setGoogleLoading] = useState(false)

  const formRef = useRef(null)
  const titleRef = useRef(null)
  const inputsRef = useRef([])
  const buttonRef = useRef(null)
  const dividerRef = useRef(null)
  const googleButtonRef = useRef(null)
  const switchModeRef = useRef(null)
  const errorRef = useRef(null)

  const navigate = useNavigate()

  // Load Google OAuth script
  useEffect(() => {
    const loadGoogleScript = () => {
      // Check if script is already loaded
      if (document.getElementById('google-oauth')) return;
      
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.id = "google-oauth";
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogleLogin;
      script.onerror = () => {
        console.error("Failed to load Google OAuth script");
        setError("Google Sign-In is currently unavailable");
      };
      
      document.body.appendChild(script);
    };

    loadGoogleScript();
    
    return () => {
      // Clean up - remove script when component unmounts
      const script = document.getElementById('google-oauth');
      if (script) script.remove();
    };
  }, []);

  const initializeGoogleLogin = () => {
    if (!window.google) {
      console.error("Google API not loaded");
      setError("Google API failed to load. Please try again later.");
      return;
    }
  
    try {
      window.google.accounts.id.initialize({
        client_id: "6304398994-dgvpsh05hj0qkngmu002kr2q5e0ch7dq.apps.googleusercontent.com",
        callback: handleGoogleResponse,
        auto_select: false,
        cancel_on_tap_outside: true,
        // Add your application's domain to the list of allowed origins
        ux_mode: 'popup',
      });
      
      // Render the button
      window.google.accounts.id.renderButton(
        document.getElementById("googleSignInDiv"), 
        { 
          type: "standard",
          theme: "outline",
          size: "large",
          text: "signin_with",
          shape: "rectangular",
          width: document.getElementById("googleSignInDiv").offsetWidth
        }
      );
      
      // Display the One Tap UI
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          console.log('One Tap UI not displayed', notification);
        }
      });
    } catch (error) {
      console.error("Failed to initialize Google Sign-In:", error);
      setError("Failed to initialize Google Sign-In. Please try again later.");
    }
  };

  // Handle the Google Sign-In response
  const handleGoogleResponse = async (response) => {
    try {
      setGoogleLoading(true);
      console.log("Google ID token:", response.credential);
      
      // Send the ID token to your backend for verification
      // Example of backend verification:
      // const result = await fetch('/api/auth/google', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ token: response.credential }),
      // });
      // const data = await result.json();
      
      // For now, simulate successful authentication
      setTimeout(() => {
        setGoogleLoading(false);
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      console.error("Google authentication error:", error);
      setGoogleLoading(false);
      setError("Failed to authenticate with Google. Please try again.");
    }
  };

  // Handle manual click on Google button (fallback)
  const handleGoogleButtonClick = () => {
    if (window.google && window.google.accounts && window.google.accounts.id) {
      window.google.accounts.id.prompt();
    } else {
      setError("Google Sign-In is not available. Please try again later or use email/password.");
    }
  };

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

      // Switch mode text
      gsap.fromTo(switchModeRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5, delay: 0.9, ease: "power2.out" })
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

      // Validation example
      if (!email.includes("@")) {
        setError("Please enter a valid email address")
        return
      }

      if (password.length < 6) {
        setError("Password must be at least 6 characters")
        return
      }

      // Create user object
      const userData = {
        email,
        password,
      }

      // Successful login would redirect
      console.log("Form submitted:", userData)
      navigate("/dashboard")
    }, 1500)
  }

  const handleForgotPassword = () => {
    if (!email) {
      setError("Please enter your email first")
      return
    }

    navigate("/otp")
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
    <div className="min-h-screen w-screen flex-col items-center justify-center bg-gray-50">
      <Header/>
      <div className="flex items-center justify-center bg-gray-50 px-4 py-12">
        <div ref={formRef} className="w-full max-w-md md:max-w-lg bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Form Header */}
          <div className="p-6 sm:p-8 bg-black text-white">
            <h2 ref={titleRef} className="text-2xl md:text-3xl font-bold">
              Welcome back
            </h2>
            <p className="mt-2 text-gray-300 text-sm md:text-base">
              Enter your credentials to access your account
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div
              ref={errorRef}
              className="mx-6 sm:mx-8 mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md flex items-center justify-between"
            >
              <span className="text-sm md:text-base bg-red-50">{error}</span>
              <button onClick={clearError} className="bg-red-50">
                <X size={16} className="bg-red-50" />
              </button>
            </div>
          )}

          {/* Form Body */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4 md:space-y-6">
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
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm md:text-base font-medium text-gray-700">
                  Password
                </label>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-xs md:text-sm font-medium text-black bg-white hover:text-gray-700"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-2 text-black md:py-3 text-sm md:text-base border bg-white border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
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
                    Sign in
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

            {/* Google Sign-In Button */}
            <div ref={googleButtonRef} className="space-y-2">
              {/* Google One Tap Sign-In */}
              <div 
                id="googleSignInDiv" 
                className="w-full"
                onClick={handleGoogleButtonClick}
              ></div>
              
              {/* Fallback Google Button */}
              {googleLoading && (
                <div className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white">
                  <svg
                    className="animate-spin h-5 w-5 text-gray-700 mr-2"
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
                  Signing in with Google...
                </div>
              )}
            </div>

            {/* Link to Signup */}
            <div ref={switchModeRef} className="mt-6 text-center">
              <p className="text-sm md:text-base text-gray-600">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/signup")}
                  className="font-medium text-black hover:text-gray-800 bg-white"
                >
                  Sign up
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login