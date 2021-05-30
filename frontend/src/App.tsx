import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Components
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import ShippingPage from "./pages/ShippingPage";
import PaymentPage from "./pages/PaymentPage";
import PlaceOrderPage from "./pages/PlaceOrderPage";
import OrderPage from "./pages/OrderPage";
import UserListPage from "./pages/UserListPage";
import UserEditPage from "./pages/UserEditPage";
import ProductListPage from "./pages/ProductListPage";
import ProductEditScreen from "./pages/ProductEditScreen";

// Styles
import "./bootstrap.min.css";
import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/product/:id" component={ProductPage} />
            <Route path="/cart/:id?" component={CartPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/register" component={RegisterPage} />
            <Route exact path="/profile" component={ProfilePage} />
            <Route exact path="/shipping" component={ShippingPage} />
            <Route exact path="/payment" component={PaymentPage} />
            <Route exact path="/placeorder" component={PlaceOrderPage} />
            <Route exact path="/order/:id" component={OrderPage} />
            <Route exact path="/admin/userslist" component={UserListPage} />
            <Route exact path="/admin/user/:id/edit" component={UserEditPage} />
            <Route
              exact
              path="/admin/productslist"
              component={ProductListPage}
            />
            <Route
              exact
              path="/admin/product/:id/edit"
              component={ProductEditScreen}
            />
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
