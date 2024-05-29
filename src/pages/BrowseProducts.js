import React,{useState} from 'react';
import BrowseProductsSidebar from '../components/core/BrowseProducts/BrowseProductsSidebar';
import {filterOptions} from '../data/BrowseProductsData'
import Navbar from '../components/common/Navbar';
import { useSelector,useDispatch } from 'react-redux';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getProducts } from '../services/operations/productAPI';
import {setProducts} from '../slices/productSlice'
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/common/ProductCard';

const BrowseProducts=()=>{

    const {searchQuery}=useSelector(state=>state.products)

    const [option,setOption]=useState('Recomended')
    const [showDropDown,setShowDropDown]=useState(false)

    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
        }=useInfiniteQuery({
            queryKey: ['products',searchQuery],
            queryFn:  getProducts,
            initialPageParam: 1,
            getNextPageParam: (lastPage,pages)=>lastPage.nextPage
        })

        if(status==='success'){
            console.log('Entered success',data)
            console.log(data.pages[0].products)
        }

        if(status==='pending'){
            return (<p>Loading...</p>)
        }
        else if(status==='error'){
            return (<p>Error: {error.message}</p>)
        }

    return (
        <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="flex flex-row p-4">
            <BrowseProductsSidebar />
            <div className="flex flex-col w-full">
                <div className="flex flex-row items-center justify-between mb-4">
                    <h1 className="text-xl font-bold">Showing results for {searchQuery}</h1>
                    <div className="relative">
                        <p 
                            className="cursor-pointer px-4 py-2 bg-white border border-gray-300 rounded"
                            onMouseEnter={() => setShowDropDown(true)}
                            onMouseLeave={() => setShowDropDown(false)}
                        >
                            {option}
                        </p>
                        <div className={`absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg ${showDropDown ? "block" : "hidden"}`}>
                            {
                                filterOptions.map((filterOption, idx) => (
                                    <button 
                                        key={filterOption.id} 
                                        className="w-full text-left px-4 py-2 hover:bg-gray-200"
                                        onClick={() => setOption(filterOption.option)}
                                    >
                                        {filterOption.option}
                                    </button>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {
                        data.pages[0].products.map((product, idx) => (
                            <ProductCard key={idx} product={product.product.product} />
                        ))
                    }
                </div>
                <div className="mt-4 flex justify-center">
                    <button
                        onClick={() => fetchNextPage()}
                        disabled={!hasNextPage || isFetchingNextPage}
                        className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                    >
                        {isFetchingNextPage ? 'Loading more...' : hasNextPage ? 'Load More' : 'Nothing more to load'}
                    </button>
                </div>
                <div className="mt-2 text-center">
                    {isFetching && !isFetchingNextPage ? 'Fetching...' : null}
                </div>
            </div>
        </div>
    </div>  
    )
}

export default BrowseProducts