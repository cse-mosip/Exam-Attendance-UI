import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Button, TextField, Link } from "@mui/material";
import * as React from "react";
import { useState } from "react";

export default function CustomLoginPage() {
  const [indexNo, setIndexNo] = useState(null);

  const handleInputChange = (e) => {
    setIndexNo(e.target.value);
  };

  return (
    <div
      style={{
        marginTop: "10%",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h3"
        style={{
          marginBottom: "2%",
          color: "#0170D6",
          fontSize: 32,
          letterSpacing: "1px",
          fontFamily: "Alata, sans-serif",
          fontWeight: 400,
        }}
      >
        Attendance Marking
      </Typography>
      <Box
        sx={{
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
        }}
        component="form"
        Validate
      >
        <Typography
          variant="h3"
          style={{
            textAlign: "center",
            marginTop: "5%",
            color: "#0170D6",
            letterSpacing: "1px",
            fontSize: 32,
            fontFamily: "Alata, sans-serif",
            fontWeight: 400,
          }}
        >
          Sign in with Index{" "}
        </Typography>
        <TextField
          id="standard-basic"
          label="Index Number:"
          variant="standard"
          size="small"
          width
          sx={{ width: "75%", marginTop: "5%", marginBottom: "5%" }}
          onChange={(e) => handleInputChange(e)}
        />

        <Button
          type="submit"
          size="lg"
          variant="contained"
          sx={{ mt: 3, mb: 2, margin: 2, width: "75%" }}
        >
          SUBMIT
        </Button>
        <Button
          size="lg"
          color="error"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          STOP ATTENDING
        </Button>

        <Link
          underline="always"
          sx={{
            color: "#4C4C4C",
            cursor: "pointer",
            fontFamily: "Alata",
            fontWeight: "100",
          }}
        >
          USE BIO-METRIC LOGIN INSTEAD{" "}
        </Link>
      </Box>
    </div>
  );
}
