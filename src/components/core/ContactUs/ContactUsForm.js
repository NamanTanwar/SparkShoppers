import React, { useState } from 'react';
import { submitContactForm } from '../../../services/operations/userAPI';

const ContactUsForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        address: '',
        message: ''
    });
    const [errors, setErrors] = useState({});
    const [loading,setLoading]=useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Basic validation
        const newErrors = {};
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        }
        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        }
        setErrors(newErrors);
        // If there are no errors, submit the form
        if (Object.keys(newErrors).length === 0) {
            // Handle form submission here
            submitContactForm(formData,setLoading)
            // Reset form data
            setFormData({
                name: '',
                email: '',
                phoneNumber: '',
                address: '',
                message: ''
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
            <div className="mb-6">
                <label htmlFor="name" className="block mb-2 text-sm font-bold text-gray-700">Name<span className="text-red-500">*</span></label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${errors.name ? 'border-red-500' : 'border-gray-300'}`} />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <div className="mb-6">
                <label htmlFor="email" className="block mb-2 text-sm font-bold text-gray-700">Email Address<span className="text-red-500">*</span></label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${errors.email ? 'border-red-500' : 'border-gray-300'}`} />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            <div className="mb-6">
                <label htmlFor="phoneNumber" className="block mb-2 text-sm font-bold text-gray-700">Phone Number</label>
                <input type="text" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none border-gray-300" />
            </div>
            <div className="mb-6">
                <label htmlFor="address" className="block mb-2 text-sm font-bold text-gray-700">Address</label>
                <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none border-gray-300" />
            </div>
            <div className="mb-6">
                <label htmlFor="message" className="block mb-2 text-sm font-bold text-gray-700">Message<span className="text-red-500">*</span></label>
                <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows="4" className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${errors.message ? 'border-red-500' : 'border-gray-300'}`}></textarea>
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
            </div>
            <div className="text-center">
                <button type="submit" className="px-6 py-3 bg-blue-500 text-white font-bold rounded-lg focus:outline-none hover:bg-blue-600">Submit</button>
            </div>
        </form>
    );
};

export default ContactUsForm;
