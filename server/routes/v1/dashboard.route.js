const express=require('express')
const router=express.Router()
const {dashboardController}=require('../../controllers/dashboard.controller')

router.post('/admin',dashboardController.adminDashboard())
router.post('/admin/get-reviews',dashboardController.getAdminReviewData())

module.exports=router