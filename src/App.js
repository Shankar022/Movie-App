import React, {useState,useEffect,useCallback} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
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

    const moviesHandler = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('https://swapi.dev/api/films/');
            if (!response.ok) {
                throw new Error('Something went wrong !');
            }
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
        } catch (error) {
            setError(error.message);
        }
        setIsLoading(false);
    },[]);

    useEffect(()=>{
        moviesHandler();
    },[moviesHandler])

    let content = <p>No movies found.</p>;
    if (movies.length > 0) {
        content = <MoviesList movies={movies}/>;
    }
    if (error) {
        content = <p>{error}</p>
    }
    if (isLoading) {
        content = <p>Loading...</p>
    }

    return (
        <React.Fragment>
            <section>
                <button onClick={moviesHandler}>Fetch Movies</button>
            </section>
            <section>
                {content}
            </section>
        </React.Fragment>
    );
}

export default App;
