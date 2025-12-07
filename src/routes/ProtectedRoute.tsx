
import { Navigate, Outlet } from 'react-router'

type ProtectedRouteProps = {
    roles: string[] // ← now an array
}

const ProtectedRoute = ({ roles }: ProtectedRouteProps) => {

    if (roles) {
        return <Navigate to='/login' replace />
    }

    return <Outlet />
}

export default ProtectedRoute