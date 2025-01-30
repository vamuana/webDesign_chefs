import * as React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Layer1 from '../assets/Layer_1.jpg';

export default function NavBar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  // Drawer content
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2, color: "#2C5F2D" }}>
        Cook&Meet
      </Typography>
      <Divider />
      <List>
        <ListItem key="home" disablePadding>
          <ListItemButton sx={{ textAlign: 'center', "&:hover": { backgroundColor: "#86A557" } }}>
            <ListItemText primary={<Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Main Menu</Link>} />
          </ListItemButton>
        </ListItem>
        <ListItem key="login" disablePadding>
          <ListItemButton sx={{ textAlign: 'center', "&:hover": { backgroundColor: "#86A557" } }}>
            <ListItemText primary={<Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>Login</Link>} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <header className="bg-gray-100 flex justify-between items-center p-4 shadow-md">
      <div className="w-40 h-12">
        <Link to="/">
          <img src={Layer1} alt="Cook&Meet Logo" className="w-full h-full object-contain" />
        </Link>
      </div>

      <div className="hidden md:flex space-x-4">
        <Link to="/">
          <button className="px-4 py-2 border border-green-600 text-green-600 rounded-full hover:bg-green-600 hover:text-white transition">
            Main Menu
          </button>
        </Link>
        <Link to="/login">
          <button className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition">
            Log In
          </button>
        </Link>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <IconButton onClick={handleDrawerToggle}>
          <MenuIcon className="text-green-700" />
        </IconButton>
      </div>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{ '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 } }}
      >
        {drawer}
      </Drawer>
    </header>
  );
}
