import { useState } from "react"

export const InputApp = () => {

    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
        // console.log(e.target.value)
        setInputValue( e.target.value );
    }

    return (
        <input
            className="form form-control"
            value={ inputValue }
            onChange={ handleInputChange }
        >

        </input>
    )
}
