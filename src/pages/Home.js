import React,{useEffect,useRef,useState} from 'react';
import DiscoverSection from '../components/core/Home/DiscoverSection';
import FeatureSection from '../components/core/Home/FeatureSection';
import LatestCollection from '../components/core/Home/LatestCollection';
import QualitySection from '../components/core/Home/QualitySection';
import { useSelector,useDispatch } from 'react-redux';
import { getSuperCategories } from '../services/operations/categoryAPI';
import CategorySection from '../components/core/Home/CategorySection';
import Footer from '../components/common/Footer';
import Navbar from '../components/common/Navbar';
import SidebarNav from '../components/core/Navbar/SidebarNav';
import NewArrivalSection from '../components/core/Home/NewArrivalSection';


const Home=()=>{

   const dispatch=useDispatch()
   //categories fetched for home page->loading state used from category slice
   const {loading}=useSelector((state)=>state.category)
   //toggle sidebar based on ui state
   const {showSidebar}=useSelector((state)=>state.UI)
   //Refs for focus and scroll to element
   const scrollToRef=useRef(null)
   const searchRef=useRef(null)
   //const [showDropDown,setShowDropDown]=useState(false)

   //fetch superCategories 
   const fetchSuperCategories=async ()=>{
      dispatch(getSuperCategories())
      return
   }

   //super categories fetched on initial mount
   useEffect(()=>{
      fetchSuperCategories()
   },[]) 

   //handling loading state
   if(loading){
      return (
         <div>
            Loading...
         </div>
      )
   }

    return (
       <div className='relative z-20'>
            {(//conditionally render sidebar
            showSidebar && (
                  <SidebarNav scrollToRef={scrollToRef} searchRef={searchRef} />
            )
             )}
          <Navbar scrollToRef={scrollToRef} searchRef={searchRef} />
          <DiscoverSection searchRef={searchRef}/>
          <CategorySection />
          <FeatureSection />
          <NewArrivalSection scrollToRef={scrollToRef}/>
          <QualitySection />
          <Footer searchRef={searchRef}/>
       </div>
    )
}

export default Home;