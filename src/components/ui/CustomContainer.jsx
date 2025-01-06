import React from "react";
import { Container } from "@mui/material";

const CustomContainer = ({ children, sx = {} }) => {
  return (
    <div className="w-1/4 ">
      <Container
        // maxWidth={maxWidth}
        className="flex flex-col"
        sx={{
          // padding: "8px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "65vh",
          backgroundColor: "#f4f7fc", // Light background color for the page
          borderRadius: "8px",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)", // Light shadow for depth
          ...sx,
        }}
      >
        {children}
      </Container>
    </div>
  );
};

export default CustomContainer;
