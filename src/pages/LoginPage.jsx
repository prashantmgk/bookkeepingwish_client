import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useForm } from "../utility/loginHooks";
import { useMutation } from "@apollo/client";

// Required imports from the example.
import { InputAdornment, IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import {gql} from '@apollo/client';
import { useNavigate } from "react-router-dom";


import { Stack, TextField , Container, Alert, CssBaseline, Button} from "@mui/material";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";

const LOGIN_USER = gql`
mutation Mutation($loginInput: LoginInput) {
  loginUser(loginInput: $loginInput) {
    username
    token
    password
  }
}
`;

const LoginPage = (props) => {
  
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  let navigate = useNavigate();
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState([]);

  function loginUserCallback() {
    loginUser();
  }

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, {data: {loginUser: userData}}){
       context.login(userData);
       navigate("/dashboard");
    },
    onError({graphQLErrors}){
       setErrors(graphQLErrors);
    },
    variables: {loginInput: values}
 })

 return (
  <>
        <CssBaseline/>
        <Container spacing={2} maxWidth="sm">
          <h1>Login</h1>
          <p>This is Login Portal. Login to use the application!</p>
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
              Login
          </Button>
        </Container>
    </>
 )

}

export default LoginPage;
