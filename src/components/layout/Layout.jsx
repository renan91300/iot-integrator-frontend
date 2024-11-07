import Header from './Header'
import Footer from './Footer'
import React, { Component } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import Sidebar from './Sidebar'
import { Outlet } from "react-router-dom";
import './Layout.css'

const Layout = () =>{
    return (
        <>
            <div className='layout'>
                <Sidebar />
                <aside className='container-fluid p-5'>
                    <Outlet />
                </aside>
            </div>
            <Footer />
        </>
    );

}

export default Layout