import React from "react";
import {
  Modal,
  Typography,
  Paper,
  Avatar,
  Button,
  Box,
  useTheme,
} from "@mui/material";

const StudentDetailsModal = ({ person, open, onClose, message }) => {
  const theme = useTheme();

  const avatarStyles = {
    width: theme.spacing(20),
    height: theme.spacing(20),
    marginRight: theme.spacing(4),
    marginLeft: theme.spacing(2),
  };

  const detailsContainerStyles = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  };

  const studentContainerStyles = {
    display: "flex",
    alignItems: "flex-start",
    padding: theme.spacing(4),
  };

  const paperContainerStyles = {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(4),
    minWidth: "400px",
    borderRadius: "1.5rem",
  };

  const modalStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const justifyCenterStyles = {
    display: "flex",
    justifyContent: "center",
  };

  return (
    <Modal open={open} closeAfterTransition sx={modalStyles}>
      <Paper sx={paperContainerStyles}>
        {!message && (
          <Box sx={justifyCenterStyles}>
            <Typography
              variant="h4"
              sx={{ color: "green" }}
              mb={theme.spacing(1)}
            >
              Verification Succesful!
            </Typography>
          </Box>
        )}
        {person && (
          <Box sx={studentContainerStyles}>
            <Avatar
              alt={person.name}
              src={person.profilePicture}
              sx={avatarStyles}
            />
            <div sx={detailsContainerStyles}>
              <Typography variant="h5">{person.name}</Typography>
              <Typography variant="h6">{person.index}</Typography>
            </div>
          </Box>
        )}
        {message && (
          <Box sx={justifyCenterStyles}>
            <Typography variant="h5" color={"error"} mb={theme.spacing(3)}>
              {message}
            </Typography>
          </Box>
        )}
        <Box sx={justifyCenterStyles}>
          <Button variant="contained" color="primary" onClick={onClose}>
            Ok
          </Button>
        </Box>
      </Paper>
    </Modal>
  );
};

export default StudentDetailsModal;
