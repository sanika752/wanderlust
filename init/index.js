require("dotenv").config();


const dns = require("dns");
dns.setServers(["8.8.8.8"]);


const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");


//const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const dbUrl = process.env.ATLASDB_URL;
main().then(()=>{
console.log("connected to DB");
}).catch(err =>{
    console.log(err);
});
async function main(){
    await mongoose.connect(dbUrl);
}

const initDB = async () =>{
   await Listing.deleteMany({});
   initData.data = initData.data.map((obj) =>({...obj, owner:"6a28229562d38b4adf89bafc"}));
   await Listing.insertMany(initData.data);
   console.log("data was initialized");
};

initDB();




