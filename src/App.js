import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import ThemeCustomization from './themes';
import NavBar from './components/Navbar';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => (
  <ThemeCustomization>
      
      <BrowserRouter>
        <NavBar/>
        <Routes />
      </BrowserRouter>
  </ThemeCustomization>
);

export default App;
