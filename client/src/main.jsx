import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import WrongPage from "./pages/404/404.jsx";
import Homepage from "./pages/homepage/Homepage.jsx";
import Profile from "./pages/profile/profile.jsx";
import Contact from "./pages/contact/contact.jsx";
import Terms from "./pages/terms/terms.jsx";
import Donate from "./components/Donate/donate.jsx";
import SignUp from "./pages/signup/signup.jsx";
import SignIn from "./pages/signin/login.jsx";
import SingleComplaint from "./pages/SingleComplaint/SingleComplaint.jsx";

// Import specific components from 'react-router-dom' library
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Import React component from 'CreateComplaint'
// import CreateComplaint from './components/CreateComplaint';

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <Router>
//     <switch>
//       <Route exact path="/" component={App} />
//       <Route path="/create-complaint" component={CreateComplaint} />
//     </switch>
//   </Router>,
//   document.getElementById('root')
// );

//Define some routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <WrongPage />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/terms",
        element: <Terms />,
      },
      {
        path: "/Donate",
        element: <Donate />,
      },
      {
        path: "/SignUp",
        element: <SignUp />,
      },
      {
        path: "/SignIn",
        element: <SignIn />,
      },
      {
        path: "/Complaint/:complaintID",
        element: <SingleComplaint />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <App />
// );
