import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoutes = ({children}) => {
    const token = localStorage.getItem("jwt_token")
    let isAuthenticated = false
    if (token) {
        isAuthenticated = true
    }else {
        isAuthenticated = false
    }
  return isAuthenticated ? children : <Navigate to={'/login'} />
   
}

export default PrivateRoutes
