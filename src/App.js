// src/App.js
import { CssBaseline } from "@mui/material";
import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import { DataProvider } from "./context/DataContext";
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
  return (
    <div>
      <DataProvider>
        <CssBaseline />
        <Link to='/' />
        <Link to='/singleProduct/:id' />
        <Link to='/cartlist'></Link>
        <Link to='/checkout'></Link>
        <Link to='/orders'></Link>
        
        <Navbar/>
        <Routes>
          <Route path='/' element={<Header/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products/:category" element={ <ProductList/>} />
          <Route path="/singleProduct/:id" element={<SingleProduct />} />
          <Route path='/cartlist' element={<CartList />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/orders' element={<OrdersHistory/> } />
        </Routes>
      </DataProvider>
    </div>
  );
}

export default App;
