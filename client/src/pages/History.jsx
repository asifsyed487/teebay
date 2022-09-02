import Decoder from "jwt-decode";

import { useState } from "react";
import Proudct from "../components/Proudct";
import { useQuery } from "@apollo/client";
import {
  GET_USER_AS_BORROWER,
  GET_USER_AS_BUYER,
  GET_USER_AS_LENTER,
  GET_USER_AS_SELLER,
} from "../queries/userQueries";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const History = () => {
  const token = localStorage.usertoken_hash;
  const decodedData = Decoder(token);
  const [boughtActive, setBoughtActive] = useState(true);
  const [soldActive, setSoldActive] = useState(false);
  const [borrowedActive, setBorrowedActive] = useState(false);
  const [lentActive, setLentActive] = useState(false);
  const { loading, error, data } = useQuery(GET_USER_AS_BUYER, {
    variables: {
      user_unique_id: decodedData.user_unique_id,
    },
  });
  const {
    loading: sold_loading,
    error: sold_error,
    data: sold_data,
  } = useQuery(GET_USER_AS_SELLER, {
    variables: {
      user_unique_id: decodedData.user_unique_id,
    },
  });

  const {
    loading: borrowed_loading,
    error: borrowed_error,
    data: borrowed_data,
  } = useQuery(GET_USER_AS_BORROWER, {
    variables: {
      user_unique_id: decodedData.user_unique_id,
    },
  });

  const {
    loading: lent_loading,
    error: lent_error,
    data: lent_data,
  } = useQuery(GET_USER_AS_LENTER, {
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
  if (sold_loading) {
    return "Loading...";
  }
  if (sold_error) {
    return <p>Something went wrong!</p>;
  }
  if (lent_loading) {
    return "Loading...";
  }
  if (lent_error) {
    return <p>Something went wrong!</p>;
  }

  if (borrowed_loading) {
    return "Loading...";
  }
  if (borrowed_error) {
    return <p>Something went wrong!</p>;
  }

  if (lent_loading) {
    return "Loading...";
  }
  if (lent_error) {
    return <p>Something went wrong!</p>;
  }
  console.log(lent_data.getUserAsLenter);

  return (
    <div className="ui fluid">
      <div className="ui  four item secondary blue  pointing menu">
        <a
          className={boughtActive ? "item active" : "item"}
          onClick={() => {
            setBoughtActive(true);
            setSoldActive(false);
            setBorrowedActive(false);
            setLentActive(false);
          }}
        >
          Bought
        </a>
        <a
          className={soldActive ? "item active" : "item"}
          onClick={() => {
            setBoughtActive(false);
            setSoldActive(true);
            setBorrowedActive(false);
            setLentActive(false);
          }}
        >
          Sold
        </a>
        <a
          className={borrowedActive ? "item active" : "item"}
          onClick={() => {
            setBoughtActive(false);
            setSoldActive(false);
            setBorrowedActive(true);
            setLentActive(false);
          }}
        >
          Borrowed
        </a>
        <a
          className={lentActive ? "item active" : "item"}
          onClick={() => {
            setBoughtActive(false);
            setSoldActive(false);
            setBorrowedActive(false);
            setLentActive(true);
          }}
        >
          Lent
        </a>
      </div>
      <div className="ui grid">
        <div className="row">
          <div className="ten wide column">
            <div className="ui items">
              {boughtActive ? (
                <>
                  {data.getUserAsBuyer !== null
                    ? data.getUserAsBuyer.bought_products.map(
                        (singleProduct, index) => {
                          var cate = singleProduct.categories;
                          cate = cate.replace("{", "[");
                          cate = cate.replace("}", "]");
                          cate = JSON.parse(cate);

                          return (
                            <Proudct
                              key={index}
                              product={singleProduct}
                              categories={cate}
                              dateAndViewShow="false"
                              deleteIconShow="false"
                            />
                          );
                        }
                      )
                    : "No Products"}
                </>
              ) : (
                ""
              )}

              {soldActive ? (
                <>
                  {sold_data.getUserAsSeller !== null
                    ? sold_data.getUserAsSeller.sold_products.map(
                        (singleProduct, index) => {
                          {
                            /* console.log(singleProduct); */
                          }
                          var cate = singleProduct.categories;
                          cate = cate.replace("{", "[");
                          cate = cate.replace("}", "]");
                          cate = JSON.parse(cate);

                          return (
                            <Proudct
                              key={index}
                              product={singleProduct}
                              categories={cate}
                              dateAndViewShow="false"
                              deleteIconShow="false"
                            />
                          );
                        }
                      )
                    : "No Products"}
                </>
              ) : (
                ""
              )}

              {borrowedActive ? (
                <>
                  {borrowed_data.getUserAsBorrower !== null
                    ? borrowed_data.getUserAsBorrower.borrowed_products.map(
                        (singleProduct, index) => {
                          {
                            /* console.log(singleProduct); */
                          }
                          var cate = singleProduct.categories;
                          cate = cate.replace("{", "[");
                          cate = cate.replace("}", "]");
                          cate = JSON.parse(cate);

                          return (
                            <Proudct
                              key={index}
                              product={singleProduct}
                              categories={cate}
                              dateAndViewShow="false"
                              deleteIconShow="false"
                            />
                          );
                        }
                      )
                    : "No Products"}
                </>
              ) : (
                ""
              )}

              {lentActive ? (
                <>
                  {lent_data.getUserAsLenter !== null
                    ? lent_data.getUserAsLenter.lent_products.map(
                        (singleProduct, index) => {
                          var cate = singleProduct.categories;
                          cate = cate.replace("{", "[");
                          cate = cate.replace("}", "]");
                          cate = JSON.parse(cate);

                          return (
                            <Proudct
                              key={index}
                              product={singleProduct}
                              categories={cate}
                              dateAndViewShow="false"
                              deleteIconShow="false"
                            />
                          );
                        }
                      )
                    : "No Products"}
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
