import MainLayout from '../layout/MainLayout';
import SchedulePage from '../pages/schedule-page';
import ErrorPage from '../pages/error-page';
import ExamAttendanceReport from '../pages/exam_attendance_report';
import AttendanceMarkingPage from '../pages/attendance-marking-page';
import SupervisorLoginPage from '../pages/supervisor-login-page';

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
      path: "attendance-marking",
      element: <AttendanceMarkingPage />
    }
  ]
};

export default MainRoutes;
