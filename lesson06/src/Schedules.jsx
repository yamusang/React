import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // 캘린더 기본 스타일
import { useSchedules } from "./hooks/useSchedules";
import TodosCardList from "./TodosCardList";
import TodoForm from "./components/TodoForm";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage";
import { dateFormat } from "./utils/dateUtils";
//보완할 점: 할일을 추가할 때, 같은 날짜이면서 같은 시간에 일정 추가 방지
export default function Schedules() {
  const {
    schedules,
    selectedSchedule,
    sortedSchedules,
    loading,
    error,
    selectScheduleByDate,
    updateCheckedStatus,
    deleteTodo,
    addTodo,
  } = useSchedules();

  const [calendarDate, setCalendarDate] = useState(new Date());
//캘린더에서 선택한 날짜는 콜백함수에서 입력값(인자)로 전달.
  const handleDateChange = (date) => {
    setCalendarDate(date);   //date는 new Date() 형식의 객체
    const selDate = dateFormat(date); // 날짜 객체로 문자열 'YYYY-MM-DD'만들기
    selectScheduleByDate(selDate); 
    //날짜로 nodejs 서버에서 일정 가져와서 selectedSchedule 상태값 변경
  };

  if (loading) {
    return <LoadingSpinner message="스케줄을 불러오는 중..." />;
  }

  if (error) {
    return (
      <ErrorMessage message={error} onRetry={() => window.location.reload()} />
    );
  }

  // if (!schedules || schedules.length === 0) {
  //   return (
  //     <div style={{ padding: "20px", textAlign: "center" }}>
  //       <h3>스케줄 데이터가 없습니다.</h3>
  //       <TodoForm onAddTodo={addTodo} />
  //     </div>
  //   );
  // }

  // if (!selectedSchedule) {
  //   return (
  //     <div style={{ padding: "20px", textAlign: "center" }}>
  //       선택된 스케줄이 없습니다.
  //     </div>
  //   );
  // }

  const handleAllDelete =() =>{
    const yn=window.confirm(
      `${selectedSchedule.date} 모든 일정을 삭제할까요?`
    )
    if(yn)deleteTodo(null) //time은 null
      // ㄴ 로컬 상태 업데이트를 추가하기 : time이 null 일때, schedules 상태값을 해당 날짜 제외하고 필터링
      //(useSchedules.js 커스텀 훅의 deleteTodo 함수 수정하기)
  }


  return (
    <div
      className="container"
      style={{
        padding: "20px",
        margin: "0 auto",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#333", marginBottom: "2rem" }}>
        일정 관리
      </h2>

      {/* 캘린더 UI */}
      <div style={{ display: "flex" }}>
        <div style={{ margin: "30px", width: "380px", textAlign: "center" }}>
          <Calendar
            onChange={handleDateChange}
            value={calendarDate}
            locale="ko-KR"
            formatDay={(locale, date) => date.getDate()}
            tileContent={({ date, view }) => {
              if (view === "month") {
                const dateStr = dateFormat(date);
                const hasSchedule = schedules?.some((s) => s.date === dateStr);
                return hasSchedule ? (
                  <div
                    style={{
                      textAlign: "center",
                      color: "pink",
                      fontSize: "1.2rem",
                    }}
                  >
                    ●
                  </div>
                ) : null;
              }
              return null;
            }}
          />

          {/* 새 할일 추가 */}
          <TodoForm
            todos={selectedSchedule?.todos}
            calendarDate={dateFormat(calendarDate)}
            onAddTodo={addTodo}
          />
          <hr style={{ margin: "2rem 0" }} />
        </div>

        <div style={{ marginBottom: "2rem", width: "400px" }}>
          <h3 style={{ color: "#333", marginBottom: "1rem" }}>
            📅 {selectedSchedule?.date}
          </h3>
          {selectedSchedule &&
          selectedSchedule.todos &&
          selectedSchedule.todos.length > 0 ? (<button style={{color:'tomato'}} onClick={handleAllDelete}>전체 삭제</button>):('')}
            {/* 선택된 날짜에 selectedSchedule.todos가 있을 때만 TodosCardList 컴포넌트를 만들어요.
            selectedSchedule.todos는 selectSchedule 객체가 null일때(false) 실행하면 오류가 생깁니다. 
            그래서 앞에 조건을 추가.
            */}
          {selectedSchedule &&
          selectedSchedule.todos &&
          selectedSchedule.todos.length > 0 ? (
            <>
              <hr style={{ margin: "2rem 0" }} />
              <TodosCardList
                todos={selectedSchedule.todos}
                onCheckedUpdate={updateCheckedStatus}
                onRemoved={deleteTodo}
              />
            </>
          ) : (
            <p
              style={{
                color: "#666",
                fontStyle: "italic",
                textAlign: "center",
                padding: "2rem",
              }}
            >
              이 날짜에 등록된 할일이 없습니다.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
