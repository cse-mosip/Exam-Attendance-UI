import { useState } from "react";
import { Box, Typography } from "@mui/material";
import ExaminerCustomLoginComponent from "../components/examiner-custom-login";
import FingerprintScanner from "../components/fingerprint-scanner";

export default function ExaminerLoginPage() {
  const [isBioLogin, setIsBioLogin] = useState(true);
  const handleBioLoginChange = () => {
    setIsBioLogin(!isBioLogin);
  };

  return (
    <Box>
      <Typography variant="h1" sx={styles.title}>
        Examiner Login
      </Typography>
      {console.log(isBioLogin)}
      {isBioLogin ? (
        <Box sx={styles.examinerLoginBio}>
          <FingerprintScanner
            isStudent={false}
            setIsBioLogin={handleBioLoginChange}
          />
        </Box>
      ) : (
        <Box sx={styles.examinerLoginBio}>
          <ExaminerCustomLoginComponent />
        </Box>
      )}
    </Box>
  );
}

const styles = {
  title: {
    color: "#0170D6",
    display: "flex",
    justifyContent: "center",
    padding: "4rem",
  },

  examinerLoginBio: {
    display: "flex",
    justifyContent: "center",
  },
};
