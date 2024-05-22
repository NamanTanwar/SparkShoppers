import React,{useState,useRef} from 'react'
import AddressDetailsForm from '../components/core/Checkout/AddressDetailsForm'
import CartView from '../components/core/Checkout/CartView'
import { useSelector } from 'react-redux'
import { capturePayment } from '../services/operations/paymentAPI'

const Checkout=()=>{

    const {cartItems,totalPrice}=useSelector((state)=>state.cart)
    const {accessToken}=useSelector((state)=>state.auth)

    const [addressData,setAddressData]=useState({
        firstName: '',
        streetName: '',
        apartmentFloor: '',
        city: '',
        phoneNumber: '',
        email: '',
    })

    const inputRefs = {
        firstName: useRef(null),
        streetName: useRef(null),
        apartmentFloor: useRef(null),
        city: useRef(null),
        phoneNumber: useRef(null),
        email: useRef(null),
      }

    const validateForm=()=>{
        let hasErrors=false
        let newErrors={}
        if(addressData.firstName.trim()===''){
            hasErrors=true
            newErrors.firstName='First name is required'
        }
        if(addressData.streetName.trim()===''){
            hasErrors=true
            newErrors.streetName='Street Name is required'
        }
        if(addressData.apartmentFloor.trim()===''){
            console.log('Entered in apartmentfloor empty')
            hasErrors=true
            newErrors.apartmentFloor='apartment floor is required'
        }
        if(addressData.city.trim()===''){
            hasErrors=true
            newErrors.city='City is required'
        }
        if(addressData.phoneNumber.trim()===''){
            hasErrors=true
            newErrors.phoneNumber='Phone Number is required'
        }
        if(addressData.email.trim()===''){
            hasErrors=true
            newErrors.email='Email address is required'
        }
        return {hasErrors,newErrors}
    }

    const handleCapturePayment=(e)=>{

        e.preventDefault()

        const {hasErrors,newErrors}=validateForm()

        if (hasErrors) {

            let firstErrorField = Object.keys(newErrors).find((field) => newErrors[field]);
      
            if (firstErrorField) {
              const inputElement =
                firstErrorField === 'firstName'
                  ? inputRefs.firstName.current
                  : firstErrorField === 'streetName'
                  ? inputRefs.streetName.current
                  : firstErrorField === 'apartmentFloor'
                  ? inputRefs.apartmentFloor.current
                  : firstErrorField === 'city'
                  ? inputRefs.city.current
                  : firstErrorField === 'phoneNumber'
                  ? inputRefs.phoneNumber.current
                  : inputRefs.email.current;
      
              inputElement.focus();
            }
            return
          }

        //console.log('addressData:',addressData)  
        capturePayment(addressData,accessToken.token) 
    }
    
    
    
    return (
        <div>
            <h1>Checkout</h1>
            <div className='flex flex-row'>
                <div className='flex flex-col'>
                    <h2>Billing Details</h2>
                    <AddressDetailsForm addressData={addressData} setAddressData={setAddressData} inputRefs={inputRefs}/>
                </div>
                <div className='flex flex-col'>
                    <CartView />
                    <button type='submit' onClick={handleCapturePayment}>Place Order</button>
                </div>
            </div>
        </div>
    )
}

export default Checkout