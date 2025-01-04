import React, { useState } from 'react';
import DashboardForm from './components/DashboardForm';
import DashboardList from './components/DashboardList';
import { Container, Grid, Button, Typography } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';



function App() {
  const [showForm, setShowForm] = useState(false);

  return (
    <Container sx={{ mt: 4 }}>
    <Grid container alignItems="center" justifyContent="space-between" spacing={2}>
      <Grid item>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}> 
          Dashboards
        </Typography>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="success"
          startIcon={<AddIcon />}
          onClick={() => setShowForm(true)}
        >
          New Dashboard
        </Button>
      </Grid>
    </Grid>
    {showForm && <DashboardForm onClose={() => setShowForm(false)} />}
    <DashboardList />
  </Container>
    
  );
}

export default App;
