import React from 'react'

const FashionSvg=({height,width})=>{
    return (
        <svg width={width} height={height} viewBox="0 0 24 24" fill="none">
<path d="M3 7L6 4H9C9 4.39397 9.0776 4.78407 9.22836 5.14805C9.37913 5.51203 9.6001 5.84274 9.87868 6.12132C10.1573 6.3999 10.488 6.62087 10.8519 6.77164C11.2159 6.9224 11.606 7 12 7C12.394 7 12.7841 6.9224 13.1481 6.77164C13.512 6.62087 13.8427 6.3999 14.1213 6.12132C14.3999 5.84274 14.6209 5.51203 14.7716 5.14805C14.9224 4.78407 15 4.39397 15 4H18L21 7L20.5 12L18 10.5V20H6V10.5L3.5 12L3 7Z" stroke="#000000" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round"/>
</svg>
    )
}

const Fashion=()=>{
    return (
        <div className="flex flex-col space-y-2 items-center p-3">
                    <div className=" border-black border-2 rounded-md p-3">
                        <FashionSvg height={"70px"} width={"70px"}/>
                    </div>
                    <p className="font-bold">Fashion</p>
                </div>
    )
}

export default Fashion