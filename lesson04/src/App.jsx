import { useEffect,useState } from "react";
import TodoList from "./components/TodoList";
import TodoInsert from "./components/TodoInsert";
import TodoTemplate from "./components/TodoTemplate";
//npm i sass react-icons

export default function App() {
  //백엔드 서버에 접속해서 데이터 가져오기
  const API_BASE_URL = "http://localhost:5000/api/todos";
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false); //fetch 실행 중이면 true


  // 리액트 웹서버 <-> nodejs 백엔드(WAS)
  // curl -X GET http://localhost:5000/api/todos
  const fetchTodos = async () => {
    try {
      setLoading(true); //fetch 시작~~
      const response = await fetch(API_BASE_URL); //GET 요청, 두번째 인자 없음
      if (response.ok) {
        const data = await response.json();
        setTodos(data);
        console.log(data);
      } else {
        console.error("데이터 가져오기 실패");
      }
    } catch (error) {
      console.error("네트워크 오류:", error);
    } finally {
      //try{} 구문 끝나면 실행
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchTodos();
  }, []); //랜더링 후에 한번만 실행. useEffect는 side 처리할 때

  /*
curl -X PUT http://localhost:5000/api/todos/2 ^
    -H "Content-Type: application/json" ^
    -d "{\"checked\":\"true\"}"

  */
  async function handleChecked(id) {
    try {
      // 기존 todos에서 id 값에 해당하는 하나의 객체를 가져오기
      // find는 콜백함수 조건이 참인 1개만 리턴
      const idTodo = todos.find((item) => item.id === id);
      const newChecked = !idTodo.checked;

      setLoading(true);
      const options = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ checked: newChecked }),
      };
      //백엔드 서버를 통해 db값 변경
      const response = await fetch(`${API_BASE_URL}/${id}`, options);

      if (response.ok) {
        // 현재 상태값 변경 => 화면
        const newtodos = todos.map((item) =>
          item.id === id ? { ...item, checked: !item.checked } : item
        );
        setTodos(newtodos);
      } else {
        console.error("데이터 todo checked 수정 실패!!!");
      }
    } catch (error) {
      console.error("네트워크 오류:", error);
    } finally {
      setLoading(false);
    }
  }

  // todos  할 일 객체 목록 중 삭제하기
  //curl -X DELETE http://localhost:5000/api/todos/3

  async function handleRemove(id) {
    
    try {
      setLoading(true); //fetch 시작~~
      //options 두번째 인자는 객체 직접 사용 가능합니다.
      const resp = await fetch(`${API_BASE_URL}/${id}`, { method: "DELETE" }); //GET 요청, 두번째 인자 없음
      if (resp.ok) {
        const newtodos = todos.filter((item) => item.id !== id);
        setTodos(newtodos);
        console.log(newtodos);
      } else {
        console.error("데이터 가져오기 실패");
      }
    } catch (error) {
      console.error("네트워크 오류:", error);
    } finally {
      //try{} 구문 끝나면 실행
      setLoading(false);
    }
  }

  // todos 에 할일 객체를 추가
  const handleInsert = async (text) => {
    if (!text.trim()) {
      //text.trim()===''
      window.alert("할일 todo 입력 필수입니다.!");
      return;
    }
    try {
      setLoading(true);
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: text }), //"{\"text\":\"노션 학습\"}" => json 문자열
      };
      //"{\"text\":\"노션 학습\"}" => json 문자열(데이터를 송수신할 때 문자열로 합니다.)
      //JSON.stringify : JS 객체{text:"과제하기"}를 json 문자열로 변환

      /*
curl -X POST http://localhost:5000/api/todos ^
    -H "Content-Type: application/json" ^
    -d "{\"text\":\"노션 학습\"}"
      */
      const response = await fetch(API_BASE_URL, options);

      if (response.ok) {
        const newTodo = await response.json();
        setTodos([...todos, newTodo]);
      } else {
        console.error("데이터 todo 추가 실패!!!");
      }
    } catch (error) {
      console.error("네트워크 오류:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <TodoTemplate>
        {/* TodoInsert, TodoList 컴포넌트 
        => TodoTemplate 컴포넌트의 children속성으로 사용할 수 있습니다.*/}
        {/* 속성 이름은 개발자가 정합니다.. 속성의 값은 정의된 것으로 해야합니다. */}
        <TodoInsert onInsert={handleInsert}></TodoInsert>
        <TodoList
          todos={todos}
          onRemove={handleRemove}
          onChecked={handleChecked}
        ></TodoList>
      </TodoTemplate>
    </div>
  );
}
