import React from "react";

const ProductCardSkeleton = () => (
  <div className="product-card__skeleton">
    <div className="product-card__skeleton-image" />
    <div className="product-card__skeleton-content">
      <div className="product-card__skeleton-title" />
      <div className="product-card__skeleton-price" />
      <div className="product-card__skeleton-button" />
    </div>
  </div>
);

export default ProductCardSkeleton;
