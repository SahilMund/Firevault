//react import
import React, { useState } from "react";
//image import
import { ProfileImg } from "../../assets/images";

//material ui component imports
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
//material ui icon imports
import SettingsIcon from "@mui/icons-material/Settings";
import ViewStreamIcon from "@mui/icons-material/ViewStream";
import RefreshIcon from "@mui/icons-material/Refresh";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import WindowIcon from "@mui/icons-material/Window";
import { Dropdown, DropdownButton } from 'react-bootstrap';


const Header = ({ changeMode, navEvent, colorMode, setCurrentView, view , handleSearch, searchVal}) => {
  //  For enabling or disabling the dark mode
  const [state, setState] = useState("dark");
  const [navThemeState, updateNavThemeState] = useState("Enable Dark Theme");

  const handleChange = (event) => {
    if (state === "light") {
      setState("dark");
      updateNavThemeState("Enable Dark Theme");
    } else {
      setState("light");
      updateNavThemeState("Disable Dark Theme");
    }
    changeMode(state);
  };

  //  for showing active nav
  const toggleNav = () => {
    navEvent();
  };

  const handleViewChange = (type) => {
    setCurrentView(type);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light" id={colorMode}>
        {/* Menu icon */}
        <a className="nav-link " href="#">
          <Tooltip title="Main Menu" onClick={toggleNav}>
            <IconButton aria-label="Refresh">
              <MenuIcon />
            </IconButton>
          </Tooltip>
        </a>

        {/* Google Keep Image */}
        <a className="navbar-brand" href="/notes">
          <img
            src="https://img.icons8.com/color/48/000000/google-keep.png"
            className="ml-3 mr-2"
            alt=""
          />
          Keep
        </a>

        {/*  */}
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Search */}
        <form className="form-inline my-2 my-lg-0">
          <input
            className="form-control mr-sm-2 w-100 ml-md-5"
            type="search"
            placeholder="Search"
            value = {searchVal}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </form>

        <div className="collapse navbar-collapse navbar-customer-note-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            {/* Refresh */}
            <li className="nav-item">
              <a className="nav-link " href="/notes">
                <Tooltip title="Refresh">
                  <IconButton aria-label="Refresh">
                    <RefreshIcon />
                  </IconButton>
                </Tooltip>
              </a>
            </li>

            {/*List View  */}
            <li className="nav-item">
              {view === "grid" ? (
                <Tooltip title="List View">
                  <IconButton>
                    <ViewStreamIcon onClick={() => handleViewChange("list")} />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title="Gird View">
                  <IconButton>
                    <WindowIcon onClick={() => handleViewChange("grid")} />
                  </IconButton>
                </Tooltip>
              )}
            </li>

            {/* Settings */}
            <li className="nav-item dropdown">

              <DropdownButton id="navbarDropdown" title={<SettingsIcon />}
              >
                <Dropdown.Item href="#">Settings</Dropdown.Item>
                <Dropdown.Item href="#">Feedback</Dropdown.Item>
                <Dropdown.Item href="#" onClick={handleChange}>
                  {navThemeState}
                </Dropdown.Item>
                <Dropdown.Item href="#">Send Feedback</Dropdown.Item>
                <Dropdown.Item href="#">Help</Dropdown.Item>
                <Dropdown.Item href="#">App Downloads</Dropdown.Item>
                <Dropdown.Item href="#">Keyboard Shortcuts</Dropdown.Item>
              </DropdownButton>
            </li>

            {/* google apps */}
            <li className="nav-item">
              <Tooltip title="Google Apps">
                <IconButton>
                  <DragIndicatorIcon />
                </IconButton>
              </Tooltip>
            </li>
            {/* returning to home page */}
            <li className="nav-item">
              <a className="nav-link ml-md-3" href="/">
                <Tooltip title="Back to Home">
                  <IconButton>
                    <KeyboardReturnIcon />
                  </IconButton>
                </Tooltip>
              </a>
            </li>
            {/* user profile avatar */}
            <li className="nav-item d-flex justify-content-center align-items-center">
              <Tooltip title="Google Account">
                <Avatar alt="Travis Howard" src={ProfileImg} />
              </Tooltip>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
