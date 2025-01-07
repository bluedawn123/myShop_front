import React from "react";
import BoardList from "../BoardList"; // 경로는 App.js에서와 동일하게 맞추세요.
import Write from "../Write";

function UserPage() {
  return (
    <div>
      <h1>수업시간에 하는거 여기서 관리해보자</h1>
      <p>여기에서 게시글을 확인하고 작성할 수 있습니다.</p>
      {/* BoardList와 Write를 추가 */}
      <BoardList />
      <Write />
    </div>
  );
}

export default UserPage;