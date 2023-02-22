import * as _ from 'lodash';

export type Question = {
    category: string,
    type: string,
    difficulty: string,
    question: string,
    correct_answer: string,
    incorrect_answers: string[]
    answers: string[]
}

export const fetchQuizQuestions = async (amount: number, difficulty: 'easy' | 'medium' | 'hard', category?: number) => {
    const url = `https://opentdb.com/api.php?amount=${amount}&category=${category ? category : ''}&difficulty=${difficulty}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (response.ok) {
            return data.results.map((question: Question) => {
                return {
                    ...question,
                    answers: _.shuffle([...question.incorrect_answers, question.correct_answer])
                }
            });
        } else {
            console.error(data);
            return null;
        }
    } catch (err) {
        console.error(err);
    }
}