import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import ProductDetail from './Components/DetailSection';
import MenBestSellers from '../Menspage/Components/MensBestSeller';
import ProductReviews from './Components/ReviewsSection';
import AwsomeHumansFooter from '../../components/Footer';

const ProductDetailPage = ({ children }) => {
  const { productId } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Add font styles
    const style = document.createElement('style');
    style.textContent = `
      @font-face {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 300;
        font-display: swap;
        src: url('/fonts/poppins-v20-latin-300.woff2') format('woff2');
      }
      
      @font-face {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('/fonts/poppins-v20-latin-regular.woff2') format('woff2');
      }
      
      @font-face {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 500;
        font-display: swap;
        src: url('/fonts/poppins-v20-latin-500.woff2') format('woff2');
      }
      
      @font-face {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 600;
        font-display: swap;
        src: url('/fonts/poppins-v20-latin-600.woff2') format('woff2');
      }
      
      @font-face {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url('/fonts/poppins-v20-latin-700.woff2') format('woff2');
      }
      
      html, body, #root {
        height: 100%;
        margin: 0;
        padding: 0;
        width: 100%;
        overflow-x: hidden;
      }
      
      .font-poppins {
        font-family: 'Poppins', sans-serif;
      }
    `;
    document.head.appendChild(style);
    
    // Fetch product data based on productId
    const fetchProductData = async () => {
      try {
        // Replace with your actual data fetching logic
        // const response = await fetch(`/api/products/${productId}`);
        // const data = await response.json();
        // setProduct(data);
        
        // Simulating product data for now
        setProduct({
          id: productId,
          name: `Product ${productId}`,
          // other product details
        });
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProductData();
    
    return () => {
      document.head.removeChild(style);
    };
  }, [productId]); // Re-fetch when productId changes

  return (
    <div className="font-poppins min-h-screen  flex flex-col bg-white">
      <Header />
      {loading ? (
        <div className="flex-grow flex items-center justify-center">
          <p>Loading product details...</p>
        </div>
      ) : (
        <>
          <ProductDetail product={product} />
          <MenBestSellers />
          <ProductReviews productId={productId} />
          <main className="flex-grow">{children}</main>
        </>
      )}
      <AwsomeHumansFooter />
    </div>
  );
};

export default ProductDetailPage;