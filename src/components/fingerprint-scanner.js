import React from "react";
import { Typography } from '@mui/material';
import { Link } from "@mui/material";
import { Box } from "@mui/material";
import FingerprintImg from "../images/fp_3.png"
import { Button } from "@mui/material";
const  FingerprintScanner = ({isStudent, handleFlip}) => {
  return (
    
   
<Box style={formContainerStyle}>
    <Typography variant="h3" sx={headingStyle}>Please place your Finger on the Scanner</Typography>
    <img src={FingerprintImg} alt="fingerprint image" style={{margin:"10%"
}}/>
    {isStudent && <Button variant="contained" color="error">STOP ATTENDING</Button>}
    <Button onClick={handleFlip} sx={{textDecoration:"underline", color:"grey"}} >Use {isStudent ? "Index":"Password"} instead</Button>

</Box>

  );
}
// const headingStyle = {
//   display:"flex",
//   alignItems:"center",
//   justifyContent: "center",
//   flexDirection: "column",
//   marginTop:"10%",
//   color: "#0170D6",
//   fontSize: 32,
//   letterSpacing: "1px",
//   fontFamily: "Alata, sans-serif",
//   fontWeight: 400,
//   border: 1, 
//   borderRadius:5, 
//   width:"35%" , 
//   padding:"1%", 
//   boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", 
// backgroundColor:"#F6F6F6",

// };

const headingStyle = {
  marginBottom: "2%",
  color: "#0170D6",
  fontSize: 28,
  letterSpacing: "1px",
  fontFamily: "Alata, sans-serif",
  fontWeight: 400,
};

const containerStyle = {
  textAlign: "center",
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

export default FingerprintScanner;