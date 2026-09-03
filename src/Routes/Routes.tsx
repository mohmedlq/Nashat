import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import BroadcastsPage from "../Pages/Broadcasts/BroadcastsPage";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer"
import AiChatGenerator from "../Pages/Generator/AiChatGenerator"
import ReportsPage from "../Pages/Reports/ReportsPage";
import { UserProvider } from "../context/Context";

function AppRoutes() {
  return (
        <UserProvider>

        <BrowserRouter>
   <Navbar/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/broadcast" element={<BroadcastsPage/>} />
      <Route path="/generator" element={<AiChatGenerator/>}/>
      <Route path="/Report" element={<ReportsPage/>}/>

    </Routes>
        </BrowserRouter>
            </UserProvider>

  );
}

export default AppRoutes;