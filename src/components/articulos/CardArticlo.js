import { Link } from "react-router-dom"

export const CardArticulo = ({ id, nombre, categoria, descripcion }) => {


    return (
        <div className="col">
    
            <div className="card-body">

                <h5 className="card-title font-monospace">{ nombre }</h5>
                <h6 className="card-text cursiva">{ categoria }</h6>
                <p className="card-text">{ descripcion }</p>

                <Link className="btn btn-outline-info" to={`/article/${id}`}>
                    Mas...
                </Link>

            </div>
            
        </div>

    )
}