// ADD REACTIONS. thumbs up, thumbs down...But maybe somthing different.


//Import User and Complaint models
const { User, Complaints } = require("../models");
//Import for authentication
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  //Query defined to return user. Context used for authentication
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("complaints");
      }
      throw AuthenticationError;
    },
    complaints: async () => {
      return Complaints.find();
    },
  },
  //Mutations defined
  Mutation: {
    //Login defined. Pass email and password. Return user and token
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    //Add user defined. Pass username, email and password
    //token created.
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    updateUser: async (parent, { username, email, password }) => {
      if (context.user) {
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $set: {
              username,
              email,
              password,
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw AuthenticationError;
    },

    addComplaint: async (parent, { description, date, image }, context) => {
      if (context.user) {
        const complaint = await Complaints.create({
          description,
          date,
          image,
        });
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { complaints: complaint._id } },
          { runValidators: true, new: true }
        );
        return user;
      }
      throw AuthenticationError;
    },

    //How to pass the complaint id from the front end? Will it be stored in the state?
    updateComplaint: async (
      parent,
      { complaintId, description, date, image },
      context
    ) => {
      if (context.user) {
        const complaint = await Complaints.findOneAndUpdate(
          { _id: complaintId },
          {
            $set: {
              description,
              date,
              image,
            },
          },
          { runValidators: true, new: true }
        );
        return complaint;
      }
      throw AuthenticationError;
    },
  },

  deleteComplaint: async (parent, { complaintID }, context) => {
    if (context.user) {
      const complaint = await Complaints.findOneAndRemove({ _id: complaintID });
      const user = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { complaints: complaintID } }
      );
      return user;
    }
    throw AuthenticationError;
  },

  addComment: async (
    parent,
    { complaintID, author, description, image, link },
    context
  ) => {
    if (context.user) {
      const complaint = await Complaints.findOneAndUpdate(
        { _id: complaintID },
        {
          $addToSet: {
            comments: {
              author,
              description,
              image,
              link,
            },
          },
        },
        { runValidators: true, new: true }
      );
      return complaint;
    }
    throw AuthenticationError;
  },

  updateComment: async (
    parent,
    { complaintID, commentID, description, image, link },
    context
  ) => {
    if (context.user) {
      const complaint = await Complaints.findOneAndUpdate(
        { _id: complaintID, "comments._id": commentID },
        {
          $set: {
            comments: {
              description,
              image,
              link,
            },
          },
        },
        { runValidators: true, new: true }
      );
      return complaint;
    }
    throw AuthenticationError;
  },

  removeComment: async (parent, { complaintID, commentID }, context) => {
    if (context.user) {
      const complaint = await Complaints.findByIdAndUpdate(
        { _id: complaintID },
        { $pull: { comments: { commentID } } },
        { runValidators: true, new: true }
      );
      return complaint;
    }
    throw AuthenticationError;
  },
};

module.exports = resolvers;
