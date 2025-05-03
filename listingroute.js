router.get('/listings', async (req, res) => {
    try {
      const userId = req.user ? req.user.id : null;
      console.log('User ID:', userId);  // Log the user ID (check if user is logged in)
  
      const listings = await listingController.getAllListings();
      console.log('Listings:', listings);  // Log the fetched listings
  
      let recommendations = [];
      if (userId) {
        recommendations = await recommendationController.getUserRecommendations(userId);
        console.log('Recommendations:', recommendations);  // Log recommendations
      }
  
      res.render('listings', { listings, recommendations, isLoggedIn: !!userId });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error loading listings');
    }
  });
  