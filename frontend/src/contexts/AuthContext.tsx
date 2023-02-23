import React, { createContext, useContext, useState, useEffect } from 'react'
import { useLoader } from './LoadingContext';

type authContextProps = {
    children: React.ReactElement
}

type authDataType = {
    id: string,
    username: string,
    email: string
}

type authContextType = {
    authData: authDataType | undefined,
    onLogin: (data: authDataType) => void,
    onLogout: () => void
}

const AuthContext = createContext<authContextType | undefined>(undefined);

const AuthProvider = ({ children }: authContextProps) => {
    const [authData, setAuthData] = useState<authDataType | undefined>(undefined)
    const loading = useLoader();

    useEffect(() => {
        const getLoggedInUser = async () => {
            try {
                loading?.setIsLoading(true);
                const response = await fetch('/auth/data', {
                    method: 'GET',
                    headers: { "Content-type": "appliction/json" },
                    credentials: 'include'
                });
                if (!response.ok) {
                    loading?.setError(response.statusText);
                    throw new Error(response.statusText);
                } else {
                    const userData = await response.json();
                    onLogin(userData);
                    loading?.setIsLoading(false);
                    return userData;
                }
            } catch (error: any) {       // Fix any type 
                loading?.setError(error);
                throw new Error(error.message)
            }
        }
        getLoggedInUser();
    }, [])

    const onLogin = (data: authDataType) => setAuthData(data);

    const onLogout = () => setAuthData(undefined);

    return (
        <AuthContext.Provider value={{ authData, onLogin, onLogout }}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuthContext = () => useContext(AuthContext);

export { AuthContext, AuthProvider, useAuthContext }; 