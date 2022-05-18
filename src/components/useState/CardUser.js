
export const CardUser = ({ nombre, apellido }) => {
    return (
        <div className="col">
            <div className="card-body">

                <h5 className="card-title">{ nombre }</h5>
                <p className="card-text">{ apellido }</p>

            </div>
        </div>
    )
}
