import { toast } from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { paymentEndpoints } from "../apis"


const {CAPTURE_PAYMENT_API,VERIFY_PAYMENT_API}=paymentEndpoints

function loadScript(src){
    return new Promise((resolve)=>{
        const script=document.createElement("script");
        script.src=src;

        script.onload=()=>{
            resolve(true)
        }

        script.onerror=()=>{
            resolve(false)
        }

        document.body.appendChild(script);
    })
}

const initiateRazorpayPayment=(orderId,amount,currency,userToken)=>{
    console.log('Entered initiate Razorpay payment')
    const options={
        key: process.env.REACT_APP_RAZORPAY_KEY,
        amount: amount,
        currency: currency,
        name: 'SparkShoppers',
        description: 'Test transaction',
        order_id: orderId,
        checkout: {
            method: {
              netbanking: 1,
              card: 1,
              upi: 1,
              wallet: 0,
            }
          },
        handler: async (response)=>{
            console.log('Entered handler of payment to call verify payment')
            console.log('Payment verified successfully')
            toast.success('Payment verified succssfully')
        },
        theme: {
            color: '#F37254'
        }
    }

    const paymentObject=new window.Razorpay(options)
    paymentObject.open()
    paymentObject.on('payment.failed',(response)=>{
        toast.error('oops, payment failed')
        console.log('payment failed response.error:',response.error)
    })

}

export const capturePayment=async (formData,userToken)=>{
    console.log('key:',process.env)
    const res=await loadScript("https://checkout.razorpay.com/v1/checkout.js")
    if(!res){
        toast.error("Razorpay SDK failed to load");
        return;
    }

    const toastId=toast.loading('Loading...')
    try{
        const response=await apiConnector(
            'POST',
            CAPTURE_PAYMENT_API,
            {
                formData, 
                userToken
            },
            {
                authorization: `Bearer ${userToken}`
            }
        )

        console.log('Response from capturePayment api:',response)

        if(response.data.success){
            toast.success('Payment captured successfully')
        }

        const {orderId,amount,currency}=response.data

        initiateRazorpayPayment(orderId,amount,currency,userToken)

        toast.dismiss(toastId)
        return
    }catch(err){
        console.log('Error in capture payment service:',err)
        toast.error('Error occured')
    }finally{
        toast.dismiss(toastId)
    }
}