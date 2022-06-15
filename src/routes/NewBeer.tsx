import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import {
  Button,
  Dropdown,
  FloatingLabel,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BeerCard } from "../components";
import { api } from "../utils";
import { Brewery } from "../models";

const NewBeer: React.FC = () => {
  const navigate = useNavigate();

  const [breweries, setBreweries] = useState([]);

  const [showNewBrewery, setShowNewBrewery] = useState(false);

  const [name, setName] = useState("");
  const [breweryID, setBreweryID] = useState("");
  const [breweryName, setBreweryName] = useState("");
  const [breweryCountry, setBreweryCountry] = useState("");
  const [type, setType] = useState("");
  const [hops, setHops] = useState([""]);
  const [malts, setMalts] = useState([""]);
  const [abv, setABV] = useState(0);
  const [ibu, setIBU] = useState(0);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ): void => {
    const target = e.target as typeof e.target;

    switch (target.name) {
      case "name":
        setName(target.value);
        break;
      case "brewery":
        setBreweryName(target.value);
        break;
      case "breweryCountry":
        setBreweryCountry(target.value);
        break;
      case "type":
        setType(target.value);
        break;
      case "hops":
        setHops(target.value.toString().split(";"));
        break;
      case "malts":
        setMalts(target.value.toString().split(";"));
        break;
      case "abv":
        setABV(parseFloat(target.value));
        break;
      case "ibu":
        setIBU(parseFloat(target.value));
        break;
      default:
        console.log("Invalid name");
    }
  };

  const handleSelectBrewery = (
    _: React.MouseEvent<HTMLElement, MouseEvent>,
    brewery: Brewery
  ): void => {
    setBreweryName(brewery.name);
    setBreweryID(brewery._id);
  };

  const createBeer = (): void => {
    api
      .post("/beer", {
        name,
        type,
        brewery: breweryID,
        abv,
        ibu,
      })
      .then((res) => {
        console.log(res);
      });
  };

  const handleNewBeer = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (showNewBrewery) {
      api
        .post("/brewery", {
          name: breweryName,
          country: breweryCountry,
        })
        .then((res) => {
          setBreweryID(res.data.id);
          console.log(breweryID);
          createBeer();
          navigate("/beer");
        });
    } else {
      createBeer();
      navigate("/beer");
    }
  };

  useEffect(() => {
    api.get("/brewery").then((res) => {
      if (res.data) {
        setBreweries(res.data);
      }
    });
  }, []);

  return (
    <div>
      <Helmet>
        <title>Add New Beer - BrewMate</title>
      </Helmet>
      <Row xs={1} lg={2}>
        <Col>
          <Form onSubmit={(event) => handleNewBeer(event)}>
            <FloatingLabel className="mb-3" label="Name">
              <Form.Control
                required
                type="text"
                name="name"
                onChange={(event) => handleChange(event)}
                placeholder="Name"
              />
            </FloatingLabel>

            <Dropdown>
              <Dropdown.Toggle as={FloatingLabel} label="Brewery">
                <Form.Control
                  required
                  type="text"
                  name="brewery"
                  autoComplete="off"
                  onChange={(event) => handleChange(event)}
                  placeholder="Name"
                />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {breweries
                  .filter(
                    (brewery: Brewery) =>
                      !breweryName ||
                      brewery.name
                        .toLowerCase()
                        .includes(breweryName.toLowerCase())
                  )
                  .map((brewery: Brewery) => (
                    <Dropdown.Item
                      key={brewery._id}
                      onClick={(event) => handleSelectBrewery(event, brewery)}
                    >
                      {brewery.name}
                    </Dropdown.Item>
                  ))}
                <Dropdown.Divider />
                <Dropdown.Item onClick={() => setShowNewBrewery(true)}>
                  Not found? Add a new brewery.
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            {showNewBrewery ? (
              <div>
                <FloatingLabel className="mb-3" label="Brewery Country">
                  <Form.Control
                    required
                    type="text"
                    name="breweryCountry"
                    onChange={(event) => handleChange(event)}
                    placeholder="Brewery Country"
                  />
                </FloatingLabel>
              </div>
            ) : null}
            <FloatingLabel className="mb-3" label="Type">
              <Form.Control
                required
                type="text"
                name="type"
                onChange={(event) => handleChange(event)}
                placeholder="Type"
              />
            </FloatingLabel>
            {/* How to do Hops/Malts */}
            <Row>
              <Col>
                <FloatingLabel className="mb-3" label="ABV %">
                  <Form.Control
                    required
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    name="abv"
                    onChange={(event) => handleChange(event)}
                    placeholder="ABV %"
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel className="mb-3" label="IBU">
                  <Form.Control
                    required
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    name="ibu"
                    onChange={(event) => handleChange(event)}
                    placeholder="IBU"
                  />
                </FloatingLabel>
              </Col>
            </Row>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
        <Col>
          <BeerCard
            name={name || "Name"}
            brewery={breweryName || "Brewery"}
            type={type || "Type"}
            hops={hops || "..."}
            malts={malts || "..."}
            abv={abv || 0}
            ibu={ibu || 0}
          />
        </Col>
      </Row>
    </div>
  );
};

export { NewBeer };
