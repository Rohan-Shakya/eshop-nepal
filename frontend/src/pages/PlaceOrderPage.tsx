import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Button, Row, Col, ListGroup, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import { actionTypes } from "../redux/actionTypes";
import { RootState } from "../redux/combineReducer";
import { createOrder } from "../redux/actions/orderCreateAction";

const PlaceOrderPage = ({ history }: RouteComponentProps) => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cartState);
  const { success, order, error } = useSelector(
    (state: RootState) => state.orderCreateState
  );

  let cartItems: CartItem | any = cart.cartItems;

  const itemsPrice = cartItems
    .reduce(
      (acc: number, item: CartItem) =>
        Number(acc) + Number(item.price) * Number(item.qty),
      0
    )
    .toFixed(2);

  const shippingPrice = (itemsPrice > 100 ? 0 : 10).toFixed(2);

  const taxPrice = Number(0.13 * itemsPrice).toFixed(2);

  const totalPrice = (
    Number(itemsPrice) +
    Number(shippingPrice) +
    Number(taxPrice)
  ).toFixed(2);

  const orderData = {
    orderItems: cartItems,
    shippingAddress: cart.shippingAddress,
    paymentMethod: cart.paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  };

  if (!cart.paymentMethod) {
    history.push("/payment");
  }

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
      dispatch({ type: actionTypes.ORDER_CREATE_RESET });
    }
  }, [success, history]);

  const placeOrder = () => {
    dispatch(createOrder(orderData));
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Shipping: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}{" "}
                {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Shipping: </strong>
                {cart.paymentMethod}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message variant="info">Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map(
                    (item: CartItem, index: number | string) => (
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
                <Col>${shippingPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Tax: </Col>
                <Col>${taxPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Total: </Col>
                <Col>${totalPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              {error && <Message variant="danger">{error}</Message>}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={placeOrder}
              >
                Place Order
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
};

export default PlaceOrderPage;
