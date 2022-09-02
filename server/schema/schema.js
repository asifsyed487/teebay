const graphql = require("graphql");
//to generate unique id
const uuid = require("uuid");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
} = require("graphql");
const { json } = require("express");

//product type
const ProductType = new GraphQLObjectType({
  name: "Product",
  fields: () => ({
    p_id: { type: GraphQLID },
    title: { type: GraphQLString },
    categories: { type: GraphQLString },
    // singlecategory: {type: Graph}
    description: { type: GraphQLString },
    price: { type: GraphQLString },
    rent: { type: GraphQLString },
    rent_type: { type: GraphQLString },
    product_unique_id: { type: GraphQLString },
    views: { type: GraphQLString },
    created_date: { type: GraphQLString },
    user: {
      type: UserType,
      async resolve(parent, args) {
        const created_by = await pool.query(
          "SELECT * from users where user_unique_id=$1",
          [parent.created_by]
        );
        return created_by.rows[0];
      },
    },
  }),
});

//user type
const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    u_id: { type: GraphQLID },
    user_unique_id: { type: GraphQLString },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    address: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
    password: { type: GraphQLString },
    token: { type: GraphQLString },
  }),
});

//Buy type
const BuyType = new GraphQLObjectType({
  name: "Buy",
  fields: () => ({
    b_id: { type: GraphQLID },
    // buyer_id: { type: GraphQLString },
    // seller_id: { type: GraphQLString },
    // product_unique_id: { type: GraphQLString },
    buyer: {
      type: UserType,
      async resolve(parent, args) {
        const buyer_itself = await pool.query(
          "SELECT * from users where user_unique_id=$1",
          [parent.buyer_id]
        );
        // console.log(buyer_itself.rows[0]);
        return buyer_itself.rows[0];
      },
    },
    bought_products: {
      type: new GraphQLList(ProductType),
      async resolve(parent, args) {
        const product = await pool.query(
          "SELECT products.title ,products.categories, products.price,products.description FROM buy LEFT JOIN products ON buy.product_unique_id = products.product_unique_id WHERE buy.buyer_id=$1",
          [parent.buyer_id]
        );
        // console.log(product.rows);
        return product.rows;
      },
    },
  }),
});

//Sell type
const SellType = new GraphQLObjectType({
  name: "Sell",
  fields: () => ({
    s_id: { type: GraphQLID },

    seller: {
      type: UserType,
      async resolve(parent, args) {
        const seller_itself = await pool.query(
          "SELECT * from users where user_unique_id=$1",
          [parent.seller_id]
        );
        console.log(seller_itself.rows[0]);
        return seller_itself.rows[0];
      },
    },
    sold_products: {
      type: new GraphQLList(ProductType),
      async resolve(parent, args) {
        const product = await pool.query(
          "SELECT products.title ,products.categories, products.price,products.description FROM sell LEFT JOIN products ON sell.product_unique_id = products.product_unique_id WHERE sell.seller_id=$1",
          [parent.seller_id]
        );
        // console.log(product.rows);
        return product.rows;
      },
    },
  }),
});

//lent type
const LentType = new GraphQLObjectType({
  name: "lent",
  fields: () => ({
    l_id: { type: GraphQLID },
    lenter: {
      type: UserType,
      async resolve(parent, args) {
        const lenter_itself = await pool.query(
          "SELECT * from users where user_unique_id=$1",
          [parent.lenter_id]
        );
        // console.log(lenter_itself.rows[0]);
        return lenter_itself.rows[0];
      },
    },
    lent_products: {
      type: new GraphQLList(ProductType),
      async resolve(parent, args) {
        const product = await pool.query(
          "SELECT products.title ,products.categories, products.price,products.description FROM lent LEFT JOIN products ON lent.product_unique_id = products.product_unique_id WHERE lent.lenter_id=$1",
          [parent.lenter_id]
        );
        // console.log(product.rows);
        return product.rows;
      },
    },
    rental_period_starts: { type: GraphQLString },
    rental_period_ends: { type: GraphQLString },
  }),
});

