const db = require("./connection");
const { User, Complaints } = require("../models");
const cleanDB = require("./cleanDB");

db.once("open", async () => {
  await cleanDB("Complaints", "complaints");
  await cleanDB("User", "users");

  const complaints = await Complaints.insertMany([
    {
      title: "Brave Karen fights minimum wage workers",
      description: "Ordered 6 nuggies, only got 5!!  Should i sue maccas? Is this a hate crime?",
      category: "Food",
      image: "",
      date: "06/06/23",
      votes: 12,
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
      title: "Co-worker attempted murder by starvation!",
      description: "Mate stole my lunch",
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
        {
      title: "Why are workers so lazy?",
      description: "I want my workers to work 18 hours a day but they refused?",
      image: "",
      category: "Work",
      date: "05/05/23",
      votes: 1,
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
    {
      title: "My 9 year old daughter refuses to pay rent",
      description: "Inflation is high but my daughter hasn't paid rent in 9 years now!! should i call the police?",
      image: "",
      category: "Finance",
      date: "05/05/23",
      votes: 1,
      comments: [
        {
          author: "kalid",
          description: "What a bum!!",
          image: "",
          link: "",
        },
        {
          author: "jblan",
          description: "Kids these days don't know hard work",
          image: "",
          link: "",
        },
        {
          author: "kindBoss",
          description: "Too much smashed avocado",
          image: "",
          link: "",
        },
      ],
    },
    {
      title: "Apple releases Iphone 999 WITHOUT CHARGING PORT",
      description: "CEO says SUCKS FOR YOU GUYS",
      image: "",
      category: "Technology",
      date: "05/05/23",
      votes: 1,
      comments: [
        {
          author: "kalid",
          description: "What a bum!!",
          image: "",
          link: "",
        },
      ],
    },
        {
      title: "Is my doctor fat shaming my cat?",
      description: "My vegan cat hasn't been moving for about a month now and i think my Dr is really rude using words like is she dead or is the cat alseep",
      image: "",
      category: "Health",
      date: "05/05/23",
      votes: 1,
      comments: [
        {
          author: "kalid",
          description: "What a bum!!",
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

    await User.create({
    username: "karen007",
    email: "karen007@gmail.com",

    password: "abcd1234",
    isModerator: false,
    complaints: [complaints[3]._id],
  });

    await User.create({
    username: "kindBoss",
    email: "kindboss@gmail.com",
    password: "abcd1234",
    isModerator: false,
    complaints: [complaints[2]._id],
  });





  console.log("users seeded");
  process.exit();
});
