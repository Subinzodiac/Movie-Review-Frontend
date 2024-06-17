import React from 'react'
import AdminHeader from '../components/Admin/AdminHeader/AdminHeader'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer/Footer'

const AdminRoot = () => {
  return (
    <div>
      <AdminHeader />
      <Outlet />
      <Footer />
    </div>
  )
}

export default AdminRoot
