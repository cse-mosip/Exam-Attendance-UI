import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Link,
} from "@mui/material";
import React from "react";
import { useAppContext } from "../context/appContext";

function ExaminerCustomLoginComponent() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const { loginExaminer } = useAppContext();

  // TODO - call this when submit
  const handleLogIn = (email, password) => {
    loginExaminer({ email, password }, true);
  };

  return (
    <Box>
      <Paper
        sx={{
          height: "431px",
          width: "447px",
          padding: "50px 51px 51px 51px",
          borderRadius: "10px",
        }}
      >
        <TextField
          label="Index Number"
          variant="standard"
          sx={{
            width: "344px",
            height: "52px",
            marginTop: "30px",
          }}
        />
        <TextField
          label="Password"
          variant="standard"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            width: "344px",
            height: "52px",
            marginTop: "30px",
          }}
        />
        <Button
          variant="contained"
          sx={{
            margin: "80px  0 20px 0",
            width: "344px",
            height: "41px",
          }}
        >
          SUBMIT
        </Button>
        <Box sx={{ textAlign: "center" }}>
          <Link
            sx={{
              color: "#000000",
              textDecoration: "underline",
            }}
          >
            USE BIO-METRIC LOGIN INSTEAD
          </Link>
        </Box>
      </Paper>
    </Box>
  );
}

export default ExaminerCustomLoginComponent;
