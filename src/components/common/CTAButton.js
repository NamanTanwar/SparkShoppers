import React from 'react';
import { Link } from 'react-router-dom';

const CTAButton=(props)=>{
    return (
        <Link to={props.path}>
            <button type={props.type} className="rounded-md border-1 border-black p-2 bg-primary-100 hover:bg-primary-200 hover:text-white">{props.text}</button>
        </Link>
        
    )
}

export default CTAButton