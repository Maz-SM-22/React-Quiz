import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { useLoader } from '../contexts/LoadingContext';

const Register = () => {
    const [username, setUsername] = useState('');
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
                username: username,
                email: email,
                password: password
            })
        }
        try {
            const response = await fetch('/auth/register', requestOptions);
            const data = await response.json()
            if (!response.ok) {
                loading?.setError(data.message);
                throw new Error(response.statusText)
            } else {
                auth?.onLogin(data);
                navigate('/setup', { replace: true })
            }
        } catch (error: any) {
            loading?.setError(error)
        }
    }

    return (
        <form className='form-control'>
            <h1>Register</h1>
            <label htmlFor="username">
                Username: {" "}
                <input
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
            </label>
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
            <button onClick={handleSubmit}>Register</button>
        </form>
    )
}

export default Register; 
