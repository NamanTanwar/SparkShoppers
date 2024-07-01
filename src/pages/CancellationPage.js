import React from 'react'
import { useSelector } from 'react-redux'
import Navbar from '../components/common/Navbar'
import SidebarNav from '../components/core/Navbar/SidebarNav'

const CancellationPage=()=>{
    
    const {isLoggedIn}=useSelector((state)=>state.auth)
    const {showSidebar}=useSelector((state)=>state.UI)
    
    return (
        <div className="flex flex-col h-screen">
         {(//conditionally render sidebar
            showSidebar && (
                  <SidebarNav />
            )
             )}
          <Navbar />
            {
                isLoggedIn ? (<h1 className="text-3xl font-bold mb-4 mt-4">No Cancellations to show</h1>) : (<h1 className="text-3xl font-bold mb-4 mt-4">Login to see cancellations</h1>)
            }
        </div>
    )
}

export default CancellationPage