# Getting Started

on directory "/teebay":
npm install
npm run dev
on directory "/teebay/client"
npm install
npm start

There is a database.sql file in "/teebay". It is necessary to import it first. I have put the .env open.

# PART1:

For this part, I created a login form and a registration. The registration form is fully functional as mentioned in wireframe. So when the user logins, a token gets generated with the help of jwt. I have stored it in localstorage.

I have used redux for login authorization.

# PART2:

In this part, I have made a myproducts page, a createproduct page and a editproduct page. Whenever I create or delete specific it updates the cache also. And if I click on specific page in my products section it will take me to the editproduct section where I can edit the product.
You can get all the routes in App.js.

# PART3:

In this final part, a particular user can buy a product or rent a product. Also, if the specific product is on rent, the user will not be able to buy or rent this product until the rent date ends. Only if the product is not on rent or the rental date is over, then the user will be able to take this product. When the user buys or rents the product he will be navigated to history page where he will be able to see all the products, he has bought, sold, lent and borrowed.
