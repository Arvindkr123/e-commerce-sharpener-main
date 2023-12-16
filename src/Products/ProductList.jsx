import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import productsArr from "./data";

const ProductList = () => {
  return (
    <Container>
      <Row xs={1} lg={2} className="g-4">
        {productsArr.map((item, i) => {
          return (
            <Col key={i} lg={3}>
              <Card className="my-5">
                <Card.Img src={item.imageUrl} className="image-container" />
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>
                    RS <b>{item.price}</b>
                  </Card.Text>
                </Card.Body>
                <Button>Add to Cart</Button>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default ProductList;
