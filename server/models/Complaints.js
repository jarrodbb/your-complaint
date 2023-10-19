const { Schema, model } = require("mongoose");

const commentsSchema = require("./Comments");

const complaintSchema = new Schema(
  {
    Description: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
    },
    date: {
      type: String,
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

userSchema.virtual("commentsCount").get(function () {
  return this.comments.length;
});

const Complaints = model("Complaints", complaintSchema);

module.exports = Complaints;
