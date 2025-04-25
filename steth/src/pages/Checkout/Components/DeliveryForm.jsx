"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, Search } from "lucide-react"
import PhoneInput from "./PhoneInput.jsx"

const countries = [
  { name: "United States", code: "US", flag: "🇺🇸" },
  { name: "Pakistan", code: "PK", flag: "🇵🇰" },
  { name: "United Kingdom", code: "GB", flag: "🇬🇧" },
  { name: "Canada", code: "CA", flag: "🇨🇦" },
  { name: "Australia", code: "AU", flag: "🇦🇺" },
  { name: "India", code: "IN", flag: "🇮🇳" },
  { name: "China", code: "CN", flag: "🇨🇳" },
  { name: "Germany", code: "DE", flag: "🇩🇪" },
  { name: "France", code: "FR", flag: "🇫🇷" },
  { name: "United Arab Emirates", code: "AE", flag: "🇦🇪" },
  { name: "Saudi Arabia", code: "SA", flag: "🇸🇦" },
  { name: "Japan", code: "JP", flag: "🇯🇵" },
  { name: "South Korea", code: "KR", flag: "🇰🇷" },
  { name: "Brazil", code: "BR", flag: "🇧🇷" },
  { name: "Mexico", code: "MX", flag: "🇲🇽" },
]

