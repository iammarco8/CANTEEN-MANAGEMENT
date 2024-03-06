// <<<<<<< HEAD
import express from "express";
import {getRandomHexValues} from './utils/utils.js';
import { decryptPW } from "./utils/auth.js";
import fileUpload from "express-fileupload";
import session from 'express-session';
import { adminPage, } from "./rout/adminRout.js";
import { homePage, } from "./rout/homeRout.js";

const port = 7777;
const app = express();

app.use('/', homePage); // student veiw  main veiw
app.use('/', adminPage);
app.use('/', contactPage);
app.use('/', aboutPage);
app.use('/', loginPage)

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

// creates the student 
// adminPage.post('/createStudent', async(req,res)=>{
//     const newStudent = new Object();
//     let vlife = ""
//     if(req.files){
//         vfile = `${getRandomHex(8)}_${req.files.image.name}`
//     }
//     newStudent.first_name = req.body.first_name,
//     newStudent.last_name = req.body.last_name,
//     newStudent.location = req.body.location,
//     newStudent.allergies = req.body.allergies,
//     newStudent.image = vfile,
//     newStudent.password = req.body.password
//     if(req.files){
//         req.files.image.mv('./uploads'+ vfiles)
//     }
//     await createStudent(newStudent)
//     res.redirect('/stdents')
// });
// =======
// import express from "express";
// import {getRandomHexValues} from './utils/utils.js';
// import { decryptPW } from "./utils/auth.js";
// import fileUpload from "express-fileupload";
// import session from 'express-session';
// // import {} from ;

// const port = 7777;
// const app = express();

// app.use('/',homePage);
// app.use('/',adminPage);
// app.use('/',aboutPage);
// app.use('/',)

// app.set('veiw engine', 'ejs')
// app.use(express.urlencoded({
//     extended:true
// }));

// app.use(express.static('public'));
// app.use('/assets', express.static('assets'));
// app.use(
//     fileUpload({
//         limits:{
//             fileSize: 10 * 1024 * 1024,
//         },
//         abortOnLimit:true,
//     })
// );
// app.use(session({
//     secret:"canteen management",
//     resave:true,
//     saveUninitialized:true,
//     cookie:{
//         maxAge:48000*2
//     }
// }));


// app.listen(port, ()=>{
//     console.log('type: localhost:${port}')
// })
// >>>>>>> b06bab52594600419918dd909c1ef9003054d268
