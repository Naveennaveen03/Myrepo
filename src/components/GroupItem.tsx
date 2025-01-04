import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Collapse } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import DashboardItem from "./DashboardItem";
import { RootState } from "../redux/store";
import { updateDashboard, removeDashboard ,updateGroupDashboards} from "../redux/dashboardSlice";
import { Dashboard } from "../redux/dashboardSlice";

interface GroupItemProps {
  groupName: string;
  dashboards: Dashboard[];
}

const GroupItem: React.FC<GroupItemProps> = ({ groupName }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const dashboards = useSelector(
    (state: RootState) => state.dashboards.dashboards
  );
  const dispatch = useDispatch();
  const groupDashboards = dashboards.filter((dashboard) =>
    dashboard.groups.includes(groupName)
  );

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const filteredDashboards = dashboards.filter((dashboard) =>
    dashboard.groups.includes(groupName)
  );

  const handleEditDashboard = (
    index: number,
    title: string,
    description: string
  ) => {
    if (!groupDashboards || index < 0 || index >= groupDashboards.length) {
      console.error("Invalid dashboard index.");
      return;
    }
  
    // Clone the dashboard deeply to avoid shared references
    const dashboardToEdit = { ...groupDashboards[index] };
  
    // Update only the title and description
    dashboardToEdit.title = title.trim();
    dashboardToEdit.description = description.trim();
  
    // Ensure the `groups` array remains intact
    const updatedGroupDashboards = [...groupDashboards];
    updatedGroupDashboards[index] = dashboardToEdit;
  
    // Update the state specifically for the current group
    dispatch(
      updateGroupDashboards({ 
        group: groupName, 
        dashboards: updatedGroupDashboards 
      })
    );
  };
  
  
  
  

  const handleDeleteDashboard = (index: number) => {
    const dashboardToDelete = groupDashboards[index];
    const updatedDashboard = {
      ...dashboardToDelete,
      groups: dashboardToDelete.groups.filter((group) => group !== groupName),
    };
    if (updatedDashboard.groups.length === 0) {
      const dashboardIndex = dashboards.findIndex(
        (d) => d === dashboardToDelete
      );
      dispatch(removeDashboard(dashboardIndex));
    } else {
      const dashboardIndex = dashboards.findIndex(
        (d) => d === dashboardToDelete
      );
      dispatch(
        updateDashboard({ index: dashboardIndex, dashboard: updatedDashboard })
      );
    }
  };

  return (
    <Box mb={2}>
      <Button
        onClick={handleExpand}
        variant="contained"
        endIcon={isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      >
        {groupName}
      </Button>
      <Collapse in={isExpanded}>
        {filteredDashboards.map((dashboard, index) => (
          <DashboardItem
            key={index}
            title={dashboard.title}
            description={dashboard.description}
            onMoveUp={() => {
              if (index > 0) {
                const newDashboards = [...filteredDashboards];
                [newDashboards[index], newDashboards[index - 1]] = [
                  newDashboards[index - 1],
                  newDashboards[index],
                ];
                dispatch(
                  updateDashboard({ index, dashboard: newDashboards[index] })
                );
                dispatch(
                  updateDashboard({
                    index: index - 1,
                    dashboard: newDashboards[index - 1],
                  })
                );
              }
            }}
            onMoveDown={() => {
              if (index < filteredDashboards.length - 1) {
                const newDashboards = [...filteredDashboards];
                [newDashboards[index], newDashboards[index + 1]] = [
                  newDashboards[index + 1],
                  newDashboards[index],
                ];
                dispatch(
                  updateDashboard({ index, dashboard: newDashboards[index] })
                );
                dispatch(
                  updateDashboard({
                    index: index + 1,
                    dashboard: newDashboards[index + 1],
                  })
                );
              }
            }}
            onEdit={(title, description) =>
              handleEditDashboard(index, title, description)
            }
            onDelete={() => handleDeleteDashboard(index)}
          />
        ))}
      </Collapse>
    </Box>
  );
};

export default GroupItem;
