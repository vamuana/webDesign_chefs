import NavBar from './Navbar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function HomePageMenu() {
  return (
    <Box sx={{ display: 'block', minHeight: '100vh', backgroundColor: '#F5F5F5' }}>
      <NavBar />
      <Box
        component="main"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          height: "calc(100vh - 64px)", // The screen height - Navbar height
          px: 3,
        }}
      >
        <Toolbar />

        <Typography
          variant="h4"
          sx={{ fontFamily: "Titillium Web", fontWeight: 700 }}
          gutterBottom
        >
          Welcome to Cook&Meet
        </Typography>
        <Typography
          variant="h5"
          sx={{
            fontFamily: "Titillium Web",
            fontWeight: 500,
            fontStyle: "italic",
          }}
          gutterBottom
        >
          - Discover the world of great flavors and friendly encounters!
        </Typography>

        <Box
          sx={{
            mt: 5,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "100%",
            maxWidth: "400px",
          }}
        >
          <Button
            variant="contained"
            component={Link}
            to="/join-event"
            sx={{
              backgroundColor: "#7fa845",
              fontWeight: "bold",
              padding: "12px 24px",
              "&:hover": { backgroundColor: "#2C5F2D" },
            }}
          >
            Join Event
          </Button>

          <Button
            variant="contained"
            component={Link}
            to="/create-event"
            sx={{
              backgroundColor: "#7fa845",
              fontWeight: "bold",
              padding: "12px 24px",
              "&:hover": { backgroundColor: "#2C5F2D" },
            }}
          >
            Create Event
          </Button>

          <Button
            variant="contained"
            component={Link}
            to="/create-recipe"
            sx={{
              backgroundColor: "#7fa845",
              fontWeight: "bold",
              padding: "12px 24px",
              "&:hover": { backgroundColor: "#2C5F2D" },
            }}
          >
            Create Recipe
          </Button>

          <Button
            variant="contained"
            component={Link}
            to="/my-profile"
            sx={{
              backgroundColor: "#7fa845",
              fontWeight: "bold",
              padding: "12px 24px",
              "&:hover": { backgroundColor: "#2C5F2D" },
            }}
          >
            My Profile
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
