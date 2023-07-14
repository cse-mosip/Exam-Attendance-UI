import { Typography, Button } from "@mui/material";
import { Box } from "@mui/system";

export default function ErrorPage() {

  return (
    <Box style={containerStyle}>

      <Box sx={formContainerStyle} component="form" Validate>
        <Typography variant="h1" style={headingFormStyle404}>
          404
        </Typography>
        <Typography variant="h3" style={headingFormStyle}>
          Page Not Found
        </Typography>

        <Button size="lg" color="error" variant="contained" sx={stopButtonStyle}>
          Home
        </Button>

      </Box>
    </Box>
  );
}

// Define style variables
const containerStyle = {
  marginTop: "10%",
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

const headingFormStyle = {
  textAlign: "center",
  marginTop: "5%",
  color: "red",
  letterSpacing: "1px",
  fontSize: 32,
  fontFamily: "Alata, sans-serif",
  fontWeight: 450,
};

const headingFormStyle404 = {
  textAlign: "center",
  marginTop: "5%",
  color: "red",
  letterSpacing: "1px",
  fontSize: 45,
  fontFamily: "Alata, sans-serif",
  fontWeight: 800,
};

const stopButtonStyle = {
  mt: 3,
  mb: 2,
};
