const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const path = require("path");
const { authMiddleware } = require("./utils/auth");

// Import User model and necessary dependencies for signup
const { User } = require("./models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use("/images", express.static(path.join(__dirname, "../client/public/images")),

  // Define the signup route
  app.post("/api/signup", async (req, res) => {
    try {
      const { username, email, password } = req.body;

      // Check if a user with the same email already exists
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        res.status(400).json({ message: "User with this email already exists" });
        return;
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the new user
      const newUser = await User.create({ username, email, password: hashedPassword });

      // Sign a token for the new user
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "1h", // You can adjust the expiration time
      });

      res.status(200).json({ token, user: newUser });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Registration failed" });
    }
  });

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist"));

    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/dist/index.html"));
    });
  }

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

startApolloServer();
