import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCategories } from '../API';
import { useQuizSettings } from '../contexts/QuizContext';

type category = {
    id: number,
    name: string
}

const Setup = () => {
    const [numQuestions, setNumQuestions] = useState('10');
    const [selectedLevel, setSelectedLevel] = useState('Easy');
    const [categories, setCategories] = useState<category[]>([]);
    const setupQuiz = useQuizSettings();
    const navigate = useNavigate();
    const totalQuestionsOptions = ['10', '20', '30', '40', '50'];
    const difficultyOptions = ['Easy', 'Medium', 'Hard'];

    useEffect(() => {
        const getCategories = async () => {
            const categoryList = await fetchCategories();
            setCategories(categoryList);
        }
        getCategories();
    }, [])

    const totalQuestionsSelect = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setNumQuestions(e.currentTarget.value);
        setupQuiz?.setTotalQuestions(e.currentTarget.value);
    }

    const levelSelect = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setSelectedLevel(e.currentTarget.value);
        setupQuiz?.setDifficulty(e.currentTarget.value.toLowerCase());
    }

    return (
        <form className='quiz-setup'>
            <div>Choose How Many Questions</div>
            <div className='buttons-box'>
                {totalQuestionsOptions.map(option => (
                    <button
                        className={numQuestions === option ? 'selected num-questions' : 'num-questions'}
                        key={option}
                        value={option}
                        onClick={totalQuestionsSelect}
                    >{option}</button>
                ))}
            </div>
            <div>Choose Your Difficulty Level</div>
            <div className='buttons-box'>
                {difficultyOptions.map(level => (
                    <button
                        className={level === selectedLevel ? 'selected' : ''}
                        key={level}
                        value={level}
                        onClick={levelSelect}
                    >{level}</button>
                ))}
            </div>
            <div>Select a Category</div>
            <div className='select-box'>
                <select name="categories" id="categories" onChange={(e) => setupQuiz?.setCategory(e.target.value)}>
                    {categories.map(category => (
                        <option
                            key={category.id}
                            value={category.id}
                        >{category.name}</option>
                    ))}
                </select>
            </div>
            <button onClick={() => navigate('/quiz')} className='preferences'>Save Quiz Preferences</button>
        </form>
    )
}

export default Setup