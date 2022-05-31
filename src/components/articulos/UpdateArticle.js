import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
import Swal from "sweetalert2";

import { fetchConToken } from "../../helpers/fetch";
import { Loader } from "../loader/Loader";


export const UpdateArticle = () => {

    const navigate = useNavigate();

    const { id } = useParams();

    const formData = new FormData();

    const [formValues, setFormValues] = useState({
        nombre: '',
        categoria: '',
        descripcion: '',
    });

    const [category, setCategory] = useState([]);

    const [loading, setLoading] = useState(false);

    const { nombre, categoria, descripcion } = formValues;

    const token = localStorage.getItem('token') || '';

    useEffect( () => {

        fetch(`http://10.91.37.212:4000/api/articulos/${ id }`)
            .then( resp => resp.json())
            .then( ({ nombre, descripcion, categoria }) => setFormValues({
                nombre,
                categoria,
                descripcion
            }))

        fetch(`http://10.91.37.212:4000/api/categorias/`)
            .then( resp => resp.json())
            .then( ({categorias}) => setCategory([
                ...categorias
        ]))

    }, [id])


    const handleInputChange = (e) => {
        setFormValues({
            ...formValues,
            [ e.target.name ]: e.target.value
        })
    }

    const handleFileChange = (e) => {
        formData.append('archivo', e.target.files[0]);
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        setLoading(true);

        try {
            const resp = await fetchConToken(`http://10.91.37.212:4000/api/articulos/${ id }`, formValues, 'PUT');
            const data = await resp.json();

            // Para actualizar la img
            fetch(`http://10.91.37.212:4000/api/uploads/articulos/${ id }`, {
                    method: 'PUT',
                    headers: {
                        'x-token': token
                    },
                    body: formData
                }).then( resp => resp.json())
                    .then( data => {
                        if( data.ok ) {
                            Swal.fire('','Trabajo realizado correctamente', 'success');
                        
                        }else{
                            Swal.fire('Error', data.msg, 'error');
                        }
                    });
    
            if( data.ok ) {
                Swal.fire('','Trabajo realizado correctamente', 'success');

                  navigate(-1);
            
            }else{
                Swal.fire('Error', data.msg, 'error');
            }
        } catch (error) {
            console.log(error);
        }

        setLoading(false);
    }

    return (
        <>
            {
                (loading) 
                    ? <Loader />
                    :

                <form onSubmit={ handleSubmit } className="animate__animated animate__fadeIn">
                    <input
                        className="form form-control mb-3"
                        name="nombre"
                        placeholder="Nombre"
                        required
                        onChange={ handleInputChange }
                        value={ nombre }
                        autoComplete="off"
                    />

                    <select
                        className="form form-select mb-3"
                        name="categoria"
                        required
                        onChange={ handleInputChange }
                        value={ categoria }
                    >
                        <option value="">Seleccione una opcion</option>
                        { 
                            category.map( cat => <option key={ cat._id } value={ cat._id }>{ cat.nombre }</option>)
                        }
                    </select>

                    <input
                        className="form form-control mb-3"
                        name="descripcion"
                        placeholder="Descripcion"
                        required
                        onChange={ handleInputChange }
                        value={ descripcion }
                        autoComplete="off"
                    />
                    <input
                        type="file"
                        className="form form-control mb-3"
                        name="archivo"
                        required
                        onChange={ handleFileChange }
                    />
                    <div className="d-grid gap-2">
                        <button
                            className="btn btn-primary mb-3"
                        >
                            Actualizar
                        </button>

                    </div>
                </form>

            }
        </>
        
    )
}
