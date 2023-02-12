import express from "express";
import morgan from "morgan";
import { AppDataSource } from "./data-source";
// default로 export한 router를 authRoutes라는 이름으로 import
import authRoutes from "./routes/auth";
import subRoutes from "./routes/subs";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

const app = express();
const origin = "http://localhost:3000";

app.use(cors({ origin, credentials: true }));

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.static("public"));

dotenv.config();

app.get("/", (_, res) => res.send("running"));
app.use("/api/auth", authRoutes);
app.use("/api/subs", subRoutes);

let port = 4000;
app.listen(port, async () => {
  console.log(`Server running at http://localhost:${port}`);

  AppDataSource.initialize()
    .then(async () => {
      console.log("database initialized");
    })
    .catch((error) => console.log(error));
});
