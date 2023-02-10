import { Button } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/authContext";
import { tokens } from "../../../theme";
import { useTheme } from "@mui/material";

const LogoutButton = () => {

   const theme = useTheme();
   const colors = tokens(theme.palette.mode);

   let navigate = useNavigate();
   const context = useContext(AuthContext);

   const handleSubmit = () => {
      navigate("/login");
      context.logout();
   }

   const configButton = {
      variant: "standard",
      fullWidth: true,
      onClick: handleSubmit,
   }

   return (
      <Button 
         {...configButton}
         sx={{backgroundColor: colors.redAccent[500], marginRight: "20px",}}
      >
         Logout
      </Button>
   )
}

export default LogoutButton;
