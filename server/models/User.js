const { Schema, model } = require('mongoose');
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      //Validation for email
      validate: {
        validator: function (v) {
          // eslint-disable-next-line no-useless-escape
          return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email`,
      },
      required: [true, "User email required"],

      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    isModerator: {
      type: Boolean,
    },
    complaints: [
      {
        type: Schema.Types.ObjectId,
        ref: "Complaints",
        required: true,
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual("complaintCount").get(function () {
  return `${this.complaints.length}`;
});

// set up pre-save middleware to create password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;
