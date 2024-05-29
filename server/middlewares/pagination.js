
const pagination=(req,res,next)=>{
    
    console.log('Request query in pagination middlware:',req.query)
    console.log('Request params:',req.params)
    
    const page=parseInt(req.query.page) || 1
    const limit=parseInt(req.query.limit) || 10
    const skip=(page-1)*limit

    console.log('skip in pagination:',skip)
    
    req.pagination={page,limit,skip}
    next()

}




module.exports={
    pagination
}

