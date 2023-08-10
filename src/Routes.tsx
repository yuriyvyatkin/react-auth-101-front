import {
  Route,
  BrowserRouter as Router,
  Routes as Switch,
} from 'react-router-dom';
import { UserInfoPage } from './pages/UserInfoPage';
import { LogInPage } from './pages/LogInPage';
import { SignUpPage } from './pages/SignUpPage';
import { PrivateRoute } from './auth/PrivateRoute';

export const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route
          path="/"
          element={
            <PrivateRoute redirectTo="/login">
              <UserInfoPage />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Switch>
    </Router>
  );
};
