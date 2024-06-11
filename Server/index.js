const express = require("express");
const app = express();
const mongoose = require("mongoose");
// const initData = require("../initDB/data")
const bodyParser = require("body-parser");
const cors = require("cors");
const Listing = require("./models/listingSchema");
require('dotenv').config(); 

// const dbURL = "mongodb://127.0.0.1:27017/MovieApp";
const atlasUrl = process.env.ATLASDB_URL;

app.use(cors());
app.use(bodyParser.json());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

main()
  .then(() => {
    console.log("Connected with DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(atlasUrl);
}

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/listings", async (req, res) => {
  try {
    const listings = await Listing.find();
    res.status(200).json(listings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// create route
app.post("/listings/new", async (req, res) => {
  try {
    // Create a new listing object from the request body
    const newListing = new Listing({
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
    });

    // Save the new listing to the database
    await newListing.save();

    res.status(201).json({ message: "Listing created successfully" });
  } catch (error) {
    console.error("Error creating listing:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the listing" });
  }
});



// Get a single listing by ID for editing
app.get('/listings/edit/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }
    res.status(200).json(listing);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});




// Update listing by ID
app.put('/listings/edit/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, image } = req.body;

  // Validate the listing ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid listing ID' });
  }

  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      id,
      { title, description,image },
      { new: true, runValidators: true }
    );

    if (!updatedListing) {
      return res.status(404).json({ error: 'Listing not found' });
    }

    res.status(200).json(updatedListing);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});










//Delete Route
app.delete("/listings/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the listing ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid listing ID" });
    }

    const deletedListing = await Listing.findByIdAndDelete(id);

    if (!deletedListing) {
      return res.status(404).json({ error: "Listing not found" });
    }

    res.status(200).json({ message: "Listing deleted successfully" });
  } catch (err) {
    console.error("Error deleting listing:", err);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the listing" });
  }
});

app.listen(8080, () => {
  console.log("server is running in port");
});
