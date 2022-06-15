import React, { useEffect } from "react";
import { Form } from "react-bootstrap";
import { useParams } from "react-router-dom";

const BeerInfo: React.FC = () => {
  const { id } = useParams();

  useEffect(() => {
    if (id === "new") {
      console.log("Add New");
    } else {
      console.log("View and Review");
    }
  });

  return (
    <div>
      <Form.Group className="mb-3" controlId="formName">
        <Form.Label>Username</Form.Label>
        <Form.Control required type="text" name="name" placeholder="Username" />
      </Form.Group>
    </div>
  );
};

export { BeerInfo };
