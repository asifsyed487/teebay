import { useQuery } from "@apollo/client";
import Decoder from "jwt-decode";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, Navigate } from "react-router-dom";
import Header from "../components/Header";
import Proudct from "../components/Proudct";
import { GET_MY_PRODUCTS } from "../queries/productQueries";

import "./MyProducts.css";

const MyProducts = () => {
  const token = localStorage.usertoken_hash;
  const decodedData = Decoder(token);

  // console.log(decodedData);
  const { loading, error, data } = useQuery(GET_MY_PRODUCTS, {
    variables: {
      user_unique_id: decodedData.user_unique_id,
    },
  });
  const state = useSelector((state) => state.UserReducer.LoggedIn);

  if (!state) {
    return <Navigate replace to="/" />;
  }
  if (loading) {
    return "Loading...";
  }
  if (error) {
    return <p>Something went wrong!</p>;
  }

  // console.log(data);
  return (
    <>
      <Header />
      <div className="ui container login">
        <h2 className="ui header">MY PRODUCTS</h2>
        <div className="ui grid">
          <div className="row">
            <div className="ten wide column">
              <div className="ui items">
                {data.myproducts.map((product, index) => {
                  var cate = product.categories;
                  if (cate) {
                    cate = cate.replace("{", "[");
                    cate = cate.replace("}", "]");
                    cate = JSON.parse(cate);
                  }

                  return (
                    <Proudct
                      key={index}
                      product={product}
                      categories={cate}
                      dateAndViewShow="true"
                      fromMyProductPage="true"
                      deleteIconShow="true"
                    />
                  );
                })}
              </div>
              <div
                className="content"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  marginTop: "5rem",
                }}
              >
                <Link to="/createproduct">
                  <button className="ui primary button">
                    <i className="list icon"></i>Add Product
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProducts;
