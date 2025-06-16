import express from "express";
import "dotenv/config";
import bodyParser from "body-parser";
import { authRouter, notesRouter } from "./modules/index.js";
import cors from "cors";

const app = express();
const port = process.env.PORT;

const allowedOrigins = ["http://localhost:3145"];

app.use(bodyParser.json());
app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
    })
);

app.use((err, req, res, next) => {
    if (err instanceof Error && err.message === "Not allowed by CORS") {
        res.status(403).json({
            success: false,
            error: "Your origin is not allowed by CORS policy.",
        });
    } else {
        next(err);
    }
});

app.use("/api/auth", authRouter);
app.use("/api/notes", notesRouter);

app.listen(port, () => {
    console.log(`Server running on http://127.0.0.1:${port}`);
});
