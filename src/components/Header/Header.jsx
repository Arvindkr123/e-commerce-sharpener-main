import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import HeaderCartButton from "../HeaderCartButton/HeaderCartButton";
import { useNavigate } from "react-router-dom";

const Header = ({ showCartHandler }) => {
  const navigate = useNavigate();

  return (
    <Navbar expand="lg" bg="dark" data-bs-theme={"dark"}>
      <Container>
        <Navbar.Brand href="#home">The Generics</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="m-auto">
            <Nav.Link onClick={() => navigate("/")} href="#">
              Home
            </Nav.Link>
            <Nav.Link onClick={() => navigate("/store")} href="#">
              Store
            </Nav.Link>
            <Nav.Link onClick={() => navigate("/about")} href="#">
              About
            </Nav.Link>
          </Nav>
          <Nav className="justify-content-end">
            <HeaderCartButton showCartHandler={showCartHandler} />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
