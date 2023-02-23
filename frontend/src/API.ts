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

export const fetchQuizQuestions = async (amount: number, difficulty: string = '', category: string = '') => {
    const url = new URL('https://opentdb.com/api.php');
    url.searchParams.append('amount', amount.toString());
    if (difficulty) url.searchParams.append('difficulty', difficulty);
    if (category) url.searchParams.append('category', category);
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

export const fetchCategories = async () => {
    try {
        const response = await fetch('https://opentdb.com/api_category.php');
        const data = await response.json();
        return data.trivia_categories;
    } catch (err) {
        console.error(err);
    }
}
