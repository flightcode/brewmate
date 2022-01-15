import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Row, Col, Form, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { api } from "../utils";
import { BeerCard } from "../components";

interface Beer {
  _id: string;
  name: string;
  brewery: string;
  type: string;
  hops: string[];
  malts: string[];
  abv: number;
  ibu: number;
}

const BeerList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [beers, setBeers] = useState([]);

  const search = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      searchTerm: { value: string };
    };

    setSearchTerm(target.searchTerm.value);
  };

  useEffect(() => {
    if (searchTerm) {
      api.get(`/beers/${searchTerm}`).then((res) => {
        if (res.data) {
          setBeers(res.data);
        }
      });
    } else {
      api.get("/beers").then((res) => {
        if (res.data) {
          setBeers(res.data);
        }
      });
    }
  });

  return (
    <div>
      <Helmet>
        <title>Beers - BrewMate</title>
      </Helmet>
      <Row xs={1} md={2} lg={3}>
        <Col>
          <Form onSubmit={(event) => search(event)}>
            <Form.Group className="mb-3" controlId="formSearch">
              <Form.Control
                required
                type="text"
                name="searchTerm"
                placeholder="Search Beers..."
              />
            </Form.Group>
          </Form>
        </Col>
        <Col>
          <LinkContainer to="/beer/new">
            <Button variant="primary">New</Button>
          </LinkContainer>
        </Col>
      </Row>
      <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {beers.map((beer: Beer) => (
          <Col key={beer._id}>
            <BeerCard
              name={beer.name}
              brewery={beer.brewery}
              type={beer.type}
              hops={beer.hops}
              malts={beer.malts}
              abv={beer.abv}
              ibu={beer.ibu}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export { BeerList };
