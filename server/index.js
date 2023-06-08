import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import KPI from "./models/KPI.js";
import kpiRoutes from "./routes/kpi.js";
import productRoutes from "./routes/product.js";
import transactionRoutes from "./routes/transaction.js";
import { kpis, products, transactions } from "./data/data.js";
import Product from "./models/Product.js";
import Transaction from "./models/Transaction.js";

dotenv.config();
const port = process.env.PORT || 9000;
const app = express();
app.use(express.json());
app.use(morgan("common"));
app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(helmet());
// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.get("/", function (req, res) {
  res.send("hello");
});
app.use("/kpi", kpiRoutes);
app.use("/product", productRoutes);
app.use("/transaction", transactionRoutes);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //   useMongoClient: true,
  })
  .then(async () => {
    app.listen(port, () =>
      console.log(`Server run on http://localhost:${port}`)
    );
    // ADD only 1 time when start
    // await mongoose.connection.db.dropDatabase();
    // KPI.insertMany(kpis);
    // Product.insertMany(products);
    // Transaction.insertMany(transactions);
  })
  .catch((error) => console.log(`${error} did not connect`));
