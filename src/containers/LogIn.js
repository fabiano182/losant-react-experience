import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Toast from 'react-bootstrap/Toast';

import { useAuth } from '../context/UserContext';

const SignIn = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showAuthError, setShowAuthError] = useState(false);
  const { result, signIn } = useAuth();
  const { email, password } = formData;
  
  const handleChange = (e) => {
    const prop = e.target.name;
    const value = e.target.value;
    setFormData({
      ...formData,
      [prop]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit', formData);
    //setIsWorking(true);
    signIn(formData);
  }

  console.log('result', result);

  return (
    <>
      <Form
        onSubmit={handleSubmit}
      >
        <fieldset disabled={result?.status === 'LOADING'}>
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
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
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
            {result?.status === 'LOADING' ? 'Submitting ...' : 'Submit'}
          </Button>
        </fieldset>
      </Form>
      <Toast onClose={() => setShowAuthError(false)} show={showAuthError} delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto">Bootstrap</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
        </Toast>
    </>
  )
}

export default SignIn;