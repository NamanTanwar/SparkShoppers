import React from 'react';
import Sidebar from '../components/core/Navbar/SidebarNav';
import Navbar from '../components/common/Navbar';
import { useSelector } from 'react-redux';
import About1 from '../assets/about/about-1.jpg';
import About2 from '../assets/about/about-2.jpg';
import About3 from '../assets/about/about-3.jpg';

const AboutUs = () => {

    const {showSidebar}=useSelector((state)=>state.UI)

    return (
        <div className="container mx-auto p-6">
        {(
            showSidebar && (
                  <Sidebar />
            )
             )}
            <Navbar scrollToRef={null}/>
            {/* Section 1 */}
            <div className="flex flex-col md:flex-row items-center my-8">
                <div className="md:w-1/2">
                    <img src={About1} alt="Section 1" className="rounded-lg shadow-lg" />
                </div>
                <div className="md:w-1/2 md:pl-10 mt-4 md:mt-0">
                    <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                    <p className="text-gray-700">
                        We are dedicated to providing the best service possible. Our mission is to deliver high-quality products that make your life easier and more enjoyable.
                    </p>
                    <p className="text-gray-700 mt-4">
                        Our goal is to create a seamless and personalized shopping experience for every customer. We strive to offer a diverse range of products at competitive prices, ensuring that you find exactly what you need quickly and conveniently.
                    </p>
                </div>
            </div>

            {/* Section 2 */}
            <div className="flex flex-col md:flex-row items-center my-8">
                <div className="md:w-1/2 md:order-2">
                    <img src={About2} alt="Section 2" className="rounded-lg shadow-lg" />
                </div>
                <div className="md:w-1/2 md:pr-10 mt-4 md:mt-0 md:order-1">
                    <h2 className="text-3xl font-bold mb-4">Our Values</h2>
                    <p className="text-gray-700">
                        Integrity, customer satisfaction, and innovation are at the heart of our values. We strive to uphold these values in everything we do.
                    </p>
                    <p className="text-gray-700 mt-4">
                    We believe you deserve a wide selection of high-quality products at competitive prices.  We're committed to making your shopping experience smooth and enjoyable, with clear product information, secure transactions, and efficient delivery options.
                    </p>
                </div>
            </div>

            {/* Section 3 */}
            <div className="flex flex-col md:flex-row items-center my-8">
                <div className="md:w-1/2">
                    <img src={About3} alt="Section 3" className="rounded-lg shadow-lg" />
                </div>
                <div className="md:w-1/2 md:pl-10 mt-4 md:mt-0">
                    <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
                    <p className="text-gray-700">
                        Our vision is to be the leading provider of quality products and services, continually innovating and improving to meet the changing needs of our customers.
                    </p>
                    <p className="text-gray-700 mt-4">
                    We aim to foster a community where customers can connect, share experiences, and learn from each other. This could involve creating educational content, hosting online events, or offering loyalty programs that encourage interaction.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
