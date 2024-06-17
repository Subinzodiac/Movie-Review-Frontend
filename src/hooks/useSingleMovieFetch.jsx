import axios from "../axios/axios";
import { useEffect } from "react";
import { useState } from "react";

const useSingleMovieFetch = ({ url }) => {
    const [movie, setMovie] = useState(null);

    useEffect(() => {

        if (url) {
            axios.get(url)
                .then((response) => {
                    setMovie(response.data.results.sort(function (a, b) { return 0.5 - Math.random() })[0])

                })
                .catch(error => console.error(error))
        }

    }, [url])

    return movie;
}

export default useSingleMovieFetch