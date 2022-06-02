import { useEffect, useState } from "react"
import { useNavigate } from "react-router";

import { ArrowRight, ArrowLeft } from 'react-bootstrap-icons';

import { Loader } from "../loader/Loader";
import { CardArticulo } from "./CardArticlo";


export const GetArticles = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
  
    const [articles, setArticulos] = useState([]);

    const [category, setCategory] = useState([]);

    const [ totalArticles, setTotalArticles ] = useState(null);

    const [ desde, setDesde ] = useState(0);

    
    useEffect( () => {      
        
        setLoading(true);

        fetch(`http://10.91.37.212:4000/api/articulos?limite=${ 10 }&desde=${ desde }`)
        .then( resp => resp.json())
        .then( ({ articulos, total }) => {
            setArticulos([
                ...articulos
            ]);
            
            setTotalArticles( total );
        });
        
        fetch('http://10.91.37.212:4000/api/categorias')
        .then( resp => resp.json())
        .then( ({categorias}) => {
            setCategory([
                ...categorias
            ]);
        });
        
        setLoading( false );               
        
    }, [ desde ]);

    
    const handleNext = () => {
        setDesde( desde + 10 );
    }

    const handlePrevious = () => {
        setDesde( desde - 10 );
    }

    const handleInputChange = (e) => {
        e.preventDefault();

        const id = e.target.value;

        navigate(`/articles-category/${ id }`);

    }

    return (
        <>
            {
                (loading)
                    ? <Loader />
                    : <div>
                        <div>
                            <select
                                className="form form-select mb-3"
                                name="categoria"
                                required
                                onChange={ handleInputChange }
                            >
                                <option value="">Seleccione una opcion</option>
                                {
                                    category.map( cat => <option key={ cat._id } value={ cat._id }>{ cat.nombre }</option>)
                                }
                            </select>
                
                        </div>
                        
                        <h5 className="badge bg-dark text-center">Total artículos encontrados: { totalArticles }</h5>
                        <hr/>
                        <div
                            className="row row-cols-1 row-cols-md-3 g-3 animate__animated animate__fadeIn"
                        >
                            {
                                (articles.length > 0)&&
                                
                                        articles.map( articulo => {
                                            return <CardArticulo
                                                id={ articulo._id }   
                                                nombre={ articulo.nombre } 
                                                descripcion={ articulo.descripcion }
                                                categoria={ articulo.categoria.nombre }
                                                key={ articulo._id }
                                            />
                                        })
                            }

                        </div>

                        <div className="d-flex justify-content-end d-flex align-items-center">
                                { (desde > 0) && <button onClick={ handlePrevious } className="btn btn-danger mx-2"><ArrowLeft size={30}  /></button>}
                        
                                { ( articles.length >= 10 ) && <button onClick={ handleNext } className="btn btn-primary mx-2" ><ArrowRight size={30}  /></button> }
                        </div>

                    </div>

            }
                        
        </>

        
    )
}