import MainLayout from '../layout/MainLayout';
import LoginPage from '../pages/login_page';
import SchedulePage from '../pages/schedule-page';
import ErrorPage from '../pages/error-page';
import ExamAttendanceReport from '../pages/exam_attendance_report';
import AttendanceMarkingPage from '../pages/attendance-marking-page';
import ExaminerLoginPage from '../pages/examiner-login-page';
import StudentDetailsDummyPage from '../pages/student-details-dummy-page';


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
      path: "attendancemarking",
      element: <AttendanceMarkingPage />
    },
    {
      path:"login/examiner",
      element:<ExaminerLoginPage/>
    },
    {
      path: "student-details-dummy-page",
      element: <StudentDetailsDummyPage />
    }
  ]
};

export default MainRoutes;
