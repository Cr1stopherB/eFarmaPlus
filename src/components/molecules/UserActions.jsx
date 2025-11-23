// components/molecules/UserActions.jsx
import React from 'react';
import '../../styles/molecules/UserActions.css';

const UserActions = () => {
  return (
    <div className="user-actions">
      <button className="action-button">🔍</button>
      <button className="action-button">👤</button>
      <button className="action-button">🛒</button>
    </div>
  );
};

export default UserActions;