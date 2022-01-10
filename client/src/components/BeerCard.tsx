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
    <Card.Img variant="top" src="https://via.placeholder.com/1000x1600" />
    <Card.Body>
      <Card.Title>{props.name}</Card.Title>
      <Card.Subtitle>{props.brewery}</Card.Subtitle>
      <Card.Text>
        {props.type}
        <br />
        ABV: {props.abv}% IBU: {props.ibu}
        <br />
        Hops: {props.hops.join(", ")}
        <br />
        Malts: {props.malts.join(", ")}
        <br />
      </Card.Text>
      <ListGroup variant="flush" />
      <Button variant="primary">Review</Button>
    </Card.Body>
  </Card>
);

export { BeerCard };
