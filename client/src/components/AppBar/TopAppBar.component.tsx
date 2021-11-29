import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useAuth } from 'context/Auth.context';

export default function TopAppBar() {
  const { logout } = useAuth();

  return (
    <Box sx={{ flexGrow: 1, marginBottom: "90px" }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Todo
          </Typography>
          <Button variant="text" onClick={logout}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
