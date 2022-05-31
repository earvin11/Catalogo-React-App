import { useState } from "react";
import Swal from 'sweetalert2';
import { fetchConToken } from "../../helpers/fetch";


export const NewUser = () => {

    const [formValues, setFormValues] = useState({
        nombre: '',
        apellido: '',
        nick: '',
        password: '',
        rol: ''
    });

    const { nombre, apellido, nick, password, rol } = formValues;

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
            nick: '',
            password: '',
            rol: ''
        });
    }

    const submitForm = async(e) => {
        e.preventDefault();

        try {

            const resp = await fetchConToken('http://10.91.37.212:4000/api/usuarios', formValues, 'POST');
            const data = await resp.json();

            if( data.ok ) {
                Swal.fire({
                    position: 'center',
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
                    className="form form-control my-2"
                    name="nombre"
                    value={ nombre }
                    onChange= { handleInputChange }
                    placeholder="Nombre"
                    required 
                />
                <input
                    className="form form-control my-2"
                    name="apellido"
                    value={ apellido }
                    onChange= { handleInputChange }
                    placeholder="Apellido"
                    required 
                />
                <input
                    className="form form-control my-2"
                    name="nick"
                    value={ nick }
                    onChange= { handleInputChange }
                    placeholder="Nombre de usuario"
                    required 
                />
                <input
                    type="password"
                    className="form form-control my-2"
                    name="password"
                    value={ password }
                    onChange= { handleInputChange }
                    placeholder="Password"
                    required 
                />

                <select
                    className="form form-control my-2"
                    name="rol"
                    value={ rol }
                    onChange={ handleInputChange }
                    required
                >
                    <option value="">Seleccione una opcion:</option>
                    <option value="ADMIN_ROLE">Administrador</option>
                    <option value="USER_ROLE">Usuario</option>
                </select>

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
