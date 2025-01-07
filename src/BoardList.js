import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Axios from 'axios';
import Form from 'react-bootstrap/Form';
// import "../styles/LoginPage.css";

// Board Component: 단일 행을 렌더링
class Board extends Component {
  render() {
    const { id, title, registerId, date, onCheckboxChange } = this.props;

    return (
      <tr>
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

// BoardList Component: 전체 테이블 렌더링
export default class BoardList extends Component {
  state = {
    BoardList: [],
    checkList: []
  };

  // 체크박스 변경 이벤트 핸들러
  onCheckboxChange = (e) => {
    const { value } = e.target;
    this.setState((prevState) => ({
      checkList: [...prevState.checkList, value]
    }), () => {
      console.log(this.state.checkList);
    });
  };

  // 서버에서 게시판 목록 가져오기
  getList = () => {
    Axios.get('http://localhost:8000/list')
      .then((res) => {
        const { data } = res;
        console.log(data);
        this.setState({ BoardList: data });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // 컴포넌트가 마운트되었을 때 서버로부터 데이터 가져오기
  componentDidMount() {
    this.getList();
  }

  render() {
    const { BoardList } = this.state;

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
              />
            ))}
          </tbody>
        </Table>
        <div className="d-flex gap-1 mt-3">
          <Button variant="primary">글쓰기</Button>
          <Button variant="secondary">수정하기</Button>
          <Button variant="danger">삭제하기</Button>
        </div>
      </>
    );
  }
}
