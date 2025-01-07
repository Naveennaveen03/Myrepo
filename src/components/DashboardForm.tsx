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
import { addDashboard, updateDashboard, Dashboard } from "../redux/dashboardSlice";
import GroupSelector from "./GroupSelector";
import { v4 as uuidv4 } from 'uuid';

interface DashboardInfo {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  groups: string[];
  embedLink: string;
}
interface DashboardFormProps {
  onClose: () => void;
  initialValues: DashboardInfo;   
  isEdit: boolean;
  onSubmit: (dashboard: DashboardInfo) => void;
}

const DashboardForm: React.FC<DashboardFormProps> = ({ onClose, initialValues, isEdit, onSubmit }) => {
  const [title, setTitle] = useState(initialValues.title);
  const [shortTitle, setShortTitle] = useState(initialValues.shortTitle);
  const [description, setDescription] = useState(initialValues.description);
  const [selectedGroups, setSelectedGroups] = useState<string[]>(initialValues.groups);
  const [embedLink, setEmbedLink] = useState(initialValues.embedLink);
  const [groupSelectionText, setGroupSelectionText] = useState("Select...");
  const dispatch = useDispatch();

  const handleGroupSelectionDone = () => {
    setGroupSelectionText(`${selectedGroups.length} selected`);
  };

  const handleSubmit = () => {
    const newDashboard: DashboardInfo = {
      id: initialValues.id || uuidv4(),
      title,
      shortTitle,
      description,
      groups: selectedGroups,
      embedLink,
    };

    if (isEdit) {
      dispatch(updateDashboard({ id: newDashboard.id, updatedDashboard: newDashboard }));
    } else {
      dispatch(addDashboard({ groups: selectedGroups, dashboard: newDashboard }));
    }

    onSubmit(newDashboard);
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
      <DialogTitle>{isEdit ? 'Edit Dashboard' : 'Add Dashboard'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Title"
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
          label="Short Title"
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
