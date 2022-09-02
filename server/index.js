const express = require("express");
const colors = require("colors"); // for text decoration in console
const cors = require("cors");
require("dotenv").config();
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const port = process.env.PORT || 5000;

const app = express();

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development", // the graphql interface will appear only if the application is in development mode
  })
);

app.listen(port, () => {
  console.log(`Server Started at PORT ${port}`.cyan.underline.bold);
});
