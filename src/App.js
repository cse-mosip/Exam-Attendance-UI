import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import ThemeCustomization from "./themes";
import NavBar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => (
  <ThemeCustomization>
    <ToastContainer />
    <BrowserRouter>
      <NavBar />
      <Routes />
    </BrowserRouter>
  </ThemeCustomization>
);

export default App;
