const { getRecommendations } = require('../utils/recommendationEngine');

exports.getUserRecommendations = async (req, res) => {
  try {
    const userId = req.user.id;  // Assuming user is authenticated
    const recommendations = await getRecommendations(userId);

    res.render('recommendations', { recommendations });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching recommendations');
  }
};
