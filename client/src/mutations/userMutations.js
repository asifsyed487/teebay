import { gql } from "@apollo/client";
const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
    }
  }
`;

const SIGNUP_USER = gql`
  mutation signupUser(
    $first_name: String!
    $last_name: String!
    $address: String!
    $email: String!
    $phone: String!
    $password: String!
  ) {
    signupUser(
      first_name: $first_name
      last_name: $last_name
      address: $address
      email: $email
      phone: $phone
      password: $password
    ) {
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

export { LOGIN_USER, SIGNUP_USER };
