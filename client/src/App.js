import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axios from 'axios';
import UpdateMovie from './Movies/UpdateMovie'

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);
const [updateMovieList, setUpdateMovieList] = useState(true)
  
    
 

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };
  console.log('this is movie list',movieList)
  useEffect(() => {
   axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  }, [updateMovieList]);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/"
      render={()=> <MovieList movies={movieList}/>}/>
    
      

      <Route path="/movies/:id">
        <Movie updateMovieList={updateMovieList} setUpdateMovieList={setUpdateMovieList} addToSavedList={addToSavedList} />
      </Route>

      <Route path='/update-movie/:id'
      render={()=> <UpdateMovie  movies={movieList}/>}/>
    </>
  );
};

export default App;
