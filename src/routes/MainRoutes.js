import MainLayout from '../layout/MainLayout';
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
      path: '/login',
      element:<ExaminerLoginPage/>
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
    },
    {
      path: "student-details-dummy-page",
      element: <StudentDetailsDummyPage />
    }
  ]
};

export default MainRoutes;
