import React, { useState, useContext, createContext } from 'react';

type loadingContextProps = {
    children: React.ReactElement
}

type contextType = {
    isLoading: boolean,
    setIsLoading: (isLoading: boolean) => void
    error: string | undefined,
    setError: (error: string | undefined) => void
}

const LoadContext = createContext<contextType | undefined>(undefined);

const LoadingContext = ({ children }: loadingContextProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);

    return (
        <LoadContext.Provider value={{ isLoading, setIsLoading, error, setError }}>
            {children}
        </LoadContext.Provider>
    )
}
const useLoader = () => useContext(LoadContext);

export { LoadContext, LoadingContext, useLoader }; 