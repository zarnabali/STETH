import { useState } from "react"
import { X } from "lucide-react"

export default function OrderSummary({ products, totalPrice, onDiscountCodeChange, onRemoveProduct }) {
  const [discountCode, setDiscountCode] = useState("")

  const handleDiscountCodeSubmit = (e) => {
    e.preventDefault()
    onDiscountCodeChange(discountCode)
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      
      {/* Products List */}
      <div className="space-y-4 mb-6">
        {products.map((product) => (
          <div key={product.id || product.name} className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded overflow-hidden">
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-medium">{product.name}</h3>
                <p className="text-gray-500">${product.price.toFixed(2)}</p>
              </div>
            </div>
            <button
              onClick={() => onRemoveProduct(product.id || product.name)}
              className="text-black bg-white hover:text-gray-600"
            >
              <X size={20} />
            </button>
          </div>
        ))}
      </div>

      

      {/* Total */}
      <div className="border-t border-gray-200 pt-4">
        <div className="flex justify-between mb-2">
          <span>Subtotal</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}
