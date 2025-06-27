import { useState, useCallback, useEffect } from "react";
import $api from "../utils/api";
import type {
  ProductsResponse,
  Product as ProductType,
} from "../components/catalog/types/catalog.types";

const PRODUCTS_PER_PAGE = 20;

const fetchProducts = async (
  limit: number,
  skip: number
): Promise<ProductsResponse> => {
  const response = await $api(
    `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
};

export const useProducts = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);

  // Deduplicate products by ID
  const deduplicateProducts = useCallback((products: ProductType[]) => {
    const seen = new Set<number>();
    return products.filter((product) => {
      if (seen.has(product.id)) {
        return false;
      }
      seen.add(product.id);
      return true;
    });
  }, []);

  // Load initial products
  const loadInitialProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchProducts(PRODUCTS_PER_PAGE, 0);
      const deduplicatedProducts = deduplicateProducts(data.products);

      setProducts(deduplicatedProducts);
      setHasMoreData(deduplicatedProducts.length >= PRODUCTS_PER_PAGE);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      console.error("Failed to fetch products:", err);
    } finally {
      setLoading(false);
    }
  }, [deduplicateProducts]);

  // Load more products for infinite scroll
  const loadMoreProducts = useCallback(async () => {
    if (loading || isLoadingMore || !hasMoreData) {
      return;
    }

    setIsLoadingMore(true);

    try {
      const skip = products.length;
      const data = await fetchProducts(PRODUCTS_PER_PAGE, skip);
      const newProducts = data.products;

      if (newProducts.length === 0) {
        setHasMoreData(false);
      } else {
        setProducts((prev) => {
          const combined = [...prev, ...newProducts];
          return deduplicateProducts(combined);
        });
        setHasMoreData(newProducts.length >= PRODUCTS_PER_PAGE);
      }
    } catch (err) {
      console.error("Failed to load more products:", err);
      // Don't set main error state for load more failures
    } finally {
      setIsLoadingMore(false);
    }
  }, [
    products.length,
    loading,
    isLoadingMore,
    hasMoreData,
    deduplicateProducts,
  ]);

  // Initialize products on mount
  useEffect(() => {
    loadInitialProducts();
  }, [loadInitialProducts]);

  return {
    products,
    loading,
    error,
    isLoadingMore,
    hasMoreData,
    loadMoreProducts,
    retry: loadInitialProducts,
  };
};
