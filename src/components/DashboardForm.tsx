import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addDashboard } from "../redux/dashboardSlice";
import GroupSelector from "./GroupSelector";

interface DashboardFormProps {
  onClose: () => void;
}

const DashboardForm: React.FC<DashboardFormProps> = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [shortTitle, setShortTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [embedLink, setEmbedLink] = useState("");
  const [groupSelectionText, setGroupSelectionText] = useState("Select...");
  const dispatch = useDispatch();

  const handleGroupSelectionDone = () => {
    setGroupSelectionText(`${selectedGroups.length} selected`);
  };

  const handleSubmit = () => {
    const newDashboard = {
      title,
      shortTitle,
      description,
      groups: selectedGroups,
      embedLink,
    };
    dispatch(addDashboard(newDashboard));
    setTitle("");
    setShortTitle("");
    setDescription("");
    setSelectedGroups([]);
    setEmbedLink("");
    setGroupSelectionText("Select groups");
    onClose();
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Add Dashboard</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Title input field"
          type="text"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": { borderColor: "green" },
            },
            "& .MuiInputLabel-root": { "&.Mui-focused": { color: "green" } },
          }}
        />
        <TextField
          margin="dense"
          label="Short Title input filed"
          type="text"
          fullWidth
          value={shortTitle}
          onChange={(e) => setShortTitle(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": { borderColor: "green" },
            },
            "& .MuiInputLabel-root": { "&.Mui-focused": { color: "green" } },
          }}
        />
        <TextField
          margin="dense"
          label="Description"
          type="text"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": { borderColor: "green" },
            },
            "& .MuiInputLabel-root": { "&.Mui-focused": { color: "green" } },
          }}
        />
        <GroupSelector
          selectedGroups={selectedGroups}
          setSelectedGroups={setSelectedGroups}
          groupSelectionText={groupSelectionText}
          setGroupSelectionText={setGroupSelectionText}
          onDone={handleGroupSelectionDone}
          
        />
        <TextField
          margin="dense"
          label="Tableau Embed Link"
          type="text"
          fullWidth
          value={embedLink}
          onChange={(e) => setEmbedLink(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": { borderColor: "green" },
            },
            "& .MuiInputLabel-root": { "&.Mui-focused": { color: "green" } },
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="success">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DashboardForm;
