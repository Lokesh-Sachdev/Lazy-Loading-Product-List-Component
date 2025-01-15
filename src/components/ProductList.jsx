import React, { useCallback } from "react";
import { useObserver } from "../hooks/useObserver";
import { useProductsQuery } from "../hooks/useProductQuery";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { ErrorBoundary } from "react-error-boundary";
import "../styles/ProductList.scss";

const ProductList = () => {
  const {
    products,
    loading,
    error,
    hasMore,
    fetchProducts,
    totalProductsLoaded,
  } = useProductsQuery();

  const handleAddToCart = useCallback((product) => {
    console.log("Adding to cart:", product);
  }, []);

  const observerRef = useObserver({
    onIntersect: fetchProducts,
    enabled: hasMore && !loading,
    rootMargin: "200px",
  });

  return (
    <ErrorBoundary
      fallback={
        <div className="product-list__error">
          Something went wrong. Please refresh the page.
        </div>
      }
    >
      <div className="product-list">
        <div className="product-list__grid">
          {products.map((product, index) => (
            <ProductCard
              key={`${product.imageUrl}-${index}`}
              product={product}
              onAddToCart={handleAddToCart}
              isVisible={true}
            />
          ))}
        </div>

        {error && (
          <div className="product-list__error">
            {error}
            <button
              onClick={() => fetchProducts()}
              className="product-list__error-button"
            >
              Try again
            </button>
          </div>
        )}

        <div ref={observerRef} className="product-list__loader">
          {loading && <ProductCardSkeleton />}
        </div>

        {!hasMore && totalProductsLoaded > 0 && (
          <div className="product-list__end">All products have been loaded</div>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default ProductList;
