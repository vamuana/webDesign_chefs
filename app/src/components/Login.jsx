import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import NavBar from './Navbar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Alert from './Alert';
import Success from './Success';
import { useNavigate } from 'react-router-dom';
import { SET_LOGGED_IN, SET_NAME } from '../redux/actions/action';

export default function Login() {
  // variables
  const [name, setName] = useState(""); // name of the user that is logged in, check afterwards for global-state dispatch
  const [password, setPassword] = useState("");
  
  // TODO
  const [successMsg, setSuccessMsg] = useState(null); // message for success component pop up when credentials entered correctly
  const [error, setError] = useState(null); // error message for ERROR component pop up when wrong credentials are entered

  // hooks
  const dispatch = useDispatch(); // will be used for handling users login under a session (so in case he clicks on another page he does not get logged out)

  // methods - TODO extract into separate component if necessary
  const handleName = (e) => setName(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const [isLoggedIn] = useSelector((state) => [state.global.isLoggedIn], shallowEqual);
  const [userName] = useSelector((state) => [state.global.name], shallowEqual); 

  const navigate = useNavigate();

  useEffect(() => {}, [name, password, isLoggedIn, successMsg, error]);

  const handleLogin = async () => {
    const uploadData = new FormData();
    uploadData.append('username', name);
    uploadData.append('password', password);
    fetch("http://127.0.0.1:8000/api/authenticate/", {
        method: 'POST',
        body: uploadData
    })
    .then((response) => { 
        if (response.ok) {
            console.log("Logged in successfully!");
            // dispatch({type: SET_ENTERED, value: true});
            dispatch({type: SET_LOGGED_IN, value: true});
            dispatch({type: SET_NAME, value: name});
            setSuccessMsg("Logged in successfully!");
            navigate("/");
        } else {
            setError("Wrong credentials!");
            setTimeout(() => {
                setError(null);
              }, 3000);
        }
        setName("");
        setPassword("");
        return response.json();
    })
    .then((data) => { // todo add validation msg and error msg
        console.log("Response data: ", data);
    })
    .catch((error) => {
        console.log("ERROR");
        console.error(error);
    });
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

  console.log("Current login state:", isLoggedIn);

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

        {successMsg != null ? <div className='flex flex-col gap-4'><Success msg={successMsg}/></div> : null}
        {error != null ? <div className='flex flex-col gap-4'><Alert msg={error}/></div> : null}

        {/* Header */}
        <Typography
          variant="h4"
          sx={{ fontFamily: "Titillium Web", fontWeight: 700 }}
          gutterBottom
        >
          Log In Page
        </Typography>

      {!isLoggedIn ? (
        <>
          {/* UserName */}
          <TextField
            id="user-name"
            label="Your Username"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              mt: 2,
              width: "300px",
              backgroundColor: "white",
              borderRadius: "8px",
            }}
          />
        </>
      ) : (

      <div className="text-center mt-8">
          <h3 className="text-4xl font-extrabold text-green-700 drop-shadow-md animate-fadeIn">
              Welcome back, <span className="text-green-900 underline">{userName}</span>!
          </h3>
      </div>
      )}

        {isLoggedIn ? null :getLoginButton()}
        {isLoggedIn ? null :getRegisterButton()}

        {/* TODO ADD VALIDATION HERE ON LOGIN (AND REPLACE THE GETLOGIN BUTTON DOWN IN RETURN) IN CASE THE USER IS ALREADY LOGGED IN!
        {isLoggedIn ? null :  getLoginButton()}
        TODO - BACK BUTTON TO MAIN MENU ONCE PAGE IS PROPERLY DONE. 
        */}
      </Box>
    </Box>
  );
}
