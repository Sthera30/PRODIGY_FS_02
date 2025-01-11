import mongoose from "mongoose";
import express from 'express'
import cors from 'cors'
import cookieParser from "cookie-parser";
import { add_leave, add_salary, authUser, change_password, create_otp, createDepartment, createEmployee, get_all_department, get_all_employee, get_all_leave, get_all_salaries, get_department_by_id, get_employee_by_id, get_leave_by_id, get_salaries_by_id, loginUser, logout, register, remove_department, remove_employee, remove_leaves, remove_salaries, update_department, update_employee, update_leaves, update_salaries, verifyEmail, verifyOtp } from "./controller/authController.js";
import { protect } from './middleware/authentication_middleware.js'
import dotenv from 'dotenv'
dotenv.config()

//import { protect } from './middleware/auth_middleware.js'


const app = express()


//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


//Cookies
app.use(cookieParser())

//cors
app.use(cors({

    origin: 'https://prodigy-fs-02-frontend-woad.vercel.app/',
    credentials: true

}))


//ROUTES

app.post('/register', register)
app.get("/getUser", protect, authUser)
app.put("/verifyOtp", verifyOtp)
app.put("/changePassword", change_password)
app.post("/verifyEmail", verifyEmail)
app.post('/createOtp', create_otp)
app.post("/login", loginUser)
app.post('/logout', logout)
app.post('/createEmployee', createEmployee)
app.get("/getAllEmployee", get_all_employee)
app.get("/getEmployeeById", get_employee_by_id)
app.put("/updateEmployee", update_employee)
app.delete("/removeEmployee", remove_employee)
//
app.post('/createDepartment', createDepartment)
app.get("/getAllDepartment", get_all_department)
app.get("/getDepartmentById", get_department_by_id)
app.put("/updateDepartment", update_department)
app.delete("/removeDepartment", remove_department)

//
app.post("/addSalary", add_salary)
app.get("/getAllSalaries", get_all_salaries)
app.get("/getSalaryById", get_salaries_by_id)
app.put("/updateSalaries", update_salaries)
app.delete("/removeSalaries", remove_salaries)

//

app.post("/addLeave", add_leave)
app.get("/getAllLeaves", get_all_leave)
app.get("/getLeaveById", get_leave_by_id)
app.put("/updateLeaves", update_leaves)
app.delete("/removeLeave", remove_leaves)


const MONGO_URL = process.env.MONGO_URL
const PORT = process.env.PORT || 8082

mongoose.connect(MONGO_URL).then(() => {

    console.log("connected to the database...");

    app.listen(PORT, () => {

        console.log('server is listening at port 8082....');
    })

}).catch((err) => {

    console.log('Failed to connect to the database!', err);
})


/*//handles file uploads, documents etc
app.post("/upload", ExpressFormidable({ maxFieldsSize: 5 * 2024 * 2024 }), uploadImage)
*/
