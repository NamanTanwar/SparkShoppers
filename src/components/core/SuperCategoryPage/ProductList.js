import React,{useEffect,useRef} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import ProductCard from "../../common/ProductCard"
import { fetchSuperCategoryPageData } from '../../../services/operations/superCategoryAPI'

const ProductList=({categoryName,selectedOption})=>{

    const observerRef=useRef(null)
    const lastProductRef=useRef(null)

    const dispatch=useDispatch()

    const {products,page,limit,isLoading,filteredProducts}=useSelector((state)=>state.superCategory)

    useEffect(()=>{
        dispatch(fetchSuperCategoryPageData(categoryName,page,limit,selectedOption))
    },[selectedOption,categoryName])

    useEffect(() => {
        if (observerRef.current) observerRef.current.disconnect();

        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0];
            console.log('Entry here is:', entry);
            if (entry && entry.isIntersecting && !isLoading) {
                dispatch(fetchSuperCategoryPageData(categoryName, page, limit, selectedOption));
            }
        });

        if (lastProductRef.current) 
            observer.observe(lastProductRef.current);
        
        observerRef.current = observer;

        return () => {
            if (observerRef.current) observerRef.current.disconnect();
        };
    }, [dispatch, page, limit, isLoading, categoryName, selectedOption,lastProductRef.current]);

    return (
        <div className='container mx-auto p-4'> 
            <h1 className='text-2xl font-bold mb-4'>This is product list</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {
  filteredProducts && filteredProducts.length > 0 ? (
    filteredProducts.map((product, idx) => ( 
      <ProductCard
        key={product._id}
        product={product}
        refInput={lastProductRef}
        idx={idx}
        productsLength={products.length}
      />
    ))
  ) : (
    products && products.map((product, idx) => ( 
      <ProductCard
        key={product._id}
        product={product}
        refInput={lastProductRef}
        idx={idx}
        productsLength={products.length}
      />
    ))
  )
}
            </div>
        </div>
    )
}

export default ProductList