import React, { useState } from "react";

function ProductManagement() {
  const [products, setProducts] = useState([]);

  const handleAddProduct = () => {
    // 예제 상품 추가 로직
    const newProduct = { id: Date.now(), name: "새 상품", price: 10000 };
    setProducts([...products, newProduct]);
  };

  return (
    <div>
      <h2>상품 관리</h2>
      <button onClick={handleAddProduct}>상품 추가</button>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - {product.price}원
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductManagement;
