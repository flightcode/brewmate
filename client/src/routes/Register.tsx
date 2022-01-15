import React, { useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { api } from "../utils";

const Register: React.FC = () => {
  const navigate = useNavigate();

  const register = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      name: { value: string };
      email: { value: string };
      password: { value: string };
    };

    const user = {
      name: target.name.value,
      email: target.email.value,
      password: target.password.value,
    };

    api
      .post("/user/register", {
        name: user.name,
        email: user.email,
        password: user.password,
      })
      .then((res) => {
        if (res.status === 200) {
          navigate("/login");
        }
      });
  };

  useEffect(() => {
    api.get("/user/isAuth").then((res) => {
      if (res.status === 200) {
        navigate("/dashboard");
      }
    });
  });
  return (
    <div>
      <p>Register</p>
      <Form onSubmit={(event) => register(event)}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Username</Form.Label>
          <Form.Control
            required
            type="text"
            name="name"
            placeholder="Username"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            required
            type="email"
            name="email"
            placeholder="Email address"
          />
          <Form.Text className="text-muted">
            We&apos;ll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            required
            type="checkbox"
            label="I agree to the Privacy Policy."
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export { Register };