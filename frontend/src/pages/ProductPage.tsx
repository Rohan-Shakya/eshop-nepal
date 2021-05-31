import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { RouteComponentProps } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Rating from "../components/Rating";
import { RootState } from "../redux/combineReducer";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetail } from "../redux/actions/productAction";
import { createProductReview } from "../redux/actions/productCreateReviewAction";
import { actionTypes } from "../redux/actionTypes";

const ProductPage = ({ match }: RouteComponentProps<{ id: string }>) => {
  const [qty, setQty] = useState<number>(1);
  const [rating, setRating] = useState<number | string>(0);
  const [comment, setComment] = useState<string>("");
  const dispatch = useDispatch();
  const history = useHistory();

  const { loading, product, error } = useSelector(
    (state: RootState) => state.productState
  );

  const { userInfo } = useSelector((state: RootState) => state.userState);

  const {
    loading: loadingProductReview,
    error: errorProductReview,
    success: successProductReview,
  } = useSelector((state: RootState) => state.productReviewCreateState);

  let numOfStock = [];
  if (product && product.countInStock) {
    for (let i = 1; i <= product.countInStock; i++) numOfStock.push(i);
  }

  useEffect(() => {
    if (successProductReview) {
      setRating(0);
      setComment("");
      dispatch({ type: actionTypes.PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetail(String(match.params.id)));
  }, [dispatch, match, successProductReview]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    );
  };

  return (
    <div>
      <Link to='/' className='btn btn-light my-3'>
        Go Back
      </Link>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        product && (
          <div>
            <Row>
              <Col md={6}>
                <Image src={product.image} alt={product.name} fluid />
              </Col>
              <Col md={3}>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h3>{product.name}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Rating
                      value={product.rating}
                      text={`${product.numReviews} reviews`}
                      color='#f8e825'
                    />
                  </ListGroup.Item>
                  <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                  <ListGroup.Item>
                    Description: {product.description}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={3}>
                <Card>
                  <ListGroup variant='flush'>
                    <ListGroup.Item>
                      <Row>
                        <Col>Price:</Col>
                        <Col>
                          <strong>${product.price}</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Status:</Col>
                        <Col>
                          {product.countInStock > 0
                            ? "In Stock"
                            : "Out of Stock"}
                        </Col>
                      </Row>
                    </ListGroup.Item>

                    {product.countInStock > 0 && (
                      <ListGroup.Item>
                        <Row>
                          <Col>Qty</Col>
                          <Col xs='auto' className='my-1'>
                            <Form.Control
                              as='select'
                              value={`${qty}`}
                              onChange={(e) => setQty(Number(e.target.value))}
                            >
                              {numOfStock.map((x) => (
                                <option key={x} value={x}>
                                  {x}
                                </option>
                              ))}
                            </Form.Control>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    )}

                    <ListGroup.Item>
                      <Button
                        className='btn-block'
                        disabled={product.countInStock === 0}
                        type='button'
                        onClick={addToCartHandler}
                      >
                        Add to Cart
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
            <Row className='mt-4'>
              <Col md={6}>
                <h4>Reviews</h4>
                {product.reviews.length === 0 && (
                  <Message variant='info'>No Reviews</Message>
                )}

                <ListGroup variant='flush'>
                  {product.reviews.map((review: Review) => (
                    <ListGroup.Item key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating value={review.rating} color='#f8e825' />
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))}

                  <ListGroup.Item>
                    <h4>Write a review</h4>

                    {loadingProductReview && <Loader />}
                    {successProductReview && (
                      <Message variant='success'>Review Submitted</Message>
                    )}
                    {errorProductReview && (
                      <Message variant='danger'>{errorProductReview}</Message>
                    )}

                    {userInfo ? (
                      <Form onSubmit={submitHandler}>
                        <Form.Group controlId='rating' className='my-3'>
                          <Form.Label>Rating</Form.Label>
                          <Form.Control
                            as='select'
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                          >
                            <option value=''>Select...</option>
                            <option value='1'>1 - Poor</option>
                            <option value='2'>2 - Fair</option>
                            <option value='3'>3 - Good</option>
                            <option value='4'>4 - Very Good</option>
                            <option value='5'>5 - Excellent</option>
                          </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='comment' className='my-3'>
                          <Form.Label>Review</Form.Label>
                          <Form.Control
                            as='textarea'
                            // row='5'
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          ></Form.Control>
                        </Form.Group>

                        <Button
                          disabled={loadingProductReview}
                          type='submit'
                          variant='primary'
                        >
                          Submit
                        </Button>
                      </Form>
                    ) : (
                      <Message variant='info'>
                        Please <Link to='/login'>login</Link> to write a review
                      </Message>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </div>
        )
      )}
    </div>
  );
};

export default ProductPage;
