import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import './UpdatePassword.css';
import { Container } from 'react-bootstrap';
import axios from '../../axios/axios';

const schema = z.object({
    email: z.string().email('Invalid email address'),
    newPassword: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(8)
}).refine((val) => val.newPassword === val.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
});

const UpdatePassword = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data) => {
        try {
            console.log(data);
            const response = await axios.patch('/api/v1/user/update-password', data, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("jwt_token")}`
                }
            });
            if (response.status === 200) {
                alert(response.data.message);
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
            alert("Updating password failed! Please ensure your email is correct.");
        }
    };

    return (
        <section className='update_password_section'>
            <Container>
                <div className="form_container py-5 mt-5">
                    <div className="form_header">
                        <h1>Update Password</h1>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input
                            type="email"
                            {...register('email')}
                            placeholder='Enter Your Email...'
                            className='form-control'
                        />
                        {errors.email && <p className='error_message'>{errors.email.message}</p>}
                        
                        <input
                            type="password"
                            {...register('newPassword')}
                            placeholder='Enter the New Password...'
                            className='form-control'
                        />
                        {errors.newPassword && <p className='error_message'>{errors.newPassword.message}</p>}
                        
                        <input
                            type="password"
                            {...register('confirmPassword')}
                            placeholder='Confirm New Password...'
                            className='form-control'
                        />
                        {errors.confirmPassword && <p className='error_message'>{errors.confirmPassword.message}</p>}
                        
                        <button type='submit' className='submit_button'>Update Password</button>
                    </form>
                </div>
            </Container>
        </section>
    );
};

export default UpdatePassword;
