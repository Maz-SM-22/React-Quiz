import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { useLoader } from '../contexts/LoadingContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = useAuthContext();
    const loading = useLoader();
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
                loading?.setError(response.statusText);
                throw new Error(response.statusText)
            } else {
                const data = await response.json()
                auth?.onLogin(data);
                navigate('/setup', { replace: true })
            }
        } catch (error: any) {
            loading?.setError(error);
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
