//Normalize vector embedding for consine or dot-product similarity
const normalizeL2=(vector)=>{
    const sumOfSquares=vector.reduce((acc,value)=>acc+value*value,0)
    const norm=Math.sqrt(sumOfSquares)
    return vector.map(value=>value/norm)
}

module.exports={normalizeL2}