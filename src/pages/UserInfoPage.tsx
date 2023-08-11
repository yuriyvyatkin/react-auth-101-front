import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '@/util/API';
import { useToken } from '@/auth/hooks/useToken';
import { useUser } from '@/auth/hooks/useUser';

export const UserInfoPage = () => {
  const user = useUser();
  const [token, setToken] = useToken();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  const { id, email, info } = user;
  const [favoriteFood, setFavoriteFood] = useState(info.favoriteFood || '');
  const [hairColor, setHairColor] = useState(info.hairColor || '');
  const [bio, setBio] = useState(info.bio || '');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  useEffect(() => {
    if (showSuccessMessage || showErrorMessage) {
      setTimeout(() => {
        setShowSuccessMessage(false);
        setShowErrorMessage(false);
      }, 3000);
    }
  }, [showSuccessMessage, showErrorMessage]);

  const saveChanges = async () => {
    try {
      const response = await API.put(
        `/api/users/${id}`,
        {
          favoriteFood,
          hairColor,
          bio,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const { token: newToken } = response.data;
      setToken(newToken);
      setShowSuccessMessage(true);
    } catch (error) {
      setShowErrorMessage(true);
    }
  };

  const logOut = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const resetValues = () => {
    setFavoriteFood(info.favoriteFood);
    setHairColor(info.hairColor);
    setBio(info.bio);
  };

  return (
    <div className="content-container">
      <h1>Info for {email}</h1>
      {showSuccessMessage && (
        <div className="success">Successfully saved user data!</div>
      )}
      {showErrorMessage && (
        <div className="fail">
          Uh oh... something went wrong and we couldn't save changes
        </div>
      )}
      <label>
        Favorite Food:
        <input
          onChange={(e) => setFavoriteFood(e.target.value)}
          value={favoriteFood}
        />
      </label>
      <label>
        Hair Color:
        <input
          onChange={(e) => setHairColor(e.target.value)}
          value={hairColor}
        />
      </label>
      <label>
        Bio:
        <input onChange={(e) => setBio(e.target.value)} value={bio} />
      </label>
      <hr />
      <button onClick={saveChanges}>Save Changes</button>
      <button onClick={resetValues}>Reset Values</button>
      <button onClick={logOut}>Log Out</button>
    </div>
  );
};
