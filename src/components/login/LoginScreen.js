import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../../auth/authContext';
import { fetchSinToken } from '../../helpers/fetch';
import { types } from '../../types/types';
import { Loader } from '../loader/Loader';
import './login.css';

export const LoginScreen = () => {

    const { dispatch } = useContext(AuthContext);

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false)

    const [loginValues, setloginValues] = useState({
        nick: '',
        password: ''
    });

    const { nick, password } = loginValues;

    const handleInputChange = (e) => {
        setloginValues({
            ...loginValues,
            [e.target.name]: e.target.value
        })
    }

    const handleLogin = async(e) => {
        e.preventDefault();

        setLoading(true);
       
        try {
            const resp = await fetchSinToken('http://localhost:4000/api/auth/login', loginValues, 'POST');
            const data = await resp.json();

            if( data.ok ) {

                const action = {
                    type: types.login,
                    payload: {
                        name: data.usuario.nombre
                    }
                }
        
                dispatch( action );
        
                navigate('/')
            
            }else{
                Swal.fire('Error', data.msg, 'error');
            }
        } catch (error) {
            Swal.fire('Error', 'Hable con el administrador', 'error');
        }

            setLoading(false);
            

        // Swal.fire('Acceso', 'OK', 'success')
    }


    return (
        <div className="container login-container">

            {
                (loading)
                    ? <Loader />
                    :   <div className="col-md-6 login-form-1">
                            <h3>Ingreso</h3>
                            <form onSubmit={ handleLogin }>
                                <div className="form-group">
                                    <input 
                                        type="text"
                                        className="form-control my-3"
                                        placeholder="Usuario"
                                        name="nick"
                                        autoComplete="off"
                                        required
                                        value={ nick }
                                        onChange={ handleInputChange }
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        className="form-control my-3"
                                        placeholder="Contraseña"
                                        name="password"
                                        autoComplete="off"
                                        required
                                        value={ password }
                                        onChange={ handleInputChange }
                                    />
                                </div>
                                <div className="form-group">
                                    <input 
                                        type="submit"
                                        className="btnSubmit my-3"
                                        value="Login" 
                                    />
                                </div>
                            </form>
                    </div>
               

            }

        </div>
    )
}