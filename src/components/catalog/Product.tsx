import { useState, useCallback } from "react";
import Typography from "../shared/Typography";
import BrokenImage from "../shared/icons/BrokenImage";
import Message from "../shared/Message";
import LoadingSpinner from "../shared/icons/LoadingSpinner";
import "./product.styles.scss";
import Cart from "../shared/icons/Cart";
import $api from "../../utils/api";

interface IProductProps {
  name: string;
  image: string;
  price: number;
  productId: number;
}

const Product: React.FC<IProductProps> = ({
  name,
  image,
  price,
  productId,
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
    isVisible: boolean;
  }>({
    type: "success",
    text: "",
    isVisible: false,
  });

  const handleCloseMessage = useCallback(() => {
    setMessage((prev) => ({ ...prev, isVisible: false }));
  }, []);

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  function handleAddToCart() {
    if (isAddingToCart) return; // Prevent multiple clicks

    setIsAddingToCart(true);

    $api("https://dummyjson.com/carts/1", {
      method: "PUT",
      body: JSON.stringify({
        merge: true,
        products: [{ id: productId, quantity: 1 }],
      }),
    })
      .then(() => {
        setMessage({
          type: "success",
          text: "Product added to cart successfully!",
          isVisible: true,
        });
      })
      .catch(() => {
        setMessage({
          type: "error",
          text: "Failed to add product to cart. Please try again.",
          isVisible: true,
        });
      })
      .finally(() => {
        setIsAddingToCart(false);
      });
  }

  return (
    <>
      <div className="product-container">
        {imageError ? (
          <div className="product-image-error">
            <BrokenImage color="#afafaf" size={34} />
          </div>
        ) : (
          <div className="product-image">
            {imageLoading && (
              <div className="product-image-loading">
                <LoadingSpinner color="#6c46aa" size={30} />
              </div>
            )}
            <img
              src={image}
              alt={name}
              onLoad={handleImageLoad}
              onError={handleImageError}
              width={200}
              height={260}
              style={{
                objectFit: "cover",
                opacity: imageLoading ? 0 : 1,
                transition: "opacity 0.3s ease-in-out",
              }}
            />
          </div>
        )}
        <div className="product-name">
          <Typography
            font="FiraGO"
            size="lg"
            style={{
              maxWidth: 200,
              textOverflow: "ellipsis",
              wordBreak: "break-all",
              overflow: "hidden",
              whiteSpace: "nowrap",
              display: "block",
            }}
          >
            {name}
          </Typography>
        </div>
        <div className="product-info">
          <Typography
            font="FiraGO"
            weight="medium"
            size="lg"
            className="product-info-price"
          >
            {price?.toFixed(2)}₾
          </Typography>
          <div
            style={{ cursor: isAddingToCart ? "default" : "pointer" }}
            onClick={handleAddToCart}
          >
            {isAddingToCart ? (
              <LoadingSpinner color="#000000" size={20} />
            ) : (
              <Cart color="#000000" size={20} />
            )}
          </div>
        </div>
      </div>

      <Message
        type={message.type}
        message={message.text}
        isVisible={message.isVisible}
        onClose={handleCloseMessage}
      />
    </>
  );
};

export default Product;
