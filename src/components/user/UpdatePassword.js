import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import Swal from 'sweetalert2';

import { AuthContext } from "../../auth/authContext";
import { fetchConToken } from "../../helpers/fetch";
import { types } from "../../types/types";
import { Loader } from "../loader/Loader";



export const UpdatePassword = () => {

    const { dispatch } = useContext(AuthContext);

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false)

    const [formValues, setFormValues] = useState({
        password: '',
        password2: ''
    });

    const { password, password2 } = formValues;

    const handleInputChange = (e) => {
        setFormValues({
            ...formValues,
            [ e.target.name ]: e.target.value
        });
    }

    const reset = () => {
        setFormValues({
            password: '',
            password2: ''
        });
    }

    const submitForm = async(e) => {
        e.preventDefault();

        setLoading(true);

        if( password !== password2 ) {
            setLoading(false);
            reset();
            return Swal.fire('Error', 'Las contraseñas deben ser iguales', 'error');
        }

        if( password.length < 6 ) {
            setLoading(false);
            reset();
            return Swal.fire('Error', 'Las debe tener al menos 6 caracteres', 'error');
        }
        
        try {

            const resp = await fetchConToken('http://10.91.37.212:4000/api/usuarios', { password }, 'PUT');
            const data = await resp.json();

            if( data.ok ) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: data.msg,
                    showConfirmButton: false,
                    timer: 1500
                });
                
                dispatch({type: types.logout});
        
                localStorage.clear();
        
                navigate('/');
            
            }else{
                Swal.fire('Error', data.msg, 'error');

            }
            
            
        } catch (error) {
            Swal.fire('Error', 'Hable con el administrador', 'error');
        }
        
        setLoading(false);

    }

    return (
        
        <div>
            {
                ( loading ) 
                    ? <Loader />
                    : <form onSubmit={ submitForm }>
                        <input
                            type="password"
                            className="form form-control my-2"
                            name="password"
                            value={ password }
                            onChange= { handleInputChange }
                            placeholder="Nueva contraseña"
                            required 
                        />
                        <input
                            type="password"
                            className="form form-control my-2"
                            name="password2"
                            value={ password2 }
                            onChange= { handleInputChange }
                            placeholder="Confirme contraseña"
                            required 
                        />

                        <div className="d-grid gap-2">
                            <button
                                className="btn btn-primary"
                            >
                                Guardar
                            </button>
                        </div>
                    </form>                   
            }
            
        </div>
    )
}
