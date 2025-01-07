import React, { useState } from 'react';
import DashboardForm from './components/DashboardForm';
import DashboardList from './components/DashboardList';
import { Container, Grid, Button, Typography } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { Dashboard } from './redux/dashboardSlice';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [expandAll, setExpandAll] = useState(true); // Add this state

  const initialValues = {
    id: '',
    title: "",
    shortTitle: "",
    description: "",
    groups: [],
    embedLink: "",
  };

  const handleFormSubmit = (newDashboard: Dashboard) => {
    // Handle the new dashboard creation logic here
    console.log('New dashboard created:', newDashboard);
    setShowForm(false); // Close the form after submission
  };

  const toggleExpandAll = () => {
    setExpandAll(!expandAll);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Grid container alignItems="center" justifyContent="space-between" spacing={2}>
        <Grid item>
          <Typography variant="h6" sx={{ fontWeight: 'bold' ,marginBottom:4}}> 
            Dashboards 
          </Typography>
        </Grid>
        <Grid item>
          <Button variant="text" onClick={toggleExpandAll} sx={{ fontWeight: 'bold' ,marginRight:4}}>
            {expandAll ? "Collapse All" : "Expand All"}
          </Button>
          <Button variant="contained" color="success" startIcon={<AddIcon />} onClick={() => setShowForm(true)} >
            New Dashboard
          </Button>
        </Grid>
      </Grid>
      {showForm && (
        <DashboardForm isEdit={false} initialValues={initialValues} onClose={() => setShowForm(false)} onSubmit={handleFormSubmit} />
      )}
      <DashboardList expandAll={expandAll} /> {/* Pass the expandAll state */}
    </Container>
  );
}

export default App;
