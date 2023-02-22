import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from './contexts/AuthContext';

type reqAuthProps = {
    children: React.ReactElement
}

const RequireAuth = ({ children }: reqAuthProps) => {
    const auth = useAuthContext();

    if (!auth?.authData) {
        return <Navigate to='/login' replace />
    }
    return <>{children}</>
}

export default RequireAuth; 