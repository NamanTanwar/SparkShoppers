import React from 'react'

const ToysAndGamesSvg=({height,width})=>{
	return (
		<svg version="1.1" id="Icons" height={height} width={width} viewBox="0 0 32 32" fill='none' stroke='#000000' strokeWidth={2} strokeLinecap='round' strokeLinejoin='round' strokeMiterlimit={10}>
<path class="st0" d="M20.3,29c1.7-2.7,2.7-6.8,2.7-11.5C23,9.5,19.9,3,16,3c-3.9,0-7,6.5-7,14.5c0,4.7,1.1,8.8,2.7,11.5H20.3z"/>
<circle class="st0" cx="16" cy="18" r="3"/>
<path class="st0" d="M10.3,9L10.3,9c3.5,1.9,7.8,1.9,11.3,0l0,0"/>
<path class="st0" d="M8.1,16c-2,0-3.7,2.9-3.7,6.5c0,2.4,0.7,4.4,1.8,5.5H10"/>
<path class="st0" d="M23.9,16c2,0,3.7,2.9,3.7,6.5c0,2.4-0.7,4.4-1.8,5.5H22"/>
</svg>
	)
}

const ToysAndGames=()=>{
	return (
		<div className="flex flex-col space-y-2 items-center p-3">
                    <div className=" border-black border-2 rounded-md p-3">
                        <ToysAndGamesSvg height={"70px"} width={"70px"}/>
                    </div>
                    <p className="font-bold">Toys And Games</p>
                </div>
	)
}

export default ToysAndGames