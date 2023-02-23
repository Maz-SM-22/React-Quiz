import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import he from 'he';
import { useLoader } from '../contexts/LoadingContext';
import { useAuthContext } from '../contexts/AuthContext';
import { useQuizSettings } from '../contexts/QuizContext';
import { fetchQuizQuestions, Question } from '../API';
import QuestionCard, { userAnswerType } from '../components/QuestionCard';

const Quiz = () => {
    const quizSettings = useQuizSettings();
    const TOTAL_QUESTIONS = parseInt(quizSettings?.totalQuestions || '10');
    const [questions, setQuestions] = useState<Question[]>([]);
    const [number, setNumber] = useState<number>(0);
    const [userAnswers, setUserAnswers] = useState<userAnswerType[]>([]);
    const [userScore, setUserScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const auth = useAuthContext();
    const loader = useLoader();
    const navigate = useNavigate();

    const startQuiz = async () => {
        loader?.setIsLoading(true);
        setGameOver(false)
        const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, quizSettings?.difficulty, quizSettings?.category);
        setQuestions(newQuestions);
        setUserScore(0);
        setNumber(0);
        setUserAnswers([]);
        loader?.setIsLoading(false);
    }

    const saveQuizScore = async () => {
        const requestOptions: RequestInit = {
            method: 'POST',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                userId: auth?.authData?.id,
                category: quizSettings?.category,
                numQuestions: TOTAL_QUESTIONS,
                score: userScore,
                answers: userAnswers
            })
        }
        try {
            const response = await fetch('/results/add', requestOptions);
            const data = await response.json()
            if (!response.ok) {
                loader?.setError(data.message);
                throw new Error(response.statusText);
            } else {
                console.log(data.message);
            }
        } catch (error: any) {
            loader?.setError(error);
        }
    }

    const nextQuestion = () => {
        if (number < TOTAL_QUESTIONS - 1) setNumber(number + 1);
        else {
            setGameOver(true);
            saveQuizScore();
        }
    }

    const checkAnswer = (userAnswer: string) => {
        if (!gameOver) {
            const { question, correct_answer } = questions[number];
            if (userAnswer === correct_answer) {
                setUserScore(userScore + 1);
            }
            const newAnswer = {
                question: question,
                answer: userAnswer,
                correctAnswer: correct_answer,
                isCorrect: userAnswer === correct_answer
            }
            setUserAnswers([...userAnswers, newAnswer])
        }
        nextQuestion();
    }

    const logout = async () => {
        const requestOptions: RequestInit = {
            method: 'GET',
            headers: { "Content-type": "application/json" },
            credentials: 'include'
        }
        try {
            const response = await fetch('/auth/logout', requestOptions);
            if (!response.ok) {
                throw new Error(response.statusText)
            } else {
                auth?.onLogout()
                navigate('/');
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className='quiz'>
            <button onClick={() => navigate('/setup')} className='settings'>Change Quiz Settings</button>
            {auth?.authData && (
                <button onClick={logout} className='logout'>Log Out</button>
            )}
            {questions.length === 0 && (
                <>
                    <h1>React Quiz</h1>
                    <button className="start" onClick={startQuiz}>Start Quiz</button>
                </>
            )}
            {!loader?.isLoading && !gameOver &&
                <QuestionCard
                    question={questions[number].question}
                    answers={questions[number].answers}
                    callback={checkAnswer}
                    questionNumber={number + 1}
                    totalQuestions={TOTAL_QUESTIONS}
                    userAnswer={userAnswers[number]}
                />
            }
            {gameOver && (
                <>
                    <h2>Quiz complete!</h2>
                    <div className="score">Your final score is: {userScore} out of {TOTAL_QUESTIONS}</div>
                    <button
                        className="reset"
                        onClick={startQuiz}
                    >Play Again</button>
                    <h3>Answers:</h3>
                    <div className="answers-block">
                        {userAnswers.map((answer, index) => (
                            <div
                                className='answer-block'
                                key={index}
                            >
                                <div className="question">{he.unescape(answer.question)}</div>
                                <div className={answer.isCorrect ? 'user-answer correct' : 'user-answer'}>{answer.isCorrect ? '✅' : '❌'} Answer: {he.unescape(answer.answer)}</div>
                                {answer.isCorrect ? '' : <div className='correct-answer'>Correct Answer: {he.unescape(answer.correctAnswer)}</div>}
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default Quiz;
