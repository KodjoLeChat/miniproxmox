import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        backgroundColor: '#f8f9fa',
        p: 4,
      }}
    >
      <Typography variant="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#0d6efd' }}>
        Bienvenue sur Mini Proxmox
      </Typography>
      <Typography variant="h6" gutterBottom>
        Simplifiez la gestion de vos machines virtuelles en toute sérénité.
      </Typography>
      <img
        src="image.png"
        alt="Illustration virtualisation"
        style={{ maxWidth: '80%', maxHeight: '300px', margin: '20px 0', borderRadius: '8px' }}
      />
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={() => navigate('/virtual-machines')}
        sx={{ mt: 2 }}
      >
        Voir les Machines Virtuelles
      </Button>
    </Box>
  );
};

export default Home;
