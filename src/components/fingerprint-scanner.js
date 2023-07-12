import React from "react";
import { Typography } from '@mui/material';
import { Link } from "@mui/material";
import { Box } from "@mui/material";
import FingerprintIcon from '@mui/icons-material/Fingerprint';

const  FingerprintScanner = ({isStudent}) => {
  return (
    <div style={{display:"flex",alignItems:"center", justifyContent: "center", marginTop:"10%"}}>
<Box sx={{ border: 1, borderRadius:5, width:"30%" , padding:"1%",alignItems:"center", justifyContent: "center",display:"flex", flexDirection: "column" }}>
    <Typography variant="h3">Please place your Finger on the Scanner</Typography>
    <FingerprintIcon sx={{  fontSize: 150 , borderRadius: "50%", border:3, margin:"10%"}}/>
    {/* replace the Links with the actual links */}
    <Link href={isStudent ? "student_login":"examiner_login"} underline="always" >
  Use {isStudent ? "Index":"Password"} instead
</Link>
</Box>

    </div>
  );
}

export default FingerprintScanner;