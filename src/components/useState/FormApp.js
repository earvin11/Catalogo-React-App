import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import { fetchSinToken } from "../../helpers/fetch";


export const FormApp = () => {

    const [formValues, setFormValues] = useState({
        nombre: '',
        apellido: '',
        password: ''
    });

    const { nombre, apellido, password } = formValues;

    const handleInputChange = (e) => {
        setFormValues({
            ...formValues,
            [ e.target.name ]: e.target.value

        });
    }

    const reset = () => {
        setFormValues({
            nombre: '',
            apellido: '',
            password: ''
        });
    }

    const submitForm = async(e) => {
        e.preventDefault();
        console.log( formValues );

        try {

            const resp = await fetchSinToken('http://localhost:4000/api/usuarios', formValues, 'POST');
            const data = await resp.json();

            if( data.ok ) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Usuario creado',
                    showConfirmButton: false,
                    timer: 1500
                  })

                reset();
            
            }else{
                Swal.fire('Error', data.msg, 'error');
            }
            
        } catch (error) {
            Swal.fire('Error', 'Hable con el administrador', 'error');
        }

    }

    return (
        <div>
            <form onSubmit={ submitForm }>
                <input
                    className="form form-control"
                    name="nombre"
                    value={ nombre }
                    onChange= { handleInputChange }
                    placeholder="Nombre" 
                />
                <input
                    className="form form-control"
                    name="apellido"
                    value={ apellido }
                    onChange= { handleInputChange }
                    placeholder="Apellido" 
                />
                <input
                    className="form form-control"
                    name="password"
                    value={ password }
                    onChange= { handleInputChange }
                    placeholder="Password" 
                />

                <div className="d-grid gap-2">
                    <button
                        className="btn btn-primary"
                    >
                        Enviar
                    </button>
                </div>

            </form>
        </div>
        
    )
}
