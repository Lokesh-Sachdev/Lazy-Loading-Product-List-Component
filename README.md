# Lazy Loading Product Listing Page Documentation

## Overview
This document describes the logic and approach taken to implement a React component that handles lazy loading for a product listing page. The component fetches 48 products from an API in batches but only renders 8 product images initially. As the user scrolls, additional images are rendered progressively until all 48 products are displayed. After reaching the end of the current batch, the component fetches the next set of 48 products.

## Features
- Fetches products in batches of 48 from an API.
- Initially renders 8 products in the viewport.
- Uses lazy loading to progressively render more products as the user scrolls.
- Implements an infinite scroll mechanism to fetch additional products when the end of the current batch is reached.

## Components
### 1. `useProductsQuery` Hook
This custom hook manages the fetching and state of the products.

#### State Variables
- `products`: Array to store the list of products fetched.
- `loading`: Boolean to indicate if a fetch request is in progress.
- `error`: String to store any error messages.
- `hasMore`: Boolean to indicate if there are more products to load.
- `totalProductsLoaded`: Integer to track the total number of products loaded.

#### Constants
- `PRODUCTS_PER_BATCH`: Number of products fetched per batch from the API (set to 48).
- `PRODUCTS_PER_VIEW`: Number of products rendered initially (set to 8).

#### Functions
- `fetchProducts`: Asynchronous function to fetch products from the API. It handles pagination by calculating the start and end index of the next batch to load.

```javascript
const fetchProducts = useCallback(async () => {
  if (loading || !hasMore) return;

  try {
    setLoading(true);
    setError(null);

    const response = await fetch('https://api.example.com/products');
    if (!response.ok) throw new Error('Failed to fetch products');

    const data = await response.json();
    const allProducts = data || [];

    const startIndex = totalProductsLoaded;
    const endIndex = startIndex + PRODUCTS_PER_VIEW;
    const nextBatch = allProducts.slice(startIndex, endIndex);

    setProducts(prev => [...prev, ...nextBatch]);
    setTotalProductsLoaded(endIndex);
    setHasMore(endIndex < allProducts.length);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
}, [loading, hasMore, totalProductsLoaded]);
```

### 2. `ProductList` Component
This component renders the list of products and handles the lazy loading.

#### Logic
- Uses the `useProductsQuery` hook to fetch and manage product data.
- Implements an `IntersectionObserver` to detect when the user scrolls near the bottom of the page, triggering the next batch of product images to load.
- Renders `ProductCard` components for each product.

#### JSX Structure
```jsx
<div className="product-list">
  <div className="product-list__grid">
    {products.map((product, index) => (
      <ProductCard
        key={product.id}
        product={product}
      />
    ))}
  </div>

  {loading && <div>Loading...</div>}

  {error && <div>Error: {error}</div>}

  {!hasMore && <div>All products have been loaded</div>}

  {hasMore && <div ref={observerRef}></div>}
</div>
```

### 3. `useIntersectionObserver` Hook
This hook sets up an `IntersectionObserver` to monitor when the user scrolls near the bottom of the product list, triggering the `fetchProducts` function.

## Workflow
1. **Initial Load**: When the `ProductList` component mounts, it fetches the first 48 products but only renders 8 in the viewport.
2. **Progressive Rendering**: As the user scrolls, more products are progressively rendered.
3. **Infinite Scroll**: Once all 48 products from the current batch are rendered, the `fetchProducts` function is called again to fetch the next batch of 48 products.
4. **Error Handling**: If the fetch request fails, an error message is displayed, and the user can retry fetching products.

## Enhancements
- **Debouncing Fetch Requests**: Implementing debouncing to prevent multiple fetch requests when the user scrolls quickly.
- **Caching**: Caching fetched products to reduce API calls and improve user experience when navigating back to the product list.
- **Optimized Rendering**: Using React's `memo` to prevent unnecessary re-renders of the `ProductCard` components.

## Conclusion
This implementation ensures efficient loading and rendering of products in a user-friendly manner, optimizing performance and improving the overall user experience with lazy loading and infinite scrolling.


