import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Axios from 'axios';
import Form from 'react-bootstrap/Form';

class Board extends Component {
  render() {
    const { id, title, registerId, date, onRowClick, onCheckboxChange } = this.props;

    return (
      <tr onClick={() => onRowClick(id)}>
        <td>
          <Form.Check
            type="checkbox"
            id={`default-checkbox-${id}`}
            value={id}
            onChange={onCheckboxChange}
          />
        </td>
        <td>{id}</td>
        <td>{title}</td>
        <td>{registerId}</td>
        <td>{date}</td>
      </tr>
    );
  }
}

export default class BoardList extends Component {
  state = {
    BoardList: [],
    checkList: [],
    showModal: false, // 모달 표시 여부
    selectedBoard: null, // 선택된 항목의 데이터
  };

  onCheckboxChange = (e) => {
    const { value } = e.target;
    this.setState((prevState) => ({
      checkList: [...prevState.checkList, value],
    }));
  };

  getList = () => {
    Axios.get('http://localhost:8000/board/list')
      .then((res) => {
        const { data } = res;
        console.log(data);
        this.setState({ BoardList: data });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  componentDidMount() {
    this.getList();
  }

  // 모달 열기
  handleRowClick = (id) => {
    const selectedBoard = this.state.BoardList.find((item) => item.BOARD_ID === id);
    this.setState({ selectedBoard, showModal: true });
  };

  // 모달 닫기
  handleCloseModal = () => {
    this.setState({ showModal: false, selectedBoard: null });
  };

  render() {
    const { BoardList, showModal, selectedBoard } = this.state;

    return (
      <>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>체크박스</th>
              <th>번호</th>
              <th>제목</th>
              <th>작성자</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody>
            {BoardList.map((item) => (
              <Board
                key={item.BOARD_ID}
                id={item.BOARD_ID}
                title={item.BOARD_TITLE}
                registerId={item.REGISTER_ID}
                date={item.REGISTER_DATE}
                onCheckboxChange={this.onCheckboxChange}
                onRowClick={this.handleRowClick}
              />
            ))}
          </tbody>
        </Table>

        <div className="d-flex gap-1 mt-3">
          <Button variant="primary">글쓰기</Button>
          <Button variant="secondary">수정하기</Button>
          <Button variant="danger">삭제하기</Button>
        </div>

        {/* 모달 */}
        <Modal show={showModal} onHide={this.handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>게시판 상세</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedBoard && (
              <>
                <p><strong>번호:</strong> {selectedBoard.BOARD_ID}</p>
                <p><strong>제목:</strong> {selectedBoard.BOARD_TITLE}</p>
                <p><strong>작성자:</strong> {selectedBoard.REGISTER_ID}</p>
                <p><strong>작성일:</strong> {selectedBoard.REGISTER_DATE}</p>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleCloseModal}>
              닫기
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
