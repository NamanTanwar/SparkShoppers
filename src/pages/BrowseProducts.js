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
        <div>
            <Navbar />
            <div className='flex flex-row'>
                <BrowseProductsSidebar />
                <div className='flex flex-col'>
                <div className='flex flex-row'>
                    <h1>Showing results for {searchQuery}</h1>
                    <div className='relative' onMouseEnter={()=>setShowDropDown(true)} onMouseLeave={()=>setShowDropDown(false)}>
                        <p>{option}</p>
                        <div className={`absolute ${showDropDown ? "block" : "hidden"}`}>
                        {
                            filterOptions.map((option,idx)=>(
                                <button  key={option.id}>{option.option}</button>
                            ))
                        }
                        </div>
                    </div>
                </div>
                <div>
                {
                    data.pages[0].products.map((product,idx)=>(
                        <ProductCard product={product.product.product}/>
                    ))
                }
                </div>
                <button
                onClick={()=>fetchNextPage()}
                disabled={!hasNextPage || isFetchingNextPage}
                >
                 {isFetchingNextPage
                        ? 'Loading more...'
                        : hasNextPage
                        ? 'Load More'
                        : 'Nothing more to load'}
                </button>
                <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
                </div>
            </div>
        </div>
        
    )
}

export default BrowseProducts