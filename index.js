const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const ProductRoutes = require("./Routes/ProdcutRoutes");
const userRoutes = require("./Routes/userRoutes");
const Categories = require("./Routes/Category");
const cartRoutes = require("./Routes/Cart");
const app = express();
const stripe = require("stripe")(
  "sk_test_51NM8vwHPi9TizSXWPhF9DgwPKNuILRDY8uZdGC0EXyAnkZoPTqK4m4NISfQEZzQtvgHpcb8I98bDYVMalzmvYaRb00AEttlwwK"
);

// for multer
app.use(express.static("Uploads"));
app.use("/Uploads", express.static(__dirname + "/Uploads"));

// middleware
app.use(express.json());
app.use(express.urlencoded({ extented: false }));
app.use(cors());

// Routes
app.use("/api/products", ProductRoutes);
app.use("/api/user", userRoutes);
app.use("/api/category", Categories);
app.use("/api/cart", cartRoutes);

// app.post("/api/create-checkout-session", async (req, res) => {
//   const { products } = req.body;

//   const { title, price } = products;

//   console.log("Product Name:", title);
//   console.log("Product Price:", price);

//   const session = await stripe.checkout.sessions.create({
//     payment_methods_types: ["card"],
//     line_items: [
//       {
//         price: price,
//         name: title,
//       },
//     ],
//     mode: "payment",
//     success_url: `http://localhost:5173/`,
//     cancel_url: `http://localhost:5173/`,
//   });

//   res.redirect(303, session.url);
// });
app.post('/api/create-checkout-session', async (req, res) => {
  const { products } = req.body;

  // Check if 'products' is defined
  if (!products) {
    return res.status(400).json({ error: 'Product data is missing in the request.' });
  }

  const { title, price } = products;

  try {
    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: title,
              description: products.description, 
            },
            unit_amount: price * 100, 
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:5173/success', 
      cancel_url: 'http://localhost:5173/cancel',   
    });
console.log(session)
    res.status(200).json({ sessionId: session.id });
    
  } catch (error) {
    console.error('Error creating Stripe checkout session:', error);
    res.status(500).json({ error: 'An error occurred while creating the checkout session.' });
  }
});



const PORT = process.env.PORT || 5000;
const url = "mongodb://127.0.0.1/e-commerce";

mongoose
  .connect(url)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Connected to database and port", PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
