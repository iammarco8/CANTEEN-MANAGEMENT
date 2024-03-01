import express from "express";
import {getRandomHexValues} from './utils/utils.js';
import { decryptPW } from "./utils/auth.js";
import fileUpload from "express-fileupload";
import session from 'express-session';
// import {} from ;

const port = 7777;
const app = express();

app.use('/',homePage);
app.use('/',adminPage);
app.use('/',aboutPage);
app.use('/',)

app.set('veiw engine', 'ejs')
app.use(express.urlencoded({
    extended:true
}));

app.use(express.static('public'));
app.use('/assets', express.static('assets'));
app.use(
    fileUpload({
        limits:{
            fileSize: 10 * 1024 * 1024,
        },
        abortOnLimit:true,
    })
);
app.use(session({
    secret:"canteen management",
    resave:true,
    saveUninitialized:true,
    cookie:{
        maxAge:48000*2
    }
}));


app.listen(port, ()=>{
    console.log('type: localhost:${port}')
})