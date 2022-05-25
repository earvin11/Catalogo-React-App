import { useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { AuthContext } from "../../auth/authContext";
import { types } from "../../types/types";

export const Navbar = () => {

    const { user, dispatch } = useContext(AuthContext);

    const navigate = useNavigate();

    const rol = localStorage.getItem('rol');

    const handleLogout = () => {
        
        const action = {
            type: types.logout
        }
        
        dispatch(action);

        localStorage.clear();

        navigate('/login');

    }

    return ( 
        <nav
            // className="nav nav-tabs navbar"
            className="nav navbar-expand nav-tabs my-4"
        >
            <div className="container-fluid">
                <div className="navbar-nav">
                    {/* <Link className='nav-link' to="/">Consulta</Link>
                    <Link className='nav-link' to="/form">Nuevo Usuario</Link> */}
                    <Link className='nav-link mx-4' to="/">Existencia</Link>
                    <Link className='nav-link mx-4' to="/post-articles">Nuevo Artículo</Link>
                    <Link className='nav-link mx-4' to="/article-by-name/">Buscar Artículo</Link>
                </div>
            </div>

            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
                <ul className="navbar-nav ml-auto">
                    
                    {
                        ( rol === 'ADMIN_ROLE' )
                            && <Link className='nav-link mx-4' to="/register">Nuevo Usuario</Link>
                    }
                    
                    <span className="nav-item nav-link text-info mx-4">{ user.name }</span>
                    <button
                        className="btn btn-danger"
                        onClick={ handleLogout }
                    >
                        Logout
                    </button>
                </ul>               
            </div>
            
        </nav>       
    )
}
