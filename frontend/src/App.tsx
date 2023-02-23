import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Alert from "@mui/material/Alert";
import { LoadingContext, useLoader } from './contexts/LoadingContext';
import { AuthProvider, useAuthContext } from './contexts/AuthContext';
import { QuizContextProvider } from './contexts/QuizContext';
import RequireAuth from './RequireAuth';
import HomePage from './pages/HomePage';
import Setup from './pages/Setup';
import Quiz from './pages/Quiz';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import './App.css';

const App = () => {
  const auth = useAuthContext();
  const loader = useLoader();
  const isLoading = loader?.isLoading;

  // useEffect(() => {
  //   const errorTimeout = setTimeout(() => {
  //     loader?.setError(undefined)
  //   }, 3000)
  //   return () => clearTimeout(errorTimeout);
  // }, [loader])

  return (
    <div className='App'>
      <LoadingContext>
        <AuthProvider>
          <>
            {loader?.error && <Alert severity='error'>{loader?.error}</Alert>}
            {auth?.authData && isLoading && !loader?.error ? (
              <div className='loading'>Loading...</div>
            ) : (
              <Router>
                <Routes>
                  <Route path='/' element={<HomePage />} />
                  <Route path='/setup' element={<QuizContextProvider><RequireAuth><Setup /></RequireAuth></QuizContextProvider>} />
                  <Route path='/quiz' element={<QuizContextProvider><RequireAuth><Quiz /></RequireAuth></QuizContextProvider>} />
                  <Route path='/register' element={<Register />} />
                  <Route path='/login' element={<Login />} />
                  <Route path='*' element={<NotFound />} />
                </Routes>
              </Router>
            )}
          </>
        </AuthProvider >
      </LoadingContext>
    </div >
  )
}

export default App;
