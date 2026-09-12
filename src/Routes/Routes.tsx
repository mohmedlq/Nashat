import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import BroadcastsPage from "../Pages/Broadcasts/BroadcastsPage";
import Navbar from "../Components/Navbar";
import AiChatGenerator from "../Pages/Generator/AiChatGenerator";
import ReportsPage from "../Pages/Reports/ReportsPage";
import { UserProvider } from "../context/Context";
import NotFound from "../Pages/NotFound";
import Certificate from "../Pages/certificates/certificate"
import AboutMe from "../Components/AboutMe";
import ActivityPlansPage from "../Pages/ActivityPlans/ActivityPlansPage";
import UserDataBox from "../Components/UserDataBox";
function AppRoutes() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/broadcasts" element={<BroadcastsPage />} />
          <Route path="/broadcasts/:id" element={<BroadcastsPage />} />
          <Route path="/generator" element={<AiChatGenerator />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/reports/:id" element={<ReportsPage />} />
          <Route path="/ActivityPlans" element={<ActivityPlansPage />} />
          <Route path="/AboutMe" element={<AboutMe/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default AppRoutes;