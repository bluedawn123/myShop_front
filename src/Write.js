import React, { Component } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Axios from 'axios';

export default class Write extends Component {
  state = {
    isModifyMode : false,
    title : '',
    content : ''
  }
  write = (e) => {
    //isert라는 주소로 요청,
    e.preventDefault();
    Axios.post('http://localhost:8000/board/insert', { //axios의 두번째 인자는 넘길 데이터를 정의한다.
      title : this.state.title,
      content : this.state.content,
    })  
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
        console.log(error);
    })
  }

  update = (e) => {
    //isert라는 주소로 요청,
    e.preventDefault();
    Axios.post('http://localhost:8000/update', { //axios의 두번째 인자는 넘길 데이터를 정의한다.
      title : this.state.title,
      content : this.state.content,
      id:this.props.boardId //수정할 글번호

    })  
    .then((res) => {
      //입력한 거 초기화
      this.setState({
        title:'',
        content:''
      });
      this.props.handleCancel();
    })
    .catch((error) => {
        console.log(error);
    })
  }


  handleChange = (e) => {
    this.setState({
      // title : e.target.value,
      // content : e.target.value 이렇게 쓸수도 있지만, 이것보다는 아래처럼,
      // 상황에 따라 title, content가 바뀌는 상황이므로, 
      [e.target.name] : e.target.value //이렇게 쓰면, name에 title, content등 다양하게 들어올수있따.
    })
  }

  render() {
    return (
    <Form>
        <Form.Group className="mb-3" controlId="title">
            <Form.Label>제목</Form.Label>
            <Form.Control type="text" name="title" placeholder="제목을 입력하세요" onChange={this.handleChange}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="content">
            <Form.Label>내용</Form.Label>
            <Form.Control as="textarea" name="content" rows={3} onChange={this.handleChange}/>
        </Form.Group>
        <div className='d-flex gap-1'>
            {/* modifymode면 update함수와 수정완료 나타나게,
            그리고, 아니면 write함수와 작성완료 나타나게 */}
            <Button variant='primary' type='submit' onClick={this.state.isModifyMode ? this.update : this.write} > {this.state.isModifyMode ? '수정완료' : '작성완료' }</Button>
            <Button variant='secondary' type='reset'>취소하기</Button>
        </div>
    </Form>
    )
  }
}
