import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Form, Button, FloatingLabel } from "react-bootstrap";
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
      <Helmet>
        <title>Log In - BrewMate</title>
      </Helmet>
      <p>Log In</p>
      <Form onSubmit={(event) => logIn(event)}>
        <FloatingLabel className="mb-3" label="Email address">
          <Form.Control
            required
            type="email"
            name="email"
            placeholder="Email address"
          />
        </FloatingLabel>
        <FloatingLabel className="mb-3" label="Password">
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
          />
        </FloatingLabel>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export { Login };
