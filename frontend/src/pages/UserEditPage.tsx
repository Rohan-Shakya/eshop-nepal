import React, { useState, useEffect } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { RootState } from "../redux/combineReducer";
import { getUserDetails } from "../redux/actions/userDetailsAction";
import { actionTypes } from "../redux/actionTypes";
import { updateUser } from "../redux/actions/userUpdateAction";

const UserEditPage = ({
  match,
  history,
}: RouteComponentProps<{ id: string }>) => {
  const userId = match.params.id;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const { error, loading, userDetails } = useSelector(
    (state: RootState) => state.userDetailsState
  );

  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = useSelector((state: RootState) => state.userUpdateState);

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: actionTypes.USER_UPDATE_RESET });
      history.push("/admin/userslist");
    } else {
      if (!userDetails.name || userDetails._id !== Number(userId)) {
        dispatch(getUserDetails(userId));
      } else {
        setName(userDetails.name);
        setEmail(userDetails.email);
        setIsAdmin(userDetails.isAdmin);
      }
    }
  }, [dispatch, userDetails, userId, successUpdate, history]);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userDetails._id, name, email, isAdmin }));
  };

  return (
    <div>
      <Link to="/admin/userslist">Go Back</Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name" className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Username"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="idAdmin" className="mb-3">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type="submit" variant="primary" className="my-2">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </div>
  );
};

export default UserEditPage;
