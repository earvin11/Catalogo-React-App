import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";

import { Loader } from "../loader/Loader";



export const PutArchivo = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const formData = new FormData();

    const token = localStorage.getItem('token') || '';

    const handleFileChange = (e) => {
        formData.append('archivo', e.target.files[0]);      
    }

    
    const handleSubmit = async(e) => {
        e.preventDefault();

        setLoading(true);

        fetch(`http://10.91.37.212:4000/api/uploads/articulos/${ id }`, {
                method: 'PUT',
                headers:{
                    'x-token': token
                },
                body: formData 
            }).then( resp => resp.json())
                .then( data => {
                    if( data.ok ) {
                        Swal.fire('','Trabajo realizado correctamente', 'success');
                        navigate(-1);
                    
                    }else{
                        Swal.fire('Error', data.msg, 'error');
                    }
                });

        setLoading(false);

}
    
    return (
        <>
            {
                ( loading )
                    ? <Loader />
                    : <form className="post" onSubmit={ handleSubmit }>
                            <h2 className=" text-center badge bg-success my-3"> Subir imagen </h2>
                            <input
                                className="form form-control mb-3"
                                type="file"
                                name="archivo"
                                onChange={ handleFileChange }
                            />

                            <div className="d-grid gap-2">
                                <button
                                    className="btn btn-primary mb-3"
                                >
                                    Guardar
                                </button>
                            </div>

                        </form>     
            }        
        </>
    )
}
