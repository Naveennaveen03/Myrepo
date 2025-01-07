import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Box, Button, Collapse, IconButton, Menu, MenuItem, TextField } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import SettingsIcon from '@mui/icons-material/Settings';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { updateGroupDashboards, removeDashboard } from "../redux/dashboardSlice";
import DashboardItem from "./DashboardItem";
import { Dashboard } from "../redux/dashboardSlice";

interface GroupItemProps {
  groupName: string;
  dashboards: Dashboard[];
  onRenameGroup: (groupName: string, newName: string) => void;
  onDeleteGroup: (groupName: string) => void;
  expandAll: boolean; // Add this prop
}

const GroupItem: React.FC<GroupItemProps> = ({
  groupName,
  dashboards,
  onRenameGroup,
  onDeleteGroup,
  expandAll,
}) => {
  const [isExpanded, setIsExpanded] = useState(expandAll);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isRenaming, setIsRenaming] = useState(false);
  const [newGroupName, setNewGroupName] = useState(groupName);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsExpanded(expandAll);
  }, [expandAll]);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleRename = () => {
    setIsRenaming(true);
    setAnchorEl(null);
  };

  const handleRenameSubmit = () => {
    onRenameGroup(groupName, newGroupName);
    setIsRenaming(false);
  };

  const handleDelete = () => {
    onDeleteGroup(groupName);
    setAnchorEl(null);
  };

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: groupName });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleEditDashboard = (updatedDashboard: Dashboard) => {
    dispatch(
      updateGroupDashboards({
        groupName,
        dashboards: dashboards.map(dashboard => 
          dashboard.id === updatedDashboard.id ? updatedDashboard : dashboard
        ),
      })
    );
  };

  const handleDeleteDashboard = (dashboardId: string) => {
    dispatch(removeDashboard(dashboardId));
  };

  const moveDashboard = (fromIndex: number, toIndex: number) => {
    const newDashboards = [...dashboards];
    const [movedDashboard] = newDashboards.splice(fromIndex, 1);
    newDashboards.splice(toIndex, 0, movedDashboard);
    dispatch(updateGroupDashboards({ groupName, dashboards: newDashboards }));
  };

  return (
    <Box mb={2} ref={setNodeRef} style={style} {...attributes} data-id={groupName}>
      <Box display="flex" alignItems="center" mb={1}>
        <IconButton {...listeners}>
          <DragIndicatorIcon />
        </IconButton>
        {isRenaming ? (
          <>
            <TextField
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              size="small"
            />
            <Button onClick={handleRenameSubmit}>✓</Button>
          </>
        ) : (
          <Button
            onClick={handleExpand}
            variant="contained"
            endIcon={isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          >
            {groupName}
          </Button>
        )}
        <IconButton onClick={handleMenuOpen}>
          <SettingsIcon />
        </IconButton>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={handleRename}>Rename</MenuItem>
          <MenuItem onClick={handleDelete}>Delete</MenuItem>
        </Menu>
      </Box>
      <Collapse in={isExpanded}>
        {dashboards.map((dashboard, index) => (
          <DashboardItem
            key={index}
            title={dashboard.title}
            description={dashboard.description}
            dashboard={dashboard}
            groupName={groupName}
            onMoveUp={() => moveDashboard(index, index - 1)}
            onMoveDown={() => moveDashboard(index, index + 1)}
            onEdit={(updatedDashboard) => handleEditDashboard(updatedDashboard)}
            onDelete={() => handleDeleteDashboard(dashboard.id)}
            isFirst={index === 0}
            isLast={index === dashboards.length - 1}
          />
        ))}
      </Collapse>
    </Box>
  );
};

export default GroupItem;
