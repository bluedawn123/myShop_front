import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import CategoryTable from "./CategoryTable"; // 테이블 컴포넌트 불러오기

function CategoryAdd() {
  const [categories, setCategories] = useState([]);
  const [mainCategories, setMainCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subSubCategories, setSubSubCategories] = useState([]);

  const [selectedMain, setSelectedMain] = useState("");
  const [selectedSub, setSelectedSub] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [codeName, setCodeName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [parentCode, setParentCode] = useState("");

  const [currentPage, setCurrentPage] = useState(1); // 페이지 상태
  const itemsPerPage = 10; // 한 페이지에 표시할 항목 수

  const handleClose = () => setShowModal(false);
  const handleShow = (type) => {
    setModalType(type);
    setCodeName("");
    setCategoryName("");
    setParentCode("");
    setShowModal(true);
  };

  useEffect(() => {
    // 카테고리 데이터 가져오기
    axios
      .get("http://localhost:8000/api/categories")
      .then((response) => {
        setCategories(response.data);
        setMainCategories(response.data.filter((cat) => cat.step === 1));
      })
      .catch((error) => {
        console.error("데이터 조회 오류:", error);
      });
  }, []);

  const handleSaveCategory = () => {
    const step = modalType === "main" ? 1 : modalType === "sub" ? 2 : 3;
    const newCategory = {
      code: codeName,
      name: categoryName,
      step,
      pcode: step > 1 ? parentCode : null,
    };

    axios
      .post("http://localhost:8000/api/categories/add", newCategory)
      .then((response) => {
        alert("카테고리가 등록되었습니다!");
        setCategories((prev) => [...prev, response.data]);

        if (step === 1) {
          setMainCategories((prev) => [...prev, response.data]);
        } else if (step === 2) {
          setSubCategories((prev) => [...prev, response.data]);
        } else if (step === 3) {
          setSubSubCategories((prev) => [...prev, response.data]);
        }

        handleClose();
      })
      .catch((error) => {
        console.error("카테고리 등록 오류:", error);
        alert("카테고리 등록에 실패했습니다.");
      });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mt-2">
      <h3>기존 카테고리 확인</h3>
      <div className="row">
        <div className="col-md-4">
          <Form.Select
            aria-label="대분류 선택"
            onChange={(e) => {
              const selectedCode = e.target.value;
              setSelectedMain(selectedCode);
              setSubCategories(categories.filter((cat) => cat.pcode === selectedCode));
              setSubSubCategories([]);
              setSelectedSub("");
            }}
            value={selectedMain}
          >
            <option value="">대분류 선택</option>
            {mainCategories.map((cat) => (
              <option key={cat.cid} value={cat.code}>
                {cat.name}
              </option>
            ))}
          </Form.Select>
        </div>
        <div className="col-md-4">
          <Form.Select
            aria-label="중분류 선택"
            onChange={(e) => {
              const selectedCode = e.target.value;
              setSelectedSub(selectedCode);
              setSubSubCategories(categories.filter((cat) => cat.pcode === selectedCode));
            }}
            value={selectedSub}
            disabled={!selectedMain}
          >
            <option value="">중분류 선택</option>
            {subCategories.map((cat) => (
              <option key={cat.cid} value={cat.code}>
                {cat.name}
              </option>
            ))}
          </Form.Select>
        </div>
        <div className="col-md-4">
          <Form.Select aria-label="소분류 선택" disabled={!selectedSub}>
            <option value="">소분류 선택</option>
            {subSubCategories.map((cat) => (
              <option key={cat.cid} value={cat.code}>
                {cat.name}
              </option>
            ))}
          </Form.Select>
        </div>
      </div>

      <div className="mt-5">
        <h3>신규 카테고리 추가</h3>
        <Button onClick={() => handleShow("main")}>대분류 추가</Button>
        <Button
          onClick={() => handleShow("sub")}
          className="ms-2"
          disabled={!selectedMain}
        >
          중분류 추가
        </Button>
        <Button
          onClick={() => handleShow("subsub")}
          className="ms-2"
          disabled={!selectedSub}
        >
          소분류 추가
        </Button>
      </div>

      {/* 테이블 컴포넌트 이 부분이 너무 길어져서 컴포넌트화. */}
      <div className="mt-5">
        <CategoryTable
          categories={categories}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </div>

      {/* 모달 */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalType === "main"
              ? "대분류 추가"
              : modalType === "sub"
              ? "중분류 추가"
              : "소분류 추가"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>코드명</Form.Label>
            <Form.Control
              type="text"
              placeholder="코드명 입력"
              value={codeName}
              onChange={(e) => setCodeName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>분류명</Form.Label>
            <Form.Control
              type="text"
              placeholder="분류명 입력"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </Form.Group>
          {modalType === "sub" && (
            <Form.Group className="mt-3">
              <Form.Label>대분류 선택</Form.Label>
              <Form.Select
                value={parentCode}
                onChange={(e) => setParentCode(e.target.value)}
              >
                <option value="">대분류를 선택하세요</option>
                {mainCategories.map((cat) => (
                  <option key={cat.cid} value={cat.code}>
                    {cat.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          )}
          {modalType === "subsub" && (
            <Form.Group className="mt-3">
              <Form.Label>중분류 선택</Form.Label>
              <Form.Select
                value={parentCode}
                onChange={(e) => setParentCode(e.target.value)}
              >
                <option value="">중분류를 선택하세요</option>
                {subCategories.map((cat) => (
                  <option key={cat.cid} value={cat.code}>
                    {cat.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            취소
          </Button>
          <Button variant="primary" onClick={handleSaveCategory}>
            저장
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CategoryAdd;
