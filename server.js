import dotenv from "dotenv";
dotenv.config();
import express, { json, urlencoded } from "express";
import cors from "cors";

import connectDB from "./config/db.js";
import userRouter from "./route/userRoutes.js";

const app = express();

connectDB();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());


app.get("/", (req, res) => {
    res.send("API working!");
})

app.use("/api/", userRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`app listening on PORT : ${PORT}`);
})