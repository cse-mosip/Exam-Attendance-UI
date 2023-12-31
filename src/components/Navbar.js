import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";

function NavBar() {
  const location = useLocation();

  const navigate = useNavigate();

  const { logoutSupervisor, token } = useAppContext();

  const handleLogout = () => {
    logoutSupervisor();
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#00417D" }}>
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <IconButton
            color="inherit"
            aria-label="logo"
            sx={{ marginLeft: "30px" }}
            onClick={() => navigate("/")}
          >
            <img
              src="../LogoMain1.png"
              alt="Logo"
              style={{ height: "45px", marginLeft: "30px" }}
            />
          </IconButton>
          {token && (
            <Button
              variant="contained"
              sx={{ height: "35px" }}
              color="error"
              onClick={handleLogout}
            >
              Log Out
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
