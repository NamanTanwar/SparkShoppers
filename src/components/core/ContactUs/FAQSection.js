import React from 'react'

const faqSectionData=[
    {
        question: 'How do I place an order?',
        answer: 'To place an order simply browse through our products,sekect the items you want, add to cart and proceed to checkout. Follow the prompts to enter your shipping and payment information, and confirm your order'
    },
    {
        question: 'What are the shipping options?',
        answer: 'Right now we just offer standerd shipping options. Standerd shipping usually takes around 3-5 buisness days, while express shipping delivers within 1-2 buisness days. Please note that shipping times may vary depending on your order.'
    },
    {
        question: 'Can I return my order?',
        answer: 'Yes, we accept returns within 30 days of purchase. Please ensure that the item is unused and in its original packaging. Contact our customer support team for further assistance.'
    },
    {
        question: 'How can I track my order?',
        answer: 'Once your order is shipped, you will receive a tracking number via email. You can use this tracking number to track the progress of your delivery on our website'
    },
    {
        question: 'What payment methods do you accept?',
        answer: 'We accept major credit cards and UPI. You can choose your preferred payment method during the checkout process'
    }
]

const FAQSection=()=>{
    return (
        <div className='flex flex-col space-y-6'>
            {
                faqSectionData.map((data,idx)=>(
                    <div>
                        <h2>{data.question}</h2>
                        <p>{data.answer}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default FAQSection