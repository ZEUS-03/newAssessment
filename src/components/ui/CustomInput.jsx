import React from "react";
import { TextField } from "@mui/material";

const CustomInput = ({
  label,
  placeholder,
  type,
  value,
  onChange,
  error,
  helperText,
  sx,
}) => {
  return (
    <TextField
      label={label}
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
      error={error}
      helperText={error ? helperText : ""}
      sx={{
        marginBottom: "16px",
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "primary.main",
          },
          "&:hover fieldset": {
            borderColor: "primary.main",
          },
          "&.Mui-focused fieldset": {
            borderColor: "primary.main",
          },
          ...sx,
        },
      }}
    />
  );
};

export default CustomInput;
