import React, { useState } from 'react';
// import {useDispatch} from 'react-redux'; // TODO USE FOR GLOBAL STATES AFTERWARDS WHEN USER IS LOGGED IN
import NavBar from './Navbar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function Login() {
  // variables
  const [name, setName] = useState(""); // name of the user that is logged in, check afterwards for global-state dispatch
  const [password, setPassword] = useState("");
  
  // TODO
  // const [successMsg, setSuccessMsg] = useState(null); // message for success component pop up when credentials entered correctly
  // const [error, setError] = useState(null); // error message for ERROR component pop up when wrong credentials are entered

  // hooks
  // const dispatch = useDispatch(); // will be used for handling users login under a session (so in case he clicks on another page he does not get logged out)

  // methods - TODO extract into separate component if necessary
  const handleName = (e) => setName(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  // TODO login handler when BE is created (DO NOT REMOVE ASYNC AND TIMEOUT DUE TO DB AND ERROR COMPONENT!)
  const handleLogin = async () => {
    console.log("Login attempt:", { name, password });
    setName("");
    setPassword("");
  };

  const getLoginButton = () => {
    return (
      <Button
        variant="contained"
        onClick={handleLogin}
        sx={{
          mt: 4,
          width: "300px",
          backgroundColor: "#7fa845",
          fontWeight: "bold",
          "&:hover": { backgroundColor: "#2C5F2D" },
        }}
      >
        LOG YOURSELF IN
      </Button>
    );
  };

  const getRegisterButton = () => {
    return (
      <Button
        variant="contained"
        sx={{
          mt: 2,
          width: "300px",
          backgroundColor: "#FF474C",
          fontWeight: "bold",
          "&:hover": { backgroundColor: "#8B0000" },
        }}
        onClick={() => (window.location.href = "/register-user")}
      >
        NEW USER
      </Button>
    );
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#F5F5F5" }}>
      <NavBar />
      <Box
        component="main"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "calc(100vh - 64px)", // Adjust based on Navbar height
          px: 3,
        }}
      >
        <Toolbar />

        {/* Header */}
        <Typography
          variant="h4"
          sx={{ fontFamily: "Titillium Web", fontWeight: 700 }}
          gutterBottom
        >
          Log In Page
        </Typography>

        {/* UserName */}
        <TextField
          id="user-name"
          label="Your Username"
          variant="outlined"
          value={name}
          onChange={handleName}
          sx={{
            mt: 2,
            width: "300px",
            backgroundColor: "white",
            borderRadius: "8px",
          }}
        />

        {/* Password */}
        <TextField
          id="password-input"
          label="Your Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={handlePassword}
          sx={{
            mt: 2,
            width: "300px",
            backgroundColor: "white",
            borderRadius: "8px",
          }}
        />

        {getLoginButton()}
        {getRegisterButton()}

        {/* TODO ADD VALIDATION HERE ON LOGIN (AND REPLACE THE GETLOGIN BUTTON DOWN IN RETURN) IN CASE THE USER IS ALREADY LOGGED IN!
        {isLoggedIn ? null :  getLoginButton()}
        TODO - BACK BUTTON TO MAIN MENU ONCE PAGE IS PROPERLY DONE. 
        */}
      </Box>
    </Box>
  );
}
