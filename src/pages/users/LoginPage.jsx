import React, { useEffect, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/user.css";
import "../../styles/forms.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, setCurrentUser, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {console.log(currentUser);
  //   if (currentUser) navigate("/");
  // }, [currentUser]);

  const handleSignin = async (e) => {
    e.preventDefault();
    console.log(email, password);
    try {
      const loggedInUser = await login(email, password);
      // console.log(user);
      setCurrentUser(loggedInUser.user);
      setError("");
      setLoading(true);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError("Pls validate your email and password, " + err.message);
    }

    setLoading(false);
  };

  return (
    <>
      {/* <Card>
        <Card.Body className="card__body">
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSignin}>
            <Form.Group id="email" className="form__group">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group id="password" className="form__group">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div> */}

      <div className="container">
        <div className="login form">
          <header>Login</header>
          {error && <Alert variant="danger">{error}</Alert>}

          <form onSubmit={handleSignin}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
            <a href="/forgot-password">Forgot password?</a>
            <input type="submit" disabled={loading} className="button" value="Login" />
          </form>
          <div className="signup">
            <span className="signup">
              Don't have an account?
              <Link to="/signup">Sign Up</Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
