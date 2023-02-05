"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
let cors = require('cors');
// import cors from 'cors';
const express = require('express');
const bodyparser = require("body-parser");
const app = express();
app.use(cors());
var port = 5550;
// const url = 'https://stage-api.homluv.com/api/nlc/category?pagesize=16&page=1&category=trends&ctr=5';
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.query);
    let response;
    const { category, search, title } = req.query;
    if (category) {
        console.log(1);
        response = yield fetch(`https://stage-api.homluv.com/api/nlc/category?pagesize=${req.query.pagesize}&page=${req.query.page}&category=${category}&ctr=5`);
    }
    else if (search) {
        console.log(2);
        response = yield fetch(`https://stage-api.homluv.com/api/nlc/articles?pagesize=${req.query.pagsize}&page=${req.query.page}&search=${search}&ctr=12`);
    }
    else if (title) {
        console.log(4);
        response = yield fetch(`https://stage-api.homluv.com/api/nlc/detail?title=${title}`);
    }
    else {
        console.log(3, `${req.query.page}`);
        response = yield fetch(`https://stage-api.homluv.com/api/nlc/articles?pagesize=${req.query.pagesize}&page=${req.query.page}&ctr=14`);
    }
    response = yield response.json();
    res.status(200).send(response);
}));
app.listen(port, (req, res) => {
    console.log(`working on port : ${port}`);
});
