import dotenv from "dotenv"
dotenv.config({
    path:"./.env",
});
let myusername=process.env.username;
console.log("value : ",myusername);
let database = process.env.database;
console.log("value : ", database);


console.log("start of awesome backend project");
