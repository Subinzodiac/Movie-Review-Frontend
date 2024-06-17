import axios from "../axios/axios";
import { useEffect } from "react";
import { useState } from "react";

const useMovieFetch = ({ url }) => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {

        if (url) {
            axios.get(url)
                .then((response) => {
                    setMovies(response.data.results)

                })
                .catch(error => console.error(error))
        }

    }, [url])

    return movies;
}

export default useMovieFetch