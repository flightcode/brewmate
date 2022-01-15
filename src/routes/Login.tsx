import React, { useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { api } from "../utils";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const logIn = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };

    const user = {
      email: target.email.value,
      password: target.password.value,
    };

    api
      .post("/user/login", {
        email: user.email,
        password: user.password,
      })
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("token", res.data.token);
          navigate("/dashboard");
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
      <p>Log In</p>
      <Form onSubmit={(event) => logIn(event)}>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            required
            type="email"
            name="email"
            placeholder="Email address"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export { Login };
