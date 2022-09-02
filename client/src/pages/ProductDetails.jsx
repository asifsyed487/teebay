import { useMutation, useQuery } from "@apollo/client";
import { Navigate, useParams } from "react-router-dom";
import Decoder from "jwt-decode";

import BuyProduct from "../components/BuyProduct";
import { UPDATE_VIEW_PRODUCT } from "../mutations/productMutations";
import { GET_PRODUCT, GET_SPECIFIC_LENT } from "../queries/productQueries";
import "./MyProducts.css";
import RentProduct from "../components/RentProduct";
import { useSelector } from "react-redux";
const ProductDetails = () => {
  const token = localStorage.usertoken_hash;
  const decodedData = Decoder(token);
  const { id } = useParams();

  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: { product_unique_id: id },
  });

  const {
    loading: lent_loading,
    error: lent_error,
    data: lent_data,
  } = useQuery(GET_SPECIFIC_LENT, {
    variables: { product_unique_id: id },
  });

  // const [updateViewProduct] = useMutation(UPDATE_VIEW_PRODUCT, {
  //   variables: {
  //     product_unique_id: data.product.product_unique_id,
  //     views: data.product.views,
  //   },
  //   refetchQueries: [
  //     {
  //       query: UPDATE_VIEW_PRODUCT,
  //       variables: { product_unique_id: data.product.product_unique_id },
  //     },
  //   ],
  // });
  const state = useSelector((state) => state.UserReducer.LoggedIn);

  if (!state) {
    return <Navigate replace to="/" />;
  }
  if (loading) {
    return "Loading ...";
  }

  if (error) {
    return <p>Something went wrong!</p>;
  }

  if (lent_loading) {
    return "Loading";
  }
  var today = new Date("2022-09-09");
  var g1 = new Date(
    lent_data.getSpecificLent !== null
      ? lent_data.getSpecificLent.rental_period_starts
      : ""
  );
  var g2 = new Date(
    lent_data.getSpecificLent !== null
      ? lent_data.getSpecificLent.rental_period_ends
      : ""
  );
  console.log(today.getTime() >= g2.getTime());
  // if

  // updateViewProduct(data.product.product_unique_id, data.product.views);
  var cate = data.product.categories;
  cate = cate.replace("{", "[");
  cate = cate.replace("}", "]");
  cate = JSON.parse(cate);

  const BuyButton = () => {
    if (lent_data.getSpecificLent !== null) {
      if (today.getTime() >= g2.getTime()) {
        return (
          <BuyProduct
            user={decodedData.user_unique_id}
            product={data.product}
          />
        );
      } else {
        return <button className="ui primary button disabled">Buy</button>;
      }
    } else {
      return (
        <BuyProduct user={decodedData.user_unique_id} product={data.product} />
      );
    }
  };
  const RentButton = () => {
    if (lent_data.getSpecificLent !== null) {
      if (today.getTime() >= g2.getTime()) {
        return (
          <RentProduct
            user={decodedData.user_unique_id}
            product={data.product}
          />
        );
      } else {
        return (
          <button className="ui red button disabled">
            This product is on rent till
            {lent_data.getSpecificLent !== null
              ? lent_data.getSpecificLent.rental_period_ends
              : ""}
          </button>
        );
      }
    } else {
      return (
        <RentProduct user={decodedData.user_unique_id} product={data.product} />
      );
    }
  };
  return (
    <div className="ui container" style={{ marginTop: "5rem" }}>
      <div className="ui grid">
        <div className="row">
          <div className="ten wide column">
            <div className="ui items">
              <div className="item">
                <div className="content">
                  {!lent_loading && !lent_error && (
                    <div className="ui grid">
                      <div className="sixteen wide column">
                        <div
                          className="content"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            lineHeight: 1.5,
                          }}
                        >
                          <h1
                            className="ui header"
                            style={{ fontWeigth: "lighter" }}
                          >
                            {data.product.title}
                          </h1>
                        </div>
                        <div className="content">
                          <p
                            className="extra"
                            style={{ marginTop: "1rem", marginBottom: "1rem" }}
                          >
                            Categories:{" "}
                            {cate.map((category, index) => {
                              if (index < cate.length - 1) {
                                return category + ", ";
                              } else {
                                return category + " ";
                              }
                            })}
                          </p>
                          <p
                            className="extra"
                            style={{
                              marginTop: "0.5rem",
                              marginBottom: "0.5rem",
                            }}
                          >
                            Price: ${data.product.price} | Rent: $
                            {data.product.rent} {data.product.rent_type}
                          </p>
                          <p
                            style={{ marginTop: "1rem", marginBottom: "1rem" }}
                          >
                            {data.product.description}
                          </p>
                        </div>
                        {decodedData.user_unique_id ===
                        data.product.user.user_unique_id ? (
                          ""
                        ) : (
                          <div
                            className="content"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "flex-end",
                              marginTop: "5rem",
                            }}
                          >
                            {RentButton()}
                            {BuyButton()}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
