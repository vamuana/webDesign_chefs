import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './Navbar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Alert from './Alert';
import Success from './Success';

export default function Register() {
  const [name, setName] = useState(""); 
  const [password, setPassword] = useState(""); 
  const navigate = useNavigate(); 
  const [error, setError] = useState(null); 
  const [successMsg, setSuccessMsg] = useState(null); 

  const handleName = (e) => setName(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  useEffect(() => {}, [name, password, successMsg, error]);

  const handleRegister = async () => {
    const uploadData = new FormData();
    uploadData.append('username', name);
    uploadData.append('password', password);

    try {
        const response = await fetch("http://127.0.0.1:8000/api/register/", {
            method: 'POST',
            body: uploadData
        });

        if (response.ok) {
            setSuccessMsg("Registered successfully!");
            setTimeout(() => setSuccessMsg(null), 3000);
        } else {
            setError("Username already taken!");
            setTimeout(() => setError(null), 3000);
        }

        setName("");
        setPassword("");

        const data = await response.text();
        if (data) {
            console.log("Response data: ", data);
        } else {
            console.log("Empty response body");
        }
    } catch (error) {
        console.error("ERROR:", error);
    }
};


  const getRegisterButton = () => (
    <Button
      variant="contained"
      onClick={handleRegister}
      sx={{
        mt: 4,
        width: "300px",
        backgroundColor: "#7fa845",
        fontWeight: "bold",
        "&:hover": { backgroundColor: "#2C5F2D" },
      }}
    >
      CREATE ACCOUNT
    </Button>
  );

  const getBackButton = () => (
    <Button
      variant="contained"
      sx={{
        mt: 2,
        width: "300px",
        backgroundColor: "#FF474C",
        fontWeight: "bold",
        "&:hover": { backgroundColor: "#8B0000" },
      }}
      onClick={() => navigate("/login")}
    >
      BACK TO LOGIN
    </Button>
  );

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
          height: "calc(100vh - 64px)", 
          px: 3,
        }}
      >
        <Toolbar />

        {/* Messaging */}
        {successMsg && <Success msg={successMsg} />}
        {error && <Alert msg={error} />}

        {/* Header */}
        <Typography
          variant="h4"
          sx={{ fontFamily: "Titillium Web", fontWeight: 700 }}
          gutterBottom
        >
          Register
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

        {getRegisterButton()}
        {getBackButton()}
      </Box>
    </Box>
  );
}
