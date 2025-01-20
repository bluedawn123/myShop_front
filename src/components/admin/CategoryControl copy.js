import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

function CategoryAdd() {
  const [showModal, setShowModal] = useState(false); // 모달 표시 여부
  const [modalType, setModalType] = useState("main"); // 현재 모달 유형 (대분류, 중분류, 소분류)
  const [formData, setFormData] = useState({
    codeName: "",
    codeNumber: "",
  });

  // 모달 열기
  const handleShowModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  // 모달 닫기
  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ codeName: "", codeNumber: "" });
  };

  // 입력값 변경 처리
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 등록 버튼 클릭 처리
  const handleSubmit = () => {
    console.log(`모달 유형: ${modalType}`);
    console.log("입력 데이터:", formData);

    // TODO: 데이터 저장 로직 추가 (API 호출 등)

    handleCloseModal(); // 모달 닫기
  };

  return (
    <div>
      <h1>카테고리 관리</h1>
      <div className="d-flex gap-2 mb-4">
        <Button variant="primary" onClick={() => handleShowModal("main")}>
          대분류 등록
        </Button>
        <Button variant="secondary" onClick={() => handleShowModal("sub")}>
          중분류 등록
        </Button>
        <Button variant="success" onClick={() => handleShowModal("minor")}>
          소분류 등록
        </Button>
      </div>

      {/* 모달 */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalType === "main" && "대분류 등록"}
            {modalType === "sub" && "중분류 등록"}
            {modalType === "minor" && "소분류 등록"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>코드명</Form.Label>
              <Form.Control
                type="text"
                placeholder="코드명을 입력하세요"
                name="codeName"
                value={formData.codeName}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>코드번호</Form.Label>
              <Form.Control
                type="text"
                placeholder="코드번호를 입력하세요"
                name="codeNumber"
                value={formData.codeNumber}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            닫기
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            등록
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CategoryAdd;
