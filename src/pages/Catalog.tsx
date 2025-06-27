import Product from "../components/catalog/Product";
import Header from "../components/Layout/Header";
import LoadingMessage from "../components/catalog/LoadingMessage";
import ErrorMessage from "../components/catalog/ErrorMessage";
import { useProducts } from "../hooks/useProducts";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import "./styles/catalog.styles.scss";

const Catalog = () => {
  const {
    products,
    loading,
    error,
    isLoadingMore,
    hasMoreData,
    loadMoreProducts,
    retry,
  } = useProducts();

  useInfiniteScroll({
    onLoadMore: loadMoreProducts,
    hasMore: hasMoreData,
    isLoading: loading || isLoadingMore,
  });

  if (loading) {
    return (
      <div className="catalog-container">
        <Header />
        <div className="catalog-content">
          <LoadingMessage message="Loading products..." />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="catalog-container">
        <Header />
        <div className="catalog-content">
          <ErrorMessage error={error} onRetry={retry} />
        </div>
      </div>
    );
  }

  return (
    <div className="catalog-container">
      <Header />
      <div className="catalog-content">
        <div className="products-grid">
          {products.map((product) => (
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
          <LoadingMessage
            message="Loading more products..."
            className="loading-more"
          />
        )}

        {!hasMoreData && products.length > 0 && (
          <div className="no-more-data">
            <span>No more products to load</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Catalog;
