// src/routes/AppRouter.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import your page components
import Homepage from '../pages/Homepage/Homepage';
import MensPage from '../pages/Menspage/MensPage';
import ProductDetailPage from '../pages/ProductDetailPage/ProductDetail';
import WomenPage from '../pages/Womenpage/WomenPage';

const AppRouter = () => {
  return (
    <Routes>
      {/* Homepage as root path */}
      <Route path="/" element={<Homepage />} />
      
      {/* Men's page route */}
      <Route path="/mens" element={<MensPage />} />



        {/* Women's page route */}
        <Route path="/women" element={<WomenPage />} />



    
      
      {/* Product detail routes */}
      <Route path="/product" element={<ProductDetailPage />} />
     



      {/* Add additional routes as needed */}
      {/* <Route path="/womens" element={<WomensPage />} /> */}
      {/* <Route path="/about" element={<AboutPage />} /> */}
      {/* <Route path="/contact" element={<ContactPage />} /> */}
      {/* <Route path="/cart" element={<CartPage />} /> */}
      {/* <Route path="/checkout" element={<CheckoutPage />} /> */}
      
      {/* 404 route - must be last */}
      <Route path="*" element={<div>Page not found</div>} />
    </Routes>
  );
};

export default AppRouter;