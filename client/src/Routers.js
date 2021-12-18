import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Meeting from "./pages/Meeting";

export default function Routers() {
    
    

    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/room/:id" element={<Meeting />} />
        </Routes>
        </BrowserRouter>
    )
}
