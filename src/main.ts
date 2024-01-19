require('dotenv').config();
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import * as fs from "fs";

import { configs, initPassport, routes } from './core';
import { errorHandler } from './shared/utils';
import passport from './core/config/passport.config';

const app = express();

// CORS
app.use(cors({
    origin: "*"
}));





//  MiddleWare To Set The New Date
let date = new Date().toLocaleDateString('en-GB');
app.use((req, res, next)=>{
    let newDate = new Date().toLocaleDateString('en-GB');
    if(date !== newDate) date = newDate; 
    next();
})
//new Date().toISOString().split("T")[0];
//new Date().toISOString().replace("T", "&").replace(/\./g, ",").replace(":", "h").replace(":", "m").replace("Z", "s");

// Logger
const genName = date.replace(/\//g, "-");
var logFile = fs.createWriteStream(`./logs/${genName}.log`, { flags: "a" });
app.use(logger("combined", { stream: logFile }));

// Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// Session
app.use(session({
    secret: configs.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: true,
        maxAge: 3600000
    }
}));

// Passport
initPassport();
app.use(passport.initialize());
app.use(passport.session());


// Routes
app.use(routes);


// ERROR HANDLER
app.use(errorHandler);

app.listen(configs.PORT, ()=>{
    console.log(`Running on Port ${configs.PORT}`);
})


