const express = require('express');
const app = express();
const path = require('path');
const axios = require('axios');
const mc=require("mongodb").MongoClient
const dataBaseUrl ="mongodb+srv://madhu:madhu@clusterbackend.szevd.mongodb.net/myfirstdb?retryWrites=true&w=majority"
let dataBaseObj;

mc.connect(dataBaseUrl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client)=>
{
    if(err)
    {
        console.log("err in mongodb connection",err)
    }
    else
    {
        dataBaseObj=client.db("myfirstdb")
        console.log("connected to database")
       start()
    }
})


// Serve only the static files form the dist directory
app.use(express.static('./dist/rccolumncalculator'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/rccolumncalculator/'}),
);


const  start = async () => 
{
  
    try {
        const resp= await axios.get('https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=+latitude+&longitude=+longitude+&localityLanguage=en')
        const newUser = 
        {
        "latitude":resp.data.latitude,
        "longitude":resp.data.longitude,
        "locality":resp.data.locality,
        "district":resp.data.localityInfo.administrative[2].name,
        "mandal":resp.data.localityInfo.administrative[3].name,
        }
       console.log("yeah",newUser)

       await dataBaseObj.collection("mycollection").insertOne(newUser)
       
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
}





const port=3000|| 8080;
app.listen(port,()=>console.log(`server working on ${port}...`))