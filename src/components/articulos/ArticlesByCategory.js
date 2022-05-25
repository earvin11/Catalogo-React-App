import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router";
import { CardArticulo } from "./CardArticlo";


export const ArticlesByCategory = () => {
    
    const navigate = useNavigate();

    const [articles, setArticulos] = useState([]);

    const [category, setCategory] = useState([]);

    const [ totalAtricles, setTotalArticles ] = useState(null);

    const { id } = useParams();

    useEffect( () => {
        fetch(`http://10.91.37.212:4000/api/buscar/${ id }`)
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

    }, [id]);

    const handleInputChange = (e) => {
        e.preventDefault();

        const id = e.target.value;

        navigate(`/articles-category/${ id }`);

        fetch(`http://localhost:4000/api/buscar/${ id }`)
            .then( resp => resp.json())
            .then( ({ articulos, total }) => {
                setArticulos([
                    ...articulos
                ]);

                setTotalArticles( total );
            });
    }

    return (
        <div>
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

            <h5 className="badge bg-dark text-center">Total artículos encontrados: { totalAtricles }</h5>
            
            <hr/>

            <div
                className="row row-cols-1 row-cols-md-3 g-3 animate__animated animate__fadeIn"
            >
                {
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

            
        </div>

        
    )
}