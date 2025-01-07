import React, { useState } from "react";
import { Container, Row, Col, Accordion, Modal, Button } from "react-bootstrap";
import { Dashboard, People, ShoppingCart } from "@mui/icons-material";
import ProductList from "./ProductList";
import UserList from "./UserList";
import OrderList from "./OrderList";
import ProductAdd from "./ProductAdd";
import "../../styles/AdminPage.css";
import { useNavigate } from "react-router-dom";

function AdminPage() {
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState("dashboard");

  const handleLogout = () => {
    const isConfirmed = window.confirm("로그아웃 하시겠습니까?");
    if (isConfirmed) {
      // JWT 토큰 삭제
      localStorage.removeItem("token");
  
      // 홈 페이지로 이동
      navigate("/");
    }
  };

  const renderContent = () => {
    switch (selectedMenu) {
      case "products_list":
        return <ProductList />;
      case "products_add":
        return <ProductAdd />;
      case "users":
        return <UserList />;
      case "orders":
        return <OrderList />;
      default:
        return <h4 className="text-center mt-4">대시보드를 선택하세요.</h4>;
    }
  };

  return (
    <Container fluid>
      <Row>
        {/* 사이드바 */}
        <Col
          md={2}
          className="bg-dark text-white vh-100 d-flex flex-column justify-content-between p-2"
          style={{ fontSize: "0.9rem" }}
        >
          <div>
            <h5 className="text-center py-3 border-bottom">관리자 메뉴</h5>
            <Accordion className="custom-accordion">
              {/* 대시보드 */}
              <Accordion.Item eventKey="0" className="custom-accordion-item">
                <Accordion.Header
                  onClick={() => setSelectedMenu("dashboard")}
                  className="custom-accordion-header"
                >
                  <Dashboard className="me-2" /> 대시보드
                </Accordion.Header>
              </Accordion.Item>

              {/* 상품 관리 */}
              <Accordion.Item eventKey="1" className="custom-accordion-item">
                <Accordion.Header className="custom-accordion-header">
                  <ShoppingCart className="me-2" /> 상품 관리
                </Accordion.Header>
                <Accordion.Body>
                  <ul className="list-unstyled">
                    <li
                      onClick={() => setSelectedMenu("products_list")}
                      className="custom-sidebar-item"
                    >
                      상품 목록
                    </li>
                    <li
                      onClick={() => setSelectedMenu("products_add")}
                      className="custom-sidebar-item"
                    >
                      상품 추가
                    </li>
                    <li
                      onClick={() => setSelectedMenu("products_inventory")}
                      className="custom-sidebar-item"
                    >
                      재고 관리
                    </li>
                  </ul>
                </Accordion.Body>
              </Accordion.Item>

              {/* 사용자 관리 */}
              <Accordion.Item eventKey="2" className="custom-accordion-item">
                <Accordion.Header className="custom-accordion-header">
                  <People className="me-2" /> 사용자 관리
                </Accordion.Header>
                <Accordion.Body>
                  <ul className="list-unstyled">
                    <li
                      onClick={() => setSelectedMenu("users")}
                      className="custom-sidebar-item"
                    >
                      사용자 목록
                    </li>
                    <li
                      onClick={() => setSelectedMenu("users_control")}
                      className="custom-sidebar-item"
                    >
                      사용자 정보 관리
                    </li>
                    <li
                      onClick={() => setSelectedMenu("users_control")}
                      className="custom-sidebar-item"
                    >
                      사용자 게시글 관리
                    </li>
                  </ul>
                </Accordion.Body>
              </Accordion.Item>

              {/* 주문 관리 */}
              <Accordion.Item eventKey="3" className="custom-accordion-item">
                <Accordion.Header className="custom-accordion-header">
                  <ShoppingCart className="me-2" /> 주문 관리
                </Accordion.Header>
                <Accordion.Body>
                  <ul className="list-unstyled">
                    <li
                      onClick={() => setSelectedMenu("orders_list")}
                      className="custom-sidebar-item"
                    >
                      주문 목록
                    </li>
                    <li
                      onClick={() => setSelectedMenu("orders_pending")}
                      className="custom-sidebar-item"
                    >
                      출고 중 주문
                    </li>
                    <li
                      onClick={() => setSelectedMenu("orders_completed")}
                      className="custom-sidebar-item"
                    >
                      완료된 주문
                    </li>
                  </ul>
                </Accordion.Body>
              </Accordion.Item>
              {/* 주문 관리 */}
              <Accordion.Item eventKey="4" className="custom-accordion-item">
                <Accordion.Header className="custom-accordion-header">
                  <ShoppingCart className="me-2" /> 게시글 관리
                </Accordion.Header>
                <Accordion.Body>
                  <ul className="list-unstyled">
                    <li
                      onClick={() => setSelectedMenu("orders_list")}
                      className="custom-sidebar-item"
                    >
                      게시글 관리
                    </li>
                  </ul>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>

          {/* 로그아웃 버튼 */}
          <div className="mt-auto text-center">
            <button
              onClick={handleLogout}
              className="btn btn-danger w-100"
              style={{ marginBottom: "10px" }}
            >
              로그아웃
            </button>
          </div>
        </Col>

        {/* 메인 컨텐츠 */}
        <Col md={10} className="p-4">
          {renderContent()}
        </Col>
      </Row>
    </Container>
  );
}

export default AdminPage;
