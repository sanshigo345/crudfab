import { useState } from 'react';
import { Container, Box, Typography, Button, AppBar, Toolbar, Chip } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import { useAuthStore } from '../store/authStore';
import UserTable from '../components/users/UserTable';
import UserFilterBar from '../components/users/UserFilterBar';
import AddUserModal from '../components/users/AddUserModal';
import { useUrlSync } from '../hooks/useUrlSync';

const Dashboard = () => {
  const { user, logout } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useUrlSync();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2">
              {user?.fullName}
            </Typography>
            <Chip 
              label={user?.role} 
              color={user?.role === 'admin' ? 'error' : 'primary'} 
              size="small" 
            />
            <Button color="inherit" startIcon={<LogoutIcon />} onClick={logout}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1">
            User Management
          </Typography>

          {user?.role === 'admin' && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setIsModalOpen(true)}
            >
              Add New User
            </Button>
          )}
        </Box>

        <UserFilterBar />

        <UserTable />

        <AddUserModal 
          open={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />
      </Container>
    </Box>
  );
};

export default Dashboard;