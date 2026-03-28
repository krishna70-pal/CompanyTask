import { useState } from 'react';
import './FAQPage.css';

const faqs = [
  {
    question: "What is the delivery time?",
    answer: "Delivery typically takes 3-5 business days for standard shipping and 1-2 days for express shipping."
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day hassle-free return policy. If you aren't completely satisfied with your purchase, you can return it for a full refund or exchange within 30 days of delivery."
  },
  {
    question: "How do I track my order?",
    answer: "You can track your order using the 'Track Order' link in the footer or by logging into your account and visiting the 'My Orders' section."
  },
  {
    question: "Do you offer international shipping?",
    answer: "Currently, we only ship within the domestic regions. We are working hard to expand our delivery network internationally soon."
  },
  {
    question: "Are there any hidden charges?",
    answer: "No, the price you see at checkout is the final price. We do not have any hidden fees. Taxes and shipping costs are calculated clearly before payment."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="page-container align-center">
      <div className="faq-container">
        <h1 className="faq-title">Frequently Asked Questions</h1>
        <p className="faq-subtitle">Find answers to the most common questions about FlipMini.</p>

        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`faq-item ${openIndex === index ? 'active' : ''}`}
            >
              <button 
                className="faq-question" 
                onClick={() => toggleAccordion(index)}
                aria-expanded={openIndex === index}
              >
                {faq.question}
                <span className="faq-icon">{openIndex === index ? '−' : '+'}</span>
              </button>
              <div 
                className="faq-answer-wrapper"
                style={{ height: openIndex === index ? 'auto' : '0px' }}
              >
                <div className="faq-answer">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
