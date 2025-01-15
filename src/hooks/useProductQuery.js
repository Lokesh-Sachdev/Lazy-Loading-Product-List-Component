import { useState, useCallback } from "react";

export const useProductsQuery = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [totalProductsLoaded, setTotalProductsLoaded] = useState(0);
  const PRODUCTS_PER_BATCH = 48; // Number of products to show initially

  const fetchProducts = useCallback(async () => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        "https://api.jsonbin.io/v3/qs/67882130acd3cb34a8cc3d99"
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch products");
      }

      const data = await response.json();
      const allProducts = data?.record?.record || [];

      const startIndex = totalProductsLoaded;
      const endIndex = startIndex + PRODUCTS_PER_BATCH;
      const nextBatch = allProducts.slice(startIndex, endIndex);

      if (nextBatch.length > 0) {
        setProducts((prev) => [...prev, ...nextBatch]);
        setTotalProductsLoaded(endIndex);
        // Check if we've loaded all available products
        setHasMore(endIndex < allProducts.length);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore]);

  return {
    products,
    loading,
    error,
    hasMore,
    fetchProducts,
    totalProductsLoaded,
  };
};
