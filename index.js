import "dotenv/config.js";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./src/routes/router.js";
import connectDB from "./src/lib/db.js";

const app = express();
const port = process.env.PORT || 6001;

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://nexo.jrts.site"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use("/api", router);

connectDB().then(() => {
  app.listen(port, () =>
    console.log(
      `server is running on port ${port} or visit https://localhost:${port}`
    )
  );
});
