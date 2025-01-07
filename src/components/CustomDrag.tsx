import React from 'react';
import { Box, IconButton, Button } from "@mui/material";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

interface CustomDragOverlayProps {
  groupName: string;
  width: number;
}

const CustomDrag: React.FC<CustomDragOverlayProps> = ({ groupName, width }) => {
  return (
    <Box display="flex" alignItems="center" p={1} bgcolor="background.paper" style={{ width }}>
      <IconButton>
        <DragIndicatorIcon />
      </IconButton>
      <Button
        variant="contained"
        style={{ width: '10%' }}
      >
        {groupName}
      </Button>
    </Box>
  );
};

export default CustomDrag;
