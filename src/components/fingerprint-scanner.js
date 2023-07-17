import { Box, Typography, Button } from "@mui/material";
import FingerprintImg from "../images/fp_3.png";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";

const FingerprintScanner = ({ isStudent, setIsBioLogin }) => {
  const { loginSupervisor } = useAppContext();
  const navigate = useNavigate();
  
  // TODO - call this when fingerprint scanning finished
  const handleLogIn = () => {
    // TODO - Get fingerprint from the input scanner device
    const fingerprint = "";
    loginSupervisor(fingerprint);
  };

  return (
    <Box style={formContainerStyle} >
      <Typography variant="h3" sx={headingStyle}>
        Please place your Finger on the Scanner
      </Typography>
      <img
        src={FingerprintImg}
        alt="fingerprint image"
        style={{ margin: "10%" }}
      />
      {isStudent && (
        <Button variant="contained" color="error" onClick={()=>{navigate("/exam-attendance-report")}}>
          STOP ATTENDING
        </Button>
      )}
      <Button
        onClick={setIsBioLogin}
        sx={{ textDecoration: "underline", color: "grey" }}
      >
        Use {isStudent ? "Index" : "Password"} instead
      </Button>
    </Box>
  );
};
export default FingerprintScanner;

const headingStyle = {
  marginBottom: "2%",
  color: "#0170D6",
  fontSize: 28,
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
