import React, {useState,useEffect,useCallback} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import AddMovie from "./components/AddMovie";

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
            const response = await fetch('https://react-https-2b6e7-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json');
            if (!response.ok) {
                throw new Error('Something went wrong !');
            }
            const data = await response.json();
            const loadedMovies = [];
            for(const key in data){
                loadedMovies.push({
                    id:key,
                    title:data[key].title,
                    openingText:data[key].openingText,
                    releaseDate:data[key].releaseDate
                })
            }

            setMovies(loadedMovies);
        } catch (error) {
            setError(error.message);
        }
        setIsLoading(false);
    },[]);

    useEffect(()=>{
        moviesHandler();
    },[moviesHandler])

    const addMovieHandler= async (movie) => {
        const response = await fetch('https://react-https-2b6e7-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json',{
            method:'POST',
            body:JSON.stringify(movie),
            headers:{
                'Content-Type':'application/json'
            }
        });
        const data = await response.json();
        console.log(data);
    }
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
                <AddMovie onAddMovie={addMovieHandler} />
            </section>
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
