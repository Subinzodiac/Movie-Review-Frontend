import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import './AddMovie.css';
import axios from '../../../../axios/axios';

const AddMovie = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [genre, setGenre] = useState('');
    const [language, setLanguage] = useState('');
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('genre', genre);
        formData.append('language', language);
        formData.append('image', image);
        formData.append('imageUrl', imageUrl);
        setLoading(true);

        try {
            const token = localStorage.getItem('jwt_token');
            if (token) {
                const response = await axios.post('/api/v1/admin/movies', formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${token}`
                    }
                });
                alert(response.data.message);
                navigate('/admin/listOfMovies');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="addMovie_Section py-2">
            <Container>
                <div className="addMovie_container py-3 px-1">
                    <div className="main_header pt-5">
                        <h1 className='text-capitalize'>
                            Add Movie Here...
                        </h1>
                    </div>
                    <div className="addMovie_form d-flex flex-column justify-content-start align-items-start mt-4">
                        <form onSubmit={handleSubmit} className='d-flex flex-column gap-3 w-100 py-2 mt-4'>
                           {loading && <div className='loading_message'>Loading... Please wait...</div>}
                            <input
                                type="text"
                                name='name'
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                placeholder='Title'
                                className='py-3 px-3 text-capitalize'
                            />
                            <input
                                type="text"
                                name='description'
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                                placeholder='Description'
                                className='py-3 px-3 text-capitalize'
                            />
                            <input
                                type="text"
                                name='genre'
                                value={genre}
                                onChange={(event) => setGenre(event.target.value)}
                                placeholder='Genre'
                                className='py-3 px-3 text-capitalize'
                            />
                            <input
                                type="text"
                                name='language'
                                value={language}
                                onChange={(event) => setLanguage(event.target.value)}
                                placeholder='Language'
                                className='py-3 px-3 text-capitalize'
                            />
                            <input
                                type="text"
                                name='image'
                                value={imageUrl}
                                onChange={(event) => setImageUrl(event.target.value)}
                                placeholder='Image URL'
                                className='py-3 px-3 text-capitalize'
                            />
                            <input
                                type="file"
                                name='image'
                                onChange={handleImageChange}
                                placeholder='Upload Image'
                                className='py-3 px-3 text-capitalize'
                            />
                            <input
                                type="submit"
                                className='py-3 submit_button'
                                value='Add Movie'
                            />
                        </form>
                    </div>
                </div>
            </Container>
        </section>
    )
};

export default AddMovie;
