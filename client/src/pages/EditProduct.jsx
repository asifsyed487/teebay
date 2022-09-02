import "./MyProducts.css";
import { useQuery } from "@apollo/client";
import { ADD_PRODUCT } from "../mutations/productMutations";
import { GET_MY_PRODUCTS, GET_PRODUCT } from "../queries/productQueries";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import EditForm from "../components/EditForm";
import { useSelector } from "react-redux";
const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.usertoken_hash;

  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: { product_unique_id: id },
  });

  const state = useSelector((state) => state.UserReducer.LoggedIn);

  if (!state) {
    return <Navigate replace to="/" />;
  }
  if (loading) {
    return "Loading";
  }
  if (error) {
    return "Something Went Wrong!";
  }
  console.log(data);

  return (
    <div className="ui container" style={{ marginTop: "5rem" }}>
      <div className="ui grid">
        <div className="ten wide column">
          <EditForm product={data.product} />
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
