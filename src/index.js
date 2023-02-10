import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
// import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import client from "./apolloClient";
import { ApolloProvider } from "@apollo/client";
import { AuthProvider } from "./context/authContext";

// const client = new ApolloClient({
//   uri: "http://localhost:4000/grapql",
//   cache: new InMemoryCache()
// });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </AuthProvider>
);