//Borrowed type
const BorrowedType = new GraphQLObjectType({
  name: "borrowed",
  fields: () => ({
    b_id: { type: GraphQLID },
    borrower: {
      type: UserType,
      async resolve(parent, args) {
        const borrower_itself = await pool.query(
          "SELECT * from users where user_unique_id=$1",
          [parent.borrower_id]
        );
        // console.log(borrower_itself.rows[0]);
        return borrower_itself.rows[0];
      },
    },
    borrowed_products: {
      type: new GraphQLList(ProductType),
      async resolve(parent, args) {
        const product = await pool.query(
          "SELECT products.title ,products.categories, products.price,products.description FROM borrowed LEFT JOIN products ON borrowed.product_unique_id = products.product_unique_id WHERE borrowed.borrower_id=$1",
          [parent.borrower_id]
        );
        // console.log(product.rows);
        return product.rows;
      },
    },
    rental_period_starts: { type: GraphQLString },
    rental_period_ends: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    products: {
      type: new GraphQLList(ProductType),
      async resolve(parent, args) {
        const allProducts = await pool.query(
          "SELECT title, categories, description, price, rent, rent_type, product_unique_id, created_date, views from products"
        );
        // console.log(allProducts.rows);
        return allProducts.rows;
      },
    },
    myproducts: {
      type: new GraphQLList(ProductType),
      args: { user_unique_id: { type: GraphQLString } },
      async resolve(parent, args) {
        const myProducts = await pool.query(
          "SELECT title, categories, description, price, rent, rent_type, product_unique_id, created_by, created_date, views from products where created_by=$1",
          [args.user_unique_id]
        );
        return myProducts.rows;
      },
    },
    product: {
      type: ProductType,
      args: { product_unique_id: { type: GraphQLString } },
      async resolve(parent, args) {
        const singleProduct = await pool.query(
          "SELECT title, categories, description, price, rent, rent_type, product_unique_id, created_by from products where product_unique_id=$1",
          [args.product_unique_id]
        );
        return singleProduct.rows[0];
      },
    },
    users: {
      type: new GraphQLList(UserType),
      async resolve(parent, args) {
        const allUsers = await pool.query("SELECT * from users");
        // console.log(allUsers.rows);
        return allUsers.rows;
      },
    },
    getUserAsBuyer: {
      type: BuyType,
      args: { user_unique_id: { type: GraphQLString } },
      async resolve(parent, args) {
        const singleInfo = await pool.query(
          "SELECT * from buy where buyer_id=$1",
          [args.user_unique_id]
        );
        // console.log(singleInfo.rows);
        return singleInfo.rows[0];
      },
    },
    getUserAsSeller: {
      type: SellType,
      args: { user_unique_id: { type: GraphQLString } },
      async resolve(parent, args) {
        const singleInfo = await pool.query(
          "SELECT * from sell where seller_id=$1",
          [args.user_unique_id]
        );
        return singleInfo.rows[0];
      },
    },
    getUserAsLenter: {
      type: LentType,
      args: { user_unique_id: { type: GraphQLString } },
      async resolve(parent, args) {
        const singleInfo = await pool.query(
          "SELECT * from lent where lenter_id=$1",
          [args.user_unique_id]
        );
        return singleInfo.rows[0];
      },
    },
    getSpecificLent: {
      type: LentType,
      args: { product_unique_id: { type: GraphQLString } },
      async resolve(parent, args) {
        const singleInfo = await pool.query(
          "SELECT * from lent where product_unique_id=$1",
          [args.product_unique_id]
        );
        return singleInfo.rows[0];
      },
    },
    getUserAsBorrower: {
      type: BorrowedType,
      args: { user_unique_id: { type: GraphQLString } },
      async resolve(parent, args) {
        const singleInfo = await pool.query(
          "SELECT * from borrowed where borrower_id=$1",
          [args.user_unique_id]
        );
        return singleInfo.rows[0];
      },
    },
  },
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    //signup a user
    signupUser: {
      type: UserType,
      args: {
        first_name: { type: new GraphQLNonNull(GraphQLString) },
        last_name: { type: new GraphQLNonNull(GraphQLString) },
        address: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        phone: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        const user_unique_id = uuid.v4();
        const createUser = await pool.query(
          "INSERT INTO users(user_unique_id, first_name, last_name, address, email, phone, password) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
          [
            user_unique_id,
            args.first_name,
            args.last_name,
            args.address,
            args.email,
            args.phone,
            args.password,
          ]
        );
        return createUser.rows[0];
      },
    },
    //login as user
    loginUser: {
      type: UserType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        const getUser = await pool.query(
          "SELECT * from users WHERE email=$1 AND password=$2",
          [args.email, args.password]
        );
        if (getUser.rows.length > 0) {
          let token = jwt.sign(getUser.rows[0], process.env.SECRET_KEY, {
            expiresIn: 43200,
          });

          return { token: token };
        } else {
          return { token: "Username or Password does not match" };
        }
      },
    },
    //add a product
    addProduct: {
      type: ProductType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        categories: { type: new GraphQLList(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        price: { type: new GraphQLNonNull(GraphQLString) },
        rent: { type: new GraphQLNonNull(GraphQLString) },
        rent_type: {
          type: new GraphQLEnumType({
            name: "RentType",
            values: {
              hourly: { value: "hourly" },
              daily: { value: "daily" },
            },
          }),
        },
        created_by: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        // console.log(args.categories);
        const product_unique_id = uuid.v4();
        // console.log(args.categories[0], args.categories[1]);
        // args.categories.forEach(async (category) => {
        const createProduct = await pool.query(
          "INSERT INTO products(title, categories, description, price, rent, rent_type, product_unique_id, created_by) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
          [
            args.title,
            args.categories,
            args.description,
            args.price,
            args.rent,
            args.rent_type,
            product_unique_id,
            args.created_by,
          ]
        );
        return createProduct.rows[0];
        // });
      },
    },

    //update a product
    updateProduct: {
      type: ProductType,
      args: {
        product_unique_id: { type: new GraphQLNonNull(GraphQLString) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        categories: { type: new GraphQLList(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        price: { type: new GraphQLNonNull(GraphQLString) },
        rent: { type: new GraphQLNonNull(GraphQLString) },
        rent_type: {
          type: new GraphQLEnumType({
            name: "RentTypeUpdate",
            values: {
              hourly: { value: "hourly" },
              daily: { value: "daily" },
            },
          }),
        },
      },
      async resolve(parent, args) {
        // const deleteSpecificProduct = await pool.query(
        //   "DELETE from products where product_unique_id=$1 RETURNING *",
        //   [args.id]
        // );
        // if (deleteSpecificProduct.rows.length > 0) {
        const updateProduct = await pool.query(
          "UPDATE products SET title = $1, categories=$2, description=$3, price=$4, rent=$5, rent_type=$6 WHERE product_unique_id =$7 RETURNING *",
          [
            args.title,
            args.categories,
            args.description,
            args.price,
            args.rent,
            args.rent_type,
            args.product_unique_id,
          ]
        );
        return updateProduct.rows[0];
        // }
      },
    },

    //update view number of a product
    updateViewProduct: {
      type: ProductType,
      args: {
        product_unique_id: { type: new GraphQLNonNull(GraphQLString) },
        views: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        const views = parseInt(args.views);
        views = views + 1;
        const updateSpecificViewProduct = await pool.query(
          "UPDATE products SET views = $1 WHERE product_unique_id =$2 RETURNING *",
          [args.product_unique_id, views]
        );
        return updateSpecificViewProduct.rows[0];
      },
    },

    //delete a product
    deleteProduct: {
      type: ProductType,
      args: {
        product_unique_id: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        const deleteBuyProduct = await pool.query(
          "DELETE from buy where product_unique_id=$1 RETURNING *",
          [args.product_unique_id]
        );
        const deleteSellProduct = await pool.query(
          "DELETE from sell where product_unique_id=$1 RETURNING *",
          [args.product_unique_id]
        );
        const deleteLentProduct = await pool.query(
          "DELETE from lent where product_unique_id=$1 RETURNING *",
          [args.product_unique_id]
        );
        const deleteBorrowedProduct = await pool.query(
          "DELETE from borrowed where product_unique_id=$1 RETURNING *",
          [args.product_unique_id]
        );
        const deleteSingleMyProduct = await pool.query(
          "DELETE from products where product_unique_id=$1 RETURNING *",
          [args.product_unique_id]
        );
        return deleteSingleMyProduct.rows[0];
      },
    },
    //To Buy a Product
    addBuy: {
      type: BuyType,
      args: {
        seller_id: { type: new GraphQLNonNull(GraphQLString) },
        buyer_id: { type: new GraphQLNonNull(GraphQLString) },
        product_unique_id: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        const createBuyData = await pool.query(
          "INSERT INTO buy(buyer_id, product_unique_id) VALUES($1, $2) RETURNING *",
          [args.buyer_id, args.product_unique_id]
        );
        const createSellData = await pool.query(
          "INSERT INTO sell(seller_id, product_unique_id) VALUES($1, $2) RETURNING *",
          [args.seller_id, args.product_unique_id]
        );
        return createBuyData.rows[0];
      },
    },
    //to rent a product
    addRent: {
      type: LentType,
      args: {
        lenter_id: { type: new GraphQLNonNull(GraphQLString) },
        borrower_id: { type: new GraphQLNonNull(GraphQLString) },
        product_unique_id: { type: new GraphQLNonNull(GraphQLString) },
        rental_period_starts: { type: new GraphQLNonNull(GraphQLString) },
        rental_period_ends: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        const createLentData = await pool.query(
          "INSERT INTO lent(lenter_id, product_unique_id, rental_period_starts,rental_period_ends) VALUES($1, $2, $3, $4) RETURNING *",
          [
            args.lenter_id,
            args.product_unique_id,
            args.rental_period_starts,
            args.rental_period_ends,
          ]
        );
        const createBorrowedData = await pool.query(
          "INSERT INTO borrowed(borrower_id, product_unique_id, rental_period_starts,rental_period_ends) VALUES($1, $2, $3, $4) RETURNING *",
          [
            args.borrower_id,
            args.product_unique_id,
            args.rental_period_starts,
            args.rental_period_ends,
          ]
        );
        return createLentData.rows[0];
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: mutation,
});
