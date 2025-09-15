import express from "express";
import cors from "cors";
let app = express();
// basic configuration.
app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
// cors configuration
app.use(cors({
  origin:process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173"
}))

app.get("/", (req, res) => {
  res.send("welcome to basecampy");
});
export default app;
