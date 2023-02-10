import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";

function CustomFooterTotalComponent(props) {
  return (
    <Box sx={{ padding: "10px", display: "flex" }}>Total : {props.total}</Box>
  );
}

CustomFooterTotalComponent.propTypes = {
  total: PropTypes.number
};

export { CustomFooterTotalComponent };
