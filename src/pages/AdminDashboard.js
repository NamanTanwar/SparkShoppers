import React from 'react';
import AdminNavbar from '../components/core/AdminDashboard/AdminNavbar';
import SalesChart from '../components/core/AdminDashboard/SalesChart';
import ReviewTab from '../components/core/AdminDashboard/ReviewTab';
import OrdersTab from '../components/core/AdminDashboard/Tabs/OrdersTab';
import RatingsTab from '../components/core/AdminDashboard/Tabs/RatingsTab';
import SalesTab from '../components/core/AdminDashboard/Tabs/SalesTab';

const reviewMockData={
    mostRecentReviews: [
        {
            _id: 1,
            user: {
                firstname: 'First',
                lastname: 'Last'
            },
            rating: 4,
            review: 'Good product'
        },
        {
            _id: 2,
            user: {
                firstname: 'First',
                lastname: 'Last'
            },
            rating: 4,
            review: 'Good product'
        },
        {
            _id: 3,
            user: {
                firstname: 'First',
                lastname: 'Last'
            },
            rating: 4,
            review: 'Good product'
        },
        {
            _id: 4,
            user: {
                firstname: 'First',
                lastname: 'Last'
            },
            rating: 4,
            review: 'Good product'
        },
        {
            _id: 5,
            user: {
                firstname: 'First',
                lastname: 'Last'
            },
            rating: 4,
            review: 'Good product'
        },
        {
            _id: 6,
            user: {
                firstname: 'First',
                lastname: 'Last'
            },
            rating: 4,
            review: 'Good product'
        },
        {
            _id: 7,
            user: {
                firstname: 'First',
                lastname: 'Last'
            },
            rating: 4,
            review: 'Good product'
        },
        {
            _id: 8,
            user: {
                firstname: 'First',
                lastname: 'Last'
            },
            rating: 4,
            review: 'Good product'
        },
        {
            _id: 9,
            user: {
                firstname: 'First',
                lastname: 'Last'
            },
            rating: 4,
            review: 'Good product'
        },
        {
            _id: 10,
            user: {
                firstname: 'First',
                lastname: 'Last'
            },
            rating: 4,
            review: 'Good product'
        }
    ],
    worstReviews: [
        {
            _id: 1,
            user: {
                firstname: 'First',
                lastname: 'Last'
            },
            rating: 4,
            review: 'worst product'
        },
        {
            _id: 2,
            user: {
                firstname: 'First',
                lastname: 'Last'
            },
            rating: 4,
            review: 'Good product'
        },
        {
            _id: 3,
            user: {
                firstname: 'First',
                lastname: 'Last'
            },
            rating: 4,
            review: 'Good product'
        },
        {
            _id: 4,
            user: {
                firstname: 'First',
                lastname: 'Last'
            },
            rating: 4,
            review: 'Good product'
        },
        {
            _id: 5,
            user: {
                firstname: 'First',
                lastname: 'Last'
            },
            rating: 4,
            review: 'Good product'
        },
        {
            _id: 6,
            user: {
                firstname: 'First',
                lastname: 'Last'
            },
            rating: 4,
            review: 'Good product'
        },
        {
            _id: 7,
            user: {
                firstname: 'First',
                lastname: 'Last'
            },
            rating: 4,
            review: 'Good product'
        },
        {
            _id: 8,
            user: {
                firstname: 'First',
                lastname: 'Last'
            },
            rating: 4,
            review: 'Good product'
        },
        {
            _id: 9,
            user: {
                firstname: 'First',
                lastname: 'Last'
            },
            rating: 4,
            review: 'Good product'
        },
        {
            _id: 10,
            user: {
                firstname: 'First',
                lastname: 'Last'
            },
            rating: 4,
            review: 'Good product'
        }
    ],
    bestReviews: [
        {
            _id: 1,
            user: {
                firstname: 'First',
                lastname: 'Last'
            },
            rating: 4,
            review: 'best product'
        },
        {
            _id: 2,
            user: {
                firstname: 'First',
                lastname: 'Last'
            },
            rating: 4,
            review: 'Good product'
        },
        {
            _id: 3,
            user: {
                firstname: 'First',
                lastname: 'Last'
            },
            rating: 4,
            review: 'Good product'
        },
        {
            _id: 4,
            user: {
                firstname: 'First',
                lastname: 'Last'
            },
            rating: 4,
            review: 'Good product'
        },
        {
            _id: 5,
            user: {
                firstname: 'First',
                lastname: 'Last'
            },
            rating: 4,
            review: 'Good product'
        },
        {
            _id: 6,
            user: {
                firstname: 'First',
                lastname: 'Last'
            },
            rating: 4,
            review: 'Good product'
        },
        {
            _id: 7,
            user: {
                firstname: 'First',
                lastname: 'Last'
            },
            rating: 4,
            review: 'Good product'
        },
        {
            _id: 8,
            user: {
                firstname: 'First',
                lastname: 'Last'
            },
            rating: 4,
            review: 'Good product'
        },
        {
            _id: 9,
            user: {
                firstname: 'First',
                lastname: 'Last'
            },
            rating: 4,
            review: 'Good product'
        },
        {
            _id: 10,
            user: {
                firstname: 'First',
                lastname: 'Last'
            },
            rating: 4,
            review: 'Good product'
        }
    ],
}

const ratingsTabData={
    total: 318,
    avgRating: 3.5,
    currentMonthAvg: 4,
    lastMonthAvg: 3
}

const salesTabData={
    total: 347000,
    avgRating: null,
    currentMonthAvg: 23000,
    lastMonthAvg: 32000,
}

const ordersTabData={
    total: 755,
    avgRating: null,
    currentMonthAvg: 300,
    lastMonthAvg: 250,
}

const AdminDashboard=()=>{
    return (
        <div>
        <AdminNavbar/>
        <div className="">
            <SalesChart />
            <ReviewTab reviews={reviewMockData}/>
            <OrdersTab ordersTabData={ordersTabData}/>
            <RatingsTab ratingsTabData={ratingsTabData}/>
            <SalesTab salesTabData={salesTabData}/>
        </div>
        </div>
    )
}

export default AdminDashboard