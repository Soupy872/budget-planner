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
import { Wrapper } from './LogReg.styles';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [check, toggleCheck] = useToggle('persist', false);
    const from = location?.state?.from?.pathname || '/';

    const [validated, setValidated] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }

        setValidated(true);

        try {
          await login({ email, password });
          setEmail(null);
          setPassword(null);
          navigate(from, { replace: true });
      } catch(err) {
          console.log(err);
          setError('Invalid Credentials.');
      }
    }

    return (
      <Wrapper>
        <Form className="form-style flex-column justify-content-center" noValidate validated={validated} onSubmit={handleSubmit}>
          <h1 className="border-bottom">Sign In</h1>
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
    
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required />
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

export default Login;