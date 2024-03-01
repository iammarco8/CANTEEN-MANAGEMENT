import mysql from "mysql2";
import dotenv from 'dotenv';
import { encryptPW } from '../utils/auth.js';
// import e from "express";

dotenv.config({path: '/config.env'})
const pool = mysql.createPool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_NAME
}).promise();

// [[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]
//                  full lists
// [[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]
export const getAllAdmin= async()=>{
    const [list] = await pool.query(`SELECT * FROM admin`)
    return list
}
export const getAllStudents= async ()=>{
    const [list] = await pool.query(`SELECT * FROM students`)
    return list;
}
export const getAllLunchDish= async ()=>{
    const [list] = await pool.query(`SELECT * FROM main_dish`)
    return list;
}
export const getAllLunchStyles= async()=>{
    const [list] = await pool.query(`SELECT * FROM main_style`)
    return list;
}
export const getAllSidesDish= async()=>{
    const [list] = await pool.query(`SELECT * FROM side_dish`)
    return list;
}
export const getAllSideStyle= async()=>{
    const [list] = await pool.query(`SELECT * FROM side_style`)
    return list;
}
export const getAllBeverages= async()=>{
    const [list] = await pool.query(`SELECT * FROM beverage`)
    return list;
}
export const getAllOrders= async()=>{
    const [list] = await pool.query(`
    SELECT 
    st.first_name, st.last_name, st.location
    , md.name, md.image, ms.style, ms.image
    , sd.name, sd.image, ss.style, ss.image
    , b.name
    , o.day
    FROM students st, main_dish md, main_style ms, side_dish sd, side_style ss, beverage b, orders o 
    WHERE 
    o.student_id = st.id
    , o.main_dish_id = md.id
    , o.main_style_id = ms.id
    , o.side_dish = sd.id
    , o.side_style = ss.id
    , o.beverage = b.id
    , o.d;`)
    return list;
}
export const getAllMenu= async()=>{
    const [list] = await pool.query(`
    SELECT 
    md.name, md.image, ms.style, ms.image
    , sd.name, sd.image, ss.style, ss.image
    , b.name, b.image
    FROM main_dish md, main_style ms, side_dish sd, side_style ss, beverage b, menu m
    WHERE 
    m.main_dish = md.id,
    m.main_style = ms.id,
    m.side_main = sd.id,
    m.side_style = ss.id,
    m.beverage = b.id;`)
    return list;
}
// ______________________________________________

// [[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]
//              single items list
// [[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]
export const getSingleAdmin= async(id)=>{
    const admin = await pool.query(`SELECT * FROM admin
    WHERE id = ?`, [id]);
    return admin[0];
}
export const getSingleStudent= async(id)=>{
    const student = await pool.query(`SELECT * FROM students
    WHERE id = ?`, [id]);
    return student[0];
}
export const getSingleMainDish= async(id)=>{
    const maindish = await pool.query(`SELECT * FROM main_dish
    WHERE id = ?`, [id]);
    return maindish[0];
}
export const getSingleMainStyle= async(id)=>{
    const mainstyle = await pool.query(`SELECT * FROM main_style
    WHERE id = ?`, [id]);
    return mainstyle[0];
}
export const getSingleSideDish= async(id)=>{
    const sidedish = await pool.query(`SELECT * FROM side_dish
    WHERE id = ?`, [id]);
    return sidedish
}
export const getSingleSideStyle= async(id)=>{
    const sidestyle = await pool.query(`SELECT * FROM side_style
    WHERE id = ?`, [id]);
    return sidestyle[0]
}
export const getSingleBeverage= async(id)=>{
    const beverage = await pool.query(`SELECT * FROM beverage
    WHERE id = ?`, [id]);
    return beverage[0]
}
export const getSingleOrder= async(id)=>{
    const order = await pool.query(`
    SELECT
    st.first_name, st.last_name, st.location
    , md.name, md.image, ms.style, ms.image
    , sd.name, sd.image, ss.style, ss.image
    , b.name
    , o.day
    FROM students st, main_dish md, main_style ms, side_dish sd, side_style ss, beverage b, orders o 
    WHERE 
    o.student_id = st.id
    , o.main_dish_id = md.id
    , o.main_style_id = ms.id
    , o.side_dish = sd.id
    , o.side_style = ss.id
    , o.beverage = b.id
    , o.student_id = ?`[id]);
    return order[0]
}
// ________________________________________

