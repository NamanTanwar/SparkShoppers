import React,{useRef,useState} from 'react'
import { useDispatch } from 'react-redux'
import { sendOtp } from '../../../services/operations/authAPI'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const OTPInput=({length=6,})=>{
    
    const navigate=useNavigate()

    const dispatch=useDispatch()

    const inputRefs=useRef(Array(length).fill(null))
    const [otp,setOtp]=useState('')


    const handleInputChange=(e,i)=>{

        console.log(otp)

        const newOtp=otp.slice(0,i)+e.target.value+otp.slice(i+1)
        setOtp(newOtp)

        if(e.target.value.length===1 && i<length-1){
            inputRefs.current[i+1].focus()
        }

        if(e.target.value==='' && i>0){
            inputRefs.current[i-1].focus()
        }

    }

    const handleSubmit=(e)=>{

        e.preventDefault()
        console.log("Entered here")

        if(otp.trim().length!==length){
            toast.error('Invalid Otp')
            return
        }

        console.log("OTP SENT HERE IS:",otp)

        dispatch(sendOtp(otp,navigate))
    }

    
    return (

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 mt-10">
            
            <div className="flex flex-col justify-center items-center">
            <div className="flex flex-row space-x-4">
            {
                Array.from({length},(_,i)=>(
                <input 
                 key={i}
                 ref={(ref)=>(inputRefs.current[i]=ref)}
                 type='text'
                 className="w-20 h-20 border border-gray-300 text-center rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                 maxLength="1"
                 value={otp[i] || ''}
                 onChange={(e)=>handleInputChange(e,i)}
                />
            ))
            }           
            </div>
            <div className="mt-3 flex flex-col space-y-4">
            
            <div className="flex flex-row items-center space-x-2">
                <span>Didn't receive OTP? Click on resend</span>
                <button type="submit" className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300">
                    Resend
                </button>
            </div>
            
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Send OTP
            </button>
            </div>
           
            </div>

            

        </form>
        
    )
}

export default OTPInput