import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams,Route, NavLink ,useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ props, addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const {push} = useHistory();
  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };
 console.log(movie);
  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <button onClick={()=>{
        push(`/update-movie/${movie.id}`)
      }}>
        Update
      </button>
    </div>
  );
}

export default Movie;
