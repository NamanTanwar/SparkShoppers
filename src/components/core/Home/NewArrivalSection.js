import React, { useState, useEffect } from 'react';
import { fetchNewProducts } from '../../../services/operations/productAPI';
import ProductCard from '../../common/ProductCard';

const NewArrivalSection = ({ scrollToRef }) => {
  const [newProducts, setNewProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNewProducts(setIsLoading, setError, setNewProducts);
  }, []);

  return (
    <div className="mt-8 px-4" ref={scrollToRef}>
      <h1 className="text-3xl font-semibold mb-6 text-center">New Arrivals</h1>
      {isLoading && <div className="text-center">Loading...</div>}
      {error && <div className="text-center text-red-500">Error: {error}</div>}
      {newProducts && newProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {newProducts.map((product, index) => (
            <ProductCard key={index} product={product} height={'340px'} width={'300px'}/>
          ))}
        </div>
      ) : (
        !isLoading && <div className="text-center">No new arrivals</div>
      )}
    </div>
  );
};

export default NewArrivalSection;
