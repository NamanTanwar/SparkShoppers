import React,{useState} from 'react';
import { useSelector } from 'react-redux';
import BabyAndKids from '../../../assets/categorySvg/Baby And Kids';
import BeautyAndHealthCare from '../../../assets/categorySvg/BeautyAndHealthcare';
import BooksAndMusic from '../../../assets/categorySvg/BooksAndMusic';
import Electronics from '../../../assets/categorySvg/Electronics';
import Fashion from '../../../assets/categorySvg/Fashion';
import Furniture from '../../../assets/categorySvg/Furniture';
import Grocery from '../../../assets/categorySvg/Grocery';
import Other from '../../../assets/categorySvg/Other';
import SportsAndFitness from '../../../assets/categorySvg/SportsAndFitness';
import ToysAndGames from '../../../assets/categorySvg/ToysAndGames';
import { useNavigate } from 'react-router-dom';

const CategorySection=()=>{

    const navigate=useNavigate()

    const [hoveredCategory,setHoveredCategory]=useState(null)

    const {loading,superCategories}=useSelector((state)=>state.category)


    if(loading || !superCategories){
        return <div>
            Loading...
        </div>
    }

   const handleMouseEnter=(categoryName)=>{
        setHoveredCategory(categoryName)
   }

   const handleMouseLeave=()=>{
        setHoveredCategory(null)
   }

    return (
        <div className="flex flex-col items-center space-y-8 mt-10">

            <div className="flex flex-col items-center space-y-2">
                <h1 className="text-5xl">Browse By Category</h1>
                <p className="text-text-200">Explore our product collection by category and discover best deals on the market</p>
            </div>
            

            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                <button onClick={()=>navigate('/category/Baby%20And%20Kids')} onMouseEnter={()=>handleMouseEnter('BabyAndKids')} onMouseLeave={handleMouseLeave}>
                <BabyAndKids 
                     fill={hoveredCategory === 'BabyAndKids' ? '#ff0000' : '#000000'} // Change color on hover
                     border={hoveredCategory==='BabyAndKids' ? 'red-500' : 'black'}
                        height="50"
                        width="50"
                />
                </button>
                <button onClick={()=>navigate('/category/Beauty%20And%20Healthcare')} onMouseEnter={()=>handleMouseEnter('BeautyAndHealthcare')} onMouseLeave={handleMouseLeave}>
                <BeautyAndHealthCare 
                     fill={hoveredCategory === 'BeautyAndHealthcare' ? '#ff0000' : '#000000'} // Change color on hover
                     border={hoveredCategory==='BeautyAndHealthcare' ? 'red-500' : 'black'}
                        height="50"
                        width="50"
                />
                </button>
                <button onClick={()=>navigate('/category/Books%20And%20Music')} onMouseEnter={()=>handleMouseEnter('BooksAndMusic')} onMouseLeave={handleMouseLeave}>
                <BooksAndMusic 
                     fill={hoveredCategory === 'BooksAndMusic' ? '#ff0000' : '#FFFFFF'} // Change color on hover
                     border={hoveredCategory=== 'BooksAndMusic' ? 'red-500' : 'black'}
                        height="50"
                        width="50"
                />
                </button>
                <button onClick={()=>navigate('/category/Electronics')} onMouseEnter={()=>handleMouseEnter('Electronics')} onMouseLeave={handleMouseLeave}>
                <Electronics 
                    fill={hoveredCategory === 'Electronics' ? '#ff0000' : '#FFFFFF'} // Change color on hover
                    border={hoveredCategory=== 'Electronics' ? 'red-500' : 'black'}
                        height="50"
                        width="50"
                />
                </button>
                <button onClick={()=>navigate('/category/Fashion')} onMouseEnter={()=>handleMouseEnter('Fashion')} onMouseLeave={handleMouseLeave}>
                <Fashion 
                    fill={hoveredCategory === 'Fashion' ? '#ff0000' : '#FFFFFF'} // Change color on hover
                    border={hoveredCategory=== 'Fashion' ? 'red-500' : 'black'}
                        height="50"
                        width="50"
                />
                </button>
                <button onClick={()=>navigate('/category/Grocery')} onMouseEnter={()=>handleMouseEnter('Grocery')} onMouseLeave={handleMouseLeave}>
                <Grocery 
                    fill={hoveredCategory === 'Grocery' ? '#ff0000' : '#000000'} // Change color on hover
                    border={hoveredCategory==='Grocery' ? 'red-500' : 'black'}
                        height="50"
                        width="50"
                />
                </button>
                <button onClick={()=>navigate('/category/Furniture')} onMouseEnter={()=>handleMouseEnter('Furniture')} onMouseLeave={handleMouseLeave}>
                <Furniture 
                    fill={hoveredCategory === 'Furniture' ? '#ff0000' : '#000000'} // Change color on hover
                    border={hoveredCategory==='Furniture' ?  'red-500' : 'black'}
                        height="50"
                        width="50"
                />   
                </button>
                <button onClick={()=>navigate('/category/Sports%20And%20Fitness')} onMouseEnter={()=>handleMouseEnter('SportsAndFitness')} onMouseLeave={handleMouseLeave}>
                <SportsAndFitness 
                    fill={hoveredCategory === 'SportsAndFitness' ? '#ff0000' : '#000000'} // Change color on hover
                    border={hoveredCategory==='SportsAndFitness' ?  'red-500' : 'black'}
                        height="50"
                        width="50"
                />
                </button>
                <button onClick={()=>navigate('/category/Toys%20And%20Games')} onMouseEnter={()=>handleMouseEnter('ToysAndGames')} onMouseLeave={handleMouseLeave}>
                <ToysAndGames 
                    fill={hoveredCategory === 'ToysAndGames' ? ' #2196f3' : '#FFFFFF'} // Change color on hover
                    border={hoveredCategory==='ToysAndGames' ?  'blue-500' : 'black'}
                        height="50"
                        width="50"
                />
                </button>
                <button onClick={()=>navigate('/category/Other')} onMouseEnter={()=>handleMouseEnter('Other')} onMouseLeave={handleMouseLeave}>
                <Other 
                    fill={hoveredCategory === 'Other' ? '#ff0000' : '#000000'} // Change color on hover
                    border={hoveredCategory==='Other' ?  'red-500' : 'black'}
                        height="50"
                        width="50"
                />
                </button>
            </div>
        </div>
    )
}

export default CategorySection