// [[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]
//              create functions
// [[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]
export const createStudent= async(student)=>{
    const create = await pool.query(`
    INSERT INTO students
    (first_name, last_name, location, allergies, email, image, password)
    value (?,?,?,?,?,?,?);`,
    [student.first_name, student.last_name, 
    student.location, student.allergies, student.image, student.password]);
    return create;
}
export const createAdmin= async(admin)=>{
    const create = await pool.query(`
    INSERT INTO admin
    (first_name, last_name, position, email, image, password)
    value (?,?,?,?,?,?);`,
    [admin.first_name, admin.last_name, 
    admin.position, admin.email, admin.image, admin.passowrd]);
    return create;
}
export const createMainDish= async(lunch)=>{
    const create = await pool.query(`
    INSERT INTO main_dish
    (name, available, image);`,
    [lunch.name, lunch.available, lunch.image]);
    return create;
}
export const createMainStyle= async(lunchstyle)=>{
    const create = await pool.query(`
    INSERT INTO main_style
    (style, available, image);`,
    [lunchstyle.style, lunchstyle.available, lunchstyle.image]);
    return create;
}
export const createSideDish= async(side)=>{
    const create = await pool.query(`
    INSERT INTO side_dish
    (name, available, image);`,
    [side.name, side.available, side.image]);
    return create;
}
export const createSideStyle= async(sidestyle)=>{
    const create = await pool.query(`
    INSERT INTO side_style
    (style, available, image);`,
    [sidestyle.style, sidestyle.available, sidestyle.image]);
    return create;
}
export const createBeverage= async(drink)=>{
    const create = await pool.query(`
    INSERT INTO beverage
    (name, available, image);`,
    [drink.name, drink.available, drink.image]);
    return create;
}
export const createMenu = async(menu)=>{
    const create = await pool.query(`
    INSERT INTO menu
    (main_dish, main_style, side_main, side_style, beverage);`
    [menu.main_dish, menu.main_style, menu.side_main, 
    menu.side_style, menu.beverage]);
    return create;
}
export const createOdrer = async(menu)=>{
    const create = await pool.query(`
    INSERT INTO orders
    (student_id, main_dish_id, main_style_id, 
    side_dish, side_style, beverage, day);`,
    [menu.student_id, menu.main_dish_id, menu.main_style_id,
    menu.side_dish_id, menu.side_style_id, menu.beverage,
    menu.day]);
    return create 
}
// ________________________________________

// [[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]
//               edit function
// [[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]
export const editAdmin = async(eAdmin)=>{
    const edit = await pool.query(`
    UPDATE admin
    SET 
    first_name = ?, last_name = ?, position = ?, email = ?, image = ?, password = ?
    WHERE id = ?`,    
    [eAdmin.first_name, eAdmin.last_name, 
    eAdmin.position, eAdmin.email, 
    eAdmin.image, eAdmin.password, eAdmin.id]);
    return edit;
}
export const editStudent = async(eStudent)=>{
    const edit = await pool.query(`
    UPTADE students
    SET
    first_name = ?, last_name = ?, location = ?, 
    allergies = ?, image = ?, passowrd = ?
    WHERE id = ?`,
    [eStudent.first_name, eStudent.last_name, 
    eStudent.location, eStudent.allergies, 
    eStudent.image, eStudent.password, eStudent.id]);
    return edit;
}
export const editMainDish = async(eLunch)=>{
    const edit = await pool.query(`
    UPDATE main_dish
    SET
    name = ?, available = ?, image = ?
    WHERE id = ?`, 
    [eLunch.name, eLunch.available, eLunch.image, eLunch.id]);
    return edit;
}
export const editMainStyle = async(eLunchstyle)=>{
    const edit = await pool.query(`
    UPDATE main_style
    SET 
    style = ?, available = ?, image =?
    WHERE id = ?`,
    [eLunchstyle.style, eLunchstyle.available, 
    eLunchstyle.image, eLunchstyle.id]);
    return edit;
}
export const editSideDish = async(eSide)=>{
    const edit = await pool.query(`
    UPDATE side_dish
    SET
    name = ?, available = ?, image = ?
    WHERE id = ?`,
    [eSide.name, eSide.available, eSide.image, eSide.id]);
    return edit;
}
export const editSideStyle = async(eSideStyle)=>{
    const edit = await pool.query(`
    UPDATE side_style
    SET
    style = ?, available = ?, image = ?
    WHERE id = ?`,
    [eSideStyle.style, eSideStyle.available, 
    eSideStyle.image, eSideStyle.id]);
    return edit;
}
export const editBeverage = async(eBeverage)=>{
    const edit = await pool.query(`
    UPDATE beverage
    SET
    name = ?, available = ?, image = ?
    WHERE id= ?`, 
    [eBeverage.name, eBeverage.available, 
    eBeverage.image, eBeverage.id]);
    return edit
}
export const editOrder = async(eOrder)=>{
    const edit = await pool.query(`
    UPDATE orders
    SET
    main_dish_id = ?, main_dish_style = ?, 
    side_dish = ?, side_style = ?
    beverage = ?, day = ?
    WHERE id = ?`,
    [eOrder.main_dish_id, eOrder.main_dish_style, eOrder.side_dish,
    eOrder.side_style, eOrder.beverage, eOrder.day, eOrder.id]);
    return edit 
}
export const editMenu = async(eMenu)=>{
    const edit = await pool.query(`
    UPDATE menu
    SET
    main_dish = ?, main_style = ?, side_main = ?, side_style = ?,
    beverage = ?
    WHERE id= ?`,
    [eMenu.main_dish, eMenu.main_style, eMenu.side_main, 
    eMenu.side_style, eMenu.beverage, eMenu.id]);
    return edit;
}
// ________________________________________

