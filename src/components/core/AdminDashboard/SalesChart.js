import React from 'react'
import { LuShoppingBag } from "react-icons/lu";
import { useSelector } from 'react-redux';
import { FaArrowUp } from "react-icons/fa6";
import { FaLongArrowAltDown } from "react-icons/fa";
import {Chart as ChartJS} from 'chart.js'
import { 
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {Line} from 'react-chartjs-2'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
)

const SalesChart=()=>{

    const {salesChartData,result1,result2}=useSelector((state)=>state.admin)
    
    const labels=['Jan', 'Feb', 'Mar','Apr', 'May','Jun','Jul', 'Aug','Sep','Oct','Nov','Dec']

    const data={
        labels,
        datasets: [
            {
                label:'Orders',
                data: [30,50,25,67,87,23,76,74,76,32,12,32],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)'
            },
            {
                label: 'Sales',
                data: [8500,9200,10100,11500,12000,10800,9500,8800,9700,10300,11200,9900],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)'
            }

        ]
    }

    const options={
        responsive: true,
        title: {
            display: true,
            text: 'Sales and Orders in Different Months'
        }
    }
    
    
    
    const isSalesPositive=salesChartData.percentageIncrease>=0

    console.log(isSalesPositive)

    return (
        <div className='flex flex-col justify-center items-center px-4 py-8 rounded-md'>
            <div className='flex flex-row space-x-4 justify-center items-center border border-gray-200 rounded-md px-4 py-2'>
                <LuShoppingBag style={{color: 'green'}}/>
                <div className={`flex flex-row justify-center items-center text-${isSalesPositive ? 'green-500' : 'red-500'}`}>
                    {isSalesPositive ? (<FaArrowUp />) : (<FaLongArrowAltDown />)}
                    <p className='ml-2'>{salesChartData.percentageIncrease}%</p>
                </div>
            </div>
            <Line data={data} options={options} />
            
        </div>
    )
}

export default SalesChart