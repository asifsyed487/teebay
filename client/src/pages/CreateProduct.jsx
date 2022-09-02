import { useState } from "react";
import Decoder from "jwt-decode";
import { Dropdown } from "semantic-ui-react";
import "./MyProducts.css";
import { useMutation } from "@apollo/client";
import { ADD_PRODUCT } from "../mutations/productMutations";
import { GET_MY_PRODUCTS } from "../queries/productQueries";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const CreateProduct = () => {
  const navigate = useNavigate();
  const token = localStorage.usertoken_hash;
  const decodedData = Decoder(token);
  let [categories, setCategories] = useState([]);
  const [productData, setProductData] = useState({
    title: "",
    description: "",
    price: "",
    rent: "",
    rent_type: "",
    created_by: decodedData.user_unique_id,
  });
  const [addProduct] = useMutation(ADD_PRODUCT, {
    variables: {
      title: productData.title,
      categories: categories,
      description: productData.description,
      price: productData.price,
      rent: productData.rent,
      rent_type: productData.rent_type,
      created_by: productData.created_by,
    },
    onCompleted: () => navigate("/myproducts"),
    update(cache, { data: { addProduct } }) {
      const { myproducts } = cache.readQuery({
        query: GET_MY_PRODUCTS,

        variables: {
          user_unique_id: decodedData.user_unique_id,
        },
      });
      cache.writeQuery({
        query: GET_MY_PRODUCTS,
        variables: {
          user_unique_id: decodedData.user_unique_id,
        },

        data: {
          myproducts: [...myproducts, addProduct],
        },
      });
    },
  });

  const state = useSelector((state) => state.UserReducer.LoggedIn);

  if (!state) {
    return <Navigate replace to="/" />;
  }

  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(productData);
    if (
      productData.title === "" ||
      categories.length === 0 ||
      productData.description === "" ||
      productData.price === "" ||
      productData.rent === "" ||
      productData.rent_type === ""
    ) {
      console.log(categories.length);
      return alert("Please Fill in all the fields");
    }
    addProduct(
      productData.title,
      categories,
      productData.description,
      productData.price,
      productData.rent,
      productData.rent_type,
      productData.created_by
    ).then((res) => {
      console.log(res);
    });
  };
  return (
    <div className="ui container" style={{ marginTop: "5rem" }}>
      <div className="ui grid">
        <div className="ten wide column">
          <form
            onSubmit={onSubmit}
            className="ui form"
            style={{ textAlign: "left" }}
          >
            <div className="field">
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={productData.title}
                placeholder="Title"
                onChange={handleChange}
              />
            </div>
            <div className="six wide field">
              <label>Categories</label>
              <Dropdown
                placeholder="Select a Category"
                fluid
                multiple
                selection
                name="categories[]"
                options={options}
                onChange={(e) => {
                  console.log(e.child);
                  console.log("To get the cross value");
                  console.log(e.target.innerText);
                  if (e.target.innerText !== "") {
                    categories = categories.filter((category) => {
                      return category !== "";
                    });
                    categories = [...new Set(categories)];

                    if (!categories.includes(e.target.innerText)) {
                      categories.push(e.target.innerText);
                    }
                    setCategories(categories);
                    console.log(categories.length);
                  }
                }}
              />
            </div>
            <div className="field">
              <label>Description</label>
              <textarea
                name="description"
                value={productData.description}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="fields">
              <div className="five wide field">
                <label>Price</label>
                <input
                  type="text"
                  name="price"
                  value={productData.price}
                  maxLength="16"
                  placeholder=""
                  onChange={handleChange}
                />
              </div>
              <div className="two wide field">
                <label>Rent</label>
                <input
                  type="text"
                  name="rent"
                  value={productData.rent}
                  maxLength="3"
                  placeholder="50"
                  onChange={handleChange}
                />
              </div>
              <div className="six wide mini field">
                <label style={{ visibility: "hidden" }}>nice</label>
                <select
                  className="ui fluid search dropdown"
                  name="rent_type"
                  value={productData.rent_type}
                  onChange={handleChange}
                >
                  <option value="">Select Option</option>
                  <option value="daily">daily</option>
                  <option value="hourly">hourly</option>
                </select>
              </div>
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
              <button className="ui primary button">Add Product</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
const options = [
  { key: "ELECTRONICS", text: "ELECTRONICS", value: "ELECTRONICS" },
  { key: "FURNITURE", text: "FURNITURE", value: "FURNITURE" },
  { key: "HOME_APPLIANCES", text: "HOME APPLIANCES", value: "HOME APPLIANCES" },
  { key: "SPORTING_GOODS", text: "SPORTING GOODS", value: "SPORTING GOODS" },
  { key: "OUTDOOR", text: "OUTDOOR", value: "OUTDOOR" },
  { key: "TOYS", text: "TOYS", value: "TOYS" },
];
