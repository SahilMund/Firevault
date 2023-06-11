import React, { useEffect, useState } from "react";
import {  Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

import '../../styles/forms.css';

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // useEffect(() => {
  //   if (currentUser) navigate("/login");
  // }, [currentUser,navigate]);

  const resetInputs = () => {
    setEmail("");
    setPassword("");
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    // console.log(email, password);
    try {
      await signup(email, password);
      setError("");
      setLoading(true);
      setSuccess("You have Signed Up Successfully !! Proceed for Login");

    
    } catch (err) {
      console.log(err);
      setError("Failed to create an account , " + err.message);
    } finally {
      resetInputs();

      setLoading(false);
    }
  };

  return (
    <>
     

      <div className="container">
        <div className="login form">
          <header>Sign Up</header>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <form onSubmit={handleSignup}>
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
            <input
              type="submit"
              disabled={loading}
              className="button"
              value="Sign Up"
            />
          </form>
          <div className="signup">
            <span className="signup">
              Already have an account?
              <Link to="/login">LogIn</Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
