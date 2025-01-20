import React, { useState } from "react";

function BoardWrite() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // 작성된 데이터를 Node.js로 전송
    fetch("/api/boardWrite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
      }),
    })
      .then((response) => {
        if (response.ok) {
          alert("게시글이 작성되었습니다.");
          setTitle("");
          setContent("");
        } else {
          alert("게시글 작성에 실패했습니다.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("서버에 문제가 발생했습니다.");
      });
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "600px",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
        border: "1px solid #ddd",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>게시글 작성</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="title" style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>
            제목
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              fontSize: "16px",
            }}
            placeholder="제목을 입력하세요"
            required
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="content" style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>
            내용
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              fontSize: "16px",
              minHeight: "150px",
            }}
            placeholder="내용을 입력하세요"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          게시글 작성
        </button>
      </form>
    </div>
  );
}

export default BoardWrite;