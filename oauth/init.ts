import express from "express";
import route from "./Route";
import cors from "cors";

const app = express();
const session = require("express-session");
const corsOptions = {
   origin: "http://localhost:8080",
   credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
   session({
      secret: "secret",
      resave: false,
      saveUninitialized: true,
      cookie: {
         httpOnly: true
      }
   })
);
route(app);

export default app;
