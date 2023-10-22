const db = require("./connection");
const { User, Complaints } = require("../models");
const cleanDB = require("./cleanDB");

db.once("open", async () => {
  await cleanDB("Complaints", "complaints");
  await cleanDB("User", "users");

  const complaints = await Complaints.insertMany([
    {
      description: "ordered 6 nuggies, only got 5",
      image: "",
      date: "",
      comments: [
        {
          author: "Btrang",
          description: "This is un-australian",
          image: "",
          link: "",
        },
        {
          author: "JBlan",
          description: "Boycot Maccas",
          image: "",
          link: "",
        },
      ],
    },
    {
      description: "Co-worker stole my lunch",
      image: "",
      date: "",
      comments: [
        {
          author: "KalidN",
          description: "They should be fired",
          image: "",
          link: "",
        },
        {
          author: "JBlan",
          description: "Quit",
          image: "",
          link: "",
        },
      ],
    },
  ]);
  console.log("users complaints");

  await User.create({
    username: "JayBlan",
    email: "jay@gmail.com",

    password: "abcd1234",
    isModerator: false,
    complaints: [complaints[0]._id],
  });

  await User.create({
    username: "KalidN",
    email: "kalid@gmail.com",

    password: "abcd1234",
    isModerator: false,
    complaints: [complaints[1]._id],
  });
  console.log("users seeded");
  process.exit();
});
