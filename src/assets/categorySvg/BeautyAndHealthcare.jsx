import React from 'react'

const BeautyAndHealthCareSvg=({height,width})=>{
	return (
		<svg height={height} width={width} version="1.1" id="_x32_" viewBox="0 0 512 512" fill='#000000'>

<g>
	<path class="st0" d="M376.781,217.416c-9.549-22.566-25.46-41.728-45.506-55.271c-6.234-4.217-12.881-7.883-19.848-10.944v-14.819
		v-8.233c0-7.198-5.843-13.033-13.033-13.033H282.38V90.614h14.475l13.24-23.714V35.814c7.588-0.207,15.034-0.853,22.271-2.304
		c3.451-0.693,6.871-1.578,10.226-2.702V0c-4.145,2.75-9.318,4.742-15.742,6.042c-6.409,1.292-13.981,1.825-22.374,1.825
		c-10.37,0-21.96-0.805-34.212-1.65c-12.267-0.838-25.204-1.714-38.42-1.714c-18.382,0.016-37.392,1.666-55.821,7.899
		c-9.199,3.108-18.23,7.381-26.783,13.128c-8.561,5.731-16.611,12.929-23.897,21.737l21.593,17.863
		c5.62-6.775,11.59-12.076,17.919-16.324c9.494-6.369,19.856-10.41,31.127-12.905c5.141-1.132,10.474-1.929,15.934-2.464V66.9
		l13.24,23.714h14.483v24.503h-16.284c-7.198,0-13.033,5.834-13.033,13.033v8.233v14.962c-21.793,9.621-40.309,25.204-53.502,44.717
		c-13.55,20.038-21.473,44.286-21.465,70.272v218.461c0,3.714,0.756,7.333,2.144,10.593c2.072,4.895,5.5,9.024,9.836,11.957
		c4.328,2.933,9.637,4.663,15.225,4.655h196.891c3.722,0,7.334-0.758,10.594-2.144c4.902-2.08,9.031-5.508,11.964-9.836
		c2.925-4.328,4.655-9.636,4.647-15.224V266.334C386.656,249.021,383.141,232.458,376.781,217.416z M360.281,484.795
		c0,0.151-0.016,0.223-0.056,0.319l-0.319,0.374c-0.144,0.087-0.239,0.127-0.454,0.136H162.561c-0.152,0-0.224-0.024-0.319-0.056
		l-0.375-0.318c-0.096-0.152-0.127-0.239-0.136-0.454V266.334c0-13.75,2.774-26.774,7.796-38.643
		c7.525-17.8,20.126-32.984,35.981-43.697c4.568-3.077,9.406-5.78,14.467-8.075h82.077c16.755,7.62,31.063,19.776,41.29,34.913
		c10.705,15.862,16.938,34.89,16.938,55.502V484.795z"/>
</g>
</svg>
	)
}

const BeautyAndHealthCare=()=>{
	return (
		<div className="flex flex-col space-y-2 items-center p-3">
                    <div className=" border-black border-2 rounded-md p-3">
                        <BeautyAndHealthCareSvg height={"70px"} width={"70px"}/>
                    </div>
                    <p className="font-bold">Beauty And HealthCare</p>
                </div>
	)
}

export default BeautyAndHealthCare