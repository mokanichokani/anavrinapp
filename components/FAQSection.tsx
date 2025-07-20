"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { TextAnimate } from "@/components/magicui/text-animate";

const faqs = [
  {
    id: 1,
    question: "How do I book a trip with your travel service?",
    answer: "You can book a trip through our website, by calling our customer service hotline, or by visiting one of our offices. Simply choose your destination, travel dates, and preferred services."
  },
  {
    id: 2,
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express), debit cards, bank transfers, UPI payments, and cash payments at our offices. We also offer installment payment options for longer trips."
  },
  {
    id: 3,
    question: "How do I know if my booking is confirmed?",
    answer: "Once your booking is confirmed, you will receive a confirmation email with your booking details and reference number. You can also check your booking status on our website or mobile app using your reference number."
  },
  {
    id: 4,
    question: "Do you offer group travel packages?",
    answer: "Yes, we offer special group travel packages for 10 or more people. Group bookings come with discounted rates, dedicated tour guides, and customized itineraries. Contact our group travel specialists for more details."
  },
  {
    id: 5,
    question: "Do you offer travel insurance?",
    answer: "Yes, we offer comprehensive travel insurance that covers trip cancellation, medical emergencies, lost luggage, and other unforeseen circumstances. We recommend all travelers to opt for travel insurance for a worry-free journey."
  }
];

const FAQItem = ({ faq, isOpen, onToggle }: { 
  faq: typeof faqs[0], 
  isOpen: boolean, 
  onToggle: () => void 
}) => {
  return (
    <div className="faq-item border border-gray-200 rounded-2xl mb-4 overflow-hidden transition-all duration-300 hover:shadow-md">
      <button
        className="w-full px-6 py-5 text-left flex justify-between items-center bg-white hover:bg-gray-50 transition-colors duration-200"
        onClick={onToggle}
      >
        <span className="text-lg font-medium text-gray-800 pr-4">
          {faq.question}
        </span>
        <div className={cn(
          "w-6 h-6 flex items-center justify-center transition-transform duration-300",
          isOpen ? "rotate-180" : "rotate-0"
        )}>
          <svg 
            className="w-4 h-4 text-gray-600" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>
      <div className={cn(
        "overflow-hidden transition-all duration-300 ease-in-out",
        isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
      )}>
        <div className="px-6 pb-5 pt-2 bg-gray-50">
          <p className="text-gray-600 leading-relaxed">
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  );
};

export function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([1]); // First item open by default

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="relative z-10 bg-gray-50 py-16">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Side - Header Content */}
          <div className="faq-header">
            <div className="mb-6">
              <span className="text-blue-500 text-sm font-medium tracking-wider uppercase">
                //FAQs
              </span>
            </div>
            <TextAnimate animation="blurInUp" by="character" className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Frequently Asked Questions
            </TextAnimate>
            <p className="text-gray-600 text-lg leading-relaxed">
              We believe in the power of collective action to address the urgent environmental challenges facing our planet.
            </p>
          </div>

          {/* Right Side - FAQ Items */}
          <div className="faq-content">
            {faqs.map((faq) => (
              <FAQItem
                key={faq.id}
                faq={faq}
                isOpen={openItems.includes(faq.id)}
                onToggle={() => toggleItem(faq.id)}
              />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
