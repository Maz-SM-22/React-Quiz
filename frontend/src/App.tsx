// import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import RequireAuth from './RequireAuth';
import HomePage from './components/HomePage';
import Quiz from './components/Quiz';
import Login from './components/Login';
import Register from './components/Register';
import NotFound from './components/NotFound';
import './App.css';

const App = () => {
  return (
    <div className='App'>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/quiz' element={<RequireAuth><Quiz /></RequireAuth>} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  )
}

export default App;
