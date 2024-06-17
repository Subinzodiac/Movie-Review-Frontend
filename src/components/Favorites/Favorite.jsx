import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { MdDeleteOutline } from 'react-icons/md'

import './Favorite.css'
import axios from '../../axios/axios'
import { imageUrl } from '../../urls/urls'
import NoFavorites from '../NoFavorites/NoFavorites'

const Favorite = () => {

    const [favorites, setFavorites] = useState([]);
    const [isFavorite, setIsFavorite] = useState(false)


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/v1/user/favorites', {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("jwt_token")}`
                    }
                });
                if (response.status === 200) {
                    setFavorites(response.data)
                    setIsFavorite(true)
                }
            } catch (error) {
                console.log(error)
            }

        }
        fetchData()
    }, [])

    const deleteFavoriteMovie = async (id) => {
        try {
            console.log(id)
            const response = await axios.delete(`/api/v1/user/favorite/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("jwt_token")}`
                }
            });

            alert(response.data.data)
            window.location.reload()
            
        } catch (error) {
            console.error("Error deleting review:", error);
            // Display an error message to the user or handle the error appropriately
            alert("An error occurred while deleting the review. Please try again.");
        }

    }
    return (
        <section className='favorites_container py-5'>
            <Container>
                {
                    isFavorite ? (
                    favorites && favorites.map((favorite) => {
                        return (
                            <div className="favorite_box pt-5 px-lg-4 px-3" key={favorite.id}>
                                <div className="left_part">
                                    <article className='image_box'>

                                    <img 
                                     src={favorite.mediaImage.startsWith('/') ? `${imageUrl}${favorite.mediaImage}` : favorite.mediaImage}
                                      alt="favorite_image" 
                                      className='favorite_img' />
                                    </article>
                                    <div className="movie_title py-2 px-3 px-lg-0">
                                        <h4>{favorite.mediaTitle}</h4>
                                    </div>
                                </div>
                                <div className="right_part">
                                    <button className='delete_button' onClick={() => deleteFavoriteMovie(favorite.id)}>
                                        <span className="delete_icon">
                                            <MdDeleteOutline />
                                        </span>
                                    </button>
                                </div>
                            </div>

                        )
                    } )) : <NoFavorites />
                }

            </Container>
        </section>
    )
}

export default Favorite
