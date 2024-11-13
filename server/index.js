import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import ExpressFormidable from 'express-formidable'
import { uploadImage } from './controller/imageUpload.js'
import { protect } from './middleware/auth_middleware.js'
import { authController, changePassword, compareOtp, createFood, createOrder, getAddressByOrderId, getAllFood, getAllOrders, getFoodById, getGenOtp, getNewFood, getOrderByUser, getProductsFromDistinctCategory, getProfile, getSpecificationByProductId, getTopRatedProducts, handlePayFastITN, loginUser, registerUser, verifyOtp, filterStatus, filterPrice, filterByDate, updateShippingStatus, getOrderById, add_our_promise, update_our_promise, remove_our_promise, get_our_promise, get_our_promise_by_id, add_our_services, get_our_services, edit_our_services, remove_our_services, get_our_services_by_id, add_about_us, edit_about_us, remove_about_us, get_about_us_by_id, add_mission, add_vision, add_values, get_about_us, get_mission, get_vision, get_values, get_our_core_values_by_id, get_our_mission_by_id, get_our_vision_by_id, edit_mission, edit_vision, edit_core_values, remove_mission, remove_vission, remove_values, get_food, search_food, get_food_by_id, edit_food, remove_food } from './controller/authController.js'
import dotenv from 'dotenv'
dotenv.config

const app = express()

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5175'
}))

app.use(cookieParser())

//handles file uploads, documents etc
app.post("/upload", ExpressFormidable({ maxFieldsSize: 5 * 2024 * 2024 }), uploadImage)

//Register user
app.post("/register", registerUser)

app.post("/getUser", protect, authController)

app.post("/login", loginUser)

app.post("/verify", verifyOtp)

app.post("/add", protect, createFood)

app.get("/getAll", getAllFood)

app.get("/getFoodById/:id", getFoodById)

app.get("/getNewFood", getNewFood)

app.get("/getProductsFromDistinctCategory", getProductsFromDistinctCategory)

app.get("/getTopRated", getTopRatedProducts)

app.put('/updateProfile', getProfile)

app.post("/order", createOrder)

app.get("/getOrderByUser", getOrderByUser)

app.get("/getAllOrders", getAllOrders)

app.get("/getSpecificationByProductId", getSpecificationByProductId)

app.post("/getOtp", getGenOtp)

app.post('/compareOtp', compareOtp)

app.post("/changePassword", changePassword)

app.post("/payfast-itn", handlePayFastITN)

app.get("/getAddressByOrder", getAddressByOrderId)

app.get("/filterStatus", filterStatus)

app.get("/filterPrice", filterPrice)

app.get("/filterDate", filterByDate)

app.post("/updateShippingStatus", updateShippingStatus)

app.get("/GetOrderById", getOrderById)

app.post("/addPromise", add_our_promise)

app.get("/getPromise", get_our_promise)

app.get("/getPromiseById", get_our_promise_by_id)

app.put("/editPromise", update_our_promise)

app.delete("/removePromise", remove_our_promise)

app.post("/addOurServices", add_our_services)

app.get("/getOurServices", get_our_services)

app.get('/getOurServicesById', get_our_services_by_id)

app.put("/editOurServices", edit_our_services)

app.delete("/removeOurServices", remove_our_services)

app.post("/add_about_us", add_about_us)

app.get("/getAboutUs", get_about_us)

app.get("/getMission", get_mission)

app.get("/getVision", get_vision)

app.get("/getValues", get_values)

app.get("/getCoreValuesById", get_our_core_values_by_id)

app.get("/getMissionById", get_our_mission_by_id)

app.get("/getVisionById", get_our_vision_by_id)

app.post("/add_mission", add_mission)

app.post("/add_vision", add_vision)

app.post("/add_values", add_values)

app.put("/edit_about_us", edit_about_us)

app.put("/edit_mission", edit_mission)

app.put("/edit_vision", edit_vision)

app.put("/edit_values", edit_core_values)

app.delete("/remove_about_us", remove_about_us)

app.delete("/remove_mission", remove_mission)

app.delete("/remove_vision", remove_vission)

app.delete("/remove_values", remove_values)

app.get("/get_about_us_by_id", get_about_us_by_id)

app.get("/allFood", get_food)

app.get("/foodSearch", search_food)

app.get("/getFoodById", get_food_by_id)

app.put("/edit_food", edit_food)

app.delete("/delete_food", remove_food)

//connect to the database

const PORT = process.env.PORT || 10000
const mongo_url = process.env.MONGO_URL

mongoose.connect(mongo_url).then(() => {
    console.log("connected to the database!")
    app.listen(PORT, () => {
        console.log(`Server is listening at port ${PORT}!`);
    })
})

    .catch((err) => {
        console.log("Error connecting to the database!", err);
    })
//mongodb://localhost:27017
//mongodb+srv://tinisthera:Sict2018@tastehub-cluster.spq9v.mongodb.net/userDB?retryWrites=true&w=majority&appName=TasteHub-Cluster