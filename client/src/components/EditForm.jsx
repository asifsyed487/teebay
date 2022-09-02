import { useState } from "react";
import Decoder from "jwt-decode";
import { Dropdown } from "semantic-ui-react";
import { useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { UPDATE_PRODUCT } from "../mutations/productMutations";
import { GET_MY_PRODUCTS } from "../queries/productQueries";

const EditForm = ({ product }) => {
  var cate = product.categories;
  cate = cate.replace("{", "[");
  cate = cate.replace("}", "]");
  cate = JSON.parse(cate);
  const navigate = useNavigate();
  const token = localStorage.usertoken_hash;
  const decodedData = Decoder(token);
  let [categories, setCategories] = useState(cate);
  const [productData, setProductData] = useState({
    title: product.title,
    description: product.description,
    price: product.price,
    rent: product.rent,
    rent_type: product.rent_type,
    created_by: decodedData.user_unique_id,
    product_unique_id: product.product_unique_id,
  });

  const [updateProduct] = useMutation(UPDATE_PRODUCT, {
    variables: {
      product_unique_id: productData.product_unique_id,
      title: productData.title,
      categories: productData.categories,
      description: productData.description,
      price: productData.price,
      rent: productData.rent,
      rent_type: productData.rent_type,
    },
    onCompleted: () => navigate("/myproducts"),
    refetchQueries: [
      {
        query: GET_MY_PRODUCTS,
        variables: { user_unique_id: productData.created_by },
      },
    ],
  });
  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(productData);
    updateProduct(
      productData.product_unique_id,
      productData.title,
      productData.categories,
      productData.description,
      productData.price,
      productData.rent,
      productData.rent_type
    ).then((res) => {
      console.log(res);
    });
  };
  return (
    <form onSubmit={onSubmit} className="ui form" style={{ textAlign: "left" }}>
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
          onClick={(e) => {
            console.log(e.target.value);
          }}
          onChange={(e) => {
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
              console.log(categories);

              //   if (productData.categories.length > 0) {
              //     setProductData({
              //       ...productData,
              //       categories: productData.categories.filter(
              //         (product) => product !== ""
              //       ),
              //     });
              //   }
              //   let uniqueArr = [...new Set(productData.categories)];
              //   productData.categories.push(e.target.innerText);
              //   console.log(productData.categories);
            }

            // setProductData(newArr);
          }}
          defaultValue={categories}
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
        <button className="ui primary button">Update Product</button>
      </div>
    </form>
  );
};

export default EditForm;

const options = [
  { key: "ELECTRONICS", text: "ELECTRONICS", value: "ELECTRONICS" },
  { key: "FURNITURE", text: "FURNITURE", value: "FURNITURE" },
  { key: "HOME_APPLIANCES", text: "HOME APPLIANCES", value: "HOME APPLIANCES" },
  { key: "SPORTING_GOODS", text: "SPORTING GOODS", value: "SPORTING GOODS" },
  { key: "OUTDOOR", text: "OUTDOOR", value: "OUTDOOR" },
  { key: "TOYS", text: "TOYS", value: "TOYS" },
];
