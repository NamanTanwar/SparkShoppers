import React from 'react';
import ProductCard from '../../common/ProductCard';
import ProductImg from "../../../assets/mock-product.jpeg"

const mockData=[
    {
        id: 0,
        productImg: ProductImg,
        productName: "Nike Shoes",
        productDesc: "This is product desc",
        productPrice: 6999,
        avgRating: 3.9,

    },
    {
        id: 1,
        productImg: ProductImg,
        productName: "Nike Shoes",
        productDesc: "This is product desc",
        productPrice: 6999,
        avgRating: 3.9,
    },
    {
        id: 2,
        productImg: ProductImg,
        productName: "Nike Shoes",
        productDesc: "This is product desc",
        productPrice: 6999,
        avgRating: 3.9,
    },
    {
        id: 3,
        productImg: ProductImg,
        productName: "Nike Shoes",
        productDesc: "This is product desc",
        productPrice: 6999,
        avgRating: 3.9,
    },
    {
        id: 4,
        productImg: ProductImg,
        productName: "Nike Shoes",
        productDesc: "This is product desc",
        productPrice: 6999,
        avgRating: 3.9,
    },
    {
        id: 5,
        productImg: ProductImg,
        productName: "Nike Shoes",
        productDesc: "This is product desc",
        productPrice: 6999,
        avgRating: 3.9,
    },
    {
        id: 6,
        productImg: ProductImg,
        productName: "Nike Shoes",
        productDesc: "This is product desc",
        productPrice: 6999,
        avgRating: 3.9,
    },
    {
        id: 7,
        productImg: ProductImg,
        productName: "Nike Shoes",
        productDesc: "This is product desc",
        productPrice: 6999,
        avgRating: 3.9,
    }
]

const LatestCollection = () => {
    return (
        <div>
            <div className="flex flex-col space-y-2 justify-center items-center mt-10">
                <h1 className="text-4xl font-bold">Discover our Latest Collection</h1>
                <h3 className="text-2xl text-text-200">Explore our latest collection of new arrivals and best selling products</h3>
            </div>

            <div className="grid sm:grid-cols-1 md:gird-cols-2 lg:grid-cols-4 mt-10 space-x-10 space-y-10">
                {mockData.map((product) => (
                    <ProductCard
                        key={product.id} // Add key prop
                        product={product} // Pass entire product object as props
                    />
                ))}
            </div>

            <div className="flex justify-center items-center h-full mt-10">
                <button className="border-2 p-4 hover:border-black hover:font-semibold">
                    View All
                </button>
            </div>

        </div>
    );
};

export default LatestCollection;
