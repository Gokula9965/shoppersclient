// src/App.js
import { CssBaseline } from "@mui/material";
import React, { useContext } from "react";
import { Link, Route, Routes } from "react-router-dom";
import DataContext from "./context/DataContext";
import Login from "./components/auth/Login";
import ResetPassword from "./components/auth/ResetPassword";
import Register from "./components/auth/Register";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import Navbar from "./components/Navbar";
import SingleProduct from "./components/SingleProduct";
import CartList from "./components/CartList";
import Checkout from "./components/checkout/Checkout";
import OrdersHistory from "./components/OrderHistory";

function App() {
  const { token } = useContext(DataContext);
  console.log("token in app", token);
  return (
    <div>
    
        <CssBaseline />
        <Link to='/' />
        <Link to='/singleProduct/:id' />
        <Link to='/cartlist'></Link>
        <Link to='/checkout'></Link>
        <Link to='/orders'></Link>
        
        <Navbar/>
        <Routes>
          <Route path='/' element={<Header/>}/>
          <Route path="/login" element={!token?<Login />:<Header/>} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/register" element={!token?<Register />:<Header/>} />
          <Route path="/products/:category" element={ <ProductList/>} />
          <Route path="/singleProduct/:id" element={<SingleProduct />} />
          <Route path='/cartlist' element={<CartList />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/orders' element={<OrdersHistory/> } />
        </Routes>
   
    </div>
  );
}

export default App;
