const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventTypeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: false,
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
    eventType: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const EventType = mongoose.model("events", eventTypeSchema);

module.exports = EventType;