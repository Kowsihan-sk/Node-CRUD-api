import dotenv from "dotenv";
dotenv.config();
import express, { json, urlencoded } from "express";

import connectDB from "./config/db.js";
import userRouter from "./route/userRoutes.js";

const app = express();
const PORT = 5000 || process.env.PORT;

app.use(json());
app.use(urlencoded({ extended: true }));

connectDB();

app.get("/", (req, res) => {
    res.send("API working!");
})

app.use("/api/", userRouter);

app.listen(PORT, () => {
    console.log(`app listening on PORT : ${PORT}`);
})