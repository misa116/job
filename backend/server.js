 import express from "express";
import dotenv from "dotenv";
import { db } from "./db/db.js";



dotenv.config();
 const app = express();
const port = process.env.PORT || 5000;


import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import uomRoutes from "./routes/uomRoutes.js";


import { errorHandler, routeNotFound } from "./utils/errorHandler.js";




//console.log(process.env.MONGO_URI);
db();
app.get('/', (req, res) => {
    res.send(`<h1>hohohho<h1/>`);
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cookieParser());


if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/uom", uomRoutes);


//app.use("/*", routeNotFound);
app.use(errorHandler);



//console.log(5 + 8);

app.listen(port, console.log(`app is running port ${port}`));