const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    filename: String,
    
    // set: (v) =>
    //   v === ""
    //     ? "https://images.moviesanywhere.com/143cdb987186a1c8f94d4f18de211216/fdea56fa-2703-47c1-8da8-70fc5382e1ea.jpg "
    //     : v,
  },
//   created_at: {
//     type: Date,
//     required: true,
//   },
});

const Data = mongoose.model("Data", listingSchema);

module.exports = Data;
