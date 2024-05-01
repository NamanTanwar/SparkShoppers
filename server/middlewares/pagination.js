
const pagination=(req,res,next)=>{

    console.log('Entered pagination')

    console.log('Request query:',req.query)

    const {page=1,limit: limitFromQuery=10}=req.query
    const skipNumber=(page-1)*limitFromQuery

    

    req.pagination={
        skip:skipNumber,
        limit: limitFromQuery,
        page: page,
    }

    next()

}

module.exports={
    pagination
}

