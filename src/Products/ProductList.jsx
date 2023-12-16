import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import productsArr from "./data";
import { useCartContext } from "../store/CartProvider";

const ProductList = () => {
  const { addItem } = useCartContext();
  const addtoCart = (item) => {
    // console.log(item);
    addItem({ amount: 1, ...item });
  };
  return (
    <Container>
      <Row xs={1} lg={2} className="g-4">
        {productsArr.map((item) => {
          return (
            <Col key={item.id} lg={3}>
              <Card className="my-5">
                <Card.Img src={item.imageUrl} className="image-container" />
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>
                    RS <b>{item.price}</b>
                  </Card.Text>
                </Card.Body>
                <Button type="button" onClick={() => addtoCart(item)}>
                  Add to Cart
                </Button>
              </Card>
            </Col>
          );
        })}
        ;
      </Row>
    </Container>
  );
};

export default ProductList;
