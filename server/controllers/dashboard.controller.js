const httpStatus = require('http-status')
const {dashboardService}=require('../services/dashboard.service')

const adminDashboard=async (req,res)=>{

    const {year}=req.body

    try{

        const salesChartData=await dashboardService.getSalesChartData(year)
        const reviewSectionData=await dashboardService.getReviewSectionData()
        const totalStats=await dashboardService.getTotalStats()
        const recentProducts=await dashboardService.getRecentProducts()



    }catch(err){
        console.log("Error in adminDashboard controller:",err)
        res.status(500).json({
            success: false,
            error: err.message,
            mesage:"Internal Server Error"
        })
    } 
    
 
}


const getAdminReviewData=async (req,res)=>{

    try{
        const adminReviews=await dashboardService.getAdminReviewData();
        if(!adminReviews){
            return res.status(httpStatus.NOT_FOUND).json({
                success: false,
                message: "Data not found"
            })
        }

        return adminReviews

    }catch(err){
        console.log('Error in getAdminReviewData controller:',err)
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success:false,
            error:err.message,
            message:"Internal Server Error"
        })
    }
}


module.exports={
    adminDashboard,
    getAdminReviewData,
}