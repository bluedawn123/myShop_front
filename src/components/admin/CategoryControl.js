import React, { useState, useEffect } from "react";

function CategoryAdd() {
  const [categories, setCategories] = useState([]); // 기존 카테고리 목록
  const [newCategory, setNewCategory] = useState({
    parent: "",
    name: "",
    sizeOptions: [],
    fitOptions: [],
  }); // 새 카테고리 입력 상태

  useEffect(() => {
    // 기존 카테고리 데이터를 가져옵니다 (API 호출).
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory((prev) => ({ ...prev, [name]: value }));
  };

  const handleSizeOptionsChange = (e) => {
    const options = e.target.value.split(",").map((opt) => opt.trim());
    setNewCategory((prev) => ({ ...prev, sizeOptions: options }));
  };

  const handleFitOptionsChange = (e) => {
    const options = e.target.value.split(",").map((opt) => opt.trim());
    setNewCategory((prev) => ({ ...prev, fitOptions: options }));
  };

  const handleAddCategory = (e) => {
    e.preventDefault();

    if (!newCategory.name) {
      alert("카테고리 이름을 입력하세요.");
      return;
    }

    // 카테고리 추가 API 호출
    fetch("/api/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCategory),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("카테고리가 등록되었습니다.");
        setCategories((prev) => [...prev, data]); // 새로운 카테고리를 추가
        setNewCategory({ parent: "", name: "", sizeOptions: [], fitOptions: [] }); // 입력 필드 초기화
      })
      .catch((err) => console.error("Error adding category:", err));
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center", color: "#222", fontSize: "1.8em", marginBottom: "20px" }}>카테고리 등록</h2>

      {/* 카테고리 등록 폼 */}
      <form onSubmit={handleAddCategory} style={{ background: "#ffffff", padding: "20px", borderRadius: "10px", boxShadow: "0 6px 10px rgba(0, 0, 0, 0.1)" }}>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px", fontSize: "1em", color: "#444" }}>상위 카테고리:</label>
          <select
            name="parent"
            value={newCategory.parent}
            onChange={handleInputChange}
            style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ddd", fontSize: "1em" }}
          >
            <option value="">-- 상위 카테고리 선택 --</option>
            {categories
              .filter((cat) => !cat.parent) // 상위 카테고리만 표시
              .map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
          </select>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px", fontSize: "1em", color: "#444" }}>카테고리 이름:</label>
          <input
            type="text"
            name="name"
            value={newCategory.name}
            onChange={handleInputChange}
            placeholder="카테고리 이름을 입력하세요"
            required
            style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ddd", fontSize: "1em" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px", fontSize: "1em", color: "#444" }}>사이즈 옵션 (쉼표로 구분):</label>
          <input
            type="text"
            name="sizeOptions"
            value={newCategory.sizeOptions.join(", ")}
            onChange={handleSizeOptionsChange}
            placeholder="예: S, M, L"
            style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ddd", fontSize: "1em" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px", fontSize: "1em", color: "#444" }}>핏 옵션 (쉼표로 구분):</label>
          <input
            type="text"
            name="fitOptions"
            value={newCategory.fitOptions.join(", ")}
            onChange={handleFitOptionsChange}
            placeholder="예: Fit1, Fit2, Fit3, Fit4"
            style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ddd", fontSize: "1em" }}
          />
        </div>

        <button type="submit" style={{ width: "100%", padding: "12px", background: "#4CAF50", color: "white", border: "none", borderRadius: "5px", fontWeight: "bold", fontSize: "1em", cursor: "pointer", transition: "background 0.3s" }}
          onMouseOver={(e) => e.target.style.background = "#45A049"}
          onMouseOut={(e) => e.target.style.background = "#4CAF50"}
        >
          카테고리 등록
        </button>
      </form>

      {/* 기존 카테고리 목록 */}
      <div style={{ marginTop: "40px" }}>
        <h3 style={{ color: "#555", fontSize: "1.5em", marginBottom: "20px" }}>등록된 카테고리</h3>
        {categories.length === 0 ? (
          <p style={{ color: "#999", fontSize: "1em" }}>등록된 카테고리가 없습니다.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: "0" }}>
            {categories.map((cat) => (
              <li key={cat.id} style={{ padding: "15px", background: "#f5f5f5", marginBottom: "10px", borderRadius: "5px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
                <strong style={{ fontSize: "1.1em", color: "#333" }}>{cat.name}</strong>
                {cat.sizeOptions && cat.sizeOptions.length > 0 && (
                  <div style={{ fontSize: "0.9em", color: "#666", marginTop: "5px" }}>사이즈 옵션: {cat.sizeOptions.join(", ")}</div>
                )}
                {cat.fitOptions && cat.fitOptions.length > 0 && (
                  <div style={{ fontSize: "0.9em", color: "#666", marginTop: "5px" }}>핏 옵션: {cat.fitOptions.join(", ")}</div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default CategoryAdd;
