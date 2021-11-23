import dotenv from "dotenv";
dotenv.config();
import express, { json, urlencoded } from "express";
import cors from "cors";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI, { setup } from "swagger-ui-express";
import path from "path"

import connectDB from "./config/db.js";
import userRouter from "./route/userRoutes.js";

const app = express();

connectDB();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "User API",
            version: "1.0.0",
            description: "A Simple Node User API"
        },
        servers: [
            {
                url: "https://crud--api.herokuapp.com/",
                description: "This is heroku server"
            }, {
                url: "http://localhost:5000/",
                description: "This is local server"
            }
        ]
    },
    apis: ["./route/*.js"]
};


app.get("/", (req, res) => {
    // res.send("<h1>API working</h1>");
    res.sendFile(path.resolve() + "/home.html")
})

const specs = swaggerJSDoc(options);

app.use("/api-docs", swaggerUI.serve, setup(specs));

app.use("/users", userRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`app listening on PORT : ${PORT}`);
})