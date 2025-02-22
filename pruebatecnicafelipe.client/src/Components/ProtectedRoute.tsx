// ProtectedRoute.js
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = () => {
    // @ts-ignore
    const { user } = useAuth(); // Obtén el estado del usuario desde el contexto
    

    // Si no hay usuario autenticado, redirige a la página de login
    if (!user) {
        return <Navigate to="auth/login" replace />;
    }

    // Si el usuario está autenticado, renderiza la ruta solicitada
    return <Outlet />;
};

export const UnProtectedRoute = () => {
    // @ts-ignore
    const { user } = useAuth(); // Obtén el estado del usuario desde el contexto

    // Si no hay usuario autenticado, redirige a la página de login
    if (user) {
        return <Navigate to="/" replace />;
    }

    // Si el usuario está autenticado, renderiza la ruta solicitada
    return <Outlet />;
};