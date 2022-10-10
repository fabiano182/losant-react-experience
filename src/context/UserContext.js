import { createContext, useContext, useState, useCallback } from 'react';
import ApiClient from '../ApiClient';
import { craftErrorObj, craftLoadingObj, craftLoadedObj } from './utils';

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signIn = useCallback(async ({ email, password }) => {
    setUser(craftLoadingObj(user));
    const res = await ApiClient.authenticate({ email, password });
    if (res.error) {
      setUser(craftErrorObj(res.error));
    } else {
      setUser(craftLoadedObj(res.user));
    }
    return res;
  }, [user]);

  const fetchUser = useCallback(async () => {
    setUser(craftLoadingObj(user));
    const res = await ApiClient.fetchUser();
    if (res.error) {
      setUser(craftErrorObj(res.error));
    } else {
      setUser(craftLoadedObj(res));
    }
    return user;
  }, [user])

  const signOut = useCallback(() => {
    setUser(null);
    return ApiClient.logOut();
  }, []);

  const value = { user, signIn, fetchUser, signOut };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserProvider;
export const useAuth = () => useContext(UserContext);