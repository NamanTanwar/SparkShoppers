import React from 'react';

const ElectronicsSvg=({height,width,fill})=>{
    return (
        <svg width={width} height={height} viewBox="0 0 24 24" fill={fill}>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M7 19C5.89543 19 5 18.1046 5 17V14C5 12.8954 5.89543 12 7 12C8.10457 12 9 12.8954 9 14V17C9 18.1046 8.10457 19 7 19Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M17 19C15.8954 19 15 18.1046 15 17V14C15 12.8954 15.8954 12 17 12C18.1046 12 19 12.8954 19 14V17C19 18.1046 18.1046 19 17 19Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M19 14V12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12V14" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    )
}

const Electronics=({height,width,fill,border})=>{
    return (
        <div className="flex flex-col space-y-2 items-center p-3">
                    <div className={` border-${border} border-2 rounded-md p-3`}>
                        <ElectronicsSvg height={height} width={width} fill={fill}/>
                    </div>
                    <p className="font-bold">Electronics</p>
                </div>
    )
}

export default Electronics