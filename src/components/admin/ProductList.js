import React, { useState, useEffect } from "react";

function ProductList() {
  const [products, setProducts] = useState([]); // 상품 목록 상태
  const [loading, setLoading] = useState(true); // 로딩 상태

  useEffect(() => {
    // 상품 목록을 가져오는 API 호출
    fetch("http://localhost:8000/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data); // API로 받은 상품 목록
        setLoading(false); // 로딩 종료
      })
      .catch((error) => {
        console.error("상품 목록 불러오기 오류:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2>상품 관리</h2>
      {loading ? (
        <p>로딩 중...</p> // 로딩 상태일 때 메시지 출력
      ) : products.length === 0 ? (
        <p>등록된 상품이 없습니다.</p> // 상품이 없을 때 메시지 출력
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.pid}>
              {product.name} - {product.price.toLocaleString()}원
              <ul>
                {product.images.map((image, index) => (
                  <li key={index}>
                    <img
                      src={image.image_path}
                      alt={`상품 이미지 ${index + 1}`}
                      style={{ width: "100px", height: "100px" }}
                    />
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProductList;
