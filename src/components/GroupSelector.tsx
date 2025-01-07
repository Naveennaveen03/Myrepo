import React, { useState } from "react";
import { TextField, Checkbox, IconButton, ListItemSecondaryAction, ListItemText, Dialog, DialogActions, DialogContent, DialogTitle, Button, MenuItem, InputAdornment, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { addGroup, editGroup as editGroupAction } from "../redux/dashboardSlice";

interface GroupSelectorProps {
  selectedGroups: string[];
  setSelectedGroups: (groups: string[]) => void;
  groupSelectionText: string;
  setGroupSelectionText: (text: string) => void;
  onDone: () => void;
}

const GroupSelector: React.FC<GroupSelectorProps> = ({
  selectedGroups,
  setSelectedGroups,
  groupSelectionText,
  setGroupSelectionText,
  onDone,
}) => {
  const groups = useSelector((state: RootState) => state.dashboards.groups);
  const dispatch = useDispatch();
  const [editGroupName, setEditGroupName] = useState<string | null>(null);
  const [newGroup, setNewGroup] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [showNewGroupField, setShowNewGroupField] = useState<boolean>(false);

  const handleToggle = (group: string) => {
    const currentIndex = selectedGroups.indexOf(group);
    const newSelectedGroups = [...selectedGroups];

    if (currentIndex === -1) {
      newSelectedGroups.push(group);
    } else {
      newSelectedGroups.splice(currentIndex, 1);
    }

    setSelectedGroups(newSelectedGroups);
    setGroupSelectionText(`${newSelectedGroups.length} selected`);
  };

  const handleEditGroup = (group: string) => {
    setEditGroupName(group);
    setNewGroup(group);
  };

  const handleSaveEditGroup = () => {
    if (editGroupName !== null && newGroup) {
      dispatch(editGroupAction({ groupName: editGroupName, newName: newGroup }));
      setSelectedGroups(selectedGroups.map((g) => (g === editGroupName ? newGroup : g)));
    }
    setEditGroupName(null);
    setNewGroup("");
  };

  const handleAddGroup = () => {
    console.log(newGroup && !groups.find(g => g.groupName !== newGroup), newGroup);
    if (newGroup && !groups.find(g => g.groupName == newGroup)) {
      dispatch(addGroup(newGroup));
    }
    setNewGroup("");
    setShowNewGroupField(false);
  };

  const handleNewGroupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewGroup(e.target.value);
  };

  const handleDone = () => {
    onDone();
    setShowDropdown(false);
  };

  return (
    <Box>
      <TextField
        fullWidth
        margin="dense"
        value={groupSelectionText}
        onClick={() => setShowDropdown(!showDropdown)}
        InputProps={{
          readOnly: true,
          endAdornment: (
            <IconButton onClick={() => setShowDropdown(!showDropdown)}>
              <ArrowDropDownIcon />
            </IconButton>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": { borderColor: "green" },
          },
          "& .MuiInputLabel-root": { "&.Mui-focused": { color: "green" } },
        }}
      />
      {showDropdown && (
        <Box border={1} borderRadius={1} padding={2} mt={1}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Button onClick={handleDone} color="success">Done</Button>
          </Box>
          {groups.map((group) => (
            <MenuItem key={group.groupName} value={group.groupName}>
              <Checkbox
                checked={selectedGroups.indexOf(group.groupName) > -1}
                onClick={() => handleToggle(group.groupName)}
                sx={{ color: "green", "&.Mui-checked": { color: "green" } }}
              />
              <ListItemText primary={group.groupName} />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={() => handleEditGroup(group.groupName)}
                >
                  <EditIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </MenuItem>
          ))}
          {!showNewGroupField ? (
            <Box display="flex" alignItems="center" padding="8px" onClick={() => setShowNewGroupField(true)}>
              <AddIcon />
              <Button color="success">Add New Group</Button>
            </Box>
          ) : (
            <Box display="flex" alignItems="center" padding="8px">
              <TextField
                value={newGroup}
                onChange={handleNewGroupChange}
                placeholder="New Group"
                fullWidth
                margin="dense"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton color="success" onClick={handleAddGroup}>
                        <CheckIcon />
                      </IconButton>
                      <IconButton color="secondary" onClick={() => setShowNewGroupField(false)}>
                        <CloseIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": { borderColor: "green" },
                  },
                  "& .MuiInputLabel-root": {
                    "&.Mui-focused": { color: "green" },
                  },
                }}
              />
            </Box>
          )}
        </Box>
      )}

      {editGroupName && (
        <Dialog open={!!editGroupName} onClose={() => setEditGroupName(null)}>
          <DialogTitle>Edit Group</DialogTitle>
          <DialogContent>
            <TextField
              value={newGroup}
              onChange={handleNewGroupChange}
              fullWidth
              margin="dense"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditGroupName(null)} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleSaveEditGroup} color="success">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default GroupSelector;
