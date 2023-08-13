import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '@/utils/API';
import { useToken } from '@/auth/hooks/useToken';
import { errorHandler } from '@/utils/errorHandler';
import { useQueryParams } from '@/utils/useQueryParams';

export const LogInPage = () => {
  const [, setToken] = useToken();

  const [errorMessage, setErrorMessage] = useState('');

  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const [googleOauthUrl, setGoogleOauthUrl] = useState('');
  const { token: oauthToken } = useQueryParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (oauthToken) {
      setToken(oauthToken);
      navigate('/');
    }
  }, [oauthToken, setToken]);

  useEffect(() => {
    const loadOauthUrl = async () => {
      try {
        const response = await API.get('/auth/google/url');
        const { url } = response.data;
        setGoogleOauthUrl(url);
      } catch (e) {
        console.log(e);
      }
    };

    loadOauthUrl();
  }, []);

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
      <button
        disabled={!googleOauthUrl}
        onClick={() => {
          window.location.href = googleOauthUrl;
        }}
      >
        Log in with Google
      </button>
    </div>
  );
};
