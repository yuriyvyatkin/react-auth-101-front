import {
  Route,
  BrowserRouter as Router,
  Routes as Switch,
} from 'react-router-dom';
import { UserInfoPage } from './pages/UserInfoPage';
import { LogInPage } from './pages/LogInPage';
import { SignUpPage } from "./pages/SignUpPage";

export const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" element={<UserInfoPage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Switch>
    </Router>
  );
};
