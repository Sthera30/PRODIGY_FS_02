import React from 'react'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import Layouts from './layouts/Layouts.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import HomePage from './pages/HomePage.jsx'
import Protected from './pages/Protected.jsx'
import OtpPage from './pages/OtpPage.jsx'
import VerifyEmailPage from './pages/VerifyEmailPage.jsx'
import ChangePasswordPage from './pages/ChangePasswordPage.jsx'
import ManageEmployeesPage from './pages/ManageEmployeesPage.jsx'
import EmployeePage from './pages/EmployeePage.jsx'
import EmployeeDetailsPage from './pages/EmployeeDetailsPage.jsx'
import EditEmployeesPage from './pages/EditEmployeesPage.jsx'
import ManageDepartmentPages from './pages/ManageDepartmentPages.jsx'
import DepartmentPages from './pages/DepartmentPages.jsx'
import EditDepartmentPages from './pages/EditDepartmentPages.jsx'
import SickLeavePages from './pages/SickLeavePages.jsx'
import AddSalaryPages from './pages/AddSalaryPages.jsx'
import SalaryPages from './pages/SalaryPages.jsx'
import EditSalaryPages from './pages/EditSalaryPages.jsx'
import MyProfilePages from './pages/MyProfilePages.jsx'
import LeavePages from './pages/LeavePages.jsx'
import EmployeeSickLeavePages from './pages/EmployeeSickLeavePages.jsx'
import EmpSalaryPages from './pages/EmpSalaryPages.jsx'
import LeaveDetailsPages from './pages/LeaveDetailsPages.jsx'
import HomePages from './pages/HomePages.jsx'
import DashboardPage from './pages/DashboardPage.jsx'

function App() {


  const router = createBrowserRouter(


    createRoutesFromElements(

      <Route path={"/"} element={<Layouts />}>

        <Route path={"/login"} element={<LoginPage />} />
        <Route path={"/register"} element={<RegisterPage />} />
        <Route path={"/verify-otp"} element={<OtpPage />} />
        <Route path={"/change-password"} element={<ChangePasswordPage />} />
        <Route path={"/verify-email"} element={<VerifyEmailPage />} />
        <Route path={"/manage-employees"} element={<ManageEmployeesPage />} />
        <Route path={"/employee"} element={<EmployeePage />} />
        <Route path={"/manage-employees/employee-details/:id"} element={<EmployeeDetailsPage />} />
        <Route path={"/edit-employee/:id"} element={<EditEmployeesPage />} />
        <Route path={"/manage-departments"} element={<ManageDepartmentPages />} />
        <Route path={"/department"} element={<DepartmentPages />} />
        <Route path={"/edit-department/:id"} element={<EditDepartmentPages />} />
        <Route path={"/manage-leave"} element = {<SickLeavePages />} />
        <Route path={"/add-salary"} element = {<AddSalaryPages />} />
        <Route path={"/manage-salary"} element = {<SalaryPages />} />
        <Route path={"/edit-salary/:id"} element = {<EditSalaryPages />} />
        <Route path={"/my-profile/:id"} element={<MyProfilePages />} />
        <Route path={"/my-leave/:id"} element={<LeavePages />} />
        <Route path={"/add-leave"} element={<EmployeeSickLeavePages />} />
        <Route path={"/emp-salary/:id"} element={<EmpSalaryPages />} />
        <Route path={"/leave-details/:id"} element={<LeaveDetailsPages />} />
        <Route path={"/my-dashboard"} element={<DashboardPage />} />

      </Route>

    )

  )

  return (

    <RouterProvider router={router} />

  )
}

export default App
