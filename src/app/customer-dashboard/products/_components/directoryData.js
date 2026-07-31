export const fallbackCategories = [
  { _id: "restaurants", name: "Restaurants", slug: "restaurants" },
  { _id: "shopping", name: "Shopping", slug: "shopping" },
  { _id: "home-services", name: "Home Services", slug: "home-services" },
  { _id: "beauty-spa", name: "Beauty & Spa", slug: "beauty-spa" },
  { _id: "automotive", name: "Automotive", slug: "automotive" },
  { _id: "more", name: "More", slug: "more" },
];

export const fallbackListings = [
  { _id: "1", businessName: "Yi Fang Taiwan Fruit Tea", banner: "/images/image3.png", rating: 4, numReviews: 229, category: [{ name: "Bubble Tea, Juice Bars & Smoothies" }], update: "Claire C. added 2 photos", updateTime: "1 minute ago" },
  { _id: "2", businessName: "Yi Fang Taiwan Flower Shop", banner: "/images/image6.png", rating: 5, numReviews: 229, category: [{ name: "Roses, Floral, Lilies" }], description: "Very straight forward ordering process and they have a bench to sit on while you wait.", update: "Claire C. wrote a review", updateTime: "1 minute ago" },
  { _id: "3", businessName: "Michie’s Beauty Salon", banner: "/images/image7.png", rating: 4, numReviews: 362, category: [{ name: "Installations, Braiding, Styling" }], update: "Stacey I. added 2 photos", updateTime: "3 minutes ago" },
  { _id: "4", businessName: "Jules automobile", banner: "/images/image8.png", rating: 5, numReviews: 120, category: [{ name: "Pizza, Italian" }], description: "Come for amazing pizzas like the Spicy Ronny, stay for the juicy roast chicken.", update: "Andrew K. wrote a review", updateTime: "4 minutes ago" },
  { _id: "5", businessName: "Surisan", banner: "/images/image6.png", rating: 5, numReviews: 3970, category: [{ name: "Korean, New American, Breakfast & Brunch" }], update: "Claire C. added a photo", updateTime: "4 minutes ago" },
  { _id: "6", businessName: "Morris Plumite", banner: "/images/image4.png", rating: 4, numReviews: 3970, category: [{ name: "Plumbing" }], description: "The bulgogi japchae rice was super savory and delicious.", update: "Claire C. wrote a review", updateTime: "5 minutes ago" },
];

export const fallbackPopular = [
  { ...fallbackListings[2], _id: "7", businessName: "Lush Beauty Salon", banner: "/images/image7.png" },
  { ...fallbackListings[1], _id: "8", businessName: "Yi Fang Beauty Store", banner: "/images/image3.png", category: [{ name: "Shoes, Bags, Glasses" }] },
  { ...fallbackListings[0], _id: "9", businessName: "Chick & Jajang", banner: "/images/image6.png", category: [{ name: "Korean, Noodles, Chicken Shop" }] },
];
