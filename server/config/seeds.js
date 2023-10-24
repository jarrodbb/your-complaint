const db = require("./connection");
const { User, Complaints } = require("../models");
const cleanDB = require("./cleanDB");

db.once("open", async () => {
  await cleanDB("Complaints", "complaints");
  await cleanDB("User", "users");

  const complaints = await Complaints.insertMany([
    {
      description: "ordered 6 nuggies, only got 5",
      category: "Food",
      image: "",
      date: "06/06/23",
      votes: 2,
      comments: [
        {
          author: "kalid",
          description: "This is un-australian",
          image: "",
          link: "",
        },
        {
          author: "jblan",
          description: "Boycot Maccas",
          image: "",
          link: "",
        },
      ],
    },
    {
      description: "Co-worker stole my lunch",
      image: "",
      category: "Work",
      date: "05/05/23",
      votes: 10,
      comments: [
        {
          author: "kalid",
          description: "They should be fired",
          image: "",
          link: "",
        },
        {
          author: "jblan",
          description: "Quit",
          image: "",
          link: "",
        },
      ],
    },
  ]);
  console.log("users complaints");

  await User.create({
    username: "jblan",
    email: "jay@gmail.com",

    password: "abcd1234",
    isModerator: false,
    complaints: [complaints[0]._id],
  });

  await User.create({
    username: "kalid",
    email: "kalid@gmail.com",

    password: "abcd1234",
    isModerator: false,
    complaints: [complaints[1]._id],
  });

  console.log("users seeded");
  process.exit();
});
