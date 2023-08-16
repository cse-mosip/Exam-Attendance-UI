import { Box, Typography, Button } from "@mui/material";
import FingerprintImg from "../images/fp_3.png";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import { socket } from "../utils/socket"

const FingerprintScanner = ({ isStudent, setIsBioLogin, examId, setPerson1, setMessage1, setOpen }) => {
  const { loginSupervisor, loginStudent } = useAppContext();
  const navigate = useNavigate();
  console.log(setPerson1)

  const handleLogIn = (fingerprint) => {
    const typedArray = new Uint8Array(fingerprint['1']['buffer']);
    const temp = [...typedArray];
    const fingerData = {fingerprint:{bioSubType:fingerprint['1']['bioSubType'], buffer:{data: temp}}, eventId:Number(examId)}
    if (!isStudent) {
      loginSupervisor(fingerData);
      console.log("Here");
    } else {
      const data = loginStudent(fingerData);
      console.log(data);
      setPerson1(data.person);
      setMessage1(data.message);
      setOpen(true);
    }
  };

  useEffect(() => {
    socket.on("fingerprintData", async (fingerprintData) => {
      if (fingerprintData.success === undefined){
        handleLogIn(fingerprintData)

      }else{
        console.log("fingerprint not successfull")
      }
    });

  }, []);

  async function requestFingerprint() {
    socket.emit("fingerprint", 3);
  }

  return (
    <Box style={formContainerStyle}>
      <Typography variant="h3" sx={headingStyle}>
        Please place your finger on the scanner
      </Typography>
      <img
        src={FingerprintImg}
        alt="fingerprint"
        style={{ margin: "10%" }}
      />
      {isStudent && (
        <Button
          variant="contained"
          sx={submitButtonStyle}
          onClick={
            requestFingerprint
          }
        >
          SCAN FINGERPRINT
        </Button>
      )}
      {isStudent && (
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            navigate(`/exam-attendance-report/${examId}`);
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

const submitButtonStyle = {
  mt: 3,
  mb: 2,
  margin: 2,
  width: "75%",
};