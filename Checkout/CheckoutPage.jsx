"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import FigsLogo from "./Components/FigsLogo.jsx"
import YouMayAlsoLike from "./Components/YouMayAlsoLike.jsx"
import ContactForm from "./Components/ContactForm.jsx"
import DeliveryForm from "./Components/DeliveryForm.jsx"
import ShippingMethod from "./Components/ShippingMethod.jsx"
import PaymentMethod from "./Components/PaymentMethod.jsx"
import RememberMe from "./Components/RememberMe.jsx"
import OrderSummary from "./Components/OrderSummary.jsx"
import MobileOrderSummary from "./Components/MobileOrderSummary.jsx"
import { useIsMobile } from "./hooks/use-mobile"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const redommended_products = [
  { name: "Grey FIGS® Lanyard", color: "Grey", price: 16.0 },
  { name: "Blue FIGS® T-Shirt", color: "Blue", price: 20.0 },
  { name: "Black FIGS® Hoodie", color: "Black", price: 40.0 },
]

const CheckoutPage = () => {
  const isMobile = useIsMobile()
  const [showOrderSummary, setShowOrderSummary] = useState(false)
  const mainRef = useRef(null)
  const formSectionsRef = useRef([])

  const [checkoutDetails, setCheckoutDetails] = useState({
    customerInfo: {
      contactInfo: {
        firstName: "",
        lastName: "",
        email: "",
      },
      deliveryInfo: {
        address: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
      },
      phoneNumber: "",
      paymentMethod: {
        method: "", // 'card', 'easypaisa', 'jazzcash'
        cardDetails: {
          cardNumber: "",
          expiryDate: "",
          cvv: "",
        },
        receiptImage: null,
      },
      discountCode: "",
    },
    recommendedProducts: redommended_products,
    cart: {
      products: redommended_products,
      totalPrice: redommended_products.reduce((sum, product) => sum + product.price, 0),
    },
    shipping: {
      method: "",
      cost: 0,
    },
    payment: {
      method: "credit-card",
      creditCard: {
        number: "",
        expiry: "",
        securityCode: "",
        name: "",
        useShippingAddress: true,
      },
      easypaisa: {
        receipt: null,
      },
      jazzcash: {
        receipt: null,
      },
    },
    rememberMe: {
      saveInfo: false,
      phone: {
        countryCode: { code: "+1", country: "US", flag: "🇺🇸" },
        number: "",
      },
    },
  })

  const updateCheckoutDetails = (section, data) => {
    setCheckoutDetails((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...data,
      },
    }))
  }

  useEffect(() => {
    if (typeof window === "undefined") return

    const ctx = gsap.context(() => {
      formSectionsRef.current.forEach((section, index) => {
        gsap.fromTo(
          section,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.1,
            scrollTrigger: {
              trigger: section,
              start: "top bottom-=100",
              toggleActions: "play none none none",
            },
          },
        )
      })
    })

    return () => ctx.revert()
  }, [])

  const addToFormSectionsRef = (el) => {
    if (el && !formSectionsRef.current.includes(el)) {
      formSectionsRef.current.push(el)
    }
  }

  const handleContactInfoChange = (contactInfo) => {
    setCheckoutDetails((prev) => ({
      ...prev,
      customerInfo: {
        ...prev.customerInfo,
        contactInfo,
      },
    }))
  }

  const handleDeliveryInfoChange = (deliveryInfo) => {
    setCheckoutDetails((prev) => ({
      ...prev,
      customerInfo: {
        ...prev.customerInfo,
        deliveryInfo,
      },
    }))
  }

  const handlePhoneNumberChange = (phoneNumber) => {
    setCheckoutDetails((prev) => ({
      ...prev,
      customerInfo: {
        ...prev.customerInfo,
        phoneNumber,
      },
    }))
  }

  const handlePaymentMethodChange = (paymentInfo) => {
    setCheckoutDetails((prev) => ({
      ...prev,
      customerInfo: {
        ...prev.customerInfo,
        paymentMethod: paymentInfo,
      },
    }))
  }

  const handleDiscountCodeChange = (discountCode) => {
    setCheckoutDetails((prev) => ({
      ...prev,
      customerInfo: {
        ...prev.customerInfo,
        discountCode,
      },
    }))
  }

  const handleAddRecommendedProduct = (productId) => {
    const productToAdd = redommended_products.find((product) => product.name === productId)

    if (productToAdd) {
      const updatedProducts = [...checkoutDetails.cart.products, productToAdd]
      const newTotalPrice = updatedProducts.reduce((sum, product) => sum + product.price, 0)

      setCheckoutDetails((prev) => ({
        ...prev,
        cart: {
          products: updatedProducts,
          totalPrice: newTotalPrice,
        },
      }))
    }
  }

  const handleRemoveProduct = (productId) => {
    const updatedProducts = checkoutDetails.cart.products.filter((product) => product.name !== productId)
    const newTotalPrice = updatedProducts.reduce((sum, product) => sum + product.price, 0)

    setCheckoutDetails((prev) => ({
      ...prev,
      cart: {
        products: updatedProducts,
        totalPrice: newTotalPrice,
      },
    }))
  }

  const handleSubmitOrder = () => {
    console.log("Submitting order with details:", checkoutDetails)
  }

  return (
    <div className="bg-white text-gray-900 text-base md:text-lg md:w-screen w-full overflow-x-hidden min-h-screen">
      {/* Header */}
      <header className="border-b border-gray-200 py-4 px-4 md:px-0 md:py-6">
        <div className="max-w-7xl mx-auto">
          <FigsLogo />
        </div>
      </header>

      {/* Mobile Order Summary Toggle */}
      <div className="md:hidden border-b border-gray-300 bg-white">
        <button
          onClick={() => setShowOrderSummary(!showOrderSummary)}
          className="w-full py-3 px-4 flex justify-between items-center bg-white border border-gray-300 rounded-none"
        >
          <div className="flex items-center gap-2">
            <span className="font-medium text-base md:text-lg">Order summary</span>
            {showOrderSummary ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>
          <span className="font-medium text-base md:text-lg">${checkoutDetails.cart.totalPrice.toFixed(2)}</span>
        </button>
        {showOrderSummary && (
          <MobileOrderSummary
            products={checkoutDetails.cart.products}
            totalPrice={checkoutDetails.cart.totalPrice}
            onDiscountCodeChange={handleDiscountCodeChange}
            onRemoveProduct={handleRemoveProduct}
            onGiftMessageChange={(message) => console.log("Gift message:", message)}
            onStudentDiscountApply={() => console.log("Student discount applied")}
          />
        )}
      </div>

      <main ref={mainRef} className="max-w-7xl mx-auto grid md:grid-cols-[1fr,400px] md:gap-8">
        {/* Left Column - Checkout Form */}
        <div className="px-4 py-4 md:py-8 md:pr-8">
          <div className="mb-6" ref={addToFormSectionsRef}>
            <h2 className="text-xl md:text-2xl font-medium mb-2">Contact</h2>
            <ContactForm
              data={checkoutDetails.customerInfo.contactInfo}
              onChange={(data) => handleContactInfoChange(data)}
            />
          </div>

          <div className="mb-6" ref={addToFormSectionsRef}>
            <h2 className="text-xl md:text-2xl font-medium mb-2">Delivery</h2>
            <DeliveryForm onDeliveryInfoChange={handleDeliveryInfoChange} />
          </div>

          <div className="mb-6" ref={addToFormSectionsRef}>
            <h2 className="text-xl md:text-2xl font-medium mb-2">Shipping method</h2>
            <ShippingMethod
              data={checkoutDetails.shipping}
              onChange={(data) => updateCheckoutDetails("shipping", data)}
            />
          </div>

          <div className="mb-6" ref={addToFormSectionsRef}>
            <h2 className="text-xl md:text-2xl font-medium mb-2">Payment</h2>
            <p className="text-sm md:text-base text-gray-500 mb-3">All transactions are secure and encrypted.</p>
            <PaymentMethod onPaymentMethodChange={handlePaymentMethodChange} />
          </div>

          <div className="mb-6" ref={addToFormSectionsRef}>
            <h2 className="text-xl md:text-2xl font-medium mb-2">Remember me</h2>
            <RememberMe
              data={checkoutDetails.rememberMe}
              onChange={(data) => updateCheckoutDetails("rememberMe", data)}
            />
          </div>

          <div className="mb-6" ref={addToFormSectionsRef}>
            <p className="text-sm md:text-base mb-4">
              By placing this order, you agree to the FIGS{" "}
              <a href="#" className="underline">
                Terms of Use
              </a>{" "}
              and understand our{" "}
              <a href="#" className="underline">
                Privacy Policy
              </a>
              .
            </p>
            <button
              className="w-full bg-black text-white py-4 rounded font-medium text-base md:text-lg"
              onClick={handleSubmitOrder}
            >
              Pay now
            </button>
            <p className="text-xs md:text-sm text-gray-500 mt-4">
              Your info will be saved to a Shop account. By continuing, you agree to Shop's{" "}
              <a href="#" className="underline">
                Terms of Service
              </a>{" "}
              and acknowledge the{" "}
              <a href="#" className="underline">
                Privacy Policy
              </a>
              .
            </p>
          </div>

          <div className="flex flex-wrap gap-4 text-sm md:text-base text-gray-500 mt-8">
            <a href="#" className="hover:text-gray-700">
              Refund Policy
            </a>
            <a href="#" className="hover:text-gray-700">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gray-700">
              Terms of Use
            </a>
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="hidden md:block">
          <div className="sticky top-6 bg-gray-50 p-6">
            {isMobile ? (
              <MobileOrderSummary
                products={checkoutDetails.cart.products}
                totalPrice={checkoutDetails.cart.totalPrice}
                onDiscountCodeChange={handleDiscountCodeChange}
                onRemoveProduct={handleRemoveProduct}
                onStudentDiscountApply={() => console.log("Student discount applied")}
              />
            ) : (
              <OrderSummary
                products={checkoutDetails.cart.products}
                totalPrice={checkoutDetails.cart.totalPrice}
                onRemoveProduct={handleRemoveProduct}
              />
            )}
            <div className="mt-2">
              <YouMayAlsoLike
                products={checkoutDetails.recommendedProducts}
                onAddProduct={handleAddRecommendedProduct}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default CheckoutPage