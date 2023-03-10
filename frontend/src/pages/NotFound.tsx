import { useNavigate } from "react-router-dom"

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className='not-found'>
            <h1>Page Not Found</h1>
            <button onClick={() => navigate('/', { replace: true })}>Return to Home Page</button>
        </div>
    )
}

export default NotFound