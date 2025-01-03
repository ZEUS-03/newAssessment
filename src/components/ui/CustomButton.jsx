import React from "react";
import { Button } from "@mui/material";

const CustomButton = ({
  onClick,
  children,
  color = "primary",
  variant = "contained",
  size = "medium",
}) => {
  return (
    <Button onClick={onClick} color={color} variant={variant} size={size}>
      {children}
    </Button>
  );
};

export default CustomButton;
