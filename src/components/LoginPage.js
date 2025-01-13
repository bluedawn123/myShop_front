import React, { useState } from "react";
import "../styles/LoginPage.css";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isAdmin = () => {
    const token = localStorage.getItem("token");
    if (!token) return false;
  
    try {
      const payload = JSON.parse(atob(token.split(".")[1])); // JWT에서 payload 추출
      const now = Math.floor(Date.now() / 1000); // 현재 시간 (초)
  
      if (payload.exp < now) {
        // 토큰 만료
        console.warn("토큰이 만료되었습니다.");
        localStorage.removeItem("token"); // 만료된 토큰 삭제
        return false;
      }
  
      return payload.role === "admin";
    } catch (error) {
      console.error("Invalid token:", error);
      return false;
    }
  };

  const handleLogin = async () => {
    setError(""); // 에러 메시지 초기화

    try {
      // 환경 변수에서 API URL 가져오기
      const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";
      
      // 변경된 API 경로 사용
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }), // 요청 데이터
      });

      const data = await response.json();
      console.log("Response Data:", data); // 응답 데이터 로그

      if (response.ok) {
        // 로그인 성공
        localStorage.setItem("token", data.token); // JWT 저장
        alert("관리자로 로그인 성공");

        // role 값에 따라 리디렉션
        if (data.role === "admin") {
          window.location.href = "/admin";
        } else {
          window.location.href = "/";
        }
      } else {
        // 로그인 실패
        setError(data.message || "로그인에 실패했습니다.");
      }
    } catch (err) {
      console.error("로그인 요청 오류:", err);
      setError("서버 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">로그인</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="form-group">
        <label htmlFor="username">아이디</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="form-input"
          placeholder="아이디를 입력하세요"
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">비밀번호</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-input"
          placeholder="비밀번호를 입력하세요"
        />
      </div>
      <button className="login-button" onClick={handleLogin}>
        로그인
      </button>
    </div>
  );
}

export default LoginPage;
