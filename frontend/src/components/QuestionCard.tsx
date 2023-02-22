import React from 'react';
import he from 'he';

export type userAnswerType = {
    question: string,
    answer: string,
    correctAnswer: string,
    isCorrect: boolean
}

type QCProps = {
    question: string,
    answers: string[],
    callback: any, // change later
    questionNumber: number,
    totalQuestions: number
    userAnswer: userAnswerType | undefined
}

const QuestionCard: React.FC<QCProps> = (props: QCProps) => {
    return (
        <div>
            <p className="number">Question: {props.questionNumber} out of {props.totalQuestions}</p>
            <p className="question">{he.unescape(props.question)}</p>
            <div className='answers-box'>
                {props.answers.map((answer, i) => (
                    <button
                        key={i}
                        className="answer"
                        value={answer}
                        onClick={(e) => props.callback(e.currentTarget.value)}
                    >{he.unescape(answer)}</button>
                ))}
            </div>
        </div>
    )
}

export default QuestionCard; 