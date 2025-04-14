"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronDown } from "lucide-react"
import gsap from "gsap"

// Initialize the font

import product1Img1 from "../../../assets/Mens/products/men_product_01_img_01.png"
import product2Img1 from "../../../assets/Mens/products/men_product_02_img_01.png"
import product3Img1 from "../../../assets/Mens/products/men_product_03_img_01.png"
import product4Img1 from "../../../assets/Mens/products/men_product_04_img_01.png"
import product5Img1 from "../../../assets/Mens/products/men_product_05_img_01.png"

export default function ProductPage() {
  // Sample product data
  const products = [
    {
      id: 1,
      name: "FIGS",
      model: "New Balance 3447",
      color: "Black",
      colorCount: 5,
      price: 158.0,
      image: [product1Img1],
    },
    {
      id: 2,
      name: "FIGS",
      model: "New Balance 3447 Zip",
      color: "White",
      colorCount: 2,
      price: 158.0,
      image: [product2Img1],
    },
    {
      id: 3,
      name: "FIGS",
      model: "New Balance 3447 Zip",
      color: "Graphite",
      colorCount: 2,
      price: 158.0,
      image: [product3Img1],
    },
    {
      id: 4,
      name: "FIGS",
      model: "New Balance 327",
      color: "Grey / Navy",
      colorCount: 3,
      price: 128.0,
      image: [product4Img1],
    },
    {
      id: 5,
      name: "FIGS",
      model: "New Balance 327",
      color: "White",
      colorCount: 3,
      price: 128.0,
      image: [product5Img1],
    },
    {
      id: 6,
      name: "FIGS",
      model: "New Balance 574",
      color: "Navy",
      colorCount: 4,
      price: 148.0,
      image: [product1Img1],
    },
    {
      id: 7,
      name: "FIGS",
      model: "New Balance 574",
      color: "Grey",
      colorCount: 4,
      price: 148.0,
      image: [product2Img1],
    },
    {
      id: 8,
      name: "FIGS",
      model: "New Balance 990",
      color: "Black",
      colorCount: 2,
      price: 198.0,
      image: [product3Img1],
    },
  ]

  // Filter states
  const [colorFilter, setColorFilter] = useState("All")
  const [sizeFilter, setSizeFilter] = useState("All")
  const [styleFilter, setStyleFilter] = useState("All")

  // Dropdown states
  const [colorOpen, setColorOpen] = useState(false)
  const [sizeOpen, setSizeOpen] = useState(false)
  const [styleOpen, setStyleOpen] = useState(false)

  // Filtered products
  const [filteredProducts, setFilteredProducts] = useState(products)

  // Filter options (would normally come from API)
  const filterOptions = {
    color: ["All", "Black", "White", "Grey", "Navy", "Graphite"],
    size: ["All", "7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
    style: ["All", "Running", "Casual", "Athletic", "Lifestyle"],
  }

  // Refs for GSAP animations
  const productsRef = useRef(null)
  const productRefs = useRef([])

  // Apply filters
  useEffect(() => {
    let result = [...products]

    if (colorFilter !== "All") {
      result = result.filter((product) => product.color.toLowerCase().includes(colorFilter.toLowerCase()))
    }

    // In a real app, you would filter by size and style as well
    // This is just a placeholder for demonstration

    setFilteredProducts(result)
  }, [colorFilter, sizeFilter, styleFilter])

  // GSAP animations
  useEffect(() => {
    if (productsRef.current) {
      gsap.fromTo(
        productRefs.current,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
        },
      )
    }
  }, [filteredProducts])

  return (
    <div className={`mx-auto px-4 lg:px-20 py-8 w-full `}>
      {/* Heading */}
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-black px-4">All Products</h1>

      {/* Filter section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b pb-4">
        <div className="flex flex-wrap gap-4 mb-4 md:mb-0">
          {/* Color filter */}
          <div className="relative">
            <button
              className="flex items-center gap-2 font-medium bg-white text-black text-sm md:text-base lg:text-lg"
              onClick={() => {
                setColorOpen(!colorOpen)
                setSizeOpen(false)
                setStyleOpen(false)
              }}
            >
              COLOR <ChevronDown className={`h-4 w-4 transition-transform ${colorOpen ? "rotate-180" : ""}`} />
            </button>
            {colorOpen && (
              <div className="absolute z-10 mt-2 w-48 bg-white shadow-lg rounded-md py-1 border">
                {filterOptions.color.map((color) => (
                  <button
                    key={color}
                    className={`block px-4 py-2 text-xs md:text-sm w-full bg-white text-black rounded-none text-left hover:bg-gray-100 ${colorFilter === color ? "font-bold" : ""}`}
                    onClick={() => {
                      setColorFilter(color)
                      setColorOpen(false)
                    }}
                  >
                    {color}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Size filter */}
          <div className="relative">
            <button
              className="flex items-center gap-2 font-medium bg-white text-black text-sm md:text-base lg:text-lg"
              onClick={() => {
                setSizeOpen(!sizeOpen)
                setColorOpen(false)
                setStyleOpen(false)
              }}
            >
              SIZE <ChevronDown className={`h-4 w-4 transition-transform ${sizeOpen ? "rotate-180" : ""}`} />
            </button>
            {sizeOpen && (
              <div className="absolute z-10 mt-2 w-48 bg-white shadow-lg rounded-md py-1 border">
                {filterOptions.size.map((size) => (
                  <button
                    key={size}
                    className={`block px-4 py-2 text-xs md:text-sm w-full bg-white text-black rounded-none text-left hover:bg-gray-100 ${sizeFilter === size ? "font-bold" : ""}`}
                    onClick={() => {
                      setSizeFilter(size)
                      setSizeOpen(false)
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Style filter */}
          <div className="relative">
            <button
              className="flex items-center gap-2 font-medium bg-white text-black text-sm md:text-base lg:text-lg"
              onClick={() => {
                setStyleOpen(!styleOpen)
                setColorOpen(false)
                setSizeOpen(false)
              }}
            >
              STYLE <ChevronDown className={`h-4 w-4 transition-transform ${styleOpen ? "rotate-180" : ""}`} />
            </button>
            {styleOpen && (
              <div className="absolute z-10 mt-2 w-48 bg-white shadow-lg rounded-md py-1 border">
                {filterOptions.style.map((style) => (
                  <button
                    key={style}
                    className={`block px-4 py-2 text-xs md:text-sm w-full bg-white text-black rounded-none text-left hover:bg-gray-100 ${styleFilter === style ? "font-bold" : ""}`}
                    onClick={() => {
                      setStyleFilter(style)
                      setStyleOpen(false)
                    }}
                  >
                    {style}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Total count */}
        <div className="text-black px-4 font-medium text-sm md:text-base lg:text-lg">
          {filteredProducts.length} Total
        </div>
      </div>

      {/* Products grid */}
      <div ref={productsRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {filteredProducts.map((product, index) => (
          <div
            key={product.id}
            ref={(el) => (productRefs.current[index] = el)}
            className="flex flex-col transition-all duration-300 hover:shadow-md"
          >
            {/* Product image */}
            <div className="bg-gray-100  overflow-hidden mb-3">
              <img
                src={product.image || "/placeholder.svg"}
                alt={`${product.name} ${product.model}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Product details */}
            <div className="flex flex-col p-2">
              {/* Product name */}
              <h3 className="text-gray-900 font-medium text-base md:text-lg lg:text-xl mb-1">
                {product.name} | {product.model}
              </h3>

              {/* Color and color count */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-gray-700 text-xs md:text-sm lg:text-base">{product.color}</span>
                <span className="text-gray-500 text-xs md:text-sm lg:text-base">{product.colorCount} Colors</span>
              </div>

              {/* Price */}
              <div className="text-gray-900 font-medium text-sm md:text-base lg:text-lg">
                ${product.price.toFixed(2)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
