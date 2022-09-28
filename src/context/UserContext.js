import { createContext, useContext, useState } from 'react';
import ApiClient from '../ApiClient';

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [result, setResult] = useState(null);

  const signIn = async ({ email, password }) => {
    setResult({
      status: 'LOADING',
      tms: Date.now()
    });
    const res = await ApiClient.authenticate({email, password});
    setResult({
      status: res.error ? 'ERROR' : 'LOADED',
      tms: Date.now(),
      result: res
    });
  };

  const value = { result, signIn };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserProvider;
export const useAuth = () => useContext(UserContext);