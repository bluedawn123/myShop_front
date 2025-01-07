import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import BoardList from './BoardList';
// import Button from 'react-bootstrap/Button';
// import Write from './Write';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import React from "react";
import AdminPage from "./components/admin/AdminPage";
import UserPage from "./components/user/UserPage";
import LoginPage from "./components/LoginPage";
import Lesson from "./components/etc/Lesson";

function App() {
  const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    return !!token; // 토큰이 있으면 로그인된 상태
  };

  const isAdmin = () => {
    const token = localStorage.getItem("token");
    if (!token) return false;
  
    try {
      const payload = JSON.parse(atob(token.split(".")[1])); // JWT에서 payload 추출
      return payload.role === "admin";
    } catch (error) {
      console.error("Invalid token:", error);
      return false;
    }
  };
  

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* 일반 사용자 페이지 */}
          <Route path="/" element={<UserPage/>} />
          <Route path="/Lesson" element={<Lesson/>} />
          
          {/* 관리자 페이지 - 인증 및 권한 확인 */}
          <Route
            path="/admin"
            element={
              isAuthenticated() && isAdmin() ? (
                <AdminPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* 로그인 페이지 */}
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
