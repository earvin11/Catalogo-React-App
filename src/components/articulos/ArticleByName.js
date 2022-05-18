import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CardArticulo } from "./CardArticlo";


export const ArtcileByName = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const [articles, setArticles] = useState([]);
    
    const [ totalAtricles, setTotalArticles ] = useState(null);

    const [formValues, setFormValues] = useState({
        nombre: ''
    });

    const { nombre } = formValues;

    const handleInputChange = (e) => {
        setFormValues({
            nombre: e.target.value
        });
    }

    const handleSearch = async(e) => {
        e.preventDefault();
        
        fetch('http://localhost:4000/api/buscar/', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify( formValues )
        })
            .then( resp => resp.json())
            .then( ({total, articulos}) => {
                setArticles([
                    ...articulos
                ])
                setTotalArticles( total );
            });
    }

    return (
        <>
            <h1>Busquedas</h1>
            <hr/>

            <div className="row">
                <div className="col-5">
                    <h5 className="text-center badge bg-primary">Buscar</h5>
                    <hr/>
                    
                    <form onSubmit={ handleSearch }>
                        <input
                            type="text"
                            placeholder="Busca un artículo"
                            className="form-control"
                            name="nombre"
                            autoComplete="off"
                            required
                            value={ nombre }
                            onChange={ handleInputChange }                            
                        />

                        <button 
                            type="submit"
                            className="btn btn-outline-primary mt-2"
                        >
                            Buscar...
                        </button>
                    </form>

                </div>

                <div className="col-7">
                    <h4 className="">Resultados: <span className="text-info">{ totalAtricles }</span></h4>
                    <hr/>

                    {   //si no se ha buscado nada
                        ( nombre === '' )&&
                            //regresa esto
                             <div className="alert alert-info">Buscar un artículo</div>
                    }

                    {
                        articles.map(article => (
                            <CardArticulo
                                id={ article._id } 
                                nombre={ article.nombre } 
                                descripcion={ article.descripcion }
                                categoria={ article.categoria.nombre }
                                key={ article._id }
                            />
                        ))
                    }
                    
                </div>
            </div>
        </>
    )
}