import { useRef, useState } from "react";
import TodoList from "./components/TodoList";

export default function App() {
   const initVal = [
      {
        id: 1,
        text: "리액트 수업 복습",
        checked: true,
      },
      {
        id: 2,
        text: "리액트 프로젝트 기획",
        checked: false,
      },
      {
        id: 3,
        text: "데이터베이스 테스트",
        checked: true,
      },
    ];
    const [todos, setTodos] = useState(initVal);
    const maxid = useRef(todos.length + 1);
  
  
    function handleChecked(id) { 
      const newtodos = todos.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      );
      setTodos(newtodos);
    }
  
    // todos  할 일 객체 목록 중 삭제하기
    function handleRemove(id) {
      const newtodos = todos.filter((item) => item.id !== id);
      setTodos(newtodos);
    }
  
    // todos 에 할일 객체를 추가
    const handleInsert = (text) => {
      const todo = {
        id: maxid.current,
        text,
        checked: false,
      };
  
      // todos 에 새로운 todo를 추가해서 변경합니다.
      setTodos([...todos, todo]);
  
      maxid.current += 1;
    };
  
  
  return (
    <div>
      <TodoList
        todos={todos} onRemove={handleRemove} onChecked={handleChecked}
      ></TodoList>
    </div>
  )
}

