import React from 'react';

const SubmittedReviews = () => {
  const reviews = [
    {
      stars: 4,
      handle: "@bie'skitchen",
      date: "April 26, 2026",
      comment: "Great Food. Loved the taste and presentation. Will patronize again.",
    },
    {
      stars: 3,
      handle: "@glowworldfurnitures",
      date: "March 26, 2026",
      comment: "Great Product. Loved the quality and fast shipping. Will buy again",
    },
    {
      stars: 2,
      handle: "@firstchoicecleaningservices",
      date: "January 20, 2026",
      comment: "The cleaning was good but please, try and do better next time",
    },
    {
      stars: 5,
      handle: "@topnotchconsultingservices",
      date: "January 05, 2026",
      comment: "The recruitment was good, will contact you again.",
    },
    {
      stars: 4,
      handle: "@bie'skitchen",
      date: "April 26, 2026",
      comment: "Great Food. Loved the taste and presentation. Will patronize again.",
    },
    {
      stars: 3,
      handle: "@glowworldfurnitures",
      date: "March 26, 2026",
      comment: "Great Product. Loved the quality and fast shipping. Will buy again",
    }
  ];

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Submitted Reviews</h2>
      
      <div className="space-y-4 overflow-y-auto pr-2">
        {reviews.map((review, index) => (
          <div 
            key={index} 
            className="bg-white border border-gray-100 rounded-sm p-4 shadow-sm"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                {/* Custom Star Images */}
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <img
                      key={i}
                      src={i < review.stars ? "/images/yellow_star.png" : "/images/transparent_star.png"}
                      alt="star"
                      className="w-3 h-3 object-contain"
                    />
                  ))}
                </div>
                <span className="text-[11px] font-bold text-[#64748B]">
                  {review.handle}
                </span>
              </div>
              <span className="text-[10px] text-gray-400 font-medium">
                {review.date}
              </span>
            </div>
            
            <p className="text-xs text-gray-700 leading-relaxed">
              {review.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubmittedReviews;