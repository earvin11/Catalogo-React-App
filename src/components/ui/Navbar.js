import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';

import { AuthContext } from "../../auth/authContext";
import { types } from "../../types/types";

export const Navbar = () => {

    const { user, dispatch } = useContext(AuthContext);

    const navigate = useNavigate();

    const rol = localStorage.getItem('rol');

    const [dropdown, setDropdown] = useState(false);

    const abrirCerrarDropdown = () => {
        setDropdown( !dropdown );
    }

    const handleLogout = () => {
        
        const action = {
            type: types.logout
        }
        
        dispatch(action);

        localStorage.clear();

        navigate('/');

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
                    <Link className='nav-link mx-4' to="/articles">Existencia</Link>
                    <Link className='nav-link mx-4' to="/post-article">Nuevo Artículo</Link>
                    <Link className='nav-link mx-4' to="/article-by-name/">Buscar Artículo</Link>
                </div>
            </div>

            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
                <ul className="navbar-nav ml-auto">
                    
                    {
                        ( rol === 'ADMIN_ROLE' )
                            && <Link className='nav-link mx-4' to="/register">Nuevo Usuario</Link>
                    }
                    
                    <Dropdown isOpen={ dropdown } toggle={ abrirCerrarDropdown }>
                        <DropdownToggle caret className="btn btn-success">
                            { user.name + ' ' + user.apellido }
                        </DropdownToggle>

                        <DropdownMenu>
                            <DropdownItem className="">
                                <Link to="/update-password" className="dropdown-item">Cambio de contraseña</Link>
                            </DropdownItem>
                            <DropdownItem onClick={()=> handleLogout()} className="dropdown-item">
                                Cerrar Sesión 
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>

                    {/* <button
                        className="btn btn-danger mx-2"
                        onClick={ handleLogout }
                    >
                        Logout
                    </button> */}

                </ul>               
            </div>
            
        </nav>       
    )
}
