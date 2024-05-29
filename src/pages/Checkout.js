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
        <div className="p-4 md:p-8 lg:p-12">
            <h1  className="text-3xl font-bold mb-8 text-center">Checkout</h1>
            <div className="flex flex-col lg:flex-row lg:space-x-8">
                <div className="flex-1 mb-8 lg:mb-0">
                    <h2 className="text-2xl font-semibold mb-6">Billing Details</h2>
                    <AddressDetailsForm addressData={addressData} setAddressData={setAddressData} inputRefs={inputRefs}/>
                </div>
                <div className="flex-1">
                    <CartView />
                    <button type='submit' onClick={handleCapturePayment} className="mt-8 w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:-translate-y-1">Place Order</button>
                </div>
            </div>
        </div>
    )
}

export default Checkout