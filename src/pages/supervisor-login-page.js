import { useState } from "react";
import { Box, Typography } from "@mui/material";
import SupervisorCustomLoginComponent from "../components/supervisor-custom-login";
import FingerprintScanner from "../components/fingerprint-scanner";

export default function SupervisorLoginPage() {
  const [isBioLogin, setIsBioLogin] = useState(true);
  // This will change the state of the bio login.
  const handleBioLoginChange = () => {
    setIsBioLogin(!isBioLogin);
  };

  return (
    <Box>
      <Typography variant="h1" sx={styles.title}>
        Supervisor Login
      </Typography>

      {/* Dynamic rendering after checking the bio login or not. */}
      {isBioLogin ? (
        <Box sx={styles.supervisorLoginBio}>
          <FingerprintScanner
            isStudent={false}
            setIsBioLogin={handleBioLoginChange}
          />
        </Box>
      ) : (
        <Box sx={styles.supervisorLoginBio}>
          <SupervisorCustomLoginComponent setIsBioLogin={handleBioLoginChange} />
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

  supervisorLoginBio: {
    display: "flex",
    justifyContent: "center",
  },
};
