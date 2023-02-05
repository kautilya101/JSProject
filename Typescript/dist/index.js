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
const express = require('express');
const bodyparser = require("body-parser");
const app = express();
app.use(cors());
var port = 5000;
const url = 'https://randomuser.me/api/?page=1&results=20&seed=foobar';
fetch(url).then(res => res.json());
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let response = yield fetch(`https://randomuser.me/api/?page=${req.query.page}&results=${req.query.results}&seed=foobar`);
    response = yield response.json();
    res.status(200).send(response);
}));
app.listen(port, (req, res) => {
    console.log(`working on port : ${port}`);
});