// State options by country
const statesByCountry = {
  US: [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware",
    "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
    "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi",
    "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico",
    "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania",
    "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
    "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming",
  ],
  CA: [
    "Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador", 
    "Northwest Territories", "Nova Scotia", "Nunavut", "Ontario", "Prince Edward Island", 
    "Quebec", "Saskatchewan", "Yukon"
  ],
  GB: [
    "England", "Scotland", "Wales", "Northern Ireland"
  ],
  AU: [
    "New South Wales", "Queensland", "South Australia", "Tasmania", "Victoria", 
    "Western Australia", "Australian Capital Territory", "Northern Territory"
  ],
  IN: [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", 
    "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", 
    "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", 
    "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ],
  PK: [
   "KPK", "Islamabad", "Punjab", "Balochistan", "Sindh"
  ],
  // Add more countries as needed
}

const DeliveryForm = ({ data = {}, onChange = () => {} }) => {
  // Extract the relevant parts from the data prop based on your checkoutDetails structure
  const extractDeliveryInfo = () => {
    if (!data || !data.customerInfo || !data.customerInfo.deliveryInfo) {
      return {}
    }
    return data.customerInfo.deliveryInfo
  }
  
  const extractPhoneNumber = () => {
    if (!data || !data.customerInfo) {
      return ""
    }
    return data.customerInfo.phoneNumber || ""
  }
  
  // Initialize form data with defaults
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    country: null,
    ...extractDeliveryInfo()
  })
  
  const [phoneNumber, setPhoneNumber] = useState(extractPhoneNumber())

  // Validation state
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zipCode: "",
    country: "",
    phone: ""
  })

  const [showCountryDropdown, setShowCountryDropdown] = useState(false)
  const [showStateDropdown, setShowStateDropdown] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  
  const countryDropdownRef = useRef(null)
  const countryButtonRef = useRef(null)
  const stateDropdownRef = useRef(null)
  const stateButtonRef = useRef(null)

  // Update local state when props change
  useEffect(() => {
    const deliveryInfo = extractDeliveryInfo()
    if (Object.keys(deliveryInfo).length > 0) {
      setFormData(prevData => ({
        ...prevData,
        ...deliveryInfo
      }))
    }
    
    const phone = extractPhoneNumber()
    if (phone) {
      setPhoneNumber(phone)
    }
  }, [data])

  const validateField = (field, value) => {
    let errorMessage = ""
    
    switch (field) {
      case 'firstName':
        if (!value.trim()) errorMessage = "First name is required"
        break
      case 'lastName':
        if (!value.trim()) errorMessage = "Last name is required"
        break
      case 'address':
        if (!value.trim()) errorMessage = "Address is required"
        break
      case 'city':
        if (!value.trim()) errorMessage = "City is required"
        break
      case 'zipCode':
        if (!value.trim()) {
          errorMessage = "ZIP code is required"
        } else {
          // Different validation based on country
          if (formData.country?.code === "US" && !/^\d{5}(-\d{4})?$/.test(value)) {
            errorMessage = "Invalid US ZIP code"
          } else if (formData.country?.code === "GB" && !/^[A-Z]{1,2}\d[A-Z\d]? \d[A-Z]{2}$/i.test(value)) {
            errorMessage = "Invalid UK postal code"
          } else if (formData.country?.code === "CA" && !/^[A-Z]\d[A-Z] \d[A-Z]\d$/i.test(value)) {
            errorMessage = "Invalid Canadian postal code"
          }
        }
        break
      case 'country':
        if (!value) errorMessage = "Country is required"
        break
    }
    
    setErrors(prev => ({
      ...prev,
      [field]: errorMessage
    }))
    
    return errorMessage === ""
  }

  const updateFormData = (field, value) => {
    let updatedData

    if (field === 'country') {
      updatedData = {
        ...formData,
        country: value,
        state: "" // Reset state when country changes
      }
    } else {
      updatedData = {
        ...formData,
        [field]: value
      }
    }

    // Validate the field
    validateField(field, value)

    // Update local state
    setFormData(updatedData)
    
    // Notify parent with properly structured data
    notifyParent(updatedData, phoneNumber)
  }

  const handlePhoneChange = (newPhoneNumber) => {
    setPhoneNumber(newPhoneNumber)
    notifyParent(formData, newPhoneNumber)
  }
  
  // Structure the data in the format expected by the parent component
  const notifyParent = (deliveryData, phone) => {
    const updatedData = {
      customerInfo: {
        ...data.customerInfo,
        deliveryInfo: {
          firstName: deliveryData.firstName,
          lastName: deliveryData.lastName,
          address: deliveryData.address,
          apartment: deliveryData.apartment,
          city: deliveryData.city,
          state: deliveryData.state,
          zipCode: deliveryData.zipCode,
          country: deliveryData.country,
          company: deliveryData.company
        },
        phoneNumber: phone
      }
    }
    
    onChange(updatedData)
  }

  const selectCountry = (country) => {
    updateFormData('country', country)
    setShowCountryDropdown(false)
    setSearchTerm("")
  }

  const selectState = (state) => {
    updateFormData('state', state)
    setShowStateDropdown(false)
  }

  // Get available states for the selected country
  const getAvailableStates = () => {
    if (formData.country && formData.country.code) {
      return statesByCountry[formData.country.code] || []
    }
    return []
  }

  // Filter countries based on search term
  const filteredCountries = searchTerm.length > 0
    ? countries.filter(country => 
        country.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : countries

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close country dropdown when clicking outside
      if (
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(event.target) &&
        countryButtonRef.current &&
        !countryButtonRef.current.contains(event.target)
      ) {
        setShowCountryDropdown(false)
      }

      // Close state dropdown when clicking outside
      if (
        stateDropdownRef.current &&
        !stateDropdownRef.current.contains(event.target) &&
        stateButtonRef.current &&
        !stateButtonRef.current.contains(event.target)
      ) {
        setShowStateDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="space-y-4">
      {/* Country Dropdown */}
      <div className="relative">
        <button
          ref={countryButtonRef}
          type="button"
          className={`w-full bg-white border ${errors.country ? 'border-red-500' : 'border-gray-300'} rounded overflow-hidden flex items-center justify-between px-3 py-3`}
          onClick={() => setShowCountryDropdown(!showCountryDropdown)}
        >
          <div className="flex items-center">
            <span className="mr-2">{formData.country?.flag || "🌍"}</span>
            <span className="text-sm md:text-base text-gray-700">
              {formData.country?.name || "Select Country"}
            </span>
          </div>
          <ChevronDown size={18} className="text-gray-500" />
        </button>
        {errors.country && <div className="text-red-500 text-xs mt-1">{errors.country}</div>}

        {showCountryDropdown && (
          <div
            ref={countryDropdownRef}
            className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-y-auto"
          >
            <div className="p-2 sticky top-0 bg-white border-b border-gray-200">
              <input
                type="text"
                placeholder="Search countries..."
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            <div>
              {filteredCountries.map((country) => (
                <div
                  key={country.code}
                  className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100 bg-white text-sm md:text-base cursor-pointer"
                  onClick={() => selectCountry(country)}
                >
                  <span className="mr-2">{country.flag}</span>
                  <span>{country.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Name fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className={`border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded overflow-hidden`}>
            <input 
              type="text" 
              placeholder="First name" 
              className="w-full px-3 py-3 outline-none bg-white text-sm md:text-base"
              value={formData.firstName}
              onChange={(e) => updateFormData('firstName', e.target.value)}
              onBlur={(e) => validateField('firstName', e.target.value)}
            />
          </div>
          {errors.firstName && <div className="text-red-500 text-xs mt-1">{errors.firstName}</div>}
        </div>
        <div>
          <div className={`border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded overflow-hidden`}>
            <input 
              type="text" 
              placeholder="Last name" 
              className="w-full px-3 py-3 outline-none bg-white text-sm md:text-base"
              value={formData.lastName}
              onChange={(e) => updateFormData('lastName', e.target.value)}
              onBlur={(e) => validateField('lastName', e.target.value)}
            />
          </div>
          {errors.lastName && <div className="text-red-500 text-xs mt-1">{errors.lastName}</div>}
        </div>
      </div>

      {/* Company */}
      <div className="border border-gray-300 rounded overflow-hidden">
        <input 
          type="text" 
          placeholder="Company (optional)" 
          className="w-full px-3 py-3 outline-none bg-white text-sm md:text-base"
          value={formData.company}
          onChange={(e) => updateFormData('company', e.target.value)}
        />
      </div>

      {/* Address */}
      <div>
        <div className={`relative border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded overflow-hidden flex items-center`}>
          <input 
            type="text" 
            placeholder="Address" 
            className="w-full px-3 py-3 outline-none bg-white text-sm md:text-base"
            value={formData.address}
            onChange={(e) => updateFormData('address', e.target.value)}
            onBlur={(e) => validateField('address', e.target.value)}
          />
          <div className="pr-3">
            <Search size={18} className="text-gray-500" />
          </div>
        </div>
        {errors.address && <div className="text-red-500 text-xs mt-1">{errors.address}</div>}
      </div>

      {/* Apartment */}
      <div className="border border-gray-300 rounded overflow-hidden">
        <input 
          type="text" 
          placeholder="Apartment, suite, etc. (optional)" 
          className="w-full px-3 py-3 outline-none bg-white text-sm md:text-base"
          value={formData.apartment}
          onChange={(e) => updateFormData('apartment', e.target.value)}
        />
      </div>

      {/* City, State, Zip */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <div className={`border ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded overflow-hidden`}>
            <input 
              type="text" 
              placeholder="City" 
              className="w-full px-3 py-3 outline-none bg-white text-sm md:text-base"
              value={formData.city}
              onChange={(e) => updateFormData('city', e.target.value)}
              onBlur={(e) => validateField('city', e.target.value)}
            />
          </div>
          {errors.city && <div className="text-red-500 text-xs mt-1">{errors.city}</div>}
        </div>

        {/* State Dropdown */}
        <div className="relative">
          <button
            ref={stateButtonRef}
            type="button"
            className="w-full bg-white border border-gray-300 rounded overflow-hidden flex items-center justify-between px-3 py-3"
            onClick={() => formData.country?.code && getAvailableStates().length > 0 && setShowStateDropdown(!showStateDropdown)}
            disabled={!formData.country?.code || getAvailableStates().length === 0}
          >
            <span className="text-sm md:text-base text-gray-700 truncate">
              {formData.state || "State/Province"}
            </span>
            <ChevronDown size={18} className="text-gray-500" />
          </button>

          {showStateDropdown && getAvailableStates().length > 0 && (
            <div
              ref={stateDropdownRef}
              className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-y-auto"
            >
              {getAvailableStates().map((state) => (
                <div
                  key={state}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 bg-white text-sm md:text-base cursor-pointer"
                  onClick={() => selectState(state)}
                >
                  {state}
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className={`border ${errors.zipCode ? 'border-red-500' : 'border-gray-300'} rounded overflow-hidden`}>
            <input 
              type="text" 
              placeholder="ZIP code" 
              className="w-full px-3 py-3 outline-none bg-white text-sm md:text-base"
              value={formData.zipCode}
              onChange={(e) => updateFormData('zipCode', e.target.value)}
              onBlur={(e) => validateField('zipCode', e.target.value)}
            />
          </div>
          {errors.zipCode && <div className="text-red-500 text-xs mt-1">{errors.zipCode}</div>}
        </div>
      </div>

      {/* Phone Input */}
      <div className="rounded overflow-hidden bg-white">
        <PhoneInput 
          value={phoneNumber}
          onChange={handlePhoneChange}
        />
      </div>

      {/* SMS offer checkbox */}
      <div className="flex items-center gap-2">
        <input 
          type="checkbox" 
          id="sms" 
          checked={data?.customerInfo?.smsConsent || false}
          onChange={(e) => {
            const updatedData = {
              customerInfo: {
                ...data.customerInfo,
                smsConsent: e.target.checked
              }
            }
            onChange(updatedData)
          }}
        />
        <label htmlFor="sms" className="text-sm md:text-base">
          Text me with news and offers
        </label>
      </div>
    </div>
  )
}

export default DeliveryForm