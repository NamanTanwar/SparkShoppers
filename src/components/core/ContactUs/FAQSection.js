import React from 'react';

const faqSectionData = [
  {
    question: 'How do I place an order?',
    answer: 'To place an order, simply browse through our products, select the items you want, add them to your cart, and proceed to checkout. Follow the prompts to enter your shipping and payment information, and confirm your order.'
  },
  {
    question: 'What are the shipping options?',
    answer: 'Right now, we offer standard shipping options. Standard shipping usually takes around 3-5 business days, while express shipping delivers within 1-2 business days. Please note that shipping times may vary depending on your location.'
  },
  {
    question: 'Can I return my order?',
    answer: 'Yes, we accept returns within 30 days of purchase. Please ensure that the item is unused and in its original packaging. Contact our customer support team for further assistance.'
  },
  {
    question: 'How can I track my order?',
    answer: 'Once your order is shipped, you will receive a tracking number via email. You can use this tracking number to track the progress of your delivery on our website.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept major credit cards and UPI. You can choose your preferred payment method during the checkout process.'
  }
];

const FAQSection = () => {
  return (
    <div className='flex flex-col space-y-6'>
      <h2 className='text-2xl font-bold mb-4'>Frequently Asked Questions</h2>
      {faqSectionData.map((data, idx) => (
        <div key={idx}>
          <h3 className='text-xl font-semibold'>{data.question}</h3>
          <p className='text-gray-700 mt-2'>{data.answer}</p>
        </div>
      ))}
    </div>
  );
};

export default FAQSection;
