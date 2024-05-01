import React from 'react';
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

const CategorySection=()=>{

    

    const {loading,superCategories}=useSelector((state)=>state.category)


    if(loading || !superCategories){
        return <div>
            Loading...
        </div>
    }

    return (
        <div className="flex flex-col items-center space-y-8 mt-10">

            <div className="flex flex-col items-center space-y-2">
                <h1 className="text-5xl">Browse By Category</h1>
                <p className="text-text-200">Explore our product collection by category and discover best deals on the market</p>
            </div>
            

            <div className="grid grid-cols-5">
                <BabyAndKids />
                <BeautyAndHealthCare />
                <BooksAndMusic />
                <Electronics />
                <Fashion />
                <Grocery />
                <Furniture />
                <SportsAndFitness />
                <ToysAndGames />
                <Other />
            </div>
        </div>
    )
}

export default CategorySection
