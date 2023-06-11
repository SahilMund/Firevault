import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ".././styles/home.css";
// import { useAuth } from "./../authenticate/contexts/AuthContext";

import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import { bgImg } from "../assets/images";
import { useAuth } from "../contexts/AuthContext";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import CollectionsIcon from "@mui/icons-material/Collections";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";

const HomePage = () => {
  const { logout, setCurrentUser, currentUser } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    logout()
      .then((user) => {
        setCurrentUser(null);
        alert("Logout Successful");
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="wrapper">
        {/* <img src={bgImg} alt="" /> */}
        <div className="title">
          <h1>
            Welcome,<b>{currentUser.email.split("@")[0]}</b>
          </h1>
          <p>Welcome to your own Vault. Secure || User Friendly</p>

          <div className="parent__icons">
            <Tooltip
              className="icons__home"
              title="LogOut"
              onClick={handleSignOut}
            >
              <IconButton>
                <ExitToAppOutlinedIcon />
              </IconButton>
            </Tooltip>

            <Tooltip className="icons__home" title="Update-Profile">
              <Link to="/update-profile">
                <IconButton>
                  <PermIdentityOutlinedIcon />
                </IconButton>
              </Link>
            </Tooltip>
          </div>
        </div>

        <div className="main">
          <div className="boxes">
            <div className="top">
              {/* <span className="material-icons icns">collections</span> */}
              <CollectionsIcon className="icns" />
            </div>
            <Link to="/gallery">
              <div className="bottom">
                <h3>Gallery</h3>
                <span className="material-icons">arrow_forward</span>
              </div>
            </Link>
          </div>

          <div className="boxes">
            <div className="top">
              {/* <span className="material-icons icns">library_books</span> */}
              <NoteAddIcon className="icns" />
            </div>
            <Link to="/notes">
              <div className="bottom">
                <h3>Notes</h3>
                <span className="material-icons">arrow_forward</span>
              </div>
            </Link>
          </div>
          <div className="boxes">
            <div className="top">
              {/* <span className="material-icons icns">event_note</span> */}
              <SportsEsportsIcon className="icns" />
            </div>
            <Link to="/hangman">
              {" "}
              <div className="bottom">
                <h3>Games</h3>
                <span className="material-icons">arrow_forward</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
