import express from 'express';
import { 
    getAllAdmin, getAllMenu, getAllOrders, getSingleAdmin, getAllBeverages,
    getAllStudents, getSingleStudent, getSingleOrder,
    getSingleMainDish, getAllSidesDish, getSingleBeverage,
    createAdmin, createMainDish, createMainStyle, createSideDish, createSideStyle,
    createBeverage, createMenu, editAdmin, editMainDish, editMainStyle, editMenu,
    editBeverage, deleteAdmin, deleteMainDish, deleteMainStyle, deleteMenu, deleteOrders,
    deleteSideDish, deleteSideStyle, deleteStudent, adminUserExists, isLoginCorrect,
    searchAdmin, searchStudent, getAllLunchDish, getAllLunchStyles, getAllSideStyle, 
    getSingleMainStyle, getSingleSideDish, getSingleSideStyle, getSingleMenu
} from '../database/database.js';
import { getRounds } from 'bcryptjs';

export const adminPage = express.Router()

[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]
//                      View Pages
[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]

// this is the page projected for the by the wireframe.
adminPage.get('/adminhome ', async(req,res)=>{
    const menu = await getAllMenu();
    const orders = await getAllOrders();
    const students = await getAllStudents();
    res.render('adminHomPage',{
        studentList: students,
        ordersList: orders,
        mainDish: menu,
        title: 'admin Home Page'
    });
});
// shows only the the full list of lunch, beverage and side menu's 
// (first portal to the edit options)
adminPage.get('/adminLunchMenu', async(req,res)=>{
    const LunchMenu = await getAllLunchDish();
    const SidesMenu = await getAllSidesDish();
    const LunchStyle = await getAllLunchStyles();
    const SideStyle = await getAllSideStyle();
    const Beverage = await getAllBeverages();
    res.render('adminLunchPage',{
        lunches:LunchMenu,
        lunchstyle:LunchStyle,
        sides:SidesMenu,
        sidestyle:SideStyle,
        beverages:Beverage,
        title:"Veiw of all the menu's"
    });
});
// this shows the full list of administrator
adminPage.get('/administrators', async(req,res)=>{
    const admin = await getAllAdmin();
    res.render('administrators',{
        admins:admin,
        title:"Full list of Administrators"
    });
});
// this shows a list of students and their information
adminPage.get('/adminStudentView', async(req,res)=>{
    const student = await getAllStudents();
    res.render('adminStudentView',{
        data:student,
        title:'full list of students'
    });
});
// these are the pages for each edit page
// lunch edit
adminPage.get('/adminLunchMenuEdit/:id', async(req,res)=>{
    const id = req.params.id
    const maindish = await getSingleMainDish(id);
    res.render('adminMainEditView',{
        data:maindish,
        title:'single view of the lunch option'
    });
});
// lunch style edit
adminPage.get('adminLunchStyleMenuEdit/:id',async(req,res)=>{
    const id = req.params.id
    const mainstyle = await getSingleMainStyle(id);
    res.render('adminMainStyleEditView',{
        data:mainstyle,
        title:'single view of the lunch style option'
    });
});
// side edit
adminPage.get('/adminSideMenuEdit/:id', async(req,res)=>{
    const id = req.params.id
    const sidemenu = await getSingleSideDish(id);
    res.render('adminSideMenuEditView',{
        data:sidemenu,
        title:'single view of the side menu option'
    });
});
// side style edit
adminPage.get('/adminSideStyleEdit/:id', async(req,res)=>{
    const id = req.params.id
    const sidestyle = await getSingleSideStyle(id);
    res.render('adminSideStyleEditView',{
        data:sidestyle,
        title:'single view of the side style option'
    });
});
// beverage edit
adminPage.get('/adminBeverageEdit/:id', async(req,res)=>{
    const id = req.params.id
    const beverage = await getSingleBeverage(id);
    res.render('adminBeverageEditView',{
        data:beverage,
        title:"single view of the bevarages option"
    });
});
// this allows the admin to see the student and their 
//  status and if they may need to removed
adminPage.get('/adminSingleStudentView/:id', async(req,res)=>{
    const id = req.params.id
    const order = await getSingleOrder(id);
    const student = await getSingleStudent(id);
    res.render('adminSingleStudentView',{
        data:student,
        order:order,
        title:'single student view'
    });
});
// the view for each menu item
// (portal for editing the menu option)
adminPage.get('/adminSingleMenuView/:id', async(req,res)=>{
    const id = req.params.id
    const item = await getSingleMenu(id);
    res.render('adminSingleMenuView',{
        data:item,
        title:'single menu item view'
    });
});
// single view for each admin
adminPage.get('/administratorSingleView/:id', async(req,res)=>{
    const id = req.params.id
    const admin = await getSingleAdmin(id);
    res.render('administratorSingleView',{
        title:'Single view Of Administrator'
    });
});
// the veiw for create the menu
adminPage.get('/adminCreateMenu', async(req,res)=>{
    res.render('adminCreateMenu',{
        title:'Create a Menu item'
    });
});
// view for the main lunch 
adminPage.get('/adminCreateLunch', async (req,res)=>{
    res.render('adminCreateLunch',{
        title:'Create a main dish'
    });
});
// view for lunch style
adminPage.get('/adminCreateLunchStyle', async(req,res)=>{
    res.render('adminCreateLunchStyle', {
        title:'Create a style for the lunch item'
    });
});
// view for side dish
adminPage.get('/adminCreateSideDish', async(req,res)=>{
    res.render('adminCreateSideDish',{
        title:"Create a side dish"
    });
});
// view for the style of side dish
adminPage.get('/adminCreateStyle', async(req,res)=>{
    res.render('adminCreateStyle',{
        title:"Create the Style of Side dish"
    });
});
// this is the view for the beverage
adminPage.get('/adminCreateBeverage', async(req,res)=>{
    res.render('adminCreateBeverage',{
        title:"Create a Beverage"
    });
});
[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]
//                   post functions
[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]

