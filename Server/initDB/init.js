const express = require("express");
const app = express();
const mongoose = require("mongoose");
const initData = require("../initDB/data")
const Listing = require("../models/listingSchema")


const dbURL = "mongodb://127.0.0.1:27017/MovieApp";

main()
  .then(() => {
    console.log("Connected with DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(dbURL);
}

const initDB = async () =>{
    await Listing.deleteMany({})
    await Listing.insertMany(initData);
    console.log("data was initalized")
};

initDB();