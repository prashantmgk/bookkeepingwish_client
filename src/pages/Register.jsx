import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useForm } from "../utility/loginHooks";
import { useMutation } from "@apollo/client";

import { InputAdornment, IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import {gql} from '@apollo/client';
import { useNavigate } from "react-router-dom";

import { Stack, TextField, Typography , Container, Alert, CssBaseline, Button} from "@mui/material";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";

const REGISTER_USER = gql`
mutation Mutation($registerInput: RegisterInput) {
  registerUser(registerInput: $registerInput) {
    username
    token
    password
  }
}
`;

const Register = (props) => {

   const theme = useTheme();
   const colors = tokens(theme.palette.mode);

   const context = useContext(AuthContext);
   let navigate = useNavigate();
   const [errors, setErrors] = useState([]);

   const registerUserCallback = () => {
      console.log("registerUserCallback");
      registerUser();
   }

   const {onChange, onSubmit, values} = useForm(registerUserCallback, {
      username: "",
      password: "",
      confirmPassword: "",
   });
   const [showPassword, setShowPassword] = useState(false);
   const handleClickShowPassword = () => setShowPassword(!showPassword);
   const handleMouseDownPassword = () => setShowPassword(!showPassword);

   const [registerUser, {loading}] = useMutation(REGISTER_USER, {
      update(_, {data: {registerUser: userData}}){
         context.login(userData);
         navigate("/dashboard");
      },
      onError({graphQLErrors}){
         setErrors(graphQLErrors);
      },
      variables: {registerInput: values}
   });

   return (
      <>
         <CssBaseline/>
         <Container spacing={2} maxWidth="sm">
            <h3>Register</h3>
            <p>This is register page. Register below to create an account!</p>
            <Stack spacing={2} paddingBottom={2}>
               <TextField
                  label="Username"
                  variant="outlined"
                  name="username"
                  type="text"
                  onChange={onChange}
                  sx={{
                     "& .MuiOutlinedInput-root": { 
                           "&.Mui-focused fieldset": {
                              borderColor: colors.grey[100]
                           }
                        },
                     }}
               />
               <TextField
                  label="Password"
                  variant="outlined"
                  name="password"
                  type={showPassword ? "text" : "password"} // <-- This is where the magic happens
                  InputProps={{ // <-- This is where the toggle button is added.
                     endAdornment: (
                        <InputAdornment position="end">
                        <IconButton
                           aria-label="toggle password visibility"
                           onClick={handleClickShowPassword}
                           onMouseDown={handleMouseDownPassword}
                        >
                           {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                        </InputAdornment>
                     )
                  }}
                  onChange={onChange}
                  sx={{
                     "& .MuiOutlinedInput-root": { 
                           "&.Mui-focused fieldset": {
                              borderColor: colors.grey[100]
                           }
                        },
                     }}
               />
               <TextField
                  label="Confirm Password"
                  variant="outlined"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"} // <-- This is where the magic happens
                  InputProps={{ // <-- This is where the toggle button is added.
                     endAdornment: (
                        <InputAdornment position="end">
                        <IconButton
                           aria-label="toggle password visibility"
                           onClick={handleClickShowPassword}
                           onMouseDown={handleMouseDownPassword}
                        >
                           {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                        </InputAdornment>
                     )
                  }}
                  onChange={onChange}
                  sx={{
                     "& .MuiOutlinedInput-root": { 
                           "&.Mui-focused fieldset": {
                              borderColor: colors.grey[100]
                           }
                        },
                     }}
               />

            </Stack>
            {
               errors.map(function(error, index){
                  return (
                     <Alert sx={{marginBottom: "10px"}} severity="error" key={index}>
                        {error.message}
                     </Alert>
                  )
               })
            }
            <Button color="secondary" variant="contained"
               onClick={onSubmit}
               disabled={loading}
            >
               Register
            </Button>
         </Container>
      </>
   )
}

export default Register;