import React,{useEffect} from 'react';
import DiscoverSection from '../components/core/Home/DiscoverSection';
import FeatureSection from '../components/core/Home/FeatureSection';
import LatestCollection from '../components/core/Home/LatestCollection';
import QualitySection from '../components/core/Home/QualitySection';
import { useSelector,useDispatch } from 'react-redux';
import { getSuperCategories } from '../services/operations/categoryAPI';
import CategorySection from '../components/core/Home/CategorySection';
import Footer from '../components/common/Footer';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/core/Navbar/Sidebar';


const Home=()=>{

   const dispatch=useDispatch()

   const {loading}=useSelector((state)=>state.category)

   const {showSidebar}=useSelector((state)=>state.UI)

   const fetchSuperCategories=async ()=>{
      dispatch(getSuperCategories())
      return
   }

   useEffect(()=>{

      fetchSuperCategories()
   
   },[])

   if(loading){
      return (
         <div>
            Loading...
         </div>
      )
   }

    return (
       <div>
            {(
            showSidebar && (
                  <Sidebar />
            )
             )}
            <Navbar />
          <DiscoverSection />
          <CategorySection />
          <FeatureSection />
         
          <QualitySection />
          <Footer />
       </div>
    )
}

export default Home;