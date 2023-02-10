import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import {setContext} from "@apollo/client/link/context";

const uri = `${process.env.REACT_APP_SECRET_KEY}`

const httpLink = createHttpLink({
   uri,
});

const authLink = setContext((_, {headers}) => {
   return {
      headers: {
         ...headers,
         authorization: localStorage.getItem("token") || "",
      },
   };
});

const client = new ApolloClient({
   link: authLink.concat(httpLink),
   cache: new InMemoryCache(),
});

export default client;