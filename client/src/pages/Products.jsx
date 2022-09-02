import { useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Proudct from "../components/Proudct";
import { GET_PRODUCTS } from "../queries/productQueries";
import "./MyProducts.css";

const MyProducts = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS);

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
  return (
    <div className="ui container login">
      <h2 className="ui header">ALL PRODUCTS</h2>
      <div className="ui grid">
        <div className="row">
          <div className="ten wide column">
            <div className="ui items">
              {data.products.map((product, index) => {
                var cate = product.categories;
                cate = cate.replace("{", "[");
                cate = cate.replace("}", "]");
                cate = JSON.parse(cate);

                return (
                  <Proudct
                    key={index}
                    product={product}
                    categories={cate}
                    dateAndViewShow="true"
                    deleteIconShow="false"
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProducts;
