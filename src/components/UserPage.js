import React from "react";
import '../App.css';
import BoardList from "../BoardList"; // 경로는 App.js에서와 동일하게 맞추세요.
import Write from "../Write";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';

function UserPage() {
  return (
    <div>
        <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Products</Nav.Link>
            <Nav.Link href="#features">Customer</Nav.Link>
            <Nav.Link href="#pricing">About Us</Nav.Link>
            <Nav.Link href="lesson">선생님 수업</Nav.Link>
            {/* <Nav.Link onClick={()=>{ navigate('/detail')} }>Test</Nav.Link> */}
          </Nav>
        </Container>
      </Navbar>
      <h1>사용자 페이지</h1>
      <p>여기에서 게시글을 확인하고 작성할 수 있습니다.</p>

    </div>
  );
}

export default UserPage;