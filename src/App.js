import React, {useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    // const moviesHandler = () => {
    //     fetch('https://swapi.dev/api/films/')
    //         .then((response) => {
    //             return response.json();
    //         })
    //         .then((data) => {
    //             const transformedData = data.results.map((movieData) => {
    //                 return {
    //                     id: movieData.episode_id,
    //                     title: movieData.title,
    //                     releaseDate: movieData.release_date,
    //                     openingText: movieData.opening_crawl
    //                 };
    //             });
    //             setMovies(transformedData);
    //         })
    //         .catch((error)=>{
    //             console.error('Error:', error);
    //         })
    // }

    const moviesHandler = async () => {
        setIsLoading(true);
        const response = await fetch('https://swapi.dev/api/films/');
        const data = await response.json();
        const transformedData = data.results.map((movieData) => {
            return {
                id: movieData.episode_id,
                title: movieData.title,
                releaseDate: movieData.release_date,
                openingText: movieData.opening_crawl
            };
        });
        setMovies(transformedData);
        setIsLoading(false);
    }

    return (
        <React.Fragment>
            <section>
                <button onClick={moviesHandler}>Fetch Movies</button>
            </section>
            <section>
                {!isLoading && movies.length === 0 && <p>No movies found.</p>}
                {!isLoading && movies.length > 0 && <MoviesList movies={movies}/>}
                {isLoading && <p>Loading...</p>}
            </section>
        </React.Fragment>
    );
}

export default App;
