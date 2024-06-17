import React, { useEffect, useState } from 'react'
import { Container, Table } from 'react-bootstrap'
import { MdDeleteOutline } from 'react-icons/md'
import { IoMdAdd } from "react-icons/io";
import './MovieList.css'
import { Link } from 'react-router-dom';
import axios from '../../../../axios/axios';


const MovieList = () => {
   
    const [movies, setMovies] = useState([])
    useEffect(() => {
        const token = localStorage.getItem("jwt_token")
        const fetchData = async () => {
            try {
                console.log(token)
                const response = await axios.get('/api/v1/admin/movies', {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${token}`
                    }
                })

                setMovies(response.data)
            } catch (error) {
                console.log("fetching error: ", error)
            }

        }
        fetchData()
    }, [])

    const deleteMovie = async (id) => {
        try {
           
            const response = await axios.delete(`/api/v1/admin/movies/${id}`, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${localStorage.getItem("jwt_token")}`
                }
            })

            alert(response.data.message)
            window.location.reload()
        } catch (error) {
            console.log("Deleting error: ", error)
        }
    }
    
    return (
        <section className='movieList_section py-2'>
            <Container>
                <div className="movieList_container py-3 px-1">
                    <div className="main_header pt-5">
                        <h1 className='text-capitalize'>List of movies</h1>
                    </div>
                    <div className="table_section py-3 mt-5">
                        <Table bordered hover variant='dark'>
                            <thead>
                                <tr>
                                    <th className='py-3'>No.</th>
                                    <th className='py-3'>Movie Name</th>
                                    <th className='py-3'>Genre</th>
                                    <th className='py-3'>Description</th>
                                    <th className='py-3'>Image Url</th>
                                    <th className='py-3'></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    movies.map((movie, index) => {
                                        return (
                                            <tr key={movie.id}>
                                                <td className='py-2 px-2'>{index + 1}</td>
                                                <td className='py-2 px-2'>{movie.title}</td>
                                                <td className='py-2 px-2'>{movie.mediaGenre}</td>
                                                <td className='py-2 px-2'>{movie.mediaDescription}</td>
                                                <td className='py-2 px-2 '>{movie?.mediaImage} {movie?.mediaImageUrl}</td>
                                                <td className='py-2 px-2'>
                                                    <button className='delete_button' onClick={() => deleteMovie(movie.id)}>
                                                        <span className="delete_icon">
                                                            <MdDeleteOutline />
                                                        </span>
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }

                            </tbody>
                        </Table>
                        <div className="text-start text-sm-center mt-5">
                            <Link to={"/admin/addMovie"}>
                                <button className='add_button '>
                                    <span className='add_icon me-1'>
                                        <IoMdAdd />
                                    </span>
                                    Add
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>

        </section>
    )
}

export default MovieList
