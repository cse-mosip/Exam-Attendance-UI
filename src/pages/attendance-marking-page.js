import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Button, TextField, Link } from "@mui/material";
import * as React from "react";
import { useState } from "react";
import CustomLoginPage from "./custom-login-page";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import FingerprintScanner from "../components/fingerprint-scanner";

export default function AttendanceMarkingPage({isStudent}) {

  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  
  return (
    <Box style={containerStyle}>
      <Typography variant="h3" style={headingStyle}>
        Attendance Marking
      </Typography>
      <Card style = {cardContainerStyle}sx={{ minWidth: 275 }}>
      <CardContent>
        {!flipped ? (
          <CustomLoginPage onFlip={handleFlip} />
        ) : (
          <FingerprintScanner isStudent={isStudent} onFlip={handleFlip}/>
        )}
      </CardContent>
    </Card>
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

const cardContainerStyle = {
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
