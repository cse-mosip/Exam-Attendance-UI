import MainLayout from '../layout/MainLayout';
import LoginPage from '../pages/login_page';
import SchedulePage from '../pages/schedule-page';
import ErrorPage from '../pages/error-page';
import ExamAttendanceReport from '../pages/exam_attendance_report';
import CustomLoginPage from '../pages/custom-login-page';


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
      path: 'exam-attendance-report',
      element: <ExamAttendanceReport />
    },
    {
      path:"*",
      element:<ErrorPage/>
    },
    {
      path: "customlogin",
      element: <CustomLoginPage />
    }
  ]
};

export default MainRoutes;
