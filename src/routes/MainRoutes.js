import MainLayout from '../layout/MainLayout';
import LoginPage from '../pages/login_page';
import SchedulePage from '../pages/schedule-page';
import ErrorPage from '../pages/error-page';
import CustomLoginPage from '../components/custom-login-page';


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
    }
  ]
};

export default MainRoutes;
