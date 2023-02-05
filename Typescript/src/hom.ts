import { Request, Response } from "express";

let cors = require('cors')
// import cors from 'cors';
const express = require('express');


const bodyparser = require("body-parser");


const app = express();
app.use(cors());
var port = 5550;
// const url = 'https://stage-api.homluv.com/api/nlc/category?pagesize=16&page=1&category=trends&ctr=5';



app.get("/", async (req : Request,res: Response) => {
    console.log(req.query);
    let response;
    const {category, search, title} = req.query;
    if(category){
        console.log(1);
    response = await fetch(`https://stage-api.homluv.com/api/nlc/category?pagesize=${req.query.pagesize}&page=${req.query.page}&category=${category}&ctr=5`);
    }
    else if(search){
        console.log(2);
        response = await fetch(`https://stage-api.homluv.com/api/nlc/articles?pagesize=${req.query.pagsize}&page=${req.query.page}&search=${search}&ctr=12`);
    }
    else if( title){
        console.log(4);
        response = await fetch(`https://stage-api.homluv.com/api/nlc/detail?title=${title}`);
    }
    else{
        console.log(3,`${req.query.page}`);
    response = await fetch(`https://stage-api.homluv.com/api/nlc/articles?pagesize=${req.query.pagesize}&page=${req.query.page}&ctr=14`);
    }
    response = await response.json();
    res.status(200).send(response);
})


app.listen(port, (req : Request,res : Response) =>{
    console.log(`working on port : ${port}`);
})