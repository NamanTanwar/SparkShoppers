import React from 'react'


const AddressDetailsForm=({addressData,setAddressData,inputRefs})=>{

    const handleChange=(e)=>{
        setAddressData({...addressData,[e.target.name]:e.target.value})
    }

    return (
        <form>
            <label htmlFor='firstName'>First Name</label>
            <input 
                type='text'
                name='firstName'
                id='firstName'
                value={addressData.firstName}
                onChange={handleChange}
                ref={inputRefs.firstName}
            />
            <label htmlFor='streetAddress'>Street Address</label>
            <input 
                type='text'
                name='streetName'
                id='streetName'
                value={addressData.streetName}
                onChange={handleChange}
                ref={inputRefs.streetName}
            />
            <label htmlFor='apartmentFloor'>Apartment,floor,etc</label>
            <input 
                type='text'
                name='apartmentFloor'
                id='apartmentFloor'
                value={addressData.apartmentFloor}
                onChange={handleChange}
                ref={inputRefs.apartmentFloor}
            />
            <label htmlFor='city'>Town/City</label>
            <input 
                type='city'
                name='city'
                id='city'
                value={addressData.city}
                onChange={handleChange}
                ref={inputRefs.city}
            />
            <label htmlFor='phoneNumber'>Phone Number</label>
            <input 
                type='text'
                name='phoneNumber'
                id='phoneNumber'
                value={addressData.phoneNumber}
                onChange={handleChange}
                ref={inputRefs.phoneNumber}
            />
            <label htmlFor='email'>Email Address</label>
            <input 
                type='text'
                name='email'
                id='email'
                value={addressData.email}
                onChange={handleChange}
                ref={inputRefs.email}
            />
        </form>
    )
}

export default AddressDetailsForm