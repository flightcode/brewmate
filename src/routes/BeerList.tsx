import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Row, Col } from "react-bootstrap";
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
  const [beers, setBeers] = useState([]);

  useEffect(() => {
    api
      .get("http://localhost:5000/api/beer")
      .then((res) => {
        if (res.data) {
          setBeers(res.data);
          console.log(res.data);
        }
      })
      .catch((err) => console.log(err));
  }, [""]);

  return (
    <div>
      <Helmet>
        <title>Beers - BrewMate</title>
      </Helmet>
      <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {beers.map((beer: Beer) => (
          <Col>
            <BeerCard
              key={beer._id}
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
