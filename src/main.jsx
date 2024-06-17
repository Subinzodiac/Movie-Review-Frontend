import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import './App'
import App from './App';

import UserRoot from './routes/UserRoot.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import Home from './pages/Home.jsx';
import Movies from './pages/Movies.jsx';
import SingleMoviePage, {loader as movieLoader} from './pages/SingleMoviePage.jsx';
import UserFavorite from './pages/UserFavorite.jsx';
import UpdatePasswordPage from './pages/UpdatePasswordPage.jsx';
import ReviewsPage from './pages/ReviewsPage.jsx';
import Login from './components/User Login & Signup/Login.jsx';
import SignUp from './components/User Login & Signup/SignUp.jsx';
import AdminRoot from './routes/AdminRoot.jsx';
import ManageUsers from './components/Admin/ManageUsers/ManageUsers.jsx';
import MovieTabs from './components/Admin/UsersReviewAndFavorites/MovieTabs.jsx';
import MovieReviews from './components/Admin/UsersReviewAndFavorites/MovieReviews.jsx';
import FavoriteMovies from './components/Admin/UsersReviewAndFavorites/FavoriteMovies.jsx';
import MovieList from './components/Admin/Movie/MovieList/MovieList.jsx';
import AddMovie from './components/Admin/Movie/MovieAdd/AddMovie.jsx';
import MainInterface from './components/MainInterface/MainInterface.jsx';
import PrivateRoutes from './components/PrivateRoutes/PrivateRoutes.jsx';
import NewlyAddedMoviePage, {loader as newMovieLoader } from './pages/NewlyAddedMoviePage.jsx';





const router = createBrowserRouter([
  {
    path: '/',
    element: <MainInterface />,
    errorElement: <ErrorPage />,

  },
  {
    path: "/",
    element: <UserRoot />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/movies",
        element: <Movies />,
      },
      {
        path: "/movies/:movieId",
        element: <SingleMoviePage />,
        loader: movieLoader
      },
      {
        path: "/addedMovies/:movieId",
        element: <NewlyAddedMoviePage />,
        loader: newMovieLoader
        
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      }, 
    ],
    
  },
  {
    path: "/user/favorites",
    element:(
      <PrivateRoutes>
        <UserFavorite />
      </PrivateRoutes>

    ) ,
  },
  {
    path: "/user/update-password",
    element: <UpdatePasswordPage />,
  },
  {
    path: "/user/reviews",
    element: (
      <PrivateRoutes>
        <ReviewsPage />
      </PrivateRoutes>
    ),
  },

  {
    path: "/admin",
    element: <AdminRoot />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/admin/users",
        element: <ManageUsers />,
      },
      {
        path: "/admin/users/:userId/activity",
        element: <MovieTabs />,
      },
      {
        path: "/admin/users/reviews",
        element: <MovieReviews />,
        
      },
      {
        path: "/admin/users/favorites",
        element: <FavoriteMovies />,
      },
      {
        path: "/admin/listOfMovies",
        element: <MovieList />,
      },
      {
        path: "/admin/addMovie",
        element: <AddMovie />,
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
   
  </React.StrictMode>,
)
