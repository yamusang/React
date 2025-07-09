import { useRef, useState } from "react";
import TodoList from "./components/TodoList";
import TodoInsert from "./components/TodoInsert";
import TodoTemplate from "./components/TodoTemplate";

//day3_04 : 컴포넌트 리팩토링해서 사용
//Day4_01 : children 속성 사용해서 완성함.
//          useRef()훅으로 재렌더링 횟수 비교(App_V1.jsx)
export default function App() {
   const renderCount = useRef(0) // useRef는 리액트 함수(훅)
   renderCount.current +=1

   const initVal = [
      {
        id: 1,
        today: "2025-07-03",
        text: "리액트 수업 복습",
        checked: true,
      },
      {
        id: 2,
        today: "2025-07-03",
        text: "리액트 프로젝트 기획",
        checked: false,
      },
      {
        id: 3,
        today: "2025-07-03",
        text: "데이터베이스 테스트",
        checked: true,
      },
    ];
    const [todos, setTodos] = useState(initVal);
    const [today, setToday] = useState();
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
      <TodoTemplate>
        {/* TodoInsert, TodoList 컴포넌트 
        => TodoTemplate 컴포넌트의 children속성으로 사용할 수 있습니다.*/}
        {/* 속성 이름은 개발자가 정합니다.. 속성의 값은 정의된 것으로 해야합니다. */}
        <h2>{today}</h2>
        <TodoInsert onInsert={handleInsert}></TodoInsert>
        <TodoList
          todos={todos} onRemove={handleRemove} onChecked={handleChecked}
        ></TodoList>
      </TodoTemplate>
      <hr />
      <input type="date" onChange={(e)=>setToday(e.target.value)} />

    </div>
  )
}

