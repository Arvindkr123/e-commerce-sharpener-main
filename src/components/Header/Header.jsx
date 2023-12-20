import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import HeaderCartButton from "../HeaderCartButton/HeaderCartButton";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useAuthContext } from "../../store/AuthContext";
import { useCartContext } from "../../store/CartProvider";

const Header = ({ showCartHandler }) => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuthContext();
  const { clearCart } = useCartContext();

  const logoutHandler = () => {
    clearCart();
    logout();
    navigate("/");
  };

  return (
    <Navbar expand="lg" bg="dark" data-bs-theme={"dark"}>
      <Container>
        <Navbar.Brand onClick={() => navigate("/")}>The Generics</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="m-auto">
            <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
            <Nav.Link onClick={() => navigate("/store")}>Store</Nav.Link>
            <Nav.Link onClick={() => navigate("/about")}>About</Nav.Link>
            <Nav.Link onClick={() => navigate("/contact")}>Contact Us</Nav.Link>
            {isLoggedIn ? (
              <Button onClick={logoutHandler}>LogOut</Button>
            ) : (
              <Nav.Link onClick={() => navigate("/auth")}>Login</Nav.Link>
            )}
          </Nav>
          {isLoggedIn && (
            <Nav className="justify-content-end">
              <HeaderCartButton showCartHandler={showCartHandler} />
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
