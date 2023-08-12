import {
  Route,
  BrowserRouter as Router,
  Routes as Switch,
} from 'react-router-dom';
import { UserInfoPage } from './pages/UserInfoPage';
import { LogInPage } from './pages/LogInPage';
import { SignUpPage } from './pages/SignUpPage';
import { PrivateRoute } from './auth/PrivateRoute';
import { PleaseVerifyEmailPage } from './pages/PleaseVerifyEmailPage';
import { EmailVerificationPage } from './pages/EmailVerificationPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { PasswordResetPage } from './pages/PasswordResetPage';

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
        <Route path="/please-verify" element={<PleaseVerifyEmailPage />} />
        <Route
          path="/verify-email/:verificationString"
          element={<EmailVerificationPage />}
        />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route
          path="/reset-password/:passwordResetCode"
          element={<PasswordResetPage />}
        />
      </Switch>
    </Router>
  );
};
