import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { createBrowserHistory } from "history";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import MyProducts from "./pages/MyProducts";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import CreateProduct from "./pages/CreateProduct";
import History from "./pages/History";

import "./App.css";
import EditProduct from "./pages/EditProduct";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        users: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        products: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        myproducts: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: cache,
});

const history = createBrowserHistory();
function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <Router history={history}>
          <div className="container">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/createproduct" element={<CreateProduct />} />
              <Route path="/editproduct/:id" element={<EditProduct />} />
              <Route path="/myproducts" element={<MyProducts />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/history" element={<History />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </ApolloProvider>
    </div>
  );
}

export default App;
