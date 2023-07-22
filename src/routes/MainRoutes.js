import MainLayout from '../layout/MainLayout';
import SchedulePage from '../pages/schedule-page';
import ErrorPage from '../pages/error-page';
import ExamAttendanceReport from '../pages/exam_attendance_report';
import AttendanceMarkingPage from '../pages/attendance-marking-page';
import SupervisorLoginPage from '../pages/supervisor-login-page';
import AuthWrapper from "../components/auth-wrapper";

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/login',
      element:<SupervisorLoginPage/>
    },
    {
      path: 'schedule',
      element: <AuthWrapper><SchedulePage /></AuthWrapper>
    },
    {
      path: 'exam-attendance-report/:examid',
      element: <AuthWrapper><ExamAttendanceReport /></AuthWrapper>
    },
    {
      path:"*",
      element:<ErrorPage/>
    },
    {
      path: "attendance-marking",
      element: <AuthWrapper><AttendanceMarkingPage /></AuthWrapper>
    }
  ]
};

export default MainRoutes;
