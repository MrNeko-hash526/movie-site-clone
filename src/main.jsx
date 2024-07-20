import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MovieList from './components/MovieList/MovieList';
import Navbar from './components/Navbar/Navbar';
import './index.css';
import Home from './pages/homepage/home';
import MoviePage from './pages/movie/movie';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/*' element={<h1>Error</h1>} />
        <Route path="movie/:id" element={<MoviePage />} />
        <Route path="movies/:type" element={<MovieList />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
