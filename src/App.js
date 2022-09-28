import * as React from "react";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";
import './App.scss';

import UserProvider from './context/UserContext';

import SignIn from './containers/LogIn';

const App = () => {
  return (
    <UserProvider>
      <Routes>
        <Route path="/login" element={<SignIn />} />
      </Routes>
    </UserProvider>
  );
}


export default App;