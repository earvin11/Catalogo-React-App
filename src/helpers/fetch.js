export const fetchSinToken = (url, data, method = 'GET') => {

    if( method === 'GET' ) {
        return fetch( url );
    }else {
        return fetch( url, {
            method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify( data )
        });
    }

}
