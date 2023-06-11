import React, { useState } from "react";

import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import PushPinIcon from "@mui/icons-material/PushPin";
import AddAlertOutlinedIcon from "@mui/icons-material/AddAlertOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import ClickAwayListener from "@mui/material/ClickAwayListener";

const CreateNote = ({ addHandler }) => {
  const [view, updateView] = useState(false);
  const [note, setNote] = useState({
    title: "",
    content: "",
    isPinned: false,
  });

  const resetNotes = () => {
    setNote({
      title: "",
      content: "",
      isPinned: false,
    });
  };

  const changeEvent = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    setNote((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  const addEvent = () => {
    addHandler(note);
    resetNotes();
  };

  const pinThisNote = () => {
    addHandler({ ...note, isPinned: true });
    resetNotes();
  };

  const changeView = () => {
    updateView(true);
  };

  const handleClickAway = () => {
    updateView(false);
    addHandler(note);
    resetNotes();
  };

  return (
    <>
      <ClickAwayListener onClickAway={handleClickAway}>
        <div className="main-input-div">
          <Tooltip title="Pin note" className="pin" onClick={pinThisNote}>
            <IconButton>
              <PushPinIcon />
            </IconButton>
          </Tooltip>

          {view ? (
            <input
              type="text"
              placeholder="Title"
              name="title"
              value={note.title}
              onChange={changeEvent}
              autoComplete="off"
            />
          ) : null}

          <textarea
            type="text"
            placeholder="Take a note..."
            name="content"
            rows="1"
            value={note.content}
            onChange={changeEvent}
            onClick={changeView}
          />

          {view ? (
            <div className="row option-menu">
              <div className="col-md-1 col-2">
                <Tooltip title="Remind Me">
                  <IconButton>
                    <AddAlertOutlinedIcon className="menu-icon" />
                  </IconButton>
                </Tooltip>
              </div>
              <div className="col-md-1 col-2">
                <Tooltip title="Collaborator">
                  <IconButton>
                    <PersonAddOutlinedIcon className="menu-icon" />
                  </IconButton>
                </Tooltip>
              </div>
              <div className="col-md-1 col-2">
                <Tooltip title="Change Color">
                  <IconButton>
                    <ColorLensOutlinedIcon className="menu-icon" />
                  </IconButton>
                </Tooltip>
              </div>
              <div className="col-md-1 col-2">
                <Tooltip title="Add Image">
                  <IconButton>
                    <ImageOutlinedIcon className="menu-icon" />
                  </IconButton>
                </Tooltip>
              </div>
              <div className="col-md-1 col-2">
                <Tooltip title="Archive">
                  <IconButton>
                    <ArchiveOutlinedIcon className="menu-icon" />
                  </IconButton>
                </Tooltip>
              </div>
              <div className="col-md-1 col-2">
                <Tooltip title="More">
                  <IconButton>
                    <MoreVertOutlinedIcon className="menu-icon" />
                  </IconButton>
                </Tooltip>
              </div>
              <div className="col-md-6 col-12 addnote-div">
                <button className="add-note-btn" onClick={addEvent}>
                  Add Note
                  <AddCircleOutlineOutlinedIcon className="ml-2" />
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </ClickAwayListener>
    </>
  );
};
export default CreateNote;
