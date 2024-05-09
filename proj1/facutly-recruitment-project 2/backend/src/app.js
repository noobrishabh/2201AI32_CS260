import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}
))

app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(cookieParser());

//routes import

import userRouter from './routes/user.routes.js';
import form1Router from './routes/form.routes.js';

//routes declaration

app.use("/api/v1/users",userRouter);
app.use("/api/v1/forms",form1Router);

export {app};