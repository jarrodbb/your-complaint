// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import "./App.css";
import Navbar from "./components/navbar/navbar";
import Header from "./components/header/header";
// import HomePage from "./pages/homepage/Homepage";
// import Contact from "./pages/contact/contact";
import Footer from "./components/footer/footer";
import { Outlet } from "react-router-dom";
import Homepage from "./pages/homepage/Homepage";
import ComplaintForm from "./components/complaintForm/complaintForm";

import { setContext } from "@apollo/client/link/context";

import { StoreProvider } from "./utils/GlobalState";
import { useState } from "react";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <ApolloProvider client={client}>
      <StoreProvider>
        <Navbar />
        {/* <Header openModal={openModal} /> Pass openModal function to the Header component */}
        <Outlet />
        <Footer />
        {/* {isModalOpen && <ComplaintForm closeModal={closeModal} />} Render the ComplaintForm component */}
      </StoreProvider>
    </ApolloProvider>
  );
};

export default App;
