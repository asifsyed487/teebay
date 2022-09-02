import { gql } from "@apollo/client";

const ADD_PRODUCT = gql`
  mutation addProduct(
    $title: String!
    $categories: [String!]
    $description: String!
    $price: String!
    $rent: String!
    $rent_type: RentType!
    $created_by: String!
  ) {
    addProduct(
      title: $title
      categories: $categories
      description: $description
      price: $price
      rent: $rent
      rent_type: $rent_type
      created_by: $created_by
    ) {
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

const UPDATE_PRODUCT = gql`
  mutation updateProduct(
    $product_unique_id: String!
    $title: String!
    $categories: [String!]
    $description: String!
    $price: String!
    $rent: String!
    $rent_type: RentTypeUpdate!
  ) {
    updateProduct(
      product_unique_id: $product_unique_id
      title: $title
      categories: $categories
      description: $description
      price: $price
      rent: $rent
      rent_type: $rent_type
    ) {
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

const UPDATE_VIEW_PRODUCT = gql`
  mutation updateViewProduct($product_unique_id: String!, $views: String!) {
    updateViewProduct(product_unique_id: $product_unique_id, views: $views) {
      title
      categories
      description
      price
      rent
      rent_type
      product_unique_id
      views
      user {
        first_name
        last_name
        address
        email
        phone
        password
        user_unique_id
      }
      created_date
    }
  }
`;

const DELETE_PRODUCT = gql`
  mutation deleteProduct($product_unique_id: String!) {
    deleteProduct(product_unique_id: $product_unique_id) {
      title
      categories
      description
      price
      rent
      rent_type
      product_unique_id
      views
      user {
        first_name
        last_name
        address
        email
        phone
        password
        user_unique_id
      }
      created_date
    }
  }
`;

const BUY_PRODUCT = gql`
  mutation addBuy(
    $buyer_id: String!
    $seller_id: String!
    $product_unique_id: String!
  ) {
    addBuy(
      buyer_id: $buyer_id
      seller_id: $seller_id
      product_unique_id: $product_unique_id
    ) {
      buyer {
        first_name
        last_name
      }
      bought_products {
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
  }
`;

const RENT_PRODUCT = gql`
  mutation addRent(
    $lenter_id: String!
    $borrower_id: String!
    $product_unique_id: String!
    $rental_period_starts: String!
    $rental_period_ends: String!
  ) {
    addRent(
      lenter_id: $lenter_id
      borrower_id: $borrower_id
      product_unique_id: $product_unique_id
      rental_period_starts: $rental_period_starts
      rental_period_ends: $rental_period_ends
    ) {
      lenter {
        first_name
        last_name
      }
      lent_products {
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
  }
`;

export {
  ADD_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_VIEW_PRODUCT,
  UPDATE_PRODUCT,
  BUY_PRODUCT,
  RENT_PRODUCT,
};
