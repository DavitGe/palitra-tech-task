import { useEffect, useState, useMemo, useCallback } from "react";
import Product from "../components/catalog/Product";
import Header from "../components/Layout/Header";
import $api from "../utils/api";
import "./styles/catalog.styles.scss";
import type { CartsResponse } from "../components/catalog/types/catalog.types";

const fetchProducts = async (): Promise<CartsResponse> => {
  const response = await $api("https://dummyjson.com/carts");
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
};

const Catalog = () => {
  const [cartsData, setCartsData] = useState<CartsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleProducts, setVisibleProducts] = useState(6); // Start with 6 products
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Flatten all products from all carts
  const allProducts = useMemo(() => {
    if (!cartsData) return [];
    return cartsData.carts.flatMap((cart) => cart.products);
  }, [cartsData]);

  // Check if we have more products to load
  const hasMoreProducts = visibleProducts < allProducts.length;

  // Load more products function
  const loadMoreProducts = useCallback(() => {
    if (!hasMoreProducts || isLoadingMore) return;

    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleProducts((prev) => Math.min(prev + 6, allProducts.length));
      setIsLoadingMore(false);
    }, 300); // Small delay to simulate loading
  }, [hasMoreProducts, isLoadingMore, allProducts.length]);

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    if (isLoadingMore || !hasMoreProducts) return;

    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    // Load more when user is within 100px of the bottom
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      loadMoreProducts();
    }
  }, [loadMoreProducts, isLoadingMore, hasMoreProducts]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        setCartsData(data);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An unknown error occurred";
        setError(errorMessage);
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Add scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  if (loading) {
    return (
      <div className="catalog-container">
        <Header />
        <div className="catalog-content">
          <div>Loading products...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="catalog-container">
        <Header />
        <div className="catalog-content">
          <div>Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="catalog-container">
      <Header />
      <div className="catalog-content">
        <div className="products-grid">
          {allProducts.slice(0, visibleProducts).map((product) => (
            <Product
              key={product.id}
              name={product.title}
              image={product.thumbnail}
              price={product.price}
              productId={product.id}
            />
          ))}
        </div>

        {isLoadingMore && (
          <div className="loading-more">
            <div className="loading-spinner"></div>
            <span>Loading more products...</span>
          </div>
        )}

        {!hasMoreProducts && allProducts.length > 0 && (
          <div className="no-more-data">No more data</div>
        )}
      </div>
    </div>
  );
};

export default Catalog;
