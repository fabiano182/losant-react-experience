import React, { useEffect } from 'react';

import { Navigate, useLocation, Outlet, Link } from '.';
import { useAuth } from '../context/UserContext';
import { isInitialLoading, isLoaded, isNotRequested } from '../context/utils';

import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Dropdown from 'react-bootstrap/Dropdown';

const PrivateRoutes = () => {
  const { fetchUser, user } = useAuth();
  const location = useLocation();
  const userIsNotRequested = isNotRequested(user);
  useEffect(() => {
    if (userIsNotRequested) {
      fetchUser();
    }
  }, [userIsNotRequested, fetchUser]);
  if (isLoaded(user)) {
    let userName = '';
    if (user.item.firstName) {
      userName += user.item.firstName;
    }
    if (user.item.lastName) {
      if (userName) {
        userName += ` ${user.item.lastName}`;
      } else {
        userName += user.item.firstName;
      }
    }
    if (!userName) {
      userName = user.item.email;
    }

    return (
      <>
        <Navbar bg="light" expand="lg" fixed="top">
          <Container fluid>
            <Navbar.Brand as={Link} to="/">My IoT Solution</Navbar.Brand>
            <NavDropdown align="end" title={<img style={{ borderRadius: 30, width: 30, height: 30 }} src={user.item.avatarUrl} alt={`${user.item.firstName || ''} ${user.item.lastName || ''}`} />}>
              <Dropdown.Header>{userName}</Dropdown.Header>
              <Dropdown.Item as={Link} to="/profile">View Profile</Dropdown.Item>
              <Dropdown.Item as={Link} to="/logout">Sign Out</Dropdown.Item>
            </NavDropdown>
          </Container>
        </Navbar>
        <div style={{marginTop: 64}}>
          <Outlet />
        </div>
      </>
    );
  }
  if (isInitialLoading(user)) {
    return (<div className="text-center mt-5"><Spinner role="status" animation="border" /></div>);
  }
  // error
  return (<Navigate to="/login" state={{ from: location }} replace />);
}

export default PrivateRoutes;