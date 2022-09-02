import { gql } from "@apollo/client";

const GET_PRODUCTS = gql`
  query getProducts {
    products {
      title
      categories
      description
      price
      rent
      rent_type
      product_unique_id
      views
      created_date
    }
  }
`;

const GET_PRODUCT = gql`
  query getProduct($product_unique_id: String!) {
    product(product_unique_id: $product_unique_id) {
      title
      categories
      description
      price
      rent
      rent_type
      product_unique_id
      views
      created_date
      user {
        user_unique_id
      }
    }
  }
`;

const GET_SPECIFIC_LENT = gql`
  query getSpecificLent($product_unique_id: String!) {
    getSpecificLent(product_unique_id: $product_unique_id) {
      rental_period_ends
      rental_period_starts
    }
  }
`;

const GET_MY_PRODUCTS = gql`
  query getMyProducts($user_unique_id: String!) {
    myproducts(user_unique_id: $user_unique_id) {
      title
      categories
      description
      price
      rent
      rent_type
      product_unique_id
      views
      created_date
    }
  }
`;

export { GET_PRODUCTS, GET_PRODUCT, GET_MY_PRODUCTS, GET_SPECIFIC_LENT };
