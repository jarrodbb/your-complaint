//Import User and Complaint models
const { User, Complaints } = require("../models");
//Import for authentication
const { signToken, AuthenticationError } = require("../utils/auth");
//require bcrypt for new passwords
const bcrypt = require("bcrypt");

const resolvers = {
  
  Query: {
    //Query defined to return user. Context used for authentication
    me: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findOne({ _id: context.user._id }).populate(
          "complaints"
        );
        return user;
      }
      throw AuthenticationError;
    },
    //Query defined to return all complaints
    complaints: async () => {
      const complaints = await Complaints.find();
      console.log(complaints);
      console.log(complaints[1].comments);
      return complaints;
    },
    // Query defined to return a single complaint by ID
    complaint: async (parent, { complaintID }) => {
      const complaint = await Complaints.findOne({ _id: complaintID });
      return complaint;
    },
    //Query define to return a user where a complaint ID matches
    userComplaint: async (parent, { complaintID }) => {
      const user = await User.findOne({ complaints: complaintID }).populate(
        "complaints"
      );
      return user;
    },
//Query defined to return complaints by category
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
//delete user defined. Pass userID and username.
//find and remove user 
// find complaints with username and remove
    deleteUser: async (parent, { userID, username }, context) => {
      if (context.user) {
        const user = await User.findByIdAndRemove({ _id: userID });
        const complaints = await Complaints.deleteMany(
          { username: username },
          { new: true }
        );
        const message = "user deleted";
        return message;
      }
    },
//Update user by context ID. Pass username, email and password
//Hash password if included
// return Token and user
    updateUser: async (parent, { username, email, password }, context) => {
      if (context.user) {
        if (password) {
          const saltRounds = 10;
          const hasedPassword = await bcrypt.hash(password, saltRounds);
          const user = await User.findOneAndUpdate(
            { _id: context.user._id },
            {
              $set: {
                username,
                email,
                password: hasedPassword,
              },
            },
            {
              new: true,
              runValidators: true,
            }
          );
          const token = signToken(user);
          return { token, user };
        }
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $set: {
              username,
              email,
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
        const token = signToken(user);
        return { token, user };
      }

      throw AuthenticationError;
    },
//Add a complaint. Check contex
//Create complaint. Add complaint to user using context
    addComplaint: async (
      parent,
      { title, description, category, username, date, image },
      context
    ) => {
      if (context.user) {
        const complaint = await Complaints.create({
          title,
          description,
          category,
          username,
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

    //Update complaint with context. find complaint by ID and update. Context used to check Auth
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
//Delete complaint. Remove complaint by ID
// find user using context and remove complaint ID
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
//Add a comment. check context
// find complaint by ID and update
//Add comment using add to set
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
   //Update comment. check user context
   // find complaint ID and comment ID
   // set comment 
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
             
            },
          },
          { runValidators: true, new: true }
        );
        return complaint;
      }
      throw AuthenticationError;
    },
// remove comment. check context
//find complaint by ID and pull comment by ID
    removeComment: async (parent, { complaintID, commentID }, context) => {
      if (context.user) {
        const complaint = await Complaints.findOneAndUpdate(
          { _id: complaintID },
          { $pull: { comments: { _id: commentID } } },
          { runValidators: true, new: true }
        );
        return complaint;
      }
      throw AuthenticationError;
    },
// Create vote. Find complaint by ID and update. increase vote by 1
    createVote: async (parent, { complaintID }) => {
      const complaints = await Complaints.findOneAndUpdate(
        { _id: complaintID },
        { $inc: { [`votes`]: 1 } },
        { new: true }
      );
      return complaints;
    },
// Create unsupported vote. Find complaint by ID and update. increase vote by 1
    createVoteUnsupported: async (parent, { complaintID }) => {
      const complaints = await Complaints.findOneAndUpdate(
        { _id: complaintID },
        { $inc: { [`unsupportedVotes`]: 1 } },
        { new: true }
      );
      return complaints;
    },
// admin delete. check context
//Find and remove complaint by ID
// Find user by user name and pull complaint by ID
    adminDelete: async (parent, { complaintID, username }, context) => {
      if (context.user) {
        const userComplaint = await Complaints.findByIdAndRemove({
          _id: complaintID,
        });
        const user = await User.findOneAndUpdate(
          { username: username },
          { $pull: { complaints: complaintID } },
          { runValidators: true, new: true }
        );
        const complaints = await Complaints.find();
        return complaints;
      }
    },
  },
};

module.exports = resolvers;


