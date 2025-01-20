import React, { useState } from "react";
import "../../styles/ProductAdd.css";

function ProductAdd() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category_code: "",
    brand: "",
    images: [], // 이미지 파일 저장
  });

  const [inputKey, setInputKey] = useState(Date.now()); // 파일 입력 필드 고유 키

  const handleAddImage = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      console.log("선택된 파일이 없습니다.");
      return;
    }

    const files = Array.from(e.target.files);
    console.log("선택된 파일 목록:", files);

    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file), // 미리 보기 URL 생성
    }));

    console.log("미리 보기 URL 생성 완료:", newImages);

    setFormData((prevData) => ({
      ...prevData,
      images: [...prevData.images, ...newImages],
    }));

    // 파일 입력 필드 초기화 대신 고유 키 업데이트로 컴포넌트 강제 리렌더링
    setInputKey(Date.now());
  };

  const handleRemoveImage = (index) => {
    const updatedImages = formData.images.filter((_, i) => i !== index);

    URL.revokeObjectURL(formData.images[index].preview);

    setFormData((prevData) => ({
      ...prevData,
      images: updatedImages,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const uploadData = new FormData();
    uploadData.append("name", formData.name);
    uploadData.append("description", formData.description);
    uploadData.append("price", formData.price);
    uploadData.append("category_code", formData.category_code);
    uploadData.append("brand", formData.brand);

    formData.images.forEach((image, index) => {
      uploadData.append(`images[${index}]`, image.file);
    });

    try {
      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        body: uploadData,
      });

      if (response.ok) {
        alert("상품이 성공적으로 추가되었습니다!");
        setFormData({
          name: "",
          description: "",
          price: "",
          category_code: "",
          brand: "",
          images: [],
        });
      } else {
        alert("상품 추가에 실패했습니다.");
      }
    } catch (error) {
      console.error("에러 발생:", error);
      alert("서버에 연결하는 중 에러가 발생했습니다.");
    }
  };

  return (
    <div className="product-add-container">
      <div className="product-images-section">
        {/* 이미지 표시 영역 */}
        {formData.images.length === 0 ? (
          <div className="no-image-message">
            <p>이미지가 없습니다.</p>
          </div>
        ) : (
          <div>
            {/* 대표 이미지 표시 */}
            <div className="main-image-container">
              <img
                src={formData.images[0].preview}
                alt="대표 이미지"
                className="main-image"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(0)}
                className="remove-button main-image-remove"
              >
                ×
              </button>
            </div>
            {/* 나머지 이미지 목록 */}
            <ul className="thumbnail-list">
              {formData.images.slice(1).map((image, index) => (
                <li key={index + 1} className="thumbnail-item">
                  <img
                    src={image.preview}
                    alt={`썸네일 ${index + 1}`}
                    className="thumbnail-preview"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index + 1)}
                    className="remove-button"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        {/* 이미지 추가 영역 */}
        <div className="image-upload">
          <label>이미지 추가:</label>
          <input
            key={inputKey}
            type="file"
            multiple
            accept="image/*"
            onChange={handleAddImage}
            className="form-input"
          />
        </div>
      </div>
      <div className="product-form-section">
        <form onSubmit={handleSubmit} className="product-add-form">
          <div className="form-group inline">
            <label>상품 이름:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group inline">
            <label>가격:</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group inline">
            <label>카테고리 코드:</label>
            <input
              type="text"
              name="category_code"
              value={formData.category_code}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group inline">
            <label>브랜드:</label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>상품 설명:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          <button type="submit" className="submit-button">
            추가
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProductAdd;
