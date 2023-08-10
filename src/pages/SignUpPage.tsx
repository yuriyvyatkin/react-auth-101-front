import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '@/util/API';
import { useToken } from '@/auth/hooks/useToken';

export const SignUpPage = () => {
  const [token, setToken] = useToken();

  const [errorMessage, setErrorMessage] = useState('');

  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [confirmPasswordValue, setConfirmPasswordValue] = useState('');

  const navigate = useNavigate();

  const onSignUpClicked = async () => {
    try {
      const response = await API.post('/api/signup', {
        email: emailValue,
        password: passwordValue,
      });
      const { token } = response.data;

      setToken(token);
      navigate('/');
    } catch (error: any) {
      if (error.response) {
        // Запрос был выполнен, и сервер ответил кодом состояния, который выпадает из диапазона 2xx
        console.error(error.response.data);
        console.error(error.response.status);
        console.error(error.response.headers);
        const userIsExist = error.response.data === 'Conflict';
        setErrorMessage(
          error.response.data.message ||
            (userIsExist
              ? 'Error: The user already exists.'
              : 'Error during signup.'),
        );
      } else if (error.request) {
        // Запрос был выполнен, но ответа не было
        console.error(error.request);
        setErrorMessage('No response from server. Please try again later.');
      } else {
        // Другие ошибки
        console.error('Error: ', error.message);
        setErrorMessage(error.message);
      }
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
