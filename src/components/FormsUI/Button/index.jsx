import { Button } from "@mui/material";
import { useFormikContext } from "formik";   

const ButtonWrapper = ({
   children,
   ...otherProps
}) => {

   const { submitForm } = useFormikContext();

   const handleSubmit = () => {
      submitForm();
   }

   const configButton = {
      variant: "contained",
      color: "secondary",
      fullWidth: true,
      onClick: handleSubmit,
   }


   return (
      <div>
         <Button 
            {...configButton}
         >
            {children}
         </Button>
      </div>
   )
}

export default ButtonWrapper;
