import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
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


ReactDOM.createRoot(document.getElementById("root")).render(
  <App />
);

