import React, {useState} from 'react';
import MovieCard from "./movieCard"

function SearchMovie() {
    //default value empty string
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);

    const searchMovies = async (e) => {
        e.preventDefault();

        const url = `https://api.themoviedb.org/3/search/movie?api_key=6562976344b326166c026bd392433192&language=en-US&query=${query}&page=1&include_adult=false`;
    
            //Does a get request and return a promise
        try {
            const res = await fetch(url);
            const data  = await res.json();
            setMovies(data.results)
        } catch (err){
            console.error(err);
        }
    }

  return (
    <div>
        <form className="form" onSubmit={searchMovies}>
            <label className="label" htmlFor="query">Movie Name</label>
            <input className="input" 
                    type="text" 
                    name="query"
                    placeholder="i.e. Jurassic Park"
                    value={query}
                    onChange={(e)=>setQuery(e.target.value)}
            />
                <button className="button" type="submit">Search</button>
        </form>

        <div className="card-list">
        {movies.filter(movie => movie.poster_path).map(movie => (
            <MovieCard key={movie.id} moviesInfo={movie} />
            ))}     
        </div>  
    </div>
  );
}

export default SearchMovie;