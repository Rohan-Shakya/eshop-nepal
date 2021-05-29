import React, { useEffect } from "react";
import { Row, Col, ListGroup, Image, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, RouteComponentProps } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { actionTypes } from "../redux/actionTypes";
import { getOrderDetails, payOrder } from "../redux/actions/orderDetailsAction";
import { RootState } from "../redux/combineReducer";

const OrderPage = ({ match }: RouteComponentProps<{ id: string }>) => {
  const orderId: string = match.params.id;
  const dispatch = useDispatch();

  const { orderDetails, paid, loading, error } = useSelector(
    (state: RootState) => state.orderDetailsState
  );

  useEffect(() => {
    if (!orderDetails || Number(orderDetails._id) !== Number(orderId)) {
      dispatch({ type: actionTypes.ORDER_CREATE_RESET });
      orderId && dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, orderDetails, orderId]);

  useEffect(() => {
    if (paid && !orderDetails.isPaid) {
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, orderDetails, paid, orderId]);

  let itemsPrice = 0;
  if (!loading && !error && orderDetails) {
    itemsPrice = orderDetails.orderItems
      .reduce(
        (acc: number, item: OrderItems) => acc + Number(item.price) * item.qty,
        0
      )
      .toFixed(2);
  }

  const PaymentHandler = () => {
    console.log(orderId);

    dispatch(payOrder(orderId));
  };

  return !orderDetails || loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div>
      <h1>Order: {orderDetails._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            {orderDetails.shippingAddress && (
              <ListGroup.Item>
                <h2>Shipping</h2>
                <p>
                  <strong>Shipping: </strong>
                  {orderDetails.shippingAddress.address},{" "}
                  {orderDetails.shippingAddress.city}{" "}
                  {orderDetails.shippingAddress.postalCode},{" "}
                  {orderDetails.shippingAddress.country}
                </p>
              </ListGroup.Item>
            )}

            <ListGroup.Item>
              <p>
                <strong>Name: </strong> {orderDetails.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                <a href={`mailto:${orderDetails.user.email}`}>
                  {" "}
                  {orderDetails.user.email}
                </a>
              </p>
              {orderDetails.isDelivered ? (
                <Message variant="success">
                  Delivered on {orderDetails.deliveredAt}
                </Message>
              ) : (
                <Message variant="warning">Not DeliveredAt </Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Shipping: </strong>
                {orderDetails.paymentMethod}
              </p>
              {paid ? (
                <Message variant="success">
                  Paid on {orderDetails.paidAt}
                </Message>
              ) : (
                <Message variant="warning">Not Paid </Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {orderDetails.length === 0 ? (
                <Message variant="info">Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {orderDetails.orderItems.map(
                    (item: OrderItems, index: number) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={1}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </Col>
                          <Col>
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                          </Col>
                          <Col md={4}>
                            {item.qty} X ${item.price} = $
                            {(Number(item.qty) * Number(item.price)).toFixed(2)}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    )
                  )}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Order Summary</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Items: </Col>
                <Col>${itemsPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Shipping: </Col>
                <Col>${orderDetails.shippingPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Tax: </Col>
                <Col>${orderDetails.taxPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Total: </Col>
                <Col>${orderDetails.totalPrice}</Col>
              </Row>
            </ListGroup.Item>
            {!paid && (
              <ListGroup.Item className="my-2">
                {loading && <Loader />}
                <Button variant="primary" onClick={PaymentHandler}>
                  Confirm & Pay
                </Button>
              </ListGroup.Item>
            )}
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
};

export default OrderPage;
