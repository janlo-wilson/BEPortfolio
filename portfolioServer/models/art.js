const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const artSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    fragment: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    eventType:{
      type:String,
      default:"Arts",
    },
  },
  {
    timestamps: true,
  }
);

const Art = mongoose.model("Art", artSchema);

module.exports = Art;
