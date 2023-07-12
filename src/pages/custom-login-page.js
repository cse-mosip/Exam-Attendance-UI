import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Button, TextField, Link } from "@mui/material";
import * as React from "react";
import { useState } from "react";

export default function CustomLoginPage({handleFlip}) {
  const [indexNo, setIndexNo] = useState(null);

  const handleInputChange = (e) => {
    setIndexNo(e.target.value);
  };

  
  return (
    <Box style={containerStyle}>
      <Box component="form" Validate>
        <Typography variant="h3" style={headingFormStyle}>
          Sign in with Index
        </Typography>
        <TextField
          id="standard-basic"
          label="Index Number:"
          variant="standard"
          size="small"
          sx={textFieldStyle}
          onChange={(e) => handleInputChange(e)}
        />

        <Button type="submit" size="lg" variant="contained" sx={submitButtonStyle}>
          SUBMIT
        </Button>

        <Button size="lg" color="error" variant="contained" sx={stopButtonStyle}>
          STOP ATTENDING
        </Button><br></br>

        <Link underline="always" sx={linkStyle} onClick={handleFlip}>
          USE BIO-METRIC LOGIN INSTEAD
        </Link>
      </Box>
    </Box>
  );
}

// Define style variables

const containerStyle = {
  marginTop: "10%",
  textAlign: "center",
};

const headingStyle = {
  marginBottom: "2%",
  color: "#0170D6",
  fontSize: 32,
  letterSpacing: "1px",
  fontFamily: "Alata, sans-serif",
  fontWeight: 400,
};

const formContainerStyle = {
  borderRadius: 5,
  width: "30%",
  padding: "1%",
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
  flexDirection: "column",
  margin: "0 auto",
  backgroundColor: "#F6F6F6",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
};

const headingFormStyle = {
  textAlign: "center",
  marginTop: "5%",
  color: "#0170D6",
  letterSpacing: "1px",
  fontSize: 32,
  fontFamily: "Alata, sans-serif",
  fontWeight: 400,
};

const textFieldStyle = {
  width: "75%",
  marginTop: "10%",
  marginBottom: "5%",
};

const submitButtonStyle = {
  mt: 3,
  mb: 2,
  margin: 2,
  width: "75%",
};

const stopButtonStyle = {
  mt: 3,
  mb: 2,
};

const linkStyle = {
  color: "#4C4C4C",
  cursor: "pointer",
  fontFamily: "Alata",
  fontWeight: "100",
};
