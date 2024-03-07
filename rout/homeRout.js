import express from 'express';
import {
    getAllMenu, getAllLunchDish, getAllLunchStyles,
    getAllSidesDish, getAllSideStyle, getAllBeverages,
    getPopularOrder,
    // 
    createStudent, createOdrer,
    //  
    getSingleStudent, getSingleOrder,
    // 
    editStudent, editOrder,
    //
    deleteOrders
    // 
} from '../database/database.js';
import { getRounds } from 'bcryptjs';
import { name } from 'ejs';
import { escape } from 'mysql2';

export const homePage = express.Router()

[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]
//  Page for home and student main veiw (read)  \\ 
[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]
// home outside of login
homePage.get('/home', async(req,res)=>{
    // this returns most chosen option
    const popular = await getPopularOrder();
    // using the "popular" as data in the loop you can 
    // use the top five or six options to display
    ///////////////////////////////////////////////////
    //expecting: for(let i < 6; i++){
                // <ul>
                    // <li>popular[i].main_dish</li>
                    // <li>popular[i].main_style</li>
                    // <li>popular[i].side_dish</li>
                    // <li>popular[i].side_style</li>
                    // <li>popular[i].beverage</li>
                // </ul>
            // }
    ///////////////////////////////////////////////////
    res.render('home',{
        popular:popular,
        title:'Home Page'
    });
});
// vewis specifically for the students view \\
homePage.get('/studentHome/:id', async(req,res)=>{
    const id = req.params.id
    const popular = await getPopularOrder();
    const option = await getSingleOrder(id);
    res.render('studentHome',{
        popular:popular,
        option:option,
        title:"Student Page"
    });
});
// creating an using order using the menu values \\
homePage.get('/studentOrderCreate/:id', async(req,res)=>{
    // this is the order creation form page
    const id = req.params.id;
    // the menu.values[id] should be able to populate the values needed for the post
    // method.
    const student = getSingleStudent(id)
    const menu = getAllMenu()
    res.render('studentMenuSelect',{
        menu:menu,
        student:student,
        title:"Select the option you'd Like"
    });
});
// creating a specific order using the ".id" values of each option \\
homePage.get('/studentSpecificOrder/:id', async(req,res)=>{
    // this will show the means to create aspecific order
    // utalize the 'value' funtion in the of the 'select' tag to make oreders
    const id = req.params.id;
    const student = getSingleStudent(id)
    const Lunch = getAllLunchDish();
    const LunchStyle = getAllLunchStyles();
    const Side = getAllSidesDish();
    const SideStyles = getAllSideStyle();
    const Bevereage = getAllBeverages();
    // include a post for creating the order in the ejs
    res.render('studentSpecificOrder',{
        student:student,
        Lunch:Lunch,
        LunchStyle:LunchStyle,
        Side:Side,
        SideStyles:SideStyles,
        Bevereage:Bevereage,
        title:"Create your custome order"
    });
});
// page for editing the profile of each student \\
homePage.get('/studentEdit/:id',async(req,res)=>{
    const id = req.params.id;
    const student = getSingleStudent(id);
    res.render('studentProfileEdit',{
        student:student,
        title:'Profile'
    });
});
// editing the already made order \\
homePage.get('/studentOderEdit/:id', async(req,res)=>{
    const id = req.params.id;
    const student = getSingleStudent(id);
    const order = getSingleOrder(id);
    // the student should be able to remake the order from the menu list 
    // a date check function should be included to limit the ability to remake 
    // the order on the day of that order
    const menu = getAllMenu();
    res.render('studentOrderEdit',{
        student:student,
        order:order,
        menu:menu,
        title:'Edit your order'
    });
});

[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]
//         post section (create routs)          \\
[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]
// student create 
homePage.post('/createStudent', async(req,res)=>{
    const newStudent = new Object();
    let vfile = '';
    let allergies = null;
    if(req.files){
        vfile = `${getRandomHex(8)}_${req.files.image.name}`
    }
    if(req.body.allergies){
        allergies = `${req.body.allergies}` 
    }
    newStudent.first_name = req.body.first_name,
    newStudent.last_name = req.body.last_name,
    newStudent.location = req.body.location,
    newStudent.allergies = allergies,
    newStudent.email = req.body.email,
    newStudent.image = vfile,
    newStudent.password = req.body.password
    await createStudent(newStudent);
//  await getSingleStudent(newStudent.id)
    //  (the plan was to pull the id from the newly created student 
    //  and pass the id to the param to accomadate th req.params features
    //  of the other functions. then redirect to the student page
    //  but at this point i havnt made the email confirmation yet either)
    // * res.redirect('/studentLogin') \\
    //  (this should pass the id into the params instead)

    // this is a test
    res.redirect('/studentHome/'+ newStudent.id)
});
// order create 
homePage.post('/createOrder', async(req,res)=>{
    const newOrder = new Object()
    // the id should be passed into the variable from the page where the param
    // was passed into it
    newOrder.student_id = id,
    newOrder.main_dish_id = req.body.main_dish_id,
    newOrder.main_style_id = req.body.main_style_id,
    newOrder.side_dish_id = req.body.side_style_id,
    newOrder.bevereage = req.body.bevereage,
    newOrder.day = req.body.day
    await createOdrer(newOrder);
    res.redirect('/studentSpecificOrder/'+ newOrder.id)
});
[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]
//                  edit routs                  \\
[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]
homePage.post('/editStudendProfile/:id', async(req,res)=>{
    const id = req.body.id
    const eStudent = new Object()
    let vfile = '';
    if(req.files){
        vfile = `${getRandomHex(8)}_${req.files.image.name}`
    }else{
        const image = await getSingleStudent(id);
        vfile = image.image;
    }
    eStudent.id = req.body.id,
    eStudent.first_name = req.body.first_name,
    eStudent.last_name = req.body.last_name,
    eStudent.location = req.body.location,
    eStudent.email = req.body.email,
    eStudent.image = vfile,
    eStudent.password = req.body.pasword,
    if(req.files){
        req.file.image.mv('./uploads' + vfile);
    }
    await editStudent(eStudent);
    res.redirect('/student/' + id);
});
homePage.post('/editSudentOrder/:id', async(req,res)=>{
    const student_id = req.params.id;
    const orderId = await getSingleOrder(student_id);
    const id = orderId.id;
    const eOrder = new Object();
    let vfile = '';
    if(req.files){
        vfile = `${getRandomHex(8)}_${req.file.image.name}`
    }else{
        const image = await getSingleOrder(student_id)
        vfiles = image.image;
    }
    eOrder.id = id,
    eOrder.main_dish_id = req.body.main_dish_id,
    eOrder.main_dish_style = req.body.main_dish_style,
    eOrder.side_dish = req.body.side_dish,
    eOrder.side_style = req.body.side_style,
    eOrder.bevereage = req.body.bevereage
    await editOrder(eOrder)
    res.redirect('/studentHome/' + student_id)
});
[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]
//                 delete routs                 \\
[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]
homePage.get('/deleteOrder/:id', async(req,res)=>{
    // im expecting the order id to be passed to the param
    const student_id = req.body.student_id
    const id = id;
    await deleteOrders(id);
    res.redirect('/studentHome/' + student_id)
});
// students should not have the freedom to delete their accounts
// that power is reserved for the admins

// ====================================================
//                         END                       \\
// ====================================================