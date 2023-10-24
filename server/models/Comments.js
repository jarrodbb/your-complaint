const { Schema } = require("mongoose");

const commentsSchema = new Schema({
  author: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
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

  image: {
    type: String,
  },
  link: {
    type: String,
  },
});

module.exports = commentsSchema;
