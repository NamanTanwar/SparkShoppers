const mongoose=require('mongoose')
const Order=require('../models/Order')
const RatingAndReview=require('../models/RatingAndReview')
const Product=require('../models/Product')

const findAvgRating=(ratings)=>{
   //find avg rating
   //find total rating till now 
   //find avg rating by month of last two months

   const avgRatingPipeline=[
        {
            $group: {
                _id: null,
                totalRatingCount: {$sum: 1},
                
            }
        }
   ]

}


const getOrderSalesAndRatingData=async ()=>{
 
  const getPipeline=(field=1)=>{

        return [
            {
                $group: {
                    _id: null,
                    total: {$sum: field===1 ? 1: '$${field}'},
                    currentMonth: {
                        $sum: {
                            $cond: {
                                if: {$eq: [{$month: "$createdAt"},{$month: new Date()}]},
                                then: field===1 ? 1: '$${field}',
                                else: 0
                            }
                        },
                        avgRating: { $avg: { $cond: { if: {$eq: ['$field','rating']}},then: '$rating',else: null}}
                    },
                    previousMonth: {
                        $sum: {
                            $cond: {
                                if: {$eq: [{$month: "$createdAt"},{$month: new Date()}]},
                                then: field===1 ? 1:'$${field}',
                                else: 0
                            }
                        }
                    }
                },
                $project: {
                    total: 1,
                    currentMonthAvg: {$divide: ['$currentMonth',30]},
                    lastMonthAvg: {$divide: ['$lastMonth',30]},
                    avgRating: 1,
                }
            }
        ]
  }

  const [ordersTabData,salesTabData,customerRatingData]=await Promise.all([
            Order.aggregate(getPipeline(),{allowDiskUse: true}), //total orders
            Order.aggregate(getPipeline('orderAmount'),{allowDiskUse: true}),
            RatingAndReview.aggregate(getPipeline('rating'),{allowDiskUse: true})
  ])

  return {
    ordersTabData,
    salesTabData,
    customerRatingData,
  }

}



const getSalesChartData=async (year)=>{
        
    const salesAndChartPipelineOne=[
        {
            $match: {
                createdAt: {$year: 2023}
            }
        },
        {
            $group: {
                month: {$month: "$createdAt"},
                count: {$sum: 1}
            }
        }
    ]

    const salesAndChartPipelineTwo=[
            {
                $match: {
                    createdAt: {$year: 2023}
                }
            },
            {
                $group: {
                    month: {$month: "$createdAt"},
                    sales: {$sum: "$product.cost"}
                } 
            }
    ]
  
//((secondMonth-firstMonth))/firstMonth*100

    
        let result1=await  Order.aggregate(salesAndChartPipelineOne)
        let result2=await Order.aggregate(salesAndChartPipelineTwo)

        if(!result1 || result2){
            throw new Error('Error in finding sales and chart data')
        }

        //month by month sales increase
        let percentageIncrease=((result2[result2.length-1].sales-result2[result2.length-2].sales))/result2[result2.length-2].sales*100
        console.log("Result 1 is:",result1)
        console.log("Result 2 is:",result2)
        return {result1,result2,percentageIncrease}
    
   
} 

const getReviewSectionData=async ()=>{
    
    const ratingAndReviews=await RatingAndReview.find({}).populate(
       {
        path: 'user',
        populate: "firstname lastname"
       }
    )

    if(!ratingAndReviews){
        throw new Error('Error in finding reviews')
    }

    return ratingAndReviews

    //get avg rating also

}

const getTotalStats=async ()=>{
    
    const totalPipeline=[
        {$count: 'totalOrders'},
        {
            $group: {
                _id: null,
                totalSales: {$sum: "$totalPrice"}
            }
        }
    ]

    const result=await  Order.aggregate(totalPipeline);

    if(!result){
        throw new Error('Error in finding totalStats')
    }

    const totalOrders=result[0].totalOrders
    const totalSales=result[0].totalSales

    console.log("Total Orders:",totalOrders)
    console.log("Total Sales:",totalSales)

    return {totalOrders,totalSales}

}

const getRecentProducts=async ()=>{

    const  recentProducts= await Product.find().sort({createdAt: -1}).limit(5)
    if(!recentProducts){
        throw new Error('Error in finding recent products')
    }
    return recentProducts
}

const getAdminReviewData=async ()=>{

    const [mostRecentReviews,worstReviews,bestReviews]=await Promise.all([
        //most recent reviews
        RatingAndReview.find({})
        .sort({createdAt: -1})
        .limit(10)
        .populate('user','firstname lastname'),
        //10 worst reviews
        RatingAndReview.find({})
        .sort({rating: 1})
        .limit(10)
        .populate('user','firstname lastname'),
        RatingAndReview.find({})
        .sort({rating: -1})
        .limit(10)
        .populate('user','firstname lastname') 
    ])

    return {
        mostRecentReviews,
        worstReviews,
        bestReviews
    }

}


module.exports={
    getSalesChartData,
    getReviewSectionData,
    getTotalStats,
    getRecentProducts,
    getAdminReviewData
}