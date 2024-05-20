import React,{useState} from 'react'

const PercentageBar=(percentage)=>{

    const [barFillWidth,setBarFillWidth]=useState(0)

    const calculateWidth=(percentage)=>{
            setBarFillWidth(Math.floor((percentage/100)*20))
    }

    calculateWidth(percentage)

    return (
        <div className='w-20 h-5 flex'>
            <div className={`h-auto w-${barFillWidth}`}>
            </div>
        </div>
    )
}

export default PercentageBar

//x/total*100=percentage