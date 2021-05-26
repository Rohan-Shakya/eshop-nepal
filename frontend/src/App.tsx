import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Components
import HomePage from "./pages/HomePage";

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
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
