"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, ExternalLink, X } from "lucide-react"

const MobileOrderSummary = ({ 
  products = [], 
  totalPrice, 
  onDiscountCodeChange, 
  onRemoveProduct,
  onGiftMessageChange,
  onStudentDiscountApply
}) => {
  const [showGiftOptions, setShowGiftOptions] = useState(false)
  const [discountCode, setDiscountCode] = useState("")
  const [giftMessage, setGiftMessage] = useState("")
  const [includeGiftReceipt, setIncludeGiftReceipt] = useState(false)

  const handleDiscountSubmit = (e) => {
    e.preventDefault()
    onDiscountCodeChange(discountCode)
  }

  const handleGiftMessageChange = (message) => {
    setGiftMessage(message)
    onGiftMessageChange(message)
  }

  const handleStudentDiscountClick = () => {
    onStudentDiscountApply()
  }

  return (
    <div className="px-4 py-3 border-t border-gray-200">
      {/* Product Details */}
      {products?.map((product) => (
        <div key={product.id || product.name} className="flex items-start gap-3 mb-4">
          <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
            <img 
              src={product.image || "/placeholder.svg?height=48&width=48"} 
              alt={product.name} 
              className="w-10 h-10 object-cover" 
            />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium">{product.name}</h3>
            <p className="text-xs text-gray-500">{product.variant || product.size || ""}</p>
          </div>
          <span className="text-sm font-medium">${product.price?.toFixed(2) || "0.00"}</span>
        </div>
      ))}

      

      {/* Student/Military Discount */}
      <div className="border-t border-b border-gray-200 py-3 mb-4">
        <div 
          className="flex items-center justify-between cursor-pointer"
          onClick={handleStudentDiscountClick}
        >
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Student or Military - Save 15%</span>
          </div>
          <ExternalLink size={18} className="text-gray-500" />
        </div>
      </div>

      
      {/* Order Summary */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-medium">${totalPrice?.toFixed(2) || "0.00"}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>Enter shipping address</span>
        </div>
        <div className="flex justify-between pt-2 border-t border-gray-200 font-medium">
          <span>Total</span>
          <span>${totalPrice?.toFixed(2) || "0.00"}</span>
        </div>
      </div>
    </div>
  )
}

export default MobileOrderSummary