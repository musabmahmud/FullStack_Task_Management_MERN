import React from 'react'
import Login from '@/pages/Auth/Login/Login'
import { BrowserRouter as Router, Route, Routes } from 'react-router'
import ProtectedRoute from './ProtectedRoute'
import ManageTask from '@/pages/Admin/ManageTask'
import ManageUser from '@/pages/Admin/ManageUser'
import CreateTask from '@/pages/Admin/CreateTask'
import UserDashboard from '@/pages/User/UserDashboard'
import AdminDashboard from '@/pages/Admin/AdminDashboard'
import MyTask from '@/pages/User/MyTask'
import SingleTaskDetails from '@/pages/User/SingleTaskDetails'
import AuthRoute from './AuthRoute'
import Register from '@/pages/Auth/Register/Register'
import App from '@/App'
import HomeLayout from '@/layouts/HomeLayout'
import NotFoundPage from '@/pages/Extra/NotFoundPage'

const AppRouter = () => {
    return (
        <Router>
            <Routes>{/* MainLayout Routes */}
                <Route element={<HomeLayout />}>
                    <Route index element={<App />} />
                </Route>


                {/* Auth Route  */}
                <Route element={<AuthRoute />}>
                    <Route path='/login' element={<Login />}
                    />
                    <Route path='/register' element={<Register />}
                    />
                </Route>


                {/* Admin Routes */}
                <Route element={<ProtectedRoute roles={["admin"]} />}>
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="/admin/tasks" element={<ManageTask />} />
                    <Route path="/admin/users" element={<ManageUser />} />
                    <Route path="/admin/create-task" element={<CreateTask />} />
                </Route>

                {/* Admin Routes */}
                <Route element={<ProtectedRoute roles={["user"]} />}>
                    <Route path="/user/dashboard" element={<UserDashboard />} />
                    <Route path="/user/tasks" element={<MyTask />} />
                    <Route path="/user/tasks/:id" element={<SingleTaskDetails />} />
                </Route>


                <Route path='*' element={<NotFoundPage />} />
            </Routes>
        </Router>
    )
}

export default AppRouter