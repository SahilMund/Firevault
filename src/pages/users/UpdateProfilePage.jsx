import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function UpdateProfilePage() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const currPasswordRef = useRef();
  const { currentUser, updateUserPassword, updateUserEmail, reauthenticate } =
    useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleReload = ()=>{
    window.location.reload(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!currPasswordRef.current.value) {
      return setError("Please Enter your current Password to proceed");
    }
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    const promises = [];
    setLoading(true);
    setError("");

    try {
      await reauthenticate(currPasswordRef.current.value);
    } catch (err) {
      console.log(err);
      setError(
        err.message === "Firebase: Error (auth/wrong-password)."
          ? "You have Entered the wrong password, please check again"
          : err.message
      );
      return;
    }
    //  await user.updatePassword(newPassword)

    //     .then(() => {
    //       // Update the user's password
    //       return user.updatePassword(newPassword);
    //     })
    //     .then(() => {
    //       console.log("Password updated successfully.");
    //     })
    //     .catch((error) => {
    //       setError(error.message);
    //     });

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateUserEmail(emailRef.current.value));
    }
    if (currPasswordRef.current.value !== passwordRef.current.value) {
      promises.push(updateUserPassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        setError("");
        setLoading(true);
        setMessage("Profile updated successfully");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        setError((prev) => prev + ", Failed to update account");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      {/* <Card>
        <Card.Body style={{ width: "60%", margin: "5px auto" }}>
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                required
                defaultValue={currentUser.email}
              />
            </Form.Group>
            <Form.Group id="current_password">
              <Form.Label>Current Password</Form.Label>
              <Form.Control
                type="password"
                ref={currPasswordRef}
                placeholder="Please Enter Your Current Password"
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                placeholder="Please Enter Your New Password"
              />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                placeholder="Please Confirm Your New Password"
              />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card> */}

      <div className="container">
        <div className="login form">
          <header>Update Your Profile</header>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              ref={emailRef}
              required
              defaultValue={currentUser.email}
            />
            <input
              type="password"
              ref={currPasswordRef}
              placeholder="Please Enter Your Current Password"
            />
            <input
              type="password"
              ref={passwordRef}
              placeholder="Please Enter Your New Password"
            />
            <input
              type="password"
              ref={passwordConfirmRef}
              placeholder="Please Confirm Your New Password"
            />

            <input
              type="submit"
              disabled={loading}
              className="button"
              value="Submit"
            />
          </form>
          <div className="signup">
            <span className="signup">
             <Link onClick={handleReload}>Cancel</Link> |
              <Link to="/">Back</Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
