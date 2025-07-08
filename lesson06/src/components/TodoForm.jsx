import React, { useState } from "react";
import { DEFAULT_TIME } from "../api/constants";

const TodoForm = ({todos, calendarDate, onAddTodo }) => {
  const [text, setText] = useState("");
  // const [date, setDate] = useState(initialDate || "");
  const [time, setTime] = useState(DEFAULT_TIME);
  const [isExist, setExist] = useState(false)


  const handleSubmit = async () => {
    if (!text.trim() || !calendarDate || !time) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    const isExist = todos?.some((item)=>item.time ===time)
    if(isExist){
      setExist(true)
      return
    }

    await onAddTodo(calendarDate, time, text);
    setText("");
    setTime(DEFAULT_TIME);
  };

  const handleOk =() => {
    setExist(false)
  }


  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div style={{ margin: "1rem 0" }}>
      {/* <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        style={{ marginRight: "8px" }}
      /> */}
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        style={{ marginRight: "8px", padding: "4px" }}
      />
      <input
        type="text"
        placeholder="내용을 입력하세요."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{ marginRight: "8px", padding: "6px" }}
      />
      <button
        onClick={handleSubmit}
        style={{
          padding: "6px 12px",
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        저장
      </button>
      <div
        style={{
          backgroundColor: '#bbb',
          color: 'tomato',
          height: '30px',
          display: isExist ? 'block' : 'none',
          padding: '5px',
          textAlign: 'center',
          borderRadius: '6px'
        }}
      >
        이미 일정이 있습니다.
        <button
          onClick={handleOk}
          style={{
            fontSize: '0.75rem',
            marginLeft: '15px',
            borderColor: 'tomato'
          }}
        >
          확인
        </button>
      </div>
    </div>
    
  );
};

export default TodoForm;
