"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { X, ChevronLeft, ChevronRight, Check, Plus, Minus } from "lucide-react"
import { useNavigate } from "react-router-dom" // Changed from next/navigation to react-router-dom

import product1Img1 from '../../../assets/Mens/products/men_product_01_img_01.png';
import product2Img1 from '../../../assets/Mens/products/men_product_02_img_01.png';
import product3Img1 from '../../../assets/Mens/products/men_product_03_img_01.png';
import product4Img1 from '../../../assets/Mens/products/men_product_04_img_01.png';
import product5Img1 from '../../../assets/Mens/products/men_product_05_img_01.png';

// Product data object
const productData = {
  id: "nb3447zip",
  name: "FIGS | New Balance 3447 Zip",
  price: 158.0,
  rating: 4,
  reviews: 18,
  badge: "NEW STYLE",
  colors: [
    { id: "gray", name: "Gray", hex: "#6B7280" },
    { id: "white", name: "White", hex: "#FFFFFF" },
    { id: "black", name: "Black", hex: "#000000" }
  ],
  sizes: [
    "M4/W5.5",
    "M4.5/W6",
    "M5/W6.5",
    "M5.5/W7",
    "M6/W7.5",
    "M6.5/W8",
    "M7/W8.5",
    "M7.5/W9",
    "M8/W9.5",
    "M8.5/W10",
    "M9/W10.5",
    "M9.5/W11",
    "M10/W11.5",
    "M10.5/W12",
    "M11/W12.5",
    "M11.5/W13",
    "M12/W13.5",
    "M13/W14.5",
  ],
  images: [
    [product1Img1],
    [product2Img1],
    [product3Img1],
    [product4Img1],
    [product5Img1],
    [product1Img1],
    [product2Img1],
  ],
  shipping: "FREE SHIPPING FOR $50+ ORDERS AND FREE RETURNS",
  exclusions: "This product is excluded from site promotions and discounts.",
}

