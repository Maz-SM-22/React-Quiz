import React, { useState, useContext, createContext } from 'react'

type quizContextProps = {
    children: React.ReactElement;
}

type quizContext = {
    totalQuestions: string,
    setTotalQuestions: (totalQuestions: string) => void
    difficulty: string,
    setDifficulty: (difficulty: string) => void
    category: string
    setCategory: (category: string) => void
}

const QuizContext = createContext<quizContext | undefined>(undefined);

const QuizContextProvider = ({ children }: quizContextProps) => {
    const [totalQuestions, setTotalQuestions] = useState('10');
    const [difficulty, setDifficulty] = useState('easy');
    const [category, setCategory] = useState('');

    return (
        <QuizContext.Provider value={{
            totalQuestions, setTotalQuestions,
            difficulty, setDifficulty,
            category, setCategory
        }}>
            {children}
        </QuizContext.Provider>
    )
}

const useQuizSettings = () => useContext(QuizContext);

export { QuizContext, QuizContextProvider, useQuizSettings }; 