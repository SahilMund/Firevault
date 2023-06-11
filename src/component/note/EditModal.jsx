import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import SaveIcon from "@mui/icons-material/Save";
import { FormControl } from "react-bootstrap";
import {
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { updateFirebaseNote } from "../../helpers/firebase-notes";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function EditModal({ note, open, setOpen }) {
  const handleClose = () => setOpen(false);

  const [title, setTitle] = useState(note.title);
  const [desc, setDesc] = useState(note.content);

  const handleEditChange = async () => {
    if (!title || !desc) {
      alert("Title & Description can't be empty");
      return;
    }

    await updateFirebaseNote(note.id, { title, desc });

    alert("Updated ....");
    handleClose();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ mb: 2, textAlign: "center" }}
          >
            Edit your Text
          </Typography>

          <TextField
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{
              width: 300,
              input: { textAlign: "center", padding: 1, fontSize: 20 },
            }}
          />
          <TextField
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
            sx={{
              width: 300,
              mt: 3,
              input: { textAlign: "center", padding: 1, fontSize: 20 },
            }}
          />
          <Button
            variant="contained"
            onClick={handleEditChange}
            sx={{
              marginTop: 2,
              borderRadius: 0,
              boxShadow: "none",
              width: 300,
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            <SaveIcon />
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
