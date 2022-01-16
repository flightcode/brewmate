import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Row, Col, Form, FloatingLabel } from "react-bootstrap";
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

  const search = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const target = e.target as typeof e.target;

    setSearchTerm(target.value);
  };

  useEffect(() => {
    api.get("/beer").then((res) => {
      if (res.data) {
        setBeers(res.data);
      }
    });
  }, []);

  return (
    <div>
      <Helmet>
        <title>Beers - BrewMate</title>
      </Helmet>
      <FloatingLabel className="mb-3" label="Search beers">
        <Form.Control
          type="text"
          name="searchTerm"
          placeholder="Search Beers"
          onChange={(event) => search(event)}
        />
      </FloatingLabel>
      <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {beers
          .filter((beer: Beer) => beer.name.includes(searchTerm))
          .map((beer: Beer) => (
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
