import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = useAuthContext();
    const navigate = useNavigate();

    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        const requestOptions: RequestInit = {
            method: 'POST',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }
        try {
            const response = await fetch('/auth/login', requestOptions);
            if (!response.ok) {
                throw new Error(response.statusText)
            } else {
                const data = await response.json()
                auth?.onLogin(data);
                navigate('/quiz', { replace: true })
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <form className='form-control'>
            <h1>Login</h1>
            <label htmlFor="email">
                Email: {" "}
                <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </label>
            <label htmlFor="password">
                Password: {" "}
                <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    autoComplete='new-password'
                />
            </label>
            <button onClick={handleSubmit}>Login</button>
        </form>
    )
}

export default Login;
