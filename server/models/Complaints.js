const { Schema, model } = require("mongoose");

const commentsSchema = require("./Comments");
// define complaints schema
const complaintSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
    },
    username: {
      type: String,
    },

    image: {
      type: String,
    },
    date: {
      type: String,
    },
    votes: {
      type: Number,
      default: 0,
    },
    unsupportedVotes: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => {
        if (date) {
          const options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          };
          return date.toLocaleDateString(undefined, options);
        }
      },
    },

    comments: [commentsSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

complaintSchema.virtual("commentsCount").get(function () {
  return this.comments.length;
});

const Complaints = model("Complaints", complaintSchema);

module.exports = Complaints;
