"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, Info } from "lucide-react"

const countryCodes = [
  { code: "+1", country: "US", flag: "🇺🇸" },
  { code: "+92", country: "PK", flag: "🇵🇰" },
  { code: "+44", country: "UK", flag: "🇬🇧" },
  { code: "+1", country: "CA", flag: "🇨🇦" },
  { code: "+61", country: "AU", flag: "🇦🇺" },
  { code: "+91", country: "IN", flag: "🇮🇳" },
  { code: "+86", country: "CN", flag: "🇨🇳" },
  { code: "+49", country: "DE", flag: "🇩🇪" },
  { code: "+33", country: "FR", flag: "🇫🇷" },
  { code: "+971", country: "AE", flag: "🇦🇪" },
  { code: "+966", country: "SA", flag: "🇸🇦" },
  { code: "+81", country: "JP", flag: "🇯🇵" },
  { code: "+82", country: "KR", flag: "🇰🇷" },
  { code: "+55", country: "BR", flag: "🇧🇷" },
  { code: "+52", country: "MX", flag: "🇲🇽" },
  { code: "+27", country: "ZA", flag: "🇿🇦" },
  { code: "+7", country: "RU", flag: "🇷🇺" },
  { code: "+39", country: "IT", flag: "🇮🇹" },
  { code: "+34", country: "ES", flag: "🇪🇸" },
  { code: "+31", country: "NL", flag: "🇳🇱" },
]

const PhoneInput = ({ value = "", onChange = () => {} }) => {
  // Find default country code from value string or use Pakistan as default
  const defaultCountry = countryCodes.find((c) => c.code === "+92") || countryCodes[1]
  
  const [selectedCountry, setSelectedCountry] = useState(defaultCountry)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [error, setError] = useState("")
  const dropdownRef = useRef(null)
  const triggerRef = useRef(null)
  
  // Skip first render flag
  const isFirstRender = useRef(true)

  // Parse incoming value on mount
  useEffect(() => {
    if (value) {
      // Try to extract country code and number
      for (const country of countryCodes) {
        if (value.startsWith(country.code)) {
          setSelectedCountry(country)
          setPhoneNumber(value.substring(country.code.length).trim())
          break
        }
      }
    }
  }, [])

  // Handle changes in the internal state and notify parent only when values actually change
  useEffect(() => {
    // Skip the first render to avoid unnecessary updates
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    
    // Construct full phone number with country code
    const fullNumber = `${selectedCountry.code} ${phoneNumber}`.trim()
    
    // Only call onChange when the constructed value is different
    if (fullNumber !== value) {
      onChange(fullNumber)
    }
  }, [selectedCountry, phoneNumber])

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const selectCountry = (country) => {
    setSelectedCountry(country)
    setIsOpen(false)
    validatePhoneNumber(phoneNumber)
  }

  const handlePhoneChange = (e) => {
    const value = e.target.value
    // Only allow numbers, spaces, dashes, and parentheses
    const sanitizedValue = value.replace(/[^\d\s\-()]/g, '')
    setPhoneNumber(sanitizedValue)
    validatePhoneNumber(sanitizedValue)
  }

  const validatePhoneNumber = (number) => {
    if (!number.trim()) {
      setError("Phone number is required")
      return false
    }
    
    // Basic validation based on country code
    let isValid = true
    let errorMessage = ""
    
    switch(selectedCountry.code) {
      case "+1": // US/Canada
        isValid = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/.test(number.replace(/\s/g, ''))
        errorMessage = "US/Canada numbers should be 10 digits"
        break
      case "+44": // UK
        isValid = /^(\(?\d{1,5}\)?[-.\s]?){1,4}\d{4}$/.test(number.replace(/\s/g, ''))
        errorMessage = "Invalid UK number format"
        break
      case "+92": // Pakistan
        isValid = /^\d{10}$/.test(number.replace(/\D/g, ''))
        errorMessage = "Pakistan mobile numbers should be 10 digits"
        break
      default:
        // Generic validation - at least 5 digits
        isValid = number.replace(/\D/g, '').length >= 5
        errorMessage = "Phone number should have at least 5 digits"
    }
    
    setError(isValid ? "" : errorMessage)
    return isValid
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(event.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative w-full">
      <div className={`flex border-gray-300 rounded overflow-hidden ${error ? "border-red-500" : ""}`}>
        {/* Country Code Selector */}
        <div className="relative">
          <button
            ref={triggerRef}
            type="button"
            onClick={toggleDropdown}
            className="flex items-center h-full px-3 py-3 border-r border-gray-300 bg-gray-50 min-w-[100px] justify-between"
          >
            <div className="flex items-center">
              <span className="mr-1">{selectedCountry.flag}</span>
              <span className="text-sm">{selectedCountry.code}</span>
            </div>
            <ChevronDown
              size={16}
              className={`ml-1 text-gray-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            />
          </button>

          {/* Dropdown with fixed positioning to ensure it appears on top */}
          {isOpen && (
            <div
              ref={dropdownRef}
              className="absolute left-0 z-50 w-64 mt-1 bg-white border border-gray-300 rounded shadow-lg"
              style={{
                top: "100%", // Position directly below the button
                maxHeight: "300px",
                overflowY: "auto",
                zIndex: 9999, // Very high z-index to ensure it's on top
              }}
            >
              <div className="max-h-60 overflow-y-auto">
                {countryCodes.map((country, index) => (
                  <button
                    key={`${country.country}-${country.code}-${index}`}
                    type="button"
                    className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100"
                    onClick={() => selectCountry(country)}
                  >
                    <span className="mr-2">{country.flag}</span>
                    <span className="text-sm font-medium">{country.code}</span>
                    <span className="text-xs text-gray-500 ml-2">{country.country}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Phone Number Input */}
        <input
          type="tel"
          placeholder="Phone number"
          className="flex-1 px-3 py-3 outline-none bg-white"
          value={phoneNumber}
          onChange={handlePhoneChange}
        />

        {/* Info Icon */}
        <div className="px-3 flex items-center">
          <Info size={18} className="text-gray-500" />
        </div>
      </div>
      
      {/* Error message */}
      {error && (
        <div className="text-red-500 text-xs mt-1">{error}</div>
      )}
    </div>
  )
}

export default PhoneInput