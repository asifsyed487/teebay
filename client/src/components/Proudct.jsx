import { useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import DeleteProductButton from "./DeleteProductButton";
const Proudct = ({
  dateAndViewShow,
  deleteIconShow,
  product,
  categories,
  fromMyProductPage = "false",
}) => {
  var date = new Date(parseInt(product.created_date));
  var d = date.getDate();
  var m = date.getMonth() + 1;
  var y = date.getFullYear();
  var dateModify =
    d === 1 || d === 21 || d === 31
      ? d + "st"
      : d === 2 || d === 22
      ? d + "nd"
      : d + "th";
  var monthModify =
    m === 1
      ? "Jan"
      : m === 2
      ? "Feb"
      : m == 3
      ? "March"
      : m === 4
      ? "April"
      : m === 5
      ? "May"
      : m === 6
      ? "June"
      : m === 7
      ? "July"
      : m === 8
      ? "August"
      : m === 9
      ? "Sept"
      : m === 10
      ? "Oct"
      : m === 11
      ? "Nov"
      : m === 12
      ? "Dec"
      : "";
  var dateString = dateModify + " " + monthModify + " " + y;
  return (
    <div className="item">
      <div className="ui segment" style={{ width: "100%", textAlign: "left" }}>
        <div className="content">
          {/* <div className="ui grid"> */}
          {/* <div className="sixteen wide column"> */}
          <div
            className="content"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              lineHeight: 1.5,
            }}
          >
            <h2>{product.title}</h2>
            <span className="right floated">
              {deleteIconShow === "true" ? (
                <DeleteProductButton productId={product.product_unique_id} />
              ) : (
                ""
              )}
            </span>
          </div>
          <div className="content" style={{ width: "80%" }}>
            <Link
              className="content"
              to={
                fromMyProductPage === "false"
                  ? `/product/${product.product_unique_id}`
                  : `/editproduct/${product.product_unique_id}`
              }
            >
              <p
                className="extra"
                style={{ marginTop: "1rem", marginBottom: "1rem" }}
              >
                Categories:{" "}
                {categories.map((category, index) => {
                  if (index < categories.length - 1) {
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
                Price: ${product.price} | Rent: ${product.rent}{" "}
                {product.rent_type}
              </p>
              <p style={{ marginTop: "1rem", marginBottom: "1rem" }}>
                {product.description}
              </p>
            </Link>
          </div>
          {dateAndViewShow === "true" ? (
            <div
              className="content"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                lineHeight: 1.5,
              }}
            >
              <p className="extra">Date posted: {dateString}</p>
              <span className="right floated">
                <p>{product.views}views</p>
              </span>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      {/* </div> */}
      {/* </div> */}
    </div>
  );
};

export default Proudct;
