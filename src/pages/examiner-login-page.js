import { useState } from "react";
import { Box, Typography } from "@mui/material";
import ExaminerCustomLoginComponent from "../components/examiner-custom-login";
import FingerprintScanner from "../components/fingerprint-scanner";

export default function ExaminerLoginPage() {
  const [isBioLogin, setIsBioLogin] = useState(false);
  return (
    <Box>
      <Typography variant="h1" sx={styles.title}>
        Examiner Login
      </Typography>

      {isBioLogin ? (
        <FingerprintScanner isStudent={true} />
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
