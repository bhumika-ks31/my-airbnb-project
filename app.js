const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./model/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate"); // import ejs-mate with a variable
const { listingSchema} = require("./schema.js");
const Review = require("./model/review.js");




// This should just be a string, not a connect() call
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";


//middleware
// authMiddleware.js

module.exports.isAuthenticated = (req, res, next) => {
  if (req.user) {
    return next();  // User is logged in, proceed to the next middleware
  } else {
    return res.redirect('/login');  // Redirect to login page if not authenticated
  }
};


//connection
main().then(() => {
  console.log("connected to DB");
}).catch(err => {
  console.log("DB connection error:", err);
});

async function main() {
  await mongoose.connect(MONGO_URL);
}
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname,"/public")));


//route
app.get("/", (req, res) => {
  res.send("hi i am root");
});


// INDEX ROUTE - show all listings
app.get("/listings", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index", { allListings }); // ✅ correct
});



// NEW ROUTE - show form to create new listing
app.get("/listings/new", (req, res) => {
  res.render("listings/new", { listing: {} }); // ✅ pass empty object to prevent EJS error
});


// SHOW ROUTE - show single listing by ID
app.get("/listings/:id", async (req, res) => {
  const { id } = req.params;

  // Check if ID is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid Listing ID");
  }

  const listing = await Listing.findById(id);

  if (!listing) {
    return res.status(404).send("Listing not found");
  }

  res.render("listings/show", { listing });
});

//create route
app.post("/listings", async (req, res) => {
  try {
    // extract image string from form
    const imageUrl = req.body.listing.image;

    // overwrite `listing.image` as object
    req.body.listing.image = {
      url: imageUrl,
      filename: "img_" + Date.now() // or any dummy filename
    };

    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
  } catch (err) {
    console.error("❌ Error creating listing:", err);
    res.status(500).send("Failed to create listing.");
  }
});


//edit route
app.get("/listings/:id/edit",  async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit", { listing });
});

//update route
app.put("/listings/:id", async (req, res)=>{
  let {id} = req.params;
  await Listing.findByIdAndUpdate(id, {...req.body.listing});
  res.redirect(`/listings/${id}`);

});

//delete route// DELETE ROUTE
app.delete("/listings/:id", async (req, res) => {
  const { id } = req.params;
  const deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing); // ✅ This now matches the variable name
  res.redirect("/listings");
});

//reviews
//post route
app.post("/listings/:id/review", async (req, res) => {
  try {
    console.log("Form submitted:", req.body);

    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    console.log("New review saved!");
    res.redirect(`/listings/${listing._id}`);
  } catch (err) {
    console.error("Error submitting review:", err);
    res.status(500).send("Review submission failed.");
  }
});




// LISTENING ON PORT
app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
