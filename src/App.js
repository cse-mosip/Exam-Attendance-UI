import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import ThemeCustomization from './themes';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => (
  <ThemeCustomization>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
  </ThemeCustomization>
);

export default App;
