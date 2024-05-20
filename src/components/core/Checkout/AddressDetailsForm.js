import React from 'react'


const AddressDetailsForm=()=>{
    return (
        <form>
            <label htmlFor='firstName'>First Name</label>
            <input 
                type='text'
                name='firstName'
                id='firstName'
            />
            <label htmlFor='streetAddress'>Street Address</label>
            <input 
                type='text'
                name='streetName'
                id='streetName'
            />
            <label htmlFor='apartmentFloor'>Apartment,floor,etc</label>
            <input 
                type='text'
                name='apartmentFloor'
                id='apartmentFloor'
            />
            <label htmlFor='city'>Town/City</label>
            <input 
                type='city'
                name='city'
                id='city'
            />
            <label htmlFor='phoneNumber'>Phone Number</label>
            <input 
                type='text'
                name='phoneNumber'
                id='phoneNumber'
            />
            <label htmlFor='email'>Email Address</label>
            <input 
                type='text'
                name='email'
                id='email'
            />
        </form>
    )
}

export default AddressDetailsForm