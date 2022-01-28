import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { BsSearch } from "react-icons/bs";
import { Row, Col, Form, InputGroup, Alert } from "react-bootstrap";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
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
  const navigate = useNavigate();

  const [beers, setBeers] = useState([]);

  useEffect(() => {
    api.get("/beer").then((res) => {
      if (res.data) {
        setBeers(res.data);
      }
    });
  }, []);

  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ): void => {
    const target = e.target as typeof e.target;

    const newParams: { [key: string]: string } = {};
    searchParams.forEach((value, key) => {
      newParams[key] = value;
    });

    newParams[target.name] = target.value;

    setSearchParams(newParams);
  };

  useEffect(() => {
    const newParams = new URLSearchParams();
    searchParams.forEach((value, key) => {
      if (value !== "") {
        newParams.set(key, value);
      }
    });

    if (newParams.toString() !== searchParams.toString()) {
      setSearchParams(newParams);
      navigate(
        {
          search: createSearchParams(newParams).toString(),
        },
        { replace: true }
      );
    }
  }, [searchParams, setSearchParams]);

  const filterByName = (beer: Beer): boolean => {
    return beer.name
      .toLowerCase()
      .includes((searchParams.get("name") || "").toLowerCase());
  };

  const filterByType = (beer: Beer): boolean => {
    if ((searchParams.get("type") || "") === "") {
      return true;
    }
    return beer.type
      .toLowerCase()
      .split(" ")
      .includes((searchParams.get("type") || "").toLowerCase());
  };

  return (
    <div>
      <Helmet>
        <title>Beers - BrewMate</title>
      </Helmet>
      <InputGroup className="mb-3">
        <InputGroup.Text>
          <BsSearch />
        </InputGroup.Text>
        <Form.Control
          type="text"
          name="name"
          placeholder="Search Beers"
          value={searchParams.get("name") || ""}
          onChange={(event) => handleSearch(event)}
        />
        <Form.Select
          aria-label="Search Types"
          name="type"
          value={searchParams.get("type")?.toLowerCase() || ""}
          onChange={(event) => handleSearch(event)}
        >
          <option value="">Types</option>
          <option value="ale">Ale</option>
          <option value="lager">Lager</option>
          <option value="porter">Porter</option>
          <option value="stout">Stout</option>
          <option value="sour">Sour</option>
        </Form.Select>
      </InputGroup>

      <Row xs={1} md={2} lg={3} xl={4}>
        {beers
          .filter(filterByName)
          .filter(filterByType)
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
      <Alert variant="secondary" className="mt-3">
        Not found?{" "}
        <LinkContainer to="/beer/new">
          <Alert.Link>Add a new beer</Alert.Link>
        </LinkContainer>
        .
      </Alert>
    </div>
  );
};

export { BeerList };
