import React, { useEffect } from 'react';

import { useAuth } from '../context/UserContext';
import { Navigate } from '../router';

const LogOut = () => {
  const { signOut } = useAuth();
  useEffect(() => {
    // if somebody visits this page,
    // treat it as a sign-out
    // and throw away their user and their token
    signOut();
  });
    return (
      <Navigate to="/login" />
    );
}

export default LogOut;