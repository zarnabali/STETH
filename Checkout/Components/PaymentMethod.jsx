"use client"

import { useState, useRef, useEffect } from "react"
import { Lock, Info, Upload } from "lucide-react"
import { gsap } from "gsap"

const PaymentMethod = ({ data = {}, onChange }) => {
  const [selectedMethod, setSelectedMethod] = useState(data?.method || "")
  const methodDetailsRef = useRef(null)
  const [formData, setFormData] = useState({
    method: selectedMethod,
    creditCard: {
      number: data?.creditCard?.number || "",
      expiry: data?.creditCard?.expiry || "",
      securityCode: data?.creditCard?.securityCode || "",
      name: data?.creditCard?.name || "",
      useShippingAddress: data?.creditCard?.useShippingAddress || false,
    },
    easypaisa: {
      receipt: data?.easypaisa?.receipt || null,
    },
    jazzcash: {
      receipt: data?.jazzcash?.receipt || null,
    },
    ...data
  })

  // Validation states
  const [errors, setErrors] = useState({
    creditCard: {
      number: "",
      expiry: "",
      securityCode: "",
      name: ""
    }
  })

  // Handle local storage
  useEffect(() => {
    // Load saved data from localStorage if available
    const savedPaymentData = localStorage.getItem('paymentData')
    if (savedPaymentData) {
      try {
        const parsedData = JSON.parse(savedPaymentData)
        setFormData(prevData => ({
          ...prevData,
          ...parsedData,
          method: parsedData.method || selectedMethod
        }))
        setSelectedMethod(parsedData.method || selectedMethod)
      } catch (e) {
        console.error("Error parsing saved payment data:", e)
      }
    }
  }, [])

  // Save data to localStorage whenever it changes
  useEffect(() => {
    // Only save if we have some valid data
    if (formData.method) {
      // Clone the data to handle receipt files which can't be stringified
      const dataToSave = { ...formData }
      
      // Handle receipts separately
      if (dataToSave.easypaisa?.receipt instanceof File) {
        dataToSave.easypaisa.receiptName = dataToSave.easypaisa.receipt.name
        delete dataToSave.easypaisa.receipt
      }
      
      if (dataToSave.jazzcash?.receipt instanceof File) {
        dataToSave.jazzcash.receiptName = dataToSave.jazzcash.receipt.name
        delete dataToSave.jazzcash.receipt
      }
      
      localStorage.setItem('paymentData', JSON.stringify(dataToSave))
    }
  }, [formData])

  const handleMethodChange = (method) => {
    if (method === selectedMethod) return

    // Animate out current content if exists
    if (methodDetailsRef.current) {
      gsap.to(methodDetailsRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.2,
        onComplete: () => {
          setSelectedMethod(method)
          const updatedData = {
            ...formData,
            method
          }
          setFormData(updatedData)
          
          // Only call onChange if it's a function
          if (typeof onChange === 'function') {
            onChange(updatedData)
          }
          
          // Animate in new content
          setTimeout(() => {
            if (methodDetailsRef.current) {
              gsap.fromTo(methodDetailsRef.current, 
                { opacity: 0, y: 10 }, 
                { opacity: 1, y: 0, duration: 0.3 }
              )
            }
          }, 50)
        },
      })
    } else {
      setSelectedMethod(method)
      const updatedData = {
        ...formData,
        method
      }
      setFormData(updatedData)
      
      // Only call onChange if it's a function
      if (typeof onChange === 'function') {
        onChange(updatedData)
      }
    }
  }

  const validateCreditCard = (field, value) => {
    let errorMessage = ""
    
    switch (field) {
      case 'number':
        // Remove spaces and check if it's a valid credit card number
        const cleanNumber = value.replace(/\s+/g, '')
        if (!/^\d{13,19}$/.test(cleanNumber)) {
          errorMessage = "Enter a valid card number"
        }
        break
      case 'expiry':
        // Check MM/YY format and if date is in the future
        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)) {
          errorMessage = "Use MM/YY format"
        } else {
          const [month, year] = value.split('/')
          const expiryDate = new Date(2000 + parseInt(year), parseInt(month) - 1)
          const today = new Date()
          if (expiryDate < today) {
            errorMessage = "Card expired"
          }
        }
        break
      case 'securityCode':
        // CVV is typically 3-4 digits
        if (!/^\d{3,4}$/.test(value)) {
          errorMessage = "3-4 digits"
        }
        break
      case 'name':
        if (value.trim().length < 3) {
          errorMessage = "Enter full name"
        }
        break
      default:
        break
    }
    
    return errorMessage
  }

  const handleCreditCardChange = (field, value) => {
    // Format card number with spaces
    if (field === 'number') {
      value = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim()
    }
    
    // Format expiry date
    if (field === 'expiry') {
      value = value.replace(/\D/g, '')
      if (value.length > 2) {
        value = value.slice(0, 2) + '/' + value.slice(2, 4)
      }
    }
    
    // Format security code to only allow digits
    if (field === 'securityCode') {
      value = value.replace(/\D/g, '').slice(0, 4)
    }
    
    // Validate the field
    const errorMessage = validateCreditCard(field, value)
    
    // Update errors
    setErrors(prev => ({
      ...prev,
      creditCard: {
        ...prev.creditCard,
        [field]: errorMessage
      }
    }))
    
    // Update form data
    const updatedCreditCard = {
      ...formData.creditCard,
      [field]: value
    }
    
    const updatedData = {
      ...formData,
      creditCard: updatedCreditCard
    }
    
    setFormData(updatedData)
    
    // Only call onChange if it's a function
    if (typeof onChange === 'function') {
      onChange(updatedData)
    }
  }

  const handleReceiptUpload = (method, file) => {
    if (!file) return
    
    // Check file type and size
    const validTypes = ['image/jpeg', 'image/png', 'application/pdf']
    const maxSize = 5 * 1024 * 1024 // 5MB
    
    if (!validTypes.includes(file.type)) {
      alert('Please upload an image (PNG, JPG) or PDF file')
      return
    }
    
    if (file.size > maxSize) {
      alert('File size exceeds 5MB limit')
      return
    }
    
    const updatedData = {
      ...formData,
      [method]: {
        ...formData[method],
        receipt: file
      }
    }
    
    setFormData(updatedData)
    
    // Only call onChange if it's a function
    if (typeof onChange === 'function') {
      onChange(updatedData)
    }
  }

  // Helper function to format credit card number for display
  const formatCardNumber = (value) => {
    if (!value) return ''
    return value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim()
  }

  // Get image paths correctly (assuming they're imported at the top)
  const getImagePath = (name) => {
    switch (name) {
      case 'Jazzcash':
        return '/assets/icons/jazzcash.png'
      case 'Easypaisa':
        return '/assets/icons/easypaisa.png'
      case 'VISA':
        return '/assets/icons/visa.png'
      case 'Mastercard':
        return '/assets/icons/mastercard.png'
      default:
        return ''
    }
  }

  return (
    <div className="space-y-4">
      {/* Payment Method Selector */}
      <div className="border border-gray-300 rounded overflow-hidden">
        {/* Credit Card Option */}
        <div
          className={`cursor-pointer ${selectedMethod === "credit-card" ? "bg-gray-50" : ""}`}
          onClick={() => handleMethodChange("credit-card")}
        >
          <div className="flex items-center px-3 py-3">
            <div className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center mr-2">
              {selectedMethod === "credit-card" && <div className="w-3 h-3 bg-black rounded-full"></div>}
            </div>
            <span className="text-lg font-medium">Credit card</span>
            <div className="ml-auto flex items-center gap-2">
              <img src={getImagePath('VISA')} alt="Visa" className="h-5" />
              <img src={getImagePath('Mastercard')} alt="Mastercard" className="h-5" />
            </div>
          </div>

          {/* Credit Card Details - Only shown when selected */}
          {selectedMethod === "credit-card" && (
            <div ref={methodDetailsRef} className="border-t border-gray-200">
              <div className="p-3 border-b border-gray-200 relative">
                <input 
                  type="text" 
                  placeholder="Card number" 
                  className={`w-full outline-none bg-gray-50 ${errors.creditCard.number ? 'border-red-500' : ''}`}
                  value={formData.creditCard.number}
                  onChange={(e) => handleCreditCardChange('number', e.target.value)}
                />
                {errors.creditCard.number && (
                  <div className="text-xs text-red-500 mt-1">{errors.creditCard.number}</div>
                )}
                <Lock size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>

              <div className="grid grid-cols-2 border-b border-gray-200">
                <div className="p-3 border-r border-gray-200">
                  <input 
                    type="text" 
                    placeholder="Expiration date (MM/YY)" 
                    className={`w-full outline-none bg-gray-50 ${errors.creditCard.expiry ? 'border-red-500' : ''}`}
                    value={formData.creditCard.expiry}
                    onChange={(e) => handleCreditCardChange('expiry', e.target.value)}
                    maxLength={5}
                  />
                  {errors.creditCard.expiry && (
                    <div className="text-xs text-red-500 mt-1">{errors.creditCard.expiry}</div>
                  )}
                </div>
                <div className="p-3 relative">
                  <input 
                    type="text" 
                    placeholder="Security code" 
                    className={`w-full outline-none bg-gray-50 ${errors.creditCard.securityCode ? 'border-red-500' : ''}`}
                    value={formData.creditCard.securityCode}
                    onChange={(e) => handleCreditCardChange('securityCode', e.target.value)}
                    maxLength={4}
                  />
                  {errors.creditCard.securityCode && (
                    <div className="text-xs text-red-500 mt-1">{errors.creditCard.securityCode}</div>
                  )}
                  <Info size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              <div className="p-3">
                <input 
                  type="text" 
                  placeholder="Name on card" 
                  className={`w-full outline-none bg-gray-50 ${errors.creditCard.name ? 'border-red-500' : ''}`}
                  value={formData.creditCard.name}
                  onChange={(e) => handleCreditCardChange('name', e.target.value)}
                />
                {errors.creditCard.name && (
                  <div className="text-xs text-red-500 mt-1">{errors.creditCard.name}</div>
                )}
              </div>

              <div className="p-3 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    id="billing" 
                    checked={formData.creditCard.useShippingAddress}
                    onChange={(e) => handleCreditCardChange('useShippingAddress', e.target.checked)}
                  />
                  <label htmlFor="billing" className="text-sm">
                    Use shipping address as billing address
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Easypaisa Option */}
        <div
          className={`border-t border-gray-200 cursor-pointer ${selectedMethod === "easypaisa" ? "bg-gray-50" : ""}`}
          onClick={() => handleMethodChange("easypaisa")}
        >
          <div className="flex items-center px-3 py-3">
            <div className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center mr-2">
              {selectedMethod === "easypaisa" && <div className="w-3 h-3 bg-black rounded-full"></div>}
            </div>
            <span className="text-lg font-medium">Easypaisa</span>
            <div className="ml-auto flex items-center gap-2">
              <img src={getImagePath('Easypaisa')} alt="Easypaisa" className="h-7" />
            </div>
          </div>

          {/* Easypaisa Details - Only shown when selected */}
          {selectedMethod === "easypaisa" && (
            <div ref={methodDetailsRef} className="border-t border-gray-200">
              <div className="p-4">
                <p className="text-sm mb-2">Send payment to the following Easypaisa account:</p>
                <div className="bg-gray-100 p-3 rounded mb-3">
                  <p className="font-medium">
                    Account Number: <span className="text-[#8ac43f]">0300 1234567</span>
                  </p>
                  <p className="text-sm text-gray-600">Account Title: FIGS Clothing</p>
                </div>
                <p className="text-sm mb-3">Please upload a screenshot of your payment receipt:</p>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                  {formData.easypaisa.receipt ? (
                    <p className="text-sm text-green-600 font-medium">
                      Receipt uploaded: {formData.easypaisa.receipt.name}
                    </p>
                  ) : (
                    <>
                      <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-400 mt-1">PNG, JPG or PDF (max. 5MB)</p>
                    </>
                  )}
                  <input 
                    type="file" 
                    className="hidden" 
                    id="easypaisa-receipt" 
                    onChange={(e) => handleReceiptUpload('easypaisa', e.target.files[0])}
                    accept=".jpg,.jpeg,.png,.pdf"
                  />
                  <label
                    htmlFor="easypaisa-receipt"
                    className="mt-3 inline-block bg-[#8ac43f] text-white text-sm px-4 py-2 rounded cursor-pointer"
                  >
                    {formData.easypaisa.receipt ? 'Change Receipt' : 'Upload Receipt'}
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* JazzCash Option */}
        <div
          className={`border-t border-gray-200 cursor-pointer ${selectedMethod === "jazzcash" ? "bg-gray-50" : ""}`}
          onClick={() => handleMethodChange("jazzcash")}
        >
          <div className="flex items-center px-3 py-3">
            <div className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center mr-2">
              {selectedMethod === "jazzcash" && <div className="w-3 h-3 bg-black rounded-full"></div>}
            </div>
            <span className="text-lg font-medium">JazzCash</span>
            <div className="ml-auto">
              <img src={getImagePath('Jazzcash')} alt="Jazzcash" className="h-9" />
            </div>
          </div>

          {/* JazzCash Details - Only shown when selected */}
          {selectedMethod === "jazzcash" && (
            <div ref={methodDetailsRef} className="border-t border-gray-200">
              <div className="p-4">
                <p className="text-sm mb-2">Send payment to the following JazzCash account:</p>
                <div className="bg-gray-100 p-3 rounded mb-3">
                  <p className="font-medium">
                    Account Number: <span className="text-[#f01e28]">0300 7654321</span>
                  </p>
                  <p className="text-sm text-gray-600">Account Title: FIGS Clothing</p>
                </div>
                <p className="text-sm mb-3">Please upload a screenshot of your payment receipt:</p>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                  {formData.jazzcash.receipt ? (
                    <p className="text-sm text-green-600 font-medium">
                      Receipt uploaded: {formData.jazzcash.receipt.name}
                    </p>
                  ) : (
                    <>
                      <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-400 mt-1">PNG, JPG or PDF (max. 5MB)</p>
                    </>
                  )}
                  <input 
                    type="file" 
                    className="hidden" 
                    id="jazzcash-receipt" 
                    onChange={(e) => handleReceiptUpload('jazzcash', e.target.files[0])}
                    accept=".jpg,.jpeg,.png,.pdf"
                  />
                  <label
                    htmlFor="jazzcash-receipt"
                    className="mt-3 inline-block bg-[#f01e28] text-white text-sm px-4 py-2 rounded cursor-pointer"
                  >
                    {formData.jazzcash.receipt ? 'Change Receipt' : 'Upload Receipt'}
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PaymentMethod