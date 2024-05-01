const myMap=new Map()

myMap.set(3,{
    product: {
        name: 'Printer',
        price: 2000
    },
    score: 1
})


myMap.set(1,{
    product: {
        name: 'Laptop',
        price: 2000
    },
    score: 4
})

myMap.set(2,{
    product: {
        name: 'Laptop',
        price: 2000
    },
    score: 2
})

console.log('Map is:',myMap)

const array=Array.from(myMap)

console.log("Array is:",array)

const sortedArray=Array.from(myMap).sort((a,b)=>b[1].score-a[1].score)

console.log(sortedArray[0][1].score)


console.log('Sorted Array:',sortedArray)

const mappedArray=sortedArray.map((document,idx)=>(
            {
                _id: document[0],
                product: document[1]
            }
))

console.log("Mapped Array:",mappedArray)

