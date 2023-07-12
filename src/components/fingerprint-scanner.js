import React from "react";
import { Typography } from '@mui/material';
import { Link } from "@mui/material";
import { Box } from "@mui/material";
import FingerprintIcon from '@mui/icons-material/Fingerprint';

const  FingerprintScanner = ({isStudent, onFlip}) => {
  return (
    <div style={{display:"flex",alignItems:"center", justifyContent: "center", marginTop:"10%"}}>
<Box>
    <Typography variant="h3">Please place your Finger on the Scanner</Typography>
    <FingerprintIcon sx={{  fontSize: 150 , borderRadius: "50%", border:3, margin:"10%"}}/>
    <br></br>
    {/* replace the Links with the actual links */}
    <Link href={isStudent ? "attendancemarking":"examiner_login"} underline="always" onClick={onFlip}>
  Use {isStudent ? "Index":"Password"} instead
</Link>
</Box>

    </div>
  );
}

export default FingerprintScanner;