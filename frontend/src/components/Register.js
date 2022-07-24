import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Wrapper } from "./Login.styles";

const Register = () => {
    const { register } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || '/dashboard';

    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [error, setError] = useState();

    const handleSubmit = async e => {
      e.preventDefault();
      if (password !== confirmPassword || !(password && username && email)) {
        alert("Missing/Wrong information.");
      } else {
        try {
          const response = await register({ email, password });
          setUsername('');
          setEmail('');
          setPassword('');
          setConfirmPassword('');
          navigate(from, { replace: true });
        } catch(err) {
            console.log(err);
            setError('Invalid Credentials.');
        }
      }
    }

    return (
        <Wrapper onSubmit={handleSubmit}>
            <label>
                <p>Username</p>
                <input type='text' placeholder="Username" onChange={e => setUsername(e.target.value)} />
            </label>
            <label>
                <p>Email</p>
                <input type='email' placeholder="Email" onChange={e => setEmail(e.target.value)} />
            </label>
            <label>
                <p>Password</p>
                <input type='password' placeholder="Password" onChange={e => setPassword(e.target.value)} />
            </label>
            <label>
                <p>Confirm Password</p>
                <input type='password' placeholder="Confirm Password" onChange={e => setConfirmPassword(e.target.value)} />
            </label>
            <button type='submit' disabled={password === confirmPassword && username && email && password ? false : true} >Submit</button>
        </Wrapper>
    );
}

export default Register;