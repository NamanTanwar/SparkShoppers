
const reciprocalRankFusion=(rankedList1,rankedList2)=>{

    

    let documents=new Map()

    for(let i=0;i<rankedList1.length;i++){
       const document_id=rankedList1[i]._id.toString()
       const rank=i+1//Ranks start from 1
       
       if(!(documents.has(document_id))){
            documents.set(document_id,{
                product: rankedList1[i],
                score: 0
            })
       }
       //Stores same object reference
       const docInfo=documents.get(document_id)
       docInfo.score+=(1/rank)
    }


    for(let i=0;i<rankedList2.length;i++){
        const document_id=rankedList2[i]._id.toString()
        const rank=i+1//Ranks start from 1
        
        if(!(documents.has(document_id))){
             documents.set(document_id,{
                 product: rankedList2[i],
                 score: 0
             })
        }
        //Stores same object reference
        const docInfo=documents.get(document_id)
        docInfo.score+=(1/rank)
     }

     //Sorting the documents
     const sortedDocuments=Array.from(documents).sort((a,b)=>b[1].score-a[1].score)

     console.log("Sorted docs:",sortedDocuments)

     return sortedDocuments.map((document,idx)=>(
        {
            _id: document[0],
            product: document[1]
        }
     ))

}


const meanFilter=(products)=>{
    const mean=products.reduce((acc,product)=>acc+product.product.score,0)/products.length
    return products.filter(product=>product.product.score>mean)
}

module.exports={
    reciprocalRankFusion,
    meanFilter
}