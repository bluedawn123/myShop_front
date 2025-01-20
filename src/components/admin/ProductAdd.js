import React, { useState } from "react";

function ProductAdd() {
  const [productName, setProductName] = useState(""); // 상품명 상태
  const [price, setPrice] = useState(""); // 가격 상태
  const [category, setCategory] = useState(""); // 카테고리 상태
  const [description, setDescription] = useState(""); // 설명 상태
  const [image, setImage] = useState(null); // 이미지 파일 상태
  const [preview, setPreview] = useState(null); // 이미지 미리보기 상태

  // 이미지 파일 선택 핸들러
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // 파일 저장
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result); // 미리보기 설정
      };
      reader.readAsDataURL(file); // 파일을 Data URL로 변환
    }
  };

  // 상품 등록 함수
  const handleAddProduct = () => {
    if (!productName || !price || !category || !image) {
      alert("모든 필드를 입력해주세요!");
      return;
    }

    const productData = {
      name: productName,
      price: parseFloat(price),
      category: category,
      description: description,
      image, // 이미지 파일
    };

    console.log("등록된 상품:", productData);
    alert("상품이 등록되었습니다!");

    // 초기화
    setProductName("");
    setPrice("");
    setCategory("");
    setDescription("");
    setImage(null);
    setPreview(null);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>상품 등록</h2>

      {/* 상품 입력 폼 */}
      <div style={{ marginBottom: "20px" }}>
        <div>
          <label>상품명:</label>
          <input
            type="text"
            placeholder="상품명을 입력하세요"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div>
          <label>가격:</label>
          <input
            type="number"
            placeholder="가격을 입력하세요"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <label>카테고리:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">카테고리 선택</option>
            <option value="의류">의류</option>
            <option value="전자기기">전자기기</option>
            <option value="생활용품">생활용품</option>
            {/* 카테고리 추가 */}
          </select>
        </div>
        <div>
          <label>설명:</label>
          <textarea
            placeholder="상품 설명을 입력하세요"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>이미지:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {preview && (
            <div style={{ marginTop: "10px" }}>
              <p>미리보기:</p>
              <img
                src={preview}
                alt="미리보기"
                style={{ width: "200px", height: "200px", objectFit: "cover" }}
              />
            </div>
          )}
        </div>
        <button style={{ marginTop: "20px" }} onClick={handleAddProduct}>
          등록
        </button>
      </div>
    </div>
  );
}

export default ProductAdd;
