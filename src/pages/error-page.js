import { Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";
import ErrorImage from "../assets/error404.png";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <Box style={containerStyle}>
      <img src={ErrorImage} alt="Error 404" width={400} />
      <Typography variant="h3" style={headingFormStyle}>
        Page Not Found
      </Typography>
      <Typography variant="h6" style={contentFormStyle}>
        The page you're looking for does not seem to exist
      </Typography>
      <BackButton
        onClick={() => {
          navigate("/");
        }}
      >
        Go to Home
      </BackButton>
    </Box>
  );
}

// Define style variables
const containerStyle = {
  marginTop: "10%",
  textAlign: "center",
};

const headingFormStyle = {
  textAlign: "center",
  marginTop: "1%",
  color: "#000000",
  letterSpacing: "1px",
  fontSize: 25,
  fontFamily: "Alata, sans-serif",
  fontWeight: 600,
};

const contentFormStyle = {
  color: "#616161",
  marginTop: 5,
  fontFamily: "Alata, sans-serif",
};

const BackButton = styled(Button)({
  textTransform: "none",
  fontSize: 14,
  marginTop: "1%",
  padding: "6px 12px",
  border: "1px solid",
  lineHeight: 1.5,
  color: "#fff",
  backgroundColor: "#00417D",
  borderColor: "#00417D",
  fontFamily: "Alata, sans-serif",
  "&:hover": {
    backgroundColor: "#0d47a1",
    borderColor: "#0d47a1",
    boxShadow: "none",
  },
});
