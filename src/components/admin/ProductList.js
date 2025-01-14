import React, { useState, useEffect } from "react";

function ProductList() {
  const [products, setProducts] = useState([]); // 상품 목록 상태

  useEffect(() => {
    // 여기서 API 호출로 데이터를 불러올 수 있습니다.
    // 예: fetch("/api/products").then(res => res.json()).then(data => setProducts(data));
    setProducts([]); // 초기값 설정 (빈 배열)
  }, []);

  return (
    <div>
      <h2>상품 관리 list</h2>
      {products.length === 0 ? (
        <p>등록된 상품이 없습니다.</p> // 상품이 없을 때 메시지 출력
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              {product.name} - {product.price.toLocaleString()}원
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProductList;
