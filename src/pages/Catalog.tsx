import Header from "../components/Layout/Header";
import "./styles/catalog.styles.scss";

const Catalog = () => {
  return (
    <div className="catalog-container">
      <Header />
      <div className="catalog-content">{/* TODO: products */}</div>
    </div>
  );
};

export default Catalog;
