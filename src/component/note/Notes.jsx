import React, { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import AddAlertOutlinedIcon from "@mui/icons-material/AddAlertOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import EditModal from "./EditModal";

const Notes = (props) => {
  const [open, setOpen] = useState(false);

  const deleteThisNote = () => {
    props.deleteEvent(props.id);
  };

  const handleEditMode = () => {
    setOpen(true);
  };

  return (
    <>
    {
      open && <EditModal open={open} setOpen={setOpen} note={props}/>
    }
      <div className="note">
        <h1>{props.title}</h1>
        <p>{props.content}</p>
        <div className="row option-menu">
          <div className="col-2">
            <Tooltip title="Remind Me">
              <IconButton>
                <AddAlertOutlinedIcon className="menu-icon" />
              </IconButton>
            </Tooltip>
          </div>
        
          <div className="col-2">
            <Tooltip title="Change Color">
              <IconButton>
                <ColorLensOutlinedIcon className="menu-icon" />
              </IconButton>
            </Tooltip>
          </div>
          <div className="col-2">
            <Tooltip title="Add Image">
              <IconButton>
                <ImageOutlinedIcon className="menu-icon" />
              </IconButton>
            </Tooltip>
          </div>
          <div className="col-2">
            <Tooltip title="Archive">
              <IconButton>
                <ArchiveOutlinedIcon className="menu-icon" />
              </IconButton>
            </Tooltip>
          </div>
          <div className="col-2">
            <Tooltip title="Edit" onClick={handleEditMode}>
              <IconButton>
                <ModeEditIcon className="menu-icon" />
              </IconButton>
            </Tooltip>
          </div>
          <div className="col-2">
            <Tooltip
              title="Delete Note"
              className="delete-icon"
              onClick={deleteThisNote}
            >
              <IconButton>
                <DeleteOutlineOutlinedIcon className="menu-icon" />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </div>
    </>
  );
};
export default Notes;
