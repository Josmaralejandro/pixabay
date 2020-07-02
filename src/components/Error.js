import React from 'react';

function Error({mensaje}) {
    return (
        <p className="my-3 p-4 text-center text-white alert alert danger">{mensaje}</p>
    );
}

export default Error;