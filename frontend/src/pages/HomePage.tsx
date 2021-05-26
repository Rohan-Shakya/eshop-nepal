import React from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import products from "../products";

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Latest Products</h1>
      <Row>
        {products.length === 0 ? (
          <h1>No Data</h1>
        ) : (
          products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))
        )}
      </Row>
    </div>
  );
};

export default HomePage;
