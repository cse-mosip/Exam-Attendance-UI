import { Box, Typography, Button } from "@mui/material";
import FingerprintImg from "../images/fp_3.png";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";

const FingerprintScanner = ({ isStudent, setIsBioLogin }) => {
  const { loginSupervisor } = useAppContext();
  const navigate = useNavigate();

  // TODO - call this when fingerprint scanning finished
  const handleLogIn = () => {
    const fingerprint = "";
    // TODO - Get fingerprint from the input scanner device
    if (!isStudent) {
      loginSupervisor(fingerprint);
    }
  };

  return (
    <Box style={formContainerStyle}>
      <Typography variant="h3" sx={headingStyle}>
        Please place your finger on the scanner
      </Typography>
      <img
        src={FingerprintImg}
        alt="fingerprint image"
        style={{ margin: "10%" }}
      />
      {isStudent && (
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            navigate("/exam-attendance-report");
          }}
        >
          STOP ATTENDING
        </Button>
      )}
      <Button
        onClick={setIsBioLogin}
        sx={{ textDecoration: "underline", color: "grey" }}
      >
        USE {isStudent ? "INDEX" : "PASSWORD"} INSTEAD
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
  textAlign: "center",
};

const formContainerStyle = {
  width: "30%",
  padding: "30px",
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
  flexDirection: "column",
  margin: "0 auto",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
  backgroundColor: "#FFFFFF",
  borderRadius: "3%",
};
