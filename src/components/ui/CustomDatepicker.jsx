import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";
import dayjs from "dayjs";

export default function BasicDatePicker({
  dob,
  onChange,
  helperText,
  error,
  sx = {},
}) {
  return (
    // <div className="">
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        sx={{ width: "80%", marginTop: -1 }}
        components={["DatePicker"]}
      >
        <DatePicker
          value={dob}
          onChange={onChange}
          label="DOB"
          maxDate={dayjs()}
          slotProps={{
            textField: {
              // fullWidth: fullWidth,
              variant: "outlined",
              error: error,
              helperText: error ? helperText : "",
            },
          }}
          sx={{
            marginBottom: "24px",
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
      </DemoContainer>
    </LocalizationProvider>
    // </div>
  );
}
