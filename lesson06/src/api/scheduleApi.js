import { API_BASE_URL } from "./constants";

export const scheduleApi = {
  // schedules 과 관련된 api 함수를 scheduleApi 객체의 속성으로 정의. 함수이름=속성이름

  // 모든 스케줄 가져오기
  async getAllSchedules() {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
      throw new Error("Failed to load schedules");
    }
    return response.json();
  },

  // 특정 날짜 스케줄 가져오기
  async getScheduleByDate(date) {
    const response = await fetch(`${API_BASE_URL}/${date}`);
    if (!response.ok) {
      throw new Error(`Failed to load schedule for date: ${date}`);
    }
    return response.json();
  },

  // 체크 상태 업데이트
  async updateCheckedStatus(date, time, checked) {
    const response = await fetch(API_BASE_URL, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date,
        time,
        checked: !checked,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to update checked status");
    }
    return response.json();
  },

  // 할일 삭제
  async deleteTodo(date, time) {
    const response = await fetch(API_BASE_URL, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date,
        time,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to delete todo");
    }
    return response.json();
  },

  // 새 할일 추가
  async addTodo(date, time, text) {
    const response = await fetch(`${API_BASE_URL}/${date}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        time,
        text,
        checked: false,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to add todo");
    }
    return response.json();
  },
};