export default function ProductDetail() {
  const navigate = useNavigate(); // Changed from useRouter to useNavigate
  
  const [selectedColor, setSelectedColor] = useState(productData.colors[1].id) // Default to white
  const [selectedSize, setSelectedSize] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [validationError, setValidationError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [cartItems, setCartItems] = useState([])

  const productRef = useRef(null)
  const lightboxRef = useRef(null)
  const successMessageRef = useRef(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    // GSAP animations
    gsap.from(productRef.current, {
      // Animation properties can be added here
    })

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const openLightbox = (index) => {
    setCurrentImageIndex(index)
    setLightboxOpen(true)

    // GSAP animation for lightbox
    gsap.fromTo(lightboxRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" })
  }

  const closeLightbox = () => {
    gsap.to(lightboxRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => setLightboxOpen(false),
    })
  }

  const nextImage = () => {
    gsap.to(".lightbox-image", {
      opacity: 0,
      x: -20,
      duration: 0.2,
      onComplete: () => {
        setCurrentImageIndex((prev) => (prev + 1) % productData.images.length)
        gsap.fromTo(".lightbox-image", { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.2 })
      },
    })
  }

  const prevImage = () => {
    gsap.to(".lightbox-image", {
      opacity: 0,
      x: 20,
      duration: 0.2,
      onComplete: () => {
        setCurrentImageIndex((prev) => (prev - 1 + productData.images.length) % productData.images.length)
        gsap.fromTo(".lightbox-image", { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.2 })
      },
    })
  }

  const goToImage = (index) => {
    gsap.to(".lightbox-image", {
      opacity: 0,
      duration: 0.2,
      onComplete: () => {
        setCurrentImageIndex(index)
        gsap.to(".lightbox-image", { opacity: 1, duration: 0.2 })
      },
    })
  }

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1)
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1)
    }
  }

  // Helper function for validation
  const validateInputs = () => {
    // Reset validation error
    setValidationError("")
    
    // Validation checks
    if (!selectedColor) {
      setValidationError("Please select a color")
      return false
    }
    if (!selectedSize) {
      setValidationError("Please select a size")
      return false
    }
    if (quantity <= 0) {
      setValidationError("Quantity must be greater than 0")
      return false
    }
    
    return true
  }

  const validateAndAddToBag = () => {
    // Reset success message
    setSuccessMessage("")
    
    // Validate inputs
    if (!validateInputs()) {
      return
    }

    // Get selected color object for complete information
    const selectedColorObj = productData.colors.find(color => color.id === selectedColor)
    
    // Create item object with ALL required information
    const itemToAdd = {
      id: productData.id,
      name: productData.name,
      price: productData.price,
      colorId: selectedColor,
      colorName: selectedColorObj.name,
      colorHex: selectedColorObj.hex,
      size: selectedSize,
      quantity: quantity,
      image: productData.images[currentImageIndex],
      timestamp: new Date().toISOString(),
      totalPrice: productData.price * quantity
    }

    // Add to cart items
    const updatedCart = [...cartItems, itemToAdd]
    setCartItems(updatedCart)
    
    // Log the item and cart to verify all data is correctly stored
    console.log("Item added to bag:", itemToAdd)
    console.log("Current cart:", updatedCart)

    // Store cart in localStorage for persistence (optional)
    try {
      localStorage.setItem('cartItems', JSON.stringify(updatedCart))
    } catch (error) {
      console.error("Could not save to localStorage:", error)
    }

    // Show success message with animation
    setSuccessMessage("Item added to bag successfully!")
    if (successMessageRef.current) {
      gsap.fromTo(
        successMessageRef.current, 
        { opacity: 0, y: -20 }, 
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      )
      
      // Auto hide after 3 seconds
      setTimeout(() => {
        gsap.to(successMessageRef.current, { 
          opacity: 0, 
          y: -20, 
          duration: 0.5, 
          ease: "power2.in",
          onComplete: () => setSuccessMessage("")
        })
      }, 3000)
    }
  }

  const proceedToCheckout = () => {
    // First validate cart has items
    if (!cartItems.length) {
      setValidationError("Your bag is empty. Please add items first.")
      return
    }
    
    // Then validate current selections in case user wants to add the current item
    if (validateInputs()) {
      // Ask user if they want to add current item to cart before proceeding
      const addCurrentItem = window.confirm("Do you want to add the current item to your bag before checkout?")
      
      if (addCurrentItem) {
        validateAndAddToBag()
      }
      
      // Navigate to checkout page with cart data
      console.log("Proceeding to checkout with items:", cartItems)
      
      // Use React Router's navigate to go to checkout page
      navigate('/checkout')
    }
  }

  // Get the selected color object
  const selectedColorObj = productData.colors.find((color) => color.id === selectedColor)

  return (
    <div className="bg-white min-h-screen w-full text-black" ref={productRef}>
      {/* Mobile View */}
      {isMobile ? (
        <div className="px-4 pt-4 pb-8">
          <div className="mb-4">
            <img
              src={productData.images[currentImageIndex] || "/placeholder.svg"}
              alt={productData.name}
              className="w-full h-auto cursor-pointer"
              onClick={() => openLightbox(currentImageIndex)}
            />
            <div className="flex justify-center mt-2">
              {productData.images.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 mx-1 rounded-full ${index === currentImageIndex ? "bg-gray-800" : "bg-gray-300"}`}
                  onClick={() => goToImage(index)}
                />
              ))}
            </div>
          </div>

          <h1 className="text-2xl font-bold mb-1">{productData.name}</h1>

          <div className="flex items-center mb-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`w-5 h-5 ${star <= productData.rating ? "text-black" : "text-gray-300"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="ml-2 text-gray-600">({productData.reviews} Reviews)</span>
          </div>

          <p className="text-2xl font-bold mb-4">${productData.price.toFixed(2)}</p>

          <div className="inline-block px-3 py-1 bg-white text-sm font-medium mb-4 border border-gray-200">
            {productData.badge}
          </div>

          <div className="mb-4">
            <p className="font-medium mb-2">
              COLOR <span className="ml-2 font-normal">{selectedColorObj.name}</span>
            </p>
            <div className="flex gap-2">
              {productData.colors.map((color) => (
                <button
                  key={color.id}
                  className={`w-10 h-10 rounded-full ${color.id === "white" ? "bg-white border border-gray-300" : ""} ${selectedColor === color.id ? "ring-2 ring-black" : ""}`}
                  style={{ backgroundColor: color.hex }}
                  onClick={() => setSelectedColor(color.id)}
                >
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <p className="font-medium">SIZE</p>
              <a href="#" className="text-gray-600 underline">
                Size Chart
              </a>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {productData.sizes.slice(0, 6).map((size) => (
                <button
                  key={size}
                  className={`py-2 border rounded-none bg-white text-black ${selectedSize === size ? "border-black" : "border-gray-300"} text-center`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="mb-4">
            <p className="font-medium mb-2">QUANTITY</p>
            <div className="flex items-center border border-gray-300 inline-flex">
              <button 
                onClick={decrementQuantity} 
                className="px-3 py-2 bg-white"
              >
                <Minus size={16} />
              </button>
              <span className="px-4 py-2 min-w-[40px] text-center">{quantity}</span>
              <button 
                onClick={incrementQuantity} 
                className="px-3 py-2 bg-white"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Validation Error */}
          {validationError && (
            <div className="mb-4 text-red-500 text-sm">{validationError}</div>
          )}
          
          {/* Success Message */}
          {successMessage && (
            <div 
              className="mb-4 bg-green-100 text-green-800 p-2 border border-green-200"
              ref={successMessageRef}
            >
              {successMessage}
            </div>
          )}

          <button 
            className="w-full py-4 bg-black text-white font-medium mb-4 rounded-none"
            onClick={validateAndAddToBag}
          >
            ADD TO BAG
          </button>

          <button 
            className="w-full py-4 bg-gray-800 text-black bg-white border border-black font-medium mb-4 rounded-none"
            onClick={proceedToCheckout}
          >
            PROCEED TO CHECKOUT
          </button>

          <p className="text-center text-gray-600 text-sm mb-4">{productData.exclusions}</p>

          <p className="text-center font-medium">{productData.shipping}</p>
        </div>
      ) : (
        /* Desktop View */
        <div className="mx-10 px-20 py-8 flex">
          {/* Thumbnail Gallery - Custom size */}
          <div className="w-45 mr-6">
            {productData.images.slice(0, 7).map((image, index) => (
              <div
                key={index}
                className={`w-40 h-40 mb-4 border ${currentImageIndex === index ? "border-gray-300" : "border-gray-200"} cursor-pointer`}
                onClick={() => goToImage(index)}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`Product view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          
          {/* Main Image */}
          <div className="flex-1 relative mr-20 ml-10">
            <img
              src={productData.images[currentImageIndex] || "/placeholder.svg"}
              alt={productData.name}
              className="w-[95%] max-h-[80%] h-auto cursor-pointer"
              onClick={() => openLightbox(currentImageIndex)}
            />
            <div className="absolute mt-8 left-0 right-0 flex justify-center">
              {productData.images.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 mx-1 rounded-full ${index === currentImageIndex ? "bg-gray-800" : "bg-gray-300"}`}
                  onClick={() => goToImage(index)}
                />
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="w-1/3 pl-12">
            <h1 className="text-3xl font-bold mb-1">{productData.name}</h1>

            <div className="flex items-center mb-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`w-5 h-5 ${star <= productData.rating ? "text-black" : "text-gray-300"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-gray-600">({productData.reviews} Reviews)</span>
            </div>

            <p className="text-2xl font-bold mb-8">${productData.price.toFixed(2)}</p>

            <div className="inline-block px-4 py-1 bg-white text-sm font-medium mb-8 border border-gray-200">
              {productData.badge}
            </div>

            <div className="mb-8">
              <p className="font-medium mb-2">
                COLOR <span className="ml-2 font-normal">{selectedColorObj.name}</span>
              </p>
              <div className="flex gap-2">
                {productData.colors.map((color) => (
                  <button
                    key={color.id}
                    className={`w-10 h-10 rounded-full ${color.id === "white" ? "bg-white border border-gray-300" : ""} ${selectedColor === color.id ? "ring-2 ring-black" : ""}`}
                    style={{ backgroundColor: color.hex }}
                    onClick={() => setSelectedColor(color.id)}
                  >
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <p className="font-medium">SIZE</p>
                <a href="#" className="text-gray-600 underline">
                  Size Chart
                </a>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {productData.sizes.map((size) => (
                  <button
                    key={size}
                    className={`py-2 border ${selectedSize === size ? "border-black" : "border-gray-300"} bg-white rounded-none text-black text-center`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-8">
              <p className="font-medium mb-3">QUANTITY</p>
              <div className="flex items-center border border-gray-300 inline-flex">
                <button 
                  onClick={decrementQuantity} 
                  className="px-3 py-2 bg-white"
                >
                  <Minus size={16} />
                </button>
                <span className="px-4 py-2 min-w-[40px] text-center">{quantity}</span>
                <button 
                  onClick={incrementQuantity} 
                  className="px-3 py-2 bg-white"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Validation Error */}
            {validationError && (
              <div className="mb-6 text-red-500 text-sm">{validationError}</div>
            )}
            
            {/* Success Message */}
            {successMessage && (
              <div 
                className="mb-6 bg-green-100 text-green-800 p-2 border border-green-200"
                ref={successMessageRef}
              >
                {successMessage}
              </div>
            )}

            <button 
              className="w-full py-4 bg-black text-white rounded-none font-medium text-sm mb-4"
              onClick={validateAndAddToBag}
            >
              ADD TO BAG
            </button>

            <button 
              className="w-full py-4 bg-gray-800 bg-white border border-black rounded-none font-medium text-sm mb-6"
              onClick={proceedToCheckout}
            >
              PROCEED TO CHECKOUT
            </button>

            <p className="text-center text-gray-600 text-sm mb-6">{productData.exclusions}</p>

            <p className="text-center text-sm font-medium">{productData.shipping}</p>
          </div>
        </div>
      )}

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 flex bg-white items-center justify-center" ref={lightboxRef}>
          <button className="absolute top-4 right-4 p-2 bg-white text-black rounded-full" onClick={closeLightbox}>
            <X size={50} />
          </button>

          <button
            className="absolute bg-white text-black left-4 rounded-full top-1/2 transform -translate-y-1/2 p-2"
            onClick={prevImage}
          >
            <ChevronLeft size={50} />
          </button>

          <img
            src={productData.images[currentImageIndex] || "/placeholder.svg"}
            alt={productData.name}
            className="lightbox-image max-h-[80vh] max-w-[80vw]"
          />

          <button
            className="absolute right-4 bg-white text-black rounded-full top-1/2 transform -translate-y-1/2 p-2"
            onClick={nextImage}
          >
            <ChevronRight size={50} />
          </button>

          <div className="absolute bottom-4 left-0 right-0 flex justify-center">
            {productData.images.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 mx-1 rounded-full ${index === currentImageIndex ? "bg-gray-800" : "bg-gray-300"}`}
                onClick={() => goToImage(index)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}