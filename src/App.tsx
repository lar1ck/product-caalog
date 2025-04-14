// App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainApp';
import ProductDetails from './pages/ProductDetails';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/product/:id" element={<ProductDetails />} />
    </Routes>
  );
};

export default App;
