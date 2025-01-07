import React, { useState } from "react";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DashboardForm from "./DashboardForm";
import { Dashboard } from "../redux/dashboardSlice";

interface DashboardItemProps {
  title: string;
  description: string;
  dashboard: Dashboard;
  groupName: string;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onEdit: (dashboard: Dashboard) => void;
  onDelete: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const DashboardItem: React.FC<DashboardItemProps> = ({
  title,
  description,
  dashboard,
  groupName,
  onMoveUp,
  onMoveDown,
  onEdit,
  onDelete,
  isFirst,
  isLast,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showForm, setShowForm] = useState(false);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setShowForm(true);
    handleMenuClose();
  };

  const handleFormClose = () => {
    setShowForm(false);
  };

  return (
    <Box display="flex" alignItems="center" my={1} sx={{ border: '1px solid lightgrey', borderRadius: 1, padding: 1, marginBottom: 2 }}>
      <Box display="flex" flexDirection="column" alignItems="center" sx={{ mr: 2 }}>
        <IconButton onClick={onMoveUp} disabled={isFirst}>
          <ExpandLessIcon />
        </IconButton>
        <IconButton onClick={onMoveDown} disabled={isLast}>
          <ExpandMoreIcon />
        </IconButton>
      </Box>
      <Box display="flex" justifyContent="space-between" flexGrow={1} sx={{ mx: 2 }}>
        <Box display="flex" flexDirection="column" sx={{ flex: 1 }}>
          <Typography variant="h5" sx={{ mb: 1 }}>
            {title}
          </Typography>
        </Box>
        <Box display="flex" flexDirection="column" sx={{ flex: 1 }}>
          <Typography variant="body1">
            {description}
          </Typography>
        </Box>
      </Box>
      <IconButton onClick={handleMenuOpen}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem
          onClick={() => {
            onDelete();
            handleMenuClose();
          }}
        >
          Delete
        </MenuItem>
      </Menu>
      {showForm && (
        <DashboardForm
          isEdit={true}
          initialValues={{
            id: dashboard.id,
            title: dashboard.title,
            shortTitle: dashboard.shortTitle,
            description: dashboard.description,
            groups: [groupName],
            embedLink: dashboard.embedLink,
          }}
          onClose={handleFormClose}
          onSubmit={(updatedDashboard) => {
            onEdit({
              ...updatedDashboard,
              groups: dashboard.groups,
            });
            handleFormClose();
          }}
        />
      )}
    </Box>
  );
};

export default DashboardItem;
