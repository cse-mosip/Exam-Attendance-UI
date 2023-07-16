import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import CustomLoginPage from "./custom-login-page";
import FingerprintScanner from "../components/fingerprint-scanner";

export default function AttendanceMarkingPage({isStudent}) {

  const [isBioLogin, setIsBioLogin] = useState(true);

  const handleFlip = () => {
    setIsBioLogin(!isBioLogin)
  }
  
  return (
    <Box style={containerStyle}>
      <Typography variant="h3" style={headingStyle}>
        Attendance Marking
      </Typography>
        {!isBioLogin ? (
          <CustomLoginPage handleFlip={handleFlip} />
        ) : (
          <FingerprintScanner isStudent={true} setIsBioLogin={handleFlip}/>
        )}
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