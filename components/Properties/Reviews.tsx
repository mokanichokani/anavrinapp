"use client";

import { Star } from 'lucide-react';

interface Review {
  name: string;
  rating: number;
  comment: string;
  property: string;
  date: string;
}

interface ReviewsProps {
  reviews: Review[];
}

export const Reviews = ({ reviews }: ReviewsProps) => {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-stone-900 serif-font mb-6">Latest Reviews</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {reviews.map((review, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="font-bold text-stone-900">{review.name}</h4>
                <p className="text-stone-600 text-sm">{review.property}</p>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
            <p className="text-stone-700 mb-3">"{review.comment}"</p>
            <p className="text-stone-500 text-sm">{review.date}</p>
          </div>
        ))}
      </div>
    </section>
  );
};