const Destination = require('../models/destination');
const User = require('../models/user');

// Function to get recommendations based on weather and activity preferences
const getRecommendations = async (userId) => {
  // Fetch the user data
  const user = await User.findById(userId).populate('pastTrips').exec();

  const recommendations = [];

  // Step 1: Fetch destinations that match the user's preferences
  const matchingDestinations = await Destination.find({
    weather: user.preferences.weather,
    activities: { $in: user.preferences.activity }
  }).exec();

  // Step 2: Consider past trips and try to recommend similar destinations
  user.pastTrips.forEach(trip => {
    const similarDestinations = matchingDestinations.filter(dest => {
      return dest.location === trip.location || dest.activities.some(activity => trip.activities.includes(activity));
    });
    recommendations.push(...similarDestinations);
  });

  // Step 3: Sort recommendations based on user reviews (Optional)
  const sortedRecommendations = recommendations.sort((a, b) => {
    const userReviewA = user.reviews.find(review => review.destinationId.equals(a._id));
    const userReviewB = user.reviews.find(review => review.destinationId.equals(b._id));

    const ratingA = userReviewA ? userReviewA.rating : 0;
    const ratingB = userReviewB ? userReviewB.rating : 0;

    return ratingB - ratingA;  // Higher rating first
  });

  return sortedRecommendations;
};

module.exports = { getRecommendations };
