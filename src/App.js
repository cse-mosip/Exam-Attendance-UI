import { BrowserRouter, Routes, Route } from "react-router-dom";
import ThemeCustomization from "./themes";
import NavBar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthWrapper from "./components/auth-wrapper";
import SchedulePage from "./pages/schedule-page";
import Report from "./pages/exam_attendance_report";
import ErrorPage from "./pages/error-page";
import AttendanceMarkingPage from "./pages/attendance-marking-page";
// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => (
  <ThemeCustomization>
    <BrowserRouter basename={'/frontend-service/exam-attendance'}>
      <NavBar />
      <ToastContainer />
      <Routes>
        <Route
          path={"/"}
          element={
            <AuthWrapper>
              <SchedulePage />
            </AuthWrapper>
          }
        />
        <Route
          path={"/exam-attendance-report/:examid"}
          element={
            <AuthWrapper>
              <Report />
            </AuthWrapper>
          }
        />
        <Route
          path={"/attendance-marking"}
          element={
            <AuthWrapper>
              <AttendanceMarkingPage />
            </AuthWrapper>
          }
        />
        <Route path={"*"} element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  </ThemeCustomization>
);

export default App;
