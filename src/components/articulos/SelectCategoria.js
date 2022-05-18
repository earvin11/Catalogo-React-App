import { useEffect, useState } from "react"

export const SelectCategoria = () => {

    const [optionValues, setOptionValue] = useState([])

    useEffect( () =>{
        fetch( 'http://localhost:4000/api/categorias')
            .then( resp => resp.json())
            .then( ({ categorias }) => {
                setOptionValue([
                    ...optionValues,
                    ...categorias
                ])
            })
    },[])

    return (
        <select className="form form-control">
            { 
                optionValues.map( opt => {
                    return(<option
                        key={ opt._id }
                        value={ opt._id }
                    >
                        { opt.nombre }
                    </option>)
                })
            }
        </select>
        
    )
}
