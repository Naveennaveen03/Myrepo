import React, { useState } from "react";
import { Box, IconButton, TextField, Menu, MenuItem } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CheckIcon from "@mui/icons-material/Check";

interface DashboardItemProps {
  title: string;
  description: string;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onEdit: (title: string, description: string) => void;
  onDelete: () => void;
}

const DashboardItem: React.FC<DashboardItemProps> = ({
  title,
  description,
  onMoveUp,
  onMoveDown,
  onEdit,
  onDelete,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setIsEditing(true);
    handleMenuClose();
  };

  const handleSave = () => {
    if (editTitle.trim() && editDescription.trim()) {
      onEdit(editTitle.trim(), editDescription.trim()); // Call the parent onEdit function
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(title); // Reset to the original title
    setEditDescription(description); // Reset to the original description
    setIsEditing(false);
  };

  return (
    <Box display="flex" alignItems="center" my={1}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <IconButton onClick={onMoveUp}>
          <ExpandLessIcon />
        </IconButton>
        <IconButton onClick={onMoveDown}>
          <ExpandMoreIcon />
        </IconButton>
      </Box>
      {isEditing ? (
        <>
          <TextField
            variant="outlined"
            size="small"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            sx={{ mx: 1 }}
          />
          <TextField
            variant="outlined"
            size="small"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            sx={{ mx: 1 }}
          />
          <IconButton onClick={handleSave}>
            <CheckIcon />
          </IconButton>
          <IconButton onClick={handleCancel}>
            <MoreVertIcon /> {/* You can replace this with a cancel icon */}
          </IconButton>
        </>
      ) : (
        <>
          <TextField
            variant="outlined"
            size="small"
            value={title}
            InputProps={{ readOnly: true }}
            sx={{ mx: 1 }}
          />
          <TextField
            variant="outlined"
            size="small"
            value={description}
            InputProps={{ readOnly: true }}
            sx={{ mx: 1 }}
          />
          <IconButton onClick={handleMenuOpen}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleEdit}>Edit</MenuItem>
            <MenuItem onClick={onDelete}>Delete</MenuItem>
          </Menu>
        </>
      )}
    </Box>
  );
};

export default DashboardItem;