// this creates the administrator
adminPage.post('/createAdmin', async(req,res)=>{
    const newAdmin = new Object();
    let vfile = ""
    if(req.files){
        vfile = `${getRandomHex(8)}_${req.files.image.name}`
    }
    newAdmin.first_name = req.body.first_name,
    newAdmin.last_name = req.body.last_name,
    newAdmin.position = req.body.position
    newAdmin.email = req.body.email,
    newAdmin.image = vfile,
    newAdmin.password = req.body.password
    if(req.files){
        req.files.image.mv("./uploads"+ vfiles)
    }
    await createAdmin(newAdmin);
    res.redirect('/administrators')
});
// this creates the lunches
adminPage.post('/createLunch', async(req,res)=>{
    const newLunch = new Object();
    let vfile = ""
    if(req.files){
        vfile = `${getRandomHex(8)}_${req.files.image.name}`
    }
    newLunch.name = req.body.name,
    newLunch.avaible = req.body.avaible,
    newLunch.image = vfile
    if(req.files){
        req.files.image.mv("./upload"+ vfiles)
    }
    await createMainDish(newLunch);
    res.redirect('/adminLunchMenu')
});
// creation of lunch style
adminPage.post('/createLunchStyle', async(req,res)=>{
    const newLunchstyle = new Object();
    let vfile=''
    if(req.files){
        vfile = `${getRandomHex(8)}_${req.files.image.name}`
    }
    newLunchstyle.name = req.bodynewLunchstyle.name,
    newLunchstyle.available = req.body.available,
    newLunchstyle = vfile
    if(req.files){
        req.files.image.mv('/./upload'+ vfiles)
    }
    await createMainStyle(newLunchstyle)
    res.redirect('/adminLunchMenu')
});
// creat side dish
adminPage.post('/createSide', async(req,res)=>{
    const newSide = new Object();
    let vfile = ''
    if(req.files){
        vfile = `${getRandomHex(8)}_${req.files.image.name}`
    }
    newSide.name = req.body.name,
    newSide.available = req.body.available,
    newSide.image = vfile
    if(req.files){
        req.files.image.mv('./upload' + vfile)
    }
    await createSideDish(newSide);
    res.redirect('/adminLunchMenu')
});
// creation of sidedish styles
adminPage.post('/createSideStyle', async(req,res)=>{
    const newSideStyle = new Object();
    let vfile = ""
    if(req.files){
        vfile = `${getRandomHex(8)}_${req.files.image.name}`
    };
    newSideStyle.name = req.body.name,
    newSideStyle.avaible = req.body.avaible,
    newSideStyle.image = vfile
    if(req.files){
        req.files.image.mv('./upload'+ vfile)
    };
    await createSideStyle(newSideStyle);
    res.redirect('/adminLunchMenu');
});
// creation of beverage
adminPage.post('/createBeverage', async(req,res)=>{
    const newBeverage = new Object();
    let vfile = ""
    if(req.files){
        vfile = `${getRandomHex(8)}_${req.files.image.name}}`
    };
    newBeverage.name = req.body.name,
    newBeverage.available = req.body.available,
    newBeverage.image = vfile
    if(req.files){
        req.files.image.mv('./upload'+ vfile)
    };
    await createBeverage(newBeverage);
    res.redirect('/adminLunchMenu');
});
// menu creation 
adminPage.post('/createMenu', async(req,res)=>{
    const newMenu = new Object();
    newMenu.main_dish = req.body.main_dish,
    newMenu.main_style = req.body.main_style,
    newMenu.side_main = req.body.side_main,
    newMenu.side_style = req.body.side_style,
    newMenu.beverage = req.body.beverage
    await createMenu(newMenu)
    res.redirect('/adminLunchMenu');
});
[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]
//              edit functions
[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]
// this is used in the edit page veiw
adminPage.post('/editAdmin', async(req,res)=>{
    const id = req.body.id
    const changedAdmin = new Object();
    let vfile= '';
    if(req.files){
        vfile = `${getRandomHex(8)}_${req.files.image.name}`
    }else{
        const image = await getSingleAdmin(id);
        vfile = image.image;
    }
    changedAdmin.id = req.body.id,
    changedAdmin.first_name = req.body.first_name,
    changedAdmin.last_name = req.body.last_name,
    changedAdmin.position = req.body.position,
    changedAdmin.email = req.body.email,
    changedAdmin.image = vfile
    if(req.files){
        req.file.image.mv('./uploads' + vfile);
    }
    await editAdmin(changedAdmin);
    res.redirect('/administratorSingleView/' + id);
});
// edit post for menu
adminPage.post('/editMenu',async(req,res)=>{
    const id = req.body.id
    const changedMenu = new Object();
    changedMenu.id = req.body.id,
    changedMenu.main_dish = req.body.main_dish,
    changedMenu.main_style = req.body.main_style,
    changedMenu.side_main = req.body.side_style,
    changedMenu.beverage = req.body.beverage
    await editMenu(changedMenu);
    res.redirect('/adminSingleMenuView/'+ id);
});
// edit post for main dish
adminPage.post('/editMainDish', async(req,res)=>{
    const id = req.body.id
    const editedLunch = new Object();
    let vfile = '';
    if(req.files){
        vfile = `${getRandomHex(8)}_${req.files.image.name}`
    }else{
        const image = await getSingleMainDish(id);
        vfile = image.image;
    }
    editedLunch.id = req.body.id,
    editedLunch.name = req.body.name,
    editedLunch.image = vfile,
    editedLunch.available = req.body.available
    await editMainDish(editedLunch)
    res.redirect('/adminLunchMenuEdit/'+ id);
});
adminPage.post('/editMainStyle', async(req,res)=>{
    const id = req.body.id;
    const editedStyle = new Object();
    let vfile = '';
    if(req.files){
        vfile = `${getRandomHex(8)}_${req.files.image.name}`
    }else{
        const image = await getSingleMainStyle(id);
        vfile = image.image;
    }
    editedStyle.id = req.body.id,
    editedStyle.style = req.body.style,
    editedStyle.image = vfile,
    editedStyle.available = req.body.available
    await editMainStyle(editedStyle)
    res.redirect('adminLunchStyleMenuEdit/'+ id);
});
adminPage.post('/editBeverage', async(req,res)=>{
    const id = req.body.id;
    const editedBeverage = new Object();
    let vfile = '';
    if(req.files){
        vfile=`${getRandomHex(8)}_${req.files.image.name}`
    }else{
        const image = await getSingleBeverage(id);
        vfile = image.image;
    }
    editedBeverage.id = req.body.id,
    editedBeverage.name = req.body.name,
    editedBeverage.available = req.body.avaible,
    editedBeverage.image = vfile
    await editBeverage(editedBeverage);
    res.redirect('/adminBeverageEdit/'+id)
});
// side dish and style edits are required