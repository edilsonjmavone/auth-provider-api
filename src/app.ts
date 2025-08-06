import express from "express";
import cookieParser from "cookie-parser";
import { verify } from "./utils/authUtils";
import authRoutes from "./routes/auth";
import cors from "cors";
import { handleError } from "./utils/errorHandler";
import { serialize } from "node:v8";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json())

app.use(cookieParser())

app.use((req, res, next) => {
    console.log("Use agent: ", req.headers["user-agent"])
    next()
})

app.use(authRoutes)



app.get("/user", verify, async (req, res) => {
    console.log("requested authed")

    try {
        res.json({ userList: ['er', 'erer', 'eerrer'] }).status(200)
    } catch (error) {
        handleError(error, req, res)
    }
})

// check if user is in the database

app.listen(PORT, () => console.log("Live in 3...2..1"))


