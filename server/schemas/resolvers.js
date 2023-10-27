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
        const user = await User.findOne({ _id: context.user._id }).populate(
          "complaints"
        );
        console.log(user.complaints);

        return user.complaints;
      }
      throw AuthenticationError;
    },
    complaints: async () => {
      const complaints = await Complaints.find();
      console.log(complaints);
      console.log(complaints[1].comments);
      return complaints;
    },
    complaint: async (parent, { complaintID }) => {
      const complaint = await Complaints.findOne({ _id: complaintID });
      return complaint;
    },
    userComplaint: async (parent, { complaintID }) => {
      const user = await User.findOne({ complaints: complaintID }).populate(
        "complaints"
      );
      return user;
    },

    complaintsByCategory: async (parent, { category }) => {
      const complaints = await Complaints.find({ category: category });
      return complaints;
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

    addComplaint: async (
      parent,
      { title, description, category, date, image },
      context
    ) => {
      if (context.user) {
        const complaint = await Complaints.create({
          title,
          description,
          category,
          date,
          image,
        });
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { complaints: complaint._id } },
          { runValidators: true, new: true }
        );
        console.log(user);
        return user;
      }
      throw AuthenticationError;
    },

    //How to pass the complaint id from the front end? Will it be stored in the state?
    updateComplaint: async (
      parent,
      { complaintID, title, description, category, date },
      context
    ) => {
      if (context.user) {
        const complaint = await Complaints.findOneAndUpdate(
          { _id: complaintID },
          {
            $set: {
              title,
              description,
              category,
              date,
            },
          },
          { runValidators: true, new: true }
        );
        return complaint;
      }
      throw AuthenticationError;
    },

    deleteComplaint: async (parent, { complaintID }, context) => {
      if (context.user) {
        const complaint = await Complaints.findOneAndRemove({
          _id: complaintID,
        });
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { complaints: complaintID } },
          { runValidators: true, new: true }
        );
        return user;
      }
      throw AuthenticationError;
    },

    addComment: async (
      parent,
      { complaintID, author, description },
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
              },
            },
          },
          { runValidators: true, new: true }
        );
        return complaint;
      }
      throw AuthenticationError;
    },
    //https://mongoosejs.com/docs/api/model.html#Model.find()
    updateComment: async (
      parent,
      { complaintID, commentID, description, author },
      context
    ) => {
      if (context.user) {
        const complaint = await Complaints.findOneAndUpdate(
          { _id: complaintID, "comments._id": commentID },
          {
            $set: {
              "comments.$.author": author,
              "comments.$.description": description,
              // comments: {
              //   author,
              //   description,
              // },
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

    createVote: async (parent, { complaintID }) => {
      const complaints = await Complaints.findOneAndUpdate(
        { _id: complaintID },
        { $inc: { [`votes`]: 1 } },
        { new: true }
      );
      return complaints;
    },

    createVoteUnsupported: async (parent, { complaintID }) => {
      const complaints = await Complaints.findOneAndUpdate(
        { _id: complaintID },
        { $inc: { [`unsupportedVotes`]: 1 } },
        { new: true }
      );
      return complaints;
    },
  },
};

module.exports = resolvers;

// updateComment: async (
//   parent,
//   { complaintID, commentID, description, author },
//   context
// ) => {
//   if (context.user) {
//     const complaint = await Complaints.findOneAndUpdate(
//       { _id: complaintID, "comments._id": commentID },
//       {
//         $set: {
//           comments: {
//             author,
//             description,

//           },
//         },
//       },
//       { runValidators: true, new: true }
//     );
//     return complaint;
//   }
//   throw AuthenticationError;
// },
