import React from 'react';
import {
  Routes,
  Route,
  PrivateRoutes,
  PublicRoutes
} from './router';
import './App.scss';

import Home from './containers/Home';
import LogIn from './containers/LogIn';
import Profile from './containers/Profile';

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoutes />}>
          {/* Any route requiring user authentication needs to be nested inside this <Routes> component */}
          {/* https://medium.com/@dennisivy/creating-protected-routes-with-react-router-v6-2c4bbaf7bc1c */ }
          <Route path="/profile" element={<Profile />} exact />
          <Route path="/" element={<Home />} exact />
        </Route>
        <Route element={<PublicRoutes />}>
          {/* Routes that do not require authentication go down here */}
          <Route path="/login" element={<LogIn />} />
        </Route>
      </Routes>
    </>
  );
}


export default App;