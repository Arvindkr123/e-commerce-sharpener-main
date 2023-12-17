import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import HeaderCartButton from "../HeaderCartButton/HeaderCartButton";

const Header = ({ showCartHandler }) => {
  return (
    <Navbar expand="lg" bg="dark" data-bs-theme={"dark"}>
      <Container>
        <Navbar.Brand href="#home">The Generics</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="m-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/store">Store</Nav.Link>
            <Nav.Link href="/store">About</Nav.Link>
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
