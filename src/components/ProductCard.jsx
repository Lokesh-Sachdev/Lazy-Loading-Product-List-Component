import React, { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const ProductCard = ({ product, onAddToCart, isVisible }) => {
  const [imageError, setImageError] = useState(false);

  if (!isVisible) {
    return <ProductCardSkeleton />;
  }

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="product-card">
      <div className="product-card__image-container">
        {!imageError ? (
          <LazyLoadImage
            src={product.imageUrl}
            alt={product.productName}
            effect="blur"
            className="product-card__image"
            onError={handleImageError}
            threshold={100}
          />
        ) : (
          <div className="product-card__image-fallback">
            Product Image Not Available
          </div>
        )}
      </div>
      <div className="product-card__content">
        <h3 className="product-card__title">{product.productName}</h3>
        <div className="product-card__price">
          <span className="product-card__current-price">
            ${parseFloat(product.productPrice).toFixed(2)}
          </span>
        </div>
        <button
          className="product-card__add-button"
          onClick={() => onAddToCart(product)}
        >
          <ShoppingCart className="product-card__cart-icon" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
