import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { fetchConToken } from "../../helpers/fetch";


export const Article = () => {

    const [articulo, setArticulo] = useState({
        nombre: '',
        descripcion: '',
        categoria: '',
    });

    const [img, setImg] = useState({});

    const { id } = useParams();

    useEffect( () => {
        fetch(`http://10.91.37.212:4000/api/articulos/${ id }`)
            .then( resp => resp.json())
            .then( data => setArticulo({...data}));

        fetch(`http://10.91.37.212:4000/api/uploads/articulos/${ id }`)
        .then( ({ url }) => setImg({
            ...img,
            url
        }));

    }, [id]);

    const navigate = useNavigate();

    const handleReturn = () => {
        navigate(-1); // -1 le indica a navigate que navegue a la ruta anterior
    }

    const deleteArticle = async() => {
        const resp = await fetchConToken(`http://10.91.37.212:4000/api/articulos/${ id }`, {}, 'DELETE');
        const data = await resp.json();

        if( data.ok ) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Articulo Eliminado',
                showConfirmButton: false,
                timer: 1500
            });

            navigate(-1);
        
        }else{
            Swal.fire('Error', data.msg, 'error');
        }
    }

    const handleDelete = async() => {


        Swal.fire({
            title: '¿Está seguro que desea eliminar este artículo?',
            text: "!Esta acción es irreversible!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Si, estoy seguro!'
          }).then((result) => {
            if (result.isConfirmed) {
                deleteArticle();
            }
          })
}

    return (
        <div className="row mt-5">

        <div className="col-4">
                <img 
                    src={ img.url }
                    alt={ img.url }
                    className="img-thumbnail animate__animated animate__fadeInLeft" 
                />
                {/* <img 
                    src={ img.url }
                    alt={ img.url }
                    className="img-thumbnail animate__animated animate__fadeInLeft" 
                />
                <img 
                    src={ img.url }
                    alt={ img.url }
                    className="img-thumbnail animate__animated animate__fadeInLeft" 
                /> */}
            </div>

            <div className="col-8 animate__animated animate__fadeIn">
                <h3>{ articulo.nombre }</h3>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><b>Categoría:</b><span className="cursiva"> { articulo.categoria.nombre } </span></li>
                    <li className="list-group-item"><b>Descripción:</b> { articulo.descripcion } </li>
                </ul>

                <button
                    className="btn btn-outline-secondary mx-2 my-2"
                    onClick={ handleReturn }
                >
                    Regresar
                </button>
                <Link 
                    className="btn btn-primary mx-2 my-2"
                    to={`/update-article/${ id }`}
                >
                    Editar
                </Link>
                <button
                    className="btn btn-danger mx-2 my-2"
                    onClick={ handleDelete }
                >
                    Eliminar
                </button>
            </div>

        </div>
    )
}
