const {instance}=require('../config/payment')
const httpStatus=require('http-status')
const {mailSender}=require('../utils/mailSender')

const createOrder=async (totalAmount)=>{
    try{

        const currency='INR'

        const options={
            amount: totalAmount*100,
            currency,
            receipt: Math.random(Date.now()).toString()
        }

        const paymentResponse=await instance.orders.create(options)

        if(!paymentResponse){
            throw new Error('Error while creating order')
        }

        return paymentResponse


    }catch(err){
        console.log("Error in payment layer",err)
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success:false,
            error:err.message,
            message:"Internal Server Error"
        })
    }
}

const sendPaymentSuccessEmail=async (firstName,lastName,email,totalAmount,productsDetails)=>{

    console.log('productDetails in send Payment Success Email:',productsDetails)


    const title='Your Order Confirmation'

    let productsTableRows = productsDetails.map(product => `
    <tr>
      <td style="border: 1px solid #ddd; padding: 8px;">${product.product.name}</td>
      <td style="border: 1px solid #ddd; padding: 8px;">${product.quantity}</td>
      <td style="border: 1px solid #ddd; padding: 8px;">${product.cost}</td>
    </tr>
   `).join('');

        let paymentSuccessEmailTemplate=`
            <html>
                <body style="font-family: Arial, sans-serif; margin: 0; padding: 0;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd;">
                <div style="text-align: center; margin-bottom: 20px;">
                  <img src="https://ibb.co/m45SPm7" alt="Spark Shoppers Logo" style="max-width: 100px;">
                </div> 
                 <h1 style="color: #333; text-align: center;">Order Confirmation</h1>
                  <p>Hi ${firstName} ${lastName},</p>
                  <p>Thank you for your order! Here are the details:</p>
                  <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                      <tr style="background-color: #f2f2f2;">
                       <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Product</th>
                       <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Quantity</th>
                       <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Cost</th>
                     </tr>
                    </thead>
                    <tbody>
                        ${productsTableRows}
                    </tbody>
                  </table>
                  <p style="margin-top: 20px;">Total Amount: <strong>${totalAmount}</strong></p>
                  <p>We will send you another email once your order has been shipped.</p>
                  <p>Best regards,<br>Spark Shoppers Team</p>
                </body>
            </html>
        `
        
        try{
            const info=await mailSender(email,title,paymentSuccessEmailTemplate)
            console.log('Email sent:',info)
            return info
        }catch(err){
            console.log('Error in sending email:',err)
            throw new Error(err.message)
        }
}

module.exports={
    createOrder,
    sendPaymentSuccessEmail
}