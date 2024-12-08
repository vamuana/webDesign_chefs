import * as React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

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
          <ListItemButton
            sx={{
              textAlign: 'center',
              "&:hover": {
                backgroundColor: "#86A557", // Light green on mouse hover
              },
            }}
          >
            <ListItemText
              primary={
                <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                  Main Menu
                </Link>
              }
            />
          </ListItemButton>
        </ListItem>

        <ListItem key="login" disablePadding>
          <ListItemButton
            sx={{
              textAlign: 'center',
              "&:hover": {
                backgroundColor: "#86A557", // Light green on mouse hover
              },
            }}
          >
            <ListItemText
              primary={
                <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                  Login
                </Link>
              }
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const container = undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        component="nav"
        sx={{
          backgroundColor: '#97BC62',
          color: 'white',
        }}
      >
        <Toolbar>
          {/* Mobile Menu Button */}
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' }, color: "white" }}
          >
            <MenuIcon />
          </IconButton>

          {/* Title Section */}
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="h2"
              component="div"
              sx={{
                flexGrow: 1,
                display: { xs: "none", sm: "block" },
                color: "white",
                fontFamily: "Titillium Web",
                fontWeight: 900,
              }}
            >
              <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                Cook&Meet
              </Link>
            </Typography>

            <Typography
              variant="subtitle2"
              component="div"
              sx={{
                mt: -1,
                color: "white",
                fontFamily: "Titillium Web",
                fontWeight: 400,
                fontSize: "0.9rem",
              }}
            >
              FIND YOUR DORM (COOKING) BUDDIES
            </Typography>
          </Box>

          {/* Desktop Links */}
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Button
              key="home"
              sx={{
                color: 'white',
                fontFamily: "Titillium Web",
                fontWeight: 700,
                "&:hover": {
                  backgroundColor: "#86A557", // Light green on mouse hover
                },
              }}
            >
              <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                Main Menu
              </Link>
            </Button>

            <Button
              key="login"
              sx={{
                color: 'white',
                fontFamily: "Titillium Web",
                fontWeight: 700,
                "&:hover": {
                  backgroundColor: "#86A557", // Light green on mouse hover
                },
              }}
            >
              <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                Login
              </Link>
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box' },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}
