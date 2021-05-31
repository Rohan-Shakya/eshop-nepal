import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Product from "../components/Product";
import { listProducts } from "../redux/actions/productAction";
import { RootState } from "../redux/combineReducer";
import { RouteComponentProps } from "react-router-dom";

const HomePage = ({ history }: RouteComponentProps) => {
  const dispatch = useDispatch();
  const { loading, products, error } = useSelector(
    (state: RootState) => state.productState
  );

  let keyword = history.location.search;

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <div>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
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
      )}
    </div>
  );
};

export default HomePage;