// [[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]
//            delete functions
// [[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]
export const deleteAdmin = async(id)=>{
    const del = await pool.query(`
    DELETE FROM admin
    WHERE id = ?`
    ,[id]);
    return del;
}
export const deleteStudent = async(id)=>{
    const del = await pool.query(`
    DELETE FROM students
    WHERE id = ?`
    , [id]);
    return del
}
export const deleteMainDish = async(id)=>{
    const del = await pool.query(`
    DELETE FROM = main_dish
    WHERE id = ?`
    ,[id]);
    return del
}
export const deleteMainStyle = async(id)=>{
    const del = await pool.query(`
    DELETE FROM = main_style
    WHERE id = ?`
    ,[id]);
    return del
}
export const deleteSideDish = async(id)=>{
    const del = await pool.query(`
    DELETE FROM = side_dish
    WHERE id = ?`
    ,[id]);
    return del
}
export const deleteSideStyle = async(id)=>{
    const del = await pool.query(`
    DELETE FROM = side_style 
    WHERE id = ?`
    ,[id]);
    return del 
}
export const deletBeverage = async(id)=>{
    const del = await pool.query(`
    DELETE FROM = beverage
    WHERE id = ?`
    ,[id]);
    return del
}
export const deleteMenu = async(id)=>{
    const del = await pool.query(`
    DELETE FROM = menu
    WHERE id = ?`
    ,[id]);
    return del
}
export const deleteOrders = async(id)=>{
    const del = await pool.query(`
    DELETE FROM = orders
    WHERE id = ?`
    ,[id]);
    return del 
}
// ________________________________________

// [[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]
//           security functions
// [[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]
export const adminUserExists = async ()=>{
    let adminCheck = false;
    const result = await pool.query(`
        SELECT position FROM admin
    `);
    // console.log(result);
    const rows = result[0];
    if(rows.length > 0){
        adminCheck = true;
    }else{
        adminCheck = false
    }
    return adminCheck;
}
export const isLoginCorrect = async (user, password)=>{
    let adminCheck = false;
    const result = await pool.query(`
        SELECT password, position
        FROM admin
        WHERE position = ? and password = ?
    `,[user, password]);   
    const rows = result[0];   
    return rows;
}
// ________________________________________

// [[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]
//          search functions
// [[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]
//This is not the most robust implimentation of the search function 
export const searchAdmin = async(searchQuery)=>{
    const [check] = await pool.query(`
    SELECT * FROM admin 
    WHERE first_name OR last_name
    LIKE '%?%' `,[searchQuery]);
    return check;
}
export const searchStudent = async(searchQuery)=>{
    const [check] = await pool.query(`
    SELECT * FROM students
    WHERE first_name OR last_name
    LIKE '%?%'`, [searchQuery]);
    return check;
}
// a function for parsing each word in search feild should be created
// a funtion for parsing each letter should be created
// each function should be made for each column in students and admin table
// ________________________________________

// =================END====================