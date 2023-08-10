import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '@/util/API';
import { useToken } from '@/auth/hooks/useToken';
import { errorHandler } from "@/util/errorHandler";

export const LogInPage = () => {
  const [token, setToken] = useToken();

  const [errorMessage, setErrorMessage] = useState('');

  const [emailValue, setEmailValue] = useState('abc@abcd.com');
  const [passwordValue, setPasswordValue] = useState('123');

  const navigate = useNavigate();

  const onLogInClicked = async () => {
    try {
      const response = await API.post('/api/login', {
        email: emailValue,
        password: passwordValue,
      });
      const { token } = response.data;

      setToken(token);
      navigate('/');
    } catch (error: any) {
      setErrorMessage(errorHandler(error, 'login'));
    }
  };

  return (
    <div className="content-container">
      <h1>Log In</h1>
      {errorMessage && <div className="fail">{errorMessage}</div>}
      <input
        value={emailValue}
        onChange={(e) => setEmailValue(e.target.value)}
        placeholder="someone@gmail.com"
      />
      <input
        type="password"
        value={passwordValue}
        onChange={(e) => setPasswordValue(e.target.value)}
        placeholder="password"
      />
      <button disabled={!emailValue || !passwordValue} onClick={onLogInClicked}>
        Log In
      </button>
      <button onClick={() => navigate('/forgot-password')}>
        Forgot your password?
      </button>
      <button onClick={() => navigate('/signup')}>
        Don't have an account? Sign Up
      </button>
    </div>
  );
};
