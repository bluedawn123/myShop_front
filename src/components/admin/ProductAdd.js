import React, { useState } from "react";
import styles from "../../styles/ProductAdd.module.css"; // CSS 모듈 import

function ProductAdd() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category_code: "",
    brand: "",
    images: [], // 업로드된 이미지 데이터 배열
  });

  const [inputKey, setInputKey] = useState(Date.now()); // 파일 입력 필드 고유 키

  // 이미지 추가
  const handleAddImage = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      console.log("선택된 파일이 없습니다.");
      return;
    }

    const files = Array.from(e.target.files);
    console.log("선택된 파일 목록:", files);

    // 파일별로 미리보기 URL 생성
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    console.log("미리 보기 URL 생성 완료:", newImages);

    setFormData((prevData) => ({
      ...prevData,
      images: [...prevData.images, ...newImages], // 기존 이미지 배열에 새로운 이미지 추가
    }));

    setInputKey(Date.now()); // 컴포넌트 강제 리렌더링
  };

  // 이미지 삭제
  const handleRemoveImage = (index) => {
    const updatedImages = formData.images.filter((_, i) => i !== index);

    // 메모리 해제
    URL.revokeObjectURL(formData.images[index].preview);

    setFormData((prevData) => ({
      ...prevData,
      images: updatedImages,
    }));
  };

  // 입력 값 변경
  const handleChange = (e) => {
    let { name, value } = e.target;
  
    // 가격 입력 값이 숫자형이므로 parseFloat으로 변환
    if (name === "price") {
      // 빈 문자열을 0으로 처리
      value = value ? parseFloat(value) : 0;
    }
  
    console.log(`${name} 값 변경:`, value);  // 입력 값 확인을 위한 console.log
  
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 폼 제출 시 서버로 데이터 전송
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("폼 제출 데이터:", formData);  // 폼 제출 시 전체 데이터 확인

    const uploadData = new FormData();
    uploadData.append("name", formData.name);
    uploadData.append("description", formData.description);
    uploadData.append("price", formData.price);
    uploadData.append("category_code", formData.category_code);
    uploadData.append("brand", formData.brand);

    // 이미지 파일 추가
    formData.images.forEach((image, index) => {
      uploadData.append("images", image.file); // images라는 필드 이름으로 수정
    });

    try {
      const response = await fetch("http://localhost:8000/api/products", {
        method: "POST",
        body: uploadData, // 파일을 포함한 FormData를 보냄
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
    <div className={styles["product-add-container"]}>
      <div className={styles["product-images-section"]}>
        {formData.images.length === 0 ? (
          <div className={styles["no-image-message"]}>
            <p>이미지가 없습니다.</p>
          </div>
        ) : (
          <div>
            <div className={styles["main-image-container"]}>
              <img
                src={formData.images[0].preview}
                alt="대표 이미지"
                className={styles["main-image"]}
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(0)}
                className={styles["remove-button"] + " " + styles["main-image-remove"]}
              >
                ×
              </button>
            </div>
            <ul className={styles["thumbnail-list"]}>
              {formData.images.slice(1).map((image, index) => (
                <li key={index + 1} className={styles["thumbnail-item"]}>
                  <img
                    src={image.preview}
                    alt={`썸네일 ${index + 1}`}
                    className={styles["thumbnail-preview"]}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index + 1)}
                    className={styles["remove-button"]}
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className={styles["image-upload"]}>
          <label>이미지 추가:</label>
          <input
            key={inputKey}
            type="file"
            multiple
            accept="image/*"
            onChange={handleAddImage}
            className={styles["form-input"]}
          />
        </div>
      </div>
      <div className={styles["product-form-section"]}>
        <form onSubmit={handleSubmit} className={styles["product-add-form"]}>
          <div className={styles["form-group"] + " " + styles["inline"]}>
            <label>상품 이름:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={styles["form-input"]}
            />
          </div>
          <div className={styles["form-group"] + " " + styles["inline"]}>
            <label>가격:</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className={styles["form-input"]}
            />
          </div>
          <div className={styles["form-group"] + " " + styles["inline"]}>
            <label>카테고리 코드:</label>
            <input
              type="text"
              name="category_code"
              value={formData.category_code}
              onChange={handleChange}
              required
              className={styles["form-input"]}
            />
          </div>
          <div className={styles["form-group"] + " " + styles["inline"]}>
            <label>브랜드:</label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className={styles["form-input"]}
            />
          </div>
          <div className={styles["form-group"]}>
            <label>상품 설명:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className={styles["form-input"]}
            />
          </div>
          <button type="submit" className={styles["submit-button"]}>
            추가
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProductAdd;
