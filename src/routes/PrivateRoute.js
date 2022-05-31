import { useContext } from "react"
import { Navigate } from "react-router-dom";

import { AuthContext } from '../auth/authContext';


export const PrivateRoute = ({ children }) => {

    const { user } = useContext(AuthContext)

    
    // Si el user del conext.provider tiene la propiedad logged en true
    return user.logged
        ? children // Muestra los hijos de este hide order component
        : <Navigate to="/" /> // Si user.logged es false entonces redirecciona al login
}
