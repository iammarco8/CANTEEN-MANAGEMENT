import express from 'express';
import { 
    getAllAdmin, getAllMenu, getAllOrders, getSingleAdmin, getAllBeverages,
    getAllStudents, getSingleStudent, getSingleOrder,
    getSingleMainDish, getAllSidesDish, getSingleBeverage,
    createAdmin, createMainDish, createMainStyle, createSideDish, createSideStyle,
    createBeverage, createMenu, editAdmin, editMainDish, editMainStyle, editMenu,
    editBeverage, deleteAdmin, deleteMainDish, deleteMainStyle, deleteMenu, deleteOrders,
    deleteSideDish, deleteSideStyle, deleteStudent, adminUserExists, isLoginCorrect,
    searchAdmin, searchStudent
} from '../database/database';

export const homePage = express.Router()

homePage.get('/', async(req,res)=>{
    const result = await getAllMenu();
    res.render('homPage',{
        mainDish: result,
        title: 'admin Home Page'
    })
});