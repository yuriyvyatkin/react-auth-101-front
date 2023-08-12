import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '@/utils/API';
import { useToken } from '@/auth/hooks/useToken';
import { errorHandler } from '@/utils/errorHandler';

export const SignUpPage = () => {
  const [, setToken] = useToken();

  const [errorMessage, setErrorMessage] = useState('');

  const [emailValue, setEmailValue] = useState('yuriyvyatkin@yandex.ru');
  const [passwordValue, setPasswordValue] = useState('123');
  const [confirmPasswordValue, setConfirmPasswordValue] = useState('123');

  const navigate = useNavigate();

  const onSignUpClicked = async () => {
    try {
      const response = await API.post('/api/signup', {
        email: emailValue,
        password: passwordValue,
      });
      const { token } = response.data;

      setToken(token);
      navigate('/please-verify');
    } catch (error: any) {
      setErrorMessage(errorHandler(error, 'signup'));
    }
  };

  return (
    <div className="content-container">
      <h1>Sign Up</h1>
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
      <input
        type="password"
        value={confirmPasswordValue}
        onChange={(e) => setConfirmPasswordValue(e.target.value)}
        placeholder="password"
      />
      <hr />
      <button
        disabled={
          !emailValue ||
          !passwordValue ||
          passwordValue !== confirmPasswordValue
        }
        onClick={onSignUpClicked}
      >
        Sign Up
      </button>
      <button onClick={() => navigate('/login')}>
        Already have an account? Log In
      </button>
    </div>
  );
};
