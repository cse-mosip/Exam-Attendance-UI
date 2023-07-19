import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import ThemeCustomization from "./themes";
import NavBar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => (
  <ThemeCustomization>
    <BrowserRouter>
      <NavBar />
      <ToastContainer />
      <Routes />
    </BrowserRouter>
  </ThemeCustomization>
);

export default App;
