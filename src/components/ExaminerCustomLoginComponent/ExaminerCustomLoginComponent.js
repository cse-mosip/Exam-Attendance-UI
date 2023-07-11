import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import React from "react";

function ExaminerCustomLoginComponent() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box>
      <Paper
        sx={{
          height: "431px",
          width: "447px",
          padding: "50px 51px 102px 51px",
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
          //eye icon
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
            marginTop: "100px",
            width: "344px",
            height: "41px",
          }}
        >
          SUBMIT
        </Button>
      </Paper>
    </Box>
  );
}

export default ExaminerCustomLoginComponent;
