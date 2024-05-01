import React from 'react'
import { FiPackage } from "react-icons/fi";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';
  import faker from 'faker';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );





const ProductsSoldChart=({productsSoldData})=>{

    const options={
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
            }
        }
    }

    const labels=['Jan','Feb','March',"April","May",'June'];

    const data={
        labels
    }

    return (
        <div className='flex flex-col'>
            <FiPackage />
            <h1>Products Sold</h1>
            <div>{productsSoldData.totalProductsSold}</div>
        </div>
    )
}

export default ProductsSoldChart