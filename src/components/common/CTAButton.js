import React from 'react';
import { Link } from 'react-router-dom';

const CTAButton = ({ type, text, path,onClick=()=>console.log('button Clicked') }) => {
    if (path) {
        return (
            <Link to={path}>
                <button type={type} className="rounded-md border-1 border-black p-2 bg-primary-100 hover:bg-primary-200 hover:text-white">
                    {text}
                </button>
            </Link>
        );
    } else {
        return (
            <button type={type} className="rounded-md border-1 border-black p-2 bg-primary-100 hover:bg-primary-200 hover:text-white" onClick={onClick}>
                {text}
            </button>
        );
    }
}

export default CTAButton;
