import express from "express";
let app = express();
app.use(express.json({limit}));
app.get("/", (req, res) => {
  res.send("welcome to basecampy");
});
export default app;
