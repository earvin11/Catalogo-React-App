import { useEffect, useState } from "react"
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { fetchConToken } from "../../helpers/fetch";
import { Loader } from "../loader/Loader";


export const PostArticulo = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [formValues, setFormValues] = useState({
        nombre: '',
        categoria: '',
        descripcion: ''
    });

    const [category, setCategory] = useState([]);


    const { nombre, categoria, descripcion } = formValues;

    useEffect( () => {
        fetch('http://10.91.37.212:4000/api/categorias')
            .then( resp => resp.json())
            .then( ({ categorias }) => {
                setCategory([
                    ...category,
                    ...categorias
                ])
            })
    }, [])

    const handleInputChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
            
        })
    }

    // const reset = () => {
    //     setFormValues({
    //         nombre: '',
    //         categoria: '',
    //         descripcion: ''
    //     })
    // }

    const handleSubmit = async(e) => {
        e.preventDefault();
        // reset();
        setLoading(true);

        try {
            const resp = await fetchConToken('http://10.91.37.212:4000/api/articulos', formValues, 'POST');
            const data = await resp.json();
            if( data.ok ) {
                
                const id = data.articulo._id;
                
                navigate(`/put-archivo/${ id }`);
            
            }else{

                Swal.fire('Error', data.msg, 'error');
            }
        } catch (error) {
            Swal.fire('Error', 'Hable con el administrador', 'error');
        }
        
        setLoading(false); 

        
    } 

    return (
        <>
            {
                (loading) 
                    ? <Loader />
                    : <form onSubmit={ handleSubmit } className="post animate__animated animate__fadeIn">
                    <h2 className="badge bg-primary my-3 text-center"> Nuevo articulo </h2>
                    <input
                        className="form form-control mb-3"
                        name="nombre"
                        required
                        placeholder="Nombre"
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
                        <option value="" disabled>Seleccione una opcion</option>
                        {
                            category.map( cat => <option key={ cat._id } value={ cat._id }>{ cat.nombre }</option>)
                        }
                    </select>
    
                    <input
                        className="form form-control mb-3"
                        name="descripcion"
                        required
                        placeholder="Descripcion"
                        onChange={ handleInputChange }
                        value={ descripcion }
                        autoComplete="off"
                    />
                    
                    <div className="d-grid gap-2">
                        <button
                            className="btn btn-success mb-3"
                        >
                            Enviar
                        </button>
    
                    </div>
                </form>

            }
            
        </>
    )
}
