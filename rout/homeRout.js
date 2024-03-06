import express from 'express';
import {
    getAllMenu, getAllLunchDish, getAllLunchStyles,
    getAllSidesDish, getAllSideStyle, getAllBeverages,
    getPopularOrder,
    // 
    createStudent, createOdrer,
    //  
    getSingleStudent, getSingleMenu, getSingleOrder,
    getSingleMainDish, getSingleMainStyle, getSingleSideDish,
    getSingleSideStyle, getSingleBeverage,
    // 
    editStudent, editOrder,
    //
    deleteOrders, deleteStudent
    // 
} from '../database/database.js';
import { getRounds } from 'bcryptjs';

export const homePage = express.Router()


[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]
//       page for home and student main veiw
[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]
// home outside of login
homePage.get('/home', async(req,res)=>{
    // this returns most chosen option
    const popular = await getPopularOrder();
    // using the "popular" as data in the loop you can 
    // use the top five or six options to display

//expecting: for(let i < 6; i++){
            // <ul>
                // <li>popular[i].main_dish</li>
                // <li>popular[i].main_style</li>
                // <li>popular[i].side_dish</li>
                // <li>popular[i].side_style</li>
                // <li>popular[i].beverage</li>
            // </ul>
        // }
    res.render('home',{
        popular:popular,
        title:'Home Page'
    });
});
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
homePage.get('/studentOrderCreate/:id', async(req,res)=>{
    // this is the order creation form page
    const id = req.params.id;
    // the menu should be able to populate the values needed for the post
    // method.
    const menu = getAllMenu()
    res.render('studentMenuSelect',{
        title:"Select the option you'd Like"
    });
});
homePage.get('/studentSpecificOrder/:id', async(req,res)=>{
    // this will show the means to create aspecific order
    // utalize the 'value' funtion in the of the 'select' tag to make oreders
    const id = req.params.id;
    const Lunch = getAllLunchDish();
    const lunch
})