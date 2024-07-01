import React from 'react';
import ContactUsImg from "../assets/ContactUs-Final.jpg";
import FAQSection from '../components/core/ContactUs/FAQSection';
import ContactUsForm from '../components/core/ContactUs/ContactUsForm';
import Sidebar from '../components/core/Navbar/SidebarNav';
import Navbar from '../components/common/Navbar';
import { useSelector } from 'react-redux';

const ContactUs = () => {
  const { showSidebar } = useSelector((state) => state.UI);

  return (
    <div className='flex flex-col'>
      {showSidebar && <Sidebar />}
      <Navbar scrollToRef={null} />
      <div className='flex flex-col md:flex-row justify-center align-center p-4 md:p-8'>
        <div className='md:w-1/2'>
          <img src={ContactUsImg} alt="Contact Us" className='w-full h-auto rounded-md' />
        </div>
        <div className='md:w-1/2 md:pl-8 mt-4 md:mt-20'>
          <h1 className='text-3xl md:text-4xl font-bold mb-4'>Have questions?<br />Shoot us an email.</h1>
          <p className='text-gray-700 mb-4'>
            In the ever-evolving world of online shopping, Spark Shoppers stands out as a leader in convenience and selection. We take pride in being your one-stop shop for everything you need, from everyday essentials to those special finds. Our virtual aisles overflow with a massive variety of products across countless categories, ensuring you can browse and discover with ease.
          </p>
          <p className='text-gray-700'>
            Have a question for us or some feedback? Please click on the most appropriate category and fill out the form to reach us.
          </p>
        </div>
      </div>
      <div className='p-4 md:p-8'>
        <FAQSection />
        <ContactUsForm />
      </div>
    </div>
  );
};

export default ContactUs;
