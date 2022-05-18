import { useEffect, useState } from "react"
import { CardUser } from "./CardUser";


export const GetUsers = () => {
    
    const [users, setUsers] = useState([]);

    useEffect( () => {
        fetch('http://localhost:4000/api/usuarios')
            .then( resp => resp.json())
            .then( ({ usuarios}) => {
                setUsers([
                    ...users,
                    ...usuarios
                ]);

                console.log(usuarios)
            })
    },[]);


    return (
        <div>
            <h2>GetUsers</h2>
            <hr/>

            <div
                className="row row-cols-1 row-cols-md-3 g-3"
            >

                {
                    users.map( user => {
                        return <CardUser 
                            nombre={ user.nombre } 
                            apellido={ user.apellido } 
                            key={ user._id }
                        />
                    })
                }
            </div>
        </div>

        
    )
}
