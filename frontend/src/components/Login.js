import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Wrapper } from "./Login.styles";
import useAuth from '../hooks/useAuth';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || '/';

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();
    

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await login({ email, password });
            setEmail('');
            setPassword('');
            navigate(from, { replace: true });
        } catch(err) {
            console.log(err);
            setError('Invalid Credentials.');
        }
    }

    return (
        <Wrapper>
            <label>
                <p>Email</p>
                <input type='text' placeholder="Email" onChange={e => setEmail(e.target.value)} />
            </label>
            <label>
                <p>Password</p>
                <input type='password' placeholder="Password" onChange={e => setPassword(e.target.value)} />
            </label>
            <button type='submit' onClick={e => handleSubmit(e)} disabled={email && password ? false : true } >Submit</button>
        </Wrapper>
    )
}

export default Login;