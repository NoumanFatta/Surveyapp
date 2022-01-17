import React from 'react'
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Admin from './Admin'
import User from './User';
import Home from './Home'
import Form from './From'


export default function AllRoutes() {
    return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/admin" element={<Admin />} />
        <Route exact path="/user" element={<User />} />
        <Route exact path="/form" element={<Form />} />
      </Routes>
    </BrowserRouter>
    )
}







