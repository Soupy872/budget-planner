import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// custom hooks
import useAuth from '../../hooks/useAuth';
import useToggle from "../../hooks/useToggle";

// styles
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import InputGroup from "react-bootstrap/InputGroup";
import { Wrapper } from './LogReg.styles';

const Register = () => {
    const { register } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [check, toggleCheck] = useToggle('persist', false);
    const from = location?.state?.from?.pathname || '/';

    const [validated, setValidated] = useState(false);
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [error, setError] = useState();
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }

        setValidated(true);

        if (password !== confirmPassword) {
          setPassword(null);
          setConfirmPassword(null);

          return setError('Passwords do not match.')
        }
          try {
              const res = await register({ username, email, password });
              if (!res) throw Error;
              setPassword(null);
              setConfirmPassword(null);
              navigate(from, { replace: true });
          } catch(err) {
              console.log(err);
              setError('Invalid Credentials.');
          }
    }

    return (
      <Wrapper>
      <Form className="form-style flex-column justify-content-center" noValidate validated={validated} onSubmit={handleSubmit}>
        <h1 className="border-bottom">Register</h1>
        {error ? (
          <Alert key='invalid' variant='danger'>
            {error}
          </Alert>
          ): (
            null
          )
        }
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={e => setEmail(e.target.value)} required />
          <Form.Control.Feedback type="invalid">
              Email is required.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="validationCustomUsername">
          <Form.Label>Username</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Username"
              aria-describedby="inputGroupPrepend"
              required
              onChange={e => setUsername(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required />
          <Form.Control.Feedback type="invalid">
              Password is required.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" placeholder="Confirm Password" onChange={e => setConfirmPassword(e.target.value)} required />
          <Form.Control.Feedback type="invalid">
              Password is required.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPersist">
          <Form.Check type="checkbox" label="Remember Me" checked={check} onChange={toggleCheck} />
        </Form.Group>
        <Button variant="primary" className="w-100" type="submit">
          Submit
        </Button>
      </Form>
    </Wrapper>
    );
}

export default Register;