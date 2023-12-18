import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import config from "../config/config";

function Contact() {
  const [user, setUser] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(true);

  const onChangeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${config.dbKey}/contacts.json`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      setLoading(false);
      setUser({ name: "", email: "", phone: "" });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <Container className="">
      <Row>
        <Col xs={12} md={6} lg={6} className="m-auto mt-5">
          <Form onSubmit={submitHandler}>
            <h1 className="text-center">Contact Us</h1>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                type="text"
                value={user.name}
                placeholder="Enter your name"
                onChange={onChangeHandler}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                name="email"
                type="email"
                value={user.email}
                onChange={onChangeHandler}
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                name="phone"
                type="number"
                value={user.phone}
                onChange={onChangeHandler}
                placeholder="Phone number"
              />
            </Form.Group>
            <Button disabled={!loading} variant="primary" type="submit">
              {!loading ? "Submitting your information" : "Contact Us"}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Contact;
