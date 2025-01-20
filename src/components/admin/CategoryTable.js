import React from "react";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";

const CategoryTable = ({ categories, currentPage, itemsPerPage, onPageChange }) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = categories.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(categories.length / itemsPerPage);

  return (
    <div>
      <h3>등록된 카테고리</h3>
      <p>(각 단계는 1,2,3으로 각각 대분류, 중분류, 소분류를 나타내며 각 분류명은 상위의 분류체계를 따른다.)</p>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>코드</th>
            <th>분류명</th>
            <th>단계</th>
            <th>상위 코드</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((cat, index) => (
              <tr key={cat.cid}>
                <td>{startIndex + index + 1}</td>
                <td>{cat.code}</td>
                <td>{cat.name}</td>
                <td>{cat.step}</td>
                <td>{cat.pcode || "-"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                등록된 카테고리가 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <Pagination className="justify-content-center mt-3">
          {Array.from({ length: totalPages }, (_, i) => (
            <Pagination.Item
              key={i + 1}
              active={i + 1 === currentPage}
              onClick={() => onPageChange(i + 1)}
            >
              {i + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      )}
    </div>
  );
};

export default CategoryTable;
