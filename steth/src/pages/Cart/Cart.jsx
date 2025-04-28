"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ArrowLeft, Minus, Plus, X } from 'lucide-react'

import Header from "../../components/Header"
import Footer from "../../components/Footer"

const Cart = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Cotton T-shirt",
      category: "Shirt",
      price: 44.0,
      quantity: 1,
      image: "/images/white-tshirt.jpg",
    },
    {
      id: 2,
      name: "Cotton T-shirt",
      category: "Shirt",
      price: 44.0,
      quantity: 1,
      image: "/images/black-tshirt.jpg",
    },
    {
      id: 3,
      name: "Cotton T-shirt",
      category: "Shirt",
      price: 44.0,
      quantity: 1,
      image: "/images/print-tshirt.jpg",
    },
  ])

  const [shipping, setShipping] = useState(5.0)
  const [promoCode, setPromoCode] = useState("")
  const cartRef = useRef(null)

  const increaseQuantity = (id) => {
    setProducts(
      products.map((product) => (product.id === id ? { ...product, quantity: product.quantity + 1 } : product)),
    )
  }

  const decreaseQuantity = (id) => {
    setProducts(
      products.map((product) =>
        product.id === id && product.quantity > 1 ? { ...product, quantity: product.quantity - 1 } : product,
      ),
    )
  }

  const removeProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id))
  }

  const calculateSubtotal = () => {
    return products.reduce((total, product) => total + product.price * product.quantity, 0)
  }

  const calculateTotal = () => {
    return calculateSubtotal() + shipping
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cart-item", {
        y: 20,
        opacity: 0,
        stagger: 0.2,
        duration: 0.5,
        ease: "power2.out",
        clearProps: "all",
      })

      gsap.from(".summary-section", {
        x: 30,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        clearProps: "all",
      })
    }, cartRef)

    return () => ctx.revert()
  }, [])

  return (
    // Root container - removed w-screen to prevent horizontal scrollbar
    <div className="flex flex-col min-h-screen w-screen overflow-x-hidden bg-[#f8f8ff]">
      

        {/* Navigation */}
        <div className="bg-white  shadow-sm w-full">
            <Header />
          <div className="container mx-auto px-4 py-4">
            <div className="flex gap-4">
              <a href="/" className="text-sm hover:underline">
                Home
              </a>
              <span className="text-gray-400">/</span>
              <a href="/checkout" className="text-sm hover:underline">
                Checkout
              </a>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow w-full">
          <div className="container px-4 py-6 mx-auto">
            <div
              ref={cartRef}
              className="flex flex-col lg:flex-row max-w-6xl mx-auto bg-white rounded-lg shadow-md"
            >
              {/* Cart Items Section */}
              <div className="flex-1 p-4 md:p-8">
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl md:text-3xl font-bold text-black">Shopping Cart</h1>
                  <span className="text-[#6b6b6b]">{products.length} items</span>
                </div>

                <div className="border-t border-[#e5e5e5]">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="cart-item py-4 md:py-6 flex flex-col sm:flex-row items-start sm:items-center border-b border-[#e5e5e5]"
                    >
                      <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded bg-[#f0f0f0]">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="ml-0 sm:ml-4 mt-2 sm:mt-0 flex-1">
                        <div className="text-[#6b6b6b] truncate">{product.category}</div>
                        <div className="text-black font-medium truncate">{product.name}</div>
                      </div>

                      <div className="flex items-center mt-2 sm:mt-0">
                        <button
                          onClick={() => decreaseQuantity(product.id)}
                          className="w-8 h-8 flex items-center justify-center bg-white border border-[#d1d1d1] rounded text-black hover:bg-gray-50"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={16} stroke="black" />
                        </button>

                        <input
                          type="text"
                          value={product.quantity}
                          readOnly
                          className="mx-2 w-10 h-8 text-center bg-white border border-[#d1d1d1] rounded text-black"
                          aria-label="Quantity"
                        />

                        <button
                          onClick={() => increaseQuantity(product.id)}
                          className="w-8 h-8 flex items-center justify-center bg-white text-black border border-[#d1d1d1] rounded hover:bg-gray-50"
                          aria-label="Increase quantity"
                        >
                          <Plus size={16} stroke="black" />
                        </button>
                      </div>

                      <div className="ml-auto sm:ml-6 w-24 text-right mt-2 sm:mt-0 font-medium text-black">
                        € {(product.price * product.quantity).toFixed(2)}
                      </div>

                      <button
                        onClick={() => removeProduct(product.id)}
                        className="ml-2 sm:ml-6 bg-white text-black hover:bg-gray-50 p-1 rounded"
                        aria-label="Remove item"
                      >
                        <X size={20} stroke="black" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <a href="/" className="flex items-center text-black no-underline hover:underline">
                    <ArrowLeft className="h-5 w-5 mr-2" stroke="black" />
                    Back to shop
                  </a>
                </div>
              </div>

              {/* Summary Section */}
              <div className="summary-section w-full lg:w-1/3 p-4 md:p-8 bg-[#f0f0f0]">
                <h2 className="text-xl md:text-2xl font-bold mb-6 text-black">Summary</h2>

                <div className="border-t border-[#d1d1d1] pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-[#333333] font-medium">ITEMS {products.length}</span>
                    <span className="text-black font-medium">€ {calculateSubtotal().toFixed(2)}</span>
                  </div>

                  <div className="mb-4">
                    <p className="mb-2 text-[#333333] font-medium">PROMO CODE</p>
                    <input
                      type="text"
                      placeholder="Enter your code"
                      className="w-full p-2 border border-[#d1d1d1] rounded bg-white text-[#333333]"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      aria-label="Promo code"
                    />
                  </div>
                </div>

                <div className="border-t border-[#d1d1d1] pt-4 mt-4">
                  <div className="flex justify-between mb-6">
                    <span className="text-[#333333] font-medium">TOTAL PRICE</span>
                    <span className="text-black font-bold">€ {calculateTotal().toFixed(2)}</span>
                  </div>

                  <a href="/checkout" className="w-full block">
                    <button
                      className="w-full py-3 bg-black text-white rounded font-semibold hover:bg-gray-800 transition-colors"
                      aria-label="Proceed to checkout"
                    >
                      CHECKOUT
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
       
      
    </div>
  )
}

export default Cart