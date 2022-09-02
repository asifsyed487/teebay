import { gql } from "@apollo/client";

const GET_USERS = gql`
  query getUsers {
    users {
      first_name
      last_name
      address
      email
      phone
      password
      user_unique_id
    }
  }
`;

const GET_USER_AS_BUYER = gql`
  query getUserAsBuyer($user_unique_id: String!) {
    getUserAsBuyer(user_unique_id: $user_unique_id) {
      buyer {
        first_name
      }
      bought_products {
        title
        categories
        price
        description
      }
    }
  }
`;

const GET_USER_AS_SELLER = gql`
  query getUserAsSeller($user_unique_id: String!) {
    getUserAsSeller(user_unique_id: $user_unique_id) {
      seller {
        first_name
      }
      sold_products {
        title
        categories
        price
        description
      }
    }
  }
`;

const GET_USER_AS_BORROWER = gql`
  query getUserAsBorrower($user_unique_id: String!) {
    getUserAsBorrower(user_unique_id: $user_unique_id) {
      borrower {
        first_name
      }
      borrowed_products {
        title
        categories
        price
        description
      }
    }
  }
`;

const GET_USER_AS_LENTER = gql`
  query getUserAsLenter($user_unique_id: String!) {
    getUserAsLenter(user_unique_id: $user_unique_id) {
      lenter {
        first_name
      }
      lent_products {
        title
        categories
        price
        description
      }
    }
  }
`;

export {
  GET_USERS,
  GET_USER_AS_BUYER,
  GET_USER_AS_SELLER,
  GET_USER_AS_BORROWER,
  GET_USER_AS_LENTER,
};
