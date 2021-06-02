import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import { RootState } from "../redux/combineReducer";
import { deleteProduct } from "../redux/actions/productDeleteAction";
import { listProducts } from "../redux/actions/productAction";
import { createProduct } from "../redux/actions/productCreateAction";
import { actionTypes } from "../redux/actionTypes";

const ProductListPage = ({
  history,
  match,
}: RouteComponentProps<{ id: string }>) => {
  const dispatch = useDispatch();

  const { loading, error, products, page, pages } = useSelector(
    (state: RootState) => state.productState
  );

  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product,
  } = useSelector((state: RootState) => state.productCreateState);

  const { userInfo } = useSelector((state: RootState) => state.userState);

  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = useSelector((state: RootState) => state.productDeleteState);

  let keyword = history.location.search;
  useEffect(() => {
    dispatch({ type: actionTypes.PRODUCT_CREATE_RESET });

    if (userInfo.isAdmin) {
      dispatch(listProducts(keyword));
    }

    if (successCreate) {
      history.push(`/admin/product/${product._id}/edit`);
    }
  }, [
    dispatch,
    history,
    userInfo,
    keyword,
    successCreate,
    successDelete,
    product,
  ]);

  const deleteHandler = (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <div>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>

        <Col className="text-right d-flex justify-content-end">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>

      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}

      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorDelete}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {products.map((product: Product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>

                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>

                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </div>
      )}
    </div>
  );
};

export default ProductListPage;
