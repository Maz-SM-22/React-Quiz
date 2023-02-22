import React, { useState, useContext, createContext } from 'react';

type loadingContextProps = {
    children: React.ReactElement
}

type contextType = {
    isLoading: boolean,
    setIsLoading: (isLoading: boolean) => void
}

const LoadContext = createContext<contextType | undefined>(undefined);

const LoadingContext = ({ children }: loadingContextProps) => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <LoadContext.Provider value={{ isLoading, setIsLoading }}>
            {children}
        </LoadContext.Provider>
    )
}
const useLoader = () => useContext(LoadContext);

export { LoadContext, LoadingContext, useLoader }; 