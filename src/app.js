import express from "express";
let app = express();
// basic configuration.
app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))

app.get("/", (req, res) => {
  res.send("welcome to basecampy");
});
export default app;
