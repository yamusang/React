import { useState } from "react";
import '../assets/css/TodoInsert.scss'
import { MdAdd } from "react-icons/md";

export default function TodoInsert({onInsert}) {

  const [value, setValue] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault(); // form 제출 기본 동작을 못하게 막음.
    // 입력값을 할일 목록(배열)에 추가시키는 함수 실행하기
    // 새로운 할일 입력값은 상태 변수
    onInsert(value);
    setValue("");
  };

  return (
    <form className="TodoInsert" onSubmit={handleSubmit}>
      <input
        placeholder="할 일을 입력하세요."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {/* type = "submit" 버튼 클릭은 onSubmi 이벤트 발생 => form태그에서  함수 실행 */}
      <button type="submit">
        <MdAdd />
        {/* type button이면 onclick이벤트 발생 */}
      </button>
    </form>
  );
}
