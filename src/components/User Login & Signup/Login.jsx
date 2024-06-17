import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Container } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import './Login.css';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRecoilState } from 'recoil';
import { isLoginState } from '../../Store/Atoms/loginAtom';
import axios from '../../axios/axios';

const schema = z.object({
    username: z.string().min(4, 'Username must be at least 4 characters long'),
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    authorization_key: z
        .string()
        .refine((val) => val === import.meta.env.VITE_AUTH_KEY, {
            message: 'Invalid Authorization key',
            path: ['authorization_key'],
        }).optional()
});

const Login = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [isLogin, setIsLogin] = useRecoilState(isLoginState);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data) => {
        try {
            const endpoint = isChecked ? '/api/v1/admin/signin' : '/api/v1/user/signin';
            const response = await axios.post(endpoint, data);

            if (response.status === 200) {
                alert(response.data.message);
                const token = response.data.token;
                localStorage.setItem("jwt_token", token);
                localStorage.setItem('isLogin', JSON.stringify(true));
                setIsLogin(true);
                navigate(isChecked ? '/admin/users' : '/home');
                window.location.reload();
            } else {
                alert(response.data.error);
            }
        } catch (error) {
            if (error.response) {
                alert(error.response.data.error);
            } else {
                console.error('Signin error:', error);
            }
        }
    };

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <div className='login_section d-flex justify-content-center align-items-center py-5'>
            <Container className='w-100 d-flex flex-column justify-content-center align-items-center'>
                <div className="login_container p-4">
                    <h1 className='text-capitalize mt-2 px-lg-5 py-lg-2'>Sign in</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className='d-flex flex-column gap-2 px-lg-5 py-lg-4'>
                        <input
                            type='text'
                            placeholder='User Name'
                            {...register("username")}
                            className='mb-2 mt-2 py-2 px-2 py-md-3 px-md-3'
                        />
                        {errors.username && (<div className='error_message'>{errors.username.message}</div>)}
                        <input
                            type='text'
                            placeholder='Email'
                            {...register("email")}
                            className='mb-2 mt-2 py-2 px-2 py-md-3 px-md-3'
                        />
                        {errors.email && (<div className='error_message'>{errors.email.message}</div>)}
                        <input
                            type='password'
                            placeholder='Password'
                            {...register("password")}
                            className='mb-2 mt-2 py-2 px-2 py-md-3 px-md-3'
                        />
                        {errors.password && (<div className='error_message'>{errors.password.message}</div>)}
                        {isChecked && (
                            <>
                                <input
                                    type='password'
                                    placeholder='Authorization Key'
                                    {...register("authorization_key")}
                                    className='mb-2 mt-2 py-2 px-2 py-md-3 px-md-3'
                                />
                                {errors.authorization_key && (
                                    <div className='error_message'>{errors.authorization_key.message}</div>
                                )}
                            </>
                        )}
                        <input
                            type='submit'
                            placeholder='Sign In'
                            className='signin_button py-2 px-2 py-md-3 px-md-3'
                        />
                        <div className="bottom_section mt-3 d-flex flex-column flex-md-row justify-content-md-between align-items-center gap-4">
                            <p>
                                New to FlickFlair?
                                <Link to={"/signup"} className='text-decoration-none'>
                                    <span className='text_bold'>Sign up now.</span>
                                </Link>
                            </p>
                            <div className="input_group d-flex flex-row justify-content-start align-items-center gap-1">
                                <input
                                    type="checkbox"
                                    name='authorization_key'
                                    checked={isChecked}
                                    onChange={handleCheckboxChange}
                                />
                                <label htmlFor="authorization_key">Admin Sign In</label>
                            </div>
                        </div>
                    </form>
                </div>
            </Container>
        </div>
    );
}

export default Login;
