import React from 'react'


const AddressDetailsForm=({addressData,setAddressData,inputRefs})=>{

    const handleChange=(e)=>{
        setAddressData({...addressData,[e.target.name]:e.target.value})
    }

    return (
        <form className="space-y-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={addressData.firstName}
            onChange={handleChange}
            ref={inputRefs.firstName}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="streetName" className="block text-sm font-medium text-gray-700">Street Address</label>
          <input
            type="text"
            name="streetName"
            id="streetName"
            value={addressData.streetName}
            onChange={handleChange}
            ref={inputRefs.streetName}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="apartmentFloor" className="block text-sm font-medium text-gray-700">Apartment, floor, etc.</label>
          <input
            type="text"
            name="apartmentFloor"
            id="apartmentFloor"
            value={addressData.apartmentFloor}
            onChange={handleChange}
            ref={inputRefs.apartmentFloor}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">Town/City</label>
          <input
            type="text"
            name="city"
            id="city"
            value={addressData.city}
            onChange={handleChange}
            ref={inputRefs.city}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            value={addressData.phoneNumber}
            onChange={handleChange}
            ref={inputRefs.phoneNumber}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
          <input
            type="text"
            name="email"
            id="email"
            value={addressData.email}
            onChange={handleChange}
            ref={inputRefs.email}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </form>
    )
}

export default AddressDetailsForm