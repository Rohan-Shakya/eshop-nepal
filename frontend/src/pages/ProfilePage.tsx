import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  getUserDetails,
  updateUserProfile,
} from "../redux/actions/userDetailsAction";
import { RootState } from "../redux/combineReducer";

const ProfilePage = ({ history }: RouteComponentProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const { loading, userDetails, error } = useSelector(
    (state: RootState) => state.userDetailsState
  );

  const { userInfo } = useSelector((state: RootState) => state.userState);

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!userDetails || !userDetails.name) {
        dispatch(getUserDetails("profile"));
      } else {
        setName(userDetails.name);
        setEmail(userDetails.email);
      }
    }
  }, [dispatch, history, userInfo, userDetails]);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setMessage("Password do not match");
    }

    dispatch(
      updateUserProfile({
        id: userDetails._id,
        name,
        email,
        password,
      })
    );

    setMessage("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <Row>
      <Col md={3}>
        <h1>User Profile</h1>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name" className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              required
              placeholder="Enter Username"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email" className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="confirmPassword" className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary" className="my-2">
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
      </Col>
    </Row>
  );
};

export default ProfilePage;
