import MainLayout from '../layout/MainLayout';
import LoginPage from '../pages/login_page';
import SchedulePage from '../pages/schedule-page';
import ErrorPage from '../pages/error-page';
import CustomLoginPage from '../pages/custom-login-page';
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
      path:"*",
      element:<ErrorPage/>
    },
    {
      path: "customlogin",
      element: <CustomLoginPage />
    },
    {
      path: "student-details-dummy-page",
      element: <StudentDetailsDummyPage />
    }
  ]
};

export default MainRoutes;
