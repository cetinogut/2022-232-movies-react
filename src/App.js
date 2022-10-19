import { useEffect, useState } from 'react';
import MovieCard from './MovieCard';

import './App.css';
import SearchIcon from './search.svg';


//http://www.omdbapi.com/?i=tt3896198&apikey=af299c79
//af299c79

const API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=af299c79";

const movie1 = {
  "Title": "Italian Spiderman",
  "Year": "2007",
  "imdbID": "tt2705436",
  "Type": "movie",
  "Poster": "https://m.media-amazon.com/images/M/MV5BYjFhN2RjZTctMzA2Ni00NzE2LWJmYjMtNDAyYTllOTkyMmY3XkEyXkFqcGdeQXVyNTA0OTU0OTQ@._V1_SX300.jpg"
}

const  App = () =>  {

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState ('');

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    //if(data.Response === 'True')
      console.log(data.Search);
      setMovies(data.Search);
     
  };
 useEffect( () => {
    searchMovies('new');
 }, []);

  return (
    <div className='app'>
        <h1>MovieBase</h1>
        <div className='search'>
          <input
            placeholder='Search me..'
            // value="batman"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <img
            src={SearchIcon}
            alt='search'
            onClick = {() => searchMovies(searchTerm)}
          />
        </div>

      {movies?.length > 0
        ?(
          <div className='container'>
            {/* <MovieCard movie1={movies[0]}/> */}
            {movies.map((movie) => (
              <MovieCard movie= {movie} />
            ))}
          </div>
        ): (
          <div className='empty'>
            <h2>No movies found</h2>
          </div>
        )}
    </div>
   
  );
}

export default App;
