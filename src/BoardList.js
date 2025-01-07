import React, { Component } from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Axios from 'axios';
import Form from 'react-bootstrap/Form'
// const submitTest = () =>{
//     Axios.get('http://localhost:8000/')
//     .then(function(res){
//         alert('등록완료');
//         console.log(res);
//     })
//     .catch(function (error){
//         console.log(error);
//     })
// }

class Board extends Component{
  render(){
    return(
      <tr>
        <td>
          <Form.Check 
            type="checkbox"
            id ={`default-checkbox`}
            value={this.props.id}  //추후 넘겨줄때 필요. 아래 e.target.value에서 사용
            //여기서 체크가 되었는지 안 되었는지 알게해줘야한다. => onCheckboxChange함수사용
            //자식이 부모와 소통하려면? 자식이 부모에게 데이터를 전달하려면, 부모가 전달한 함수를 자식이 호출하는 방식으로 해결
            onChange={this.props.onCheckboxChange}
          />
        </td>
        <td>{this.props.id}</td>
        <td>{this.props.title}</td>
        <td>{this.props.registerId}</td>
        <td>{this.props.date}</td>
      </tr>
      )
    }
}


export default class BoardList extends Component {
  state = {
    BoardList : [],
    checkList : []
  }

  onCheckboxChange = (e) => {
    const list = [...this.state.checkList];
    list.push(e.target.value);
    this.setState({
      checkList : list  
    })

    console.log(this.state.checkList)

  }
  
  getList = () => {
    Axios.get('http://localhost:8000/list')  //node의 8000/list는 const sql = "SELECT * FROM board"; 실행
    .then((res) => {
        //const data = res.data;
        //console.log(data);  [{…}, {…}, {…}] 형식이므로,
        //destructuring을 할수 있다.
        const {data} = res;  //이거로 떄려박으려고 초깃값 BoardList를 바꾼다
        console.log(data); 

        this.setState({
            BoardList:data
        })
        
    })
    .catch((error) => {
        console.log(error);
    })
  }



  //ui와 axois의 결과가 mount된 이후 나와야하므로,
  componentDidMount(){
    this.getList();
  }

  render() {
    //console.log(this.state.BoardList) // [{},{},{}] 로 들어가있다.
    return (
    <>
    <Table striped bordered hover>
        <thead>
            <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
            </tr>
        </thead>
        <tbody>
            {
                this.state.BoardList.map( (item, idx) => {
                    return (
                        <Board 
                        key={item.BOARD_ID} 
                        id={item.BOARD_ID}
                        title={item.BOARD_TITLE}
                        registerId={item.REGISTER_ID} 
                        date={item.REGISTER_DATE}
                        onCheckboxChange={this.onCheckboxChange}
                        ></Board>
                    )
                })
            }            

        </tbody>
    </Table>
    <div className='d-flex gap-1'>
        <Button variant='primary' >글쓰기</Button>
        <Button variant='secondary'>수정하기</Button>
        <Button variant='danger'>삭제하기</Button>
    </div>
    </>
    )
  }
}
