import React, { useState } from 'react';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

import { useAuth } from '../context/UserContext';
import { isLoaded } from '../context/utils';
import { useNavigate, Navigate } from '../router';

const LogIn = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isWorking, setIsWorking] = useState(false);
  const [authError, setAuthError] = useState(false);
  const { signIn, user } = useAuth();
  const navigate = useNavigate();
  const { email, password } = formData;

  if (isLoaded(user)) {
    return (<Navigate to="/" />);
  }

  const handleChange = (e) => {
    const prop = e.target.name;
    const value = e.target.value;
    setFormData({
      ...formData,
      [prop]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsWorking(true);
    const result = await signIn(formData);
    if (result.error) {
      setIsWorking(false);
      setAuthError(result.error.message || 'An unknown error occrred.');
    } else {
      navigate('/');
    }
  }

  return (
    <div style={{maxWidth: 480, margin: '0 auto'}}>
      <h1 className="display-6 text-center my-3">My IoT Solution</h1>
      {authError && <Alert className="mb-3" variant={isWorking ? 'secondary' : 'danger'}>Login failed: {authError}</Alert>}
      <Card>
        <Card.Body>
          <Card.Title>Sign In</Card.Title>
          <Form
            onSubmit={handleSubmit}
          >
            <fieldset disabled={isWorking}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  placeholder="e.g. myemail@domain.com"
                  value={email}
                  onChange={handleChange}
                  autoFocus
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={handleChange}
                  minLength={8}
                />
              </Form.Group>
              <Button
                variant="success"
                type="submit"
              >
                {isWorking ? 'Submitting ...' : 'Sign In'}
              </Button>
            </fieldset>
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}

export default LogIn;