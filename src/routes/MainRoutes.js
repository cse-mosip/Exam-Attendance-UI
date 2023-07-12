import MainLayout from '../layout/MainLayout';
import LoginPage from '../pages/login_page';
import SchedulePage from '../pages/schedule-page';
import ErrorPage from '../pages/error-page';
import CustomLoginPage from '../pages/custom-login-page';
import AttendanceMarkingPage from '../pages/attendance-marking-page';
import ExaminerLoginPage from '../pages/examiner-login-page';


const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <LoginPage />
    },
    {
      path: 'schedule',
      element: <SchedulePage />
    },
    {
      path:"*",
      element:<ErrorPage/>
    },
    {
      path: "customlogin",
      element: <CustomLoginPage />
    },
    {
      path: "attendancemarking",
      element: <AttendanceMarkingPage />
    },
    {
      path:"login/examiner",
      element:<ExaminerLoginPage/>
    }
  ]
};

export default MainRoutes;
