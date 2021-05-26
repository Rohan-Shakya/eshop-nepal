import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { listProducts } from "../redux/actions/productAction";
import { RootState } from "../redux/combineReducer";

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const { loading, products, error } = useSelector(
    (state: RootState) => state.productState
  );

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <div>
      <h1>Latest Products</h1>
      <Row>
        {products.length === 0 ? (
          <h1>No Data</h1>
        ) : (
          products &&
          products.map((product: Product) => (
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
