import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
    return(
        <div class="container">
            <h1>404 - Page Not Found</h1>
            <Link to="/" className="btn btn-primary">Return Home</Link>
        </div>
    );
}

export default Error;