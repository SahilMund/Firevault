import React from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
const Header = () => {
  const navigate = useNavigate();
  const handleReturn = () => {
    navigate("/");
  };

  // const handleReturn = () => {}
  return (
    <>
      <h1>Hangman</h1>

      <div
        className="parent__icon__dark"
        style={{ cursor: "pointer" }}
      >
        <span className="icon__dark" onClick={handleReturn}>
          <ArrowBackIcon />
        </span>
      </div>

      <p>Find the hidden word - Enter a letter</p>
    </>
  );
};

export default Header;
