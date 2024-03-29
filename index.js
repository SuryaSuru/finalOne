import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import adminRouter from "./routes/admin.route.js";
import withDrawRouter from "./routes/withDraw.route.js";
import topupsRouter from "./routes/topups.route.js";
import { fileURLToPath } from "url";
import userRouter from "./routes/user.route.js";
import productRouter from "./routes/product.route.js";
import categoryRouter from "./routes/category.route.js";
import orderRouter from "./routes/order.route.js";
import paymentRouter from "./routes/payment.route.js";
import planRouter from "./routes/plan.route.js";
import accountRouter from "./routes/account.route.js";
import supportRouter from "./routes/support.route.js";
import adminSupportRouter from "./routes/adminSupport.route.js";
import Connection from "./database/db.js";

/********************************************/
const app = express();
dotenv.config();
const PORT = 8000 || process.env.PORT;

/*****************MIDDLEWARES*****************/

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const __filename = fileURLToPath(import.meta.url); // Get directory name using import.meta.url
const __dirname = path.dirname(__filename); // Get directory name using import.meta.url
app.use("/", express.static(__dirname + "/public"));

/*******************ROUTES******************/
app.use("/admin", adminRouter);
app.use("/withDraw", withDrawRouter);
app.use("/topups", topupsRouter);
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/category", categoryRouter);
app.use("/order", orderRouter);
app.use("/payment", paymentRouter);
app.use("/plan", planRouter);
app.use("/account", accountRouter);
app.use("/support", supportRouter);
app.use("/adminSupport", adminSupportRouter);

/*******************ROUTES******************/

const MONGODB_URL = process.env.MONGODB_URL;

Connection(MONGODB_URL);

app.listen(PORT, (err) => {
  if (err) {
    console.log(`Error while listening on PORT: ${PORT}`);
  } else {
    console.log(`Server is listening on PORT: ${PORT}`);
  }
});

/***************************************/
