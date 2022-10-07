import React from 'react';
import { useAuth } from '../context/UserContext';

const Profile = () => {
  const { user } = useAuth();
  return (
    <pre>{JSON.stringify(user.item, null, 2)}</pre>
  );
};

export default Profile;