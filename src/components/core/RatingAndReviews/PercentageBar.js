import React, { useState, useEffect } from 'react';

const PercentageBar = ({ percentage }) => {
    const [barFillWidth, setBarFillWidth] = useState(0);

    useEffect(() => {
        const calculateWidth = (percentage) => {
            setBarFillWidth(Math.floor((percentage / 100) * 100)); // Full width is 100%
        };

        calculateWidth(percentage);
    }, [percentage]);

    return (
        <div className='w-20 h-5 flex bg-gray-200'>
            <div
                className='h-full bg-blue-500'
                style={{ width: `${barFillWidth}%` }}
            ></div>
        </div>
    );
};

export default PercentageBar;