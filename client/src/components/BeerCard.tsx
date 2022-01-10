import React from "react";
import { Card, ListGroup, Button } from "react-bootstrap";

interface Beer {
  name: string;
  brewery: string;
  type: string;
  hops: string[];
  malts: string[];
  abv: number;
  ibu: number;
}

const BeerCard: React.FC<Beer> = (props: Beer) => (
  <Card className="mx-auto" style={{ width: "18rem" }}>
    <Card.Img variant="top" src="https://via.placeholder.com/250x500" />
    <Card.Body>
      <Card.Title>{props.name}</Card.Title>
      <Card.Subtitle>{props.brewery}</Card.Subtitle>
      <Card.Subtitle>{props.type}</Card.Subtitle>
      <ListGroup variant="flush">
        <ListGroup.Item>Description</ListGroup.Item>
        <ListGroup.Item>Hops: {props.hops.join(", ")}</ListGroup.Item>
        <ListGroup.Item>Malts: {props.malts.join(", ")}</ListGroup.Item>
        <ListGroup.Item>
          ABV: {props.abv}% IBU: {props.ibu}
        </ListGroup.Item>
      </ListGroup>
      <Button variant="primary">Review</Button>
    </Card.Body>
  </Card>
);

export { BeerCard };
