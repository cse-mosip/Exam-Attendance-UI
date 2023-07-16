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
import { useAppContext } from "../context/appContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

function ExaminerCustomLoginComponent({ setIsBioLogin }) {
  const [showPassword, setShowPassword] = React.useState(false);
  const withEmail = true;
  const navigate = useNavigate()

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const { loginExaminer } = useAppContext();

  const initialValues = {
    email: "",
    password: "",
  };

  const loginDetailsSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .max(20, "Password is too long - should be 20 chars maximum.")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
  });

  const onSubmit = (values) => {
    loginExaminer(values, withEmail);
    navigate("/schedule");
  };

  const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
    useFormik({
      initialValues,
      validationSchema: loginDetailsSchema,
      enableReinitialize: true,
      onSubmit,
    });

  return (
    <Box sx={style.box}>
      <Paper sx={style.paper}>
        <TextField
          label="Email"
          variant="standard"
          sx={style.textField}
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.email && Boolean(errors.email)}
          helperText={touched.email && errors.email}
          color="primary"
          focused
        />

        <TextField
          label="Password"
          variant="standard"
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.password && Boolean(errors.password)}
          helperText={touched.password && errors.password}
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
          sx={style.textField}
          color="primary"
          focused
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={style.submitButton}
        >
          SUBMIT
        </Button>
        <Button onClick={setIsBioLogin} sx={style.biometricButton}>
          USE BIO-METRIC LOGIN INSTEAD
        </Button>
      </Paper>
    </Box>
  );
}

const style = {
  box: {
    textAlign: "center",
  },
  paper: {
    height: "431px",
    width: "447px",
    padding: "50px 51px 51px 51px",
    borderRadius: "10px",
  },
  textField: {
    width: "344px",
    height: "52px",
    marginTop: "30px",
  },
  submitButton: {
    margin: "80px  0 20px 0",
    width: "344px",
    height: "41px",
  },
  biometricButton: { textDecoration: "underline", color: "grey" },
};

export default ExaminerCustomLoginComponent;
