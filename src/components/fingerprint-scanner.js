import React from "react";
import { Typography } from '@mui/material';
import { Link } from "@mui/material";
import { Box } from "@mui/material";
import FingerprintImg from "../images/fp_3.png"
import { Button } from "@mui/material";
const  FingerprintScanner = ({isStudent, setIsBioLogin}) => {
  return (
<Box sx={ headingStyle }>
    <Typography variant="h3">Please place your Finger on the Scanner</Typography>
    <img src={FingerprintImg} alt="fingerprint image" style={{margin:"10%"
}}/>
    {isStudent && <Button variant="contained" color="error">STOP ATTENDING</Button>}
    <Button onClick={setIsBioLogin(false)} sx={{textDecoration:"underline", color:"grey"}} >Use {isStudent ? "Index":"Password"} instead</Button>

</Box>

  );
}
const headingStyle = {
  display:"flex",
  alignItems:"center",
  justifyContent: "center",
  flexDirection: "column",
  marginTop:"10%",
  color: "#0170D6",
  fontSize: 32,
  letterSpacing: "1px",
  fontFamily: "Alata, sans-serif",
  fontWeight: 400,
  border: 1, 
  borderRadius:5, 
  width:"35%" , 
  padding:"1%", 
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", 
// backgroundColor:"#F6F6F6",

};
export default FingerprintScanner;