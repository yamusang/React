import { useState, useEffect, useMemo } from "react";
import { scheduleApi } from "../api/scheduleApi";
import { DEFAULT_TIME } from "../api/constants";

export const useSchedules = () => {
  const [schedules, setSchedules] = useState(null);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 정렬된 스케줄 메모이제이션
  const sortedSchedules = useMemo(() => {
    return schedules?.sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [schedules]);

  // 초기 데이터 로드
  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await scheduleApi.getAllSchedules();
      setSchedules(data);
      if (data.length > 0) {
        setSelectedSchedule(data[0]);
      }
    } catch (err) {
      setError(err.message);
      console.error("Error loading schedules:", err);
    } finally {
      setLoading(false);
    }
  };

  // 특정 날짜 스케줄 선택
  const selectScheduleByDate = async (date) => {
    try {
      setLoading(true);
      setError(null);
      const data = await scheduleApi.getScheduleByDate(date);
      //추가된 시간 포함하여 todos를 time 속성으로 정렬
      //data가 있을 때만 data.todos 값을 가져와서 sort해라
      data?.todos.sort((a, b) => a.time.localeCompare(b.time));
      setSelectedSchedule(data);
    } catch (err) {
      setError(err.message);
      console.error("Error selecting schedule:", err);
    } finally {
      setLoading(false);
    }
  };

  // 체크 상태 업데이트
  const updateCheckedStatus = async (time, checked) => {
    if (!selectedSchedule) return;

    try {
      setLoading(true);
      setError(null);
      await scheduleApi.updateCheckedStatus(
        selectedSchedule.date,
        time,
        checked
      );

      // 로컬 상태 업데이트
      const updatedTodos = selectedSchedule.todos.map((item) =>
        item.time === time ? { ...item, checked: !item.checked } : item
      );

      const updatedSchedule = {
        ...selectedSchedule,
        todos: updatedTodos,
      };

      setSelectedSchedule(updatedSchedule);

      // 전체 스케줄 목록도 업데이트
      setSchedules((prevSchedules) =>
        prevSchedules.map((item) =>
          item.date === selectedSchedule.date ? updatedSchedule : item
        )
      );
    } catch (err) {
      setError(err.message);
      console.error("Error updating checked status:", err);
    } finally {
      setLoading(false);
    }
  };

  // 할일 삭제
  const deleteTodo = async (time) => {
    if (!selectedSchedule) return;

    try {
      setLoading(true);
      setError(null);
      await scheduleApi.deleteTodo(selectedSchedule.date, time);

      // 로컬 상태 업데이트
      if (time) {
        const filteredTodos = selectedSchedule.todos.filter(
          (item) => item.time !== time
        );

        const updatedSchedule = {
          ...selectedSchedule,
          todos: filteredTodos,
        };

        setSelectedSchedule(updatedSchedule);

        // 전체 스케줄 목록도 업데이트
        setSchedules((prevSchedules) =>
          prevSchedules.map((item) =>
            item.date === selectedSchedule.date ? updatedSchedule : item
          )
        );
      } else {
        setSchedules((prevSchedules) =>
          prevSchedules.filter((item) => 
            item.date !== selectedSchedule.date)
        );
        setSelectedSchedule({});
      }
    } catch (err) {
      setError(err.message);
      console.error("Error deleting todo:", err);
    } finally {
      setLoading(false);
    }
  };

  // 새 할일 추가
  const addTodo = async (date, time, text) => {
    try {
      setLoading(true);
      setError(null);
      await scheduleApi.addTodo(date, time, text);

      const newTodo = { time, text, checked: false };
      const existingSchedule = schedules?.find((item) => item.date === date);

      if (!existingSchedule) {
        // 새 날짜 스케줄 생성
        const newSchedule = { date, todos: [newTodo] };
        setSchedules((prevSchedules) => [...prevSchedules, newSchedule]);
        setSelectedSchedule(newSchedule);
      } else {
        // 기존 스케줄에 추가
        const updatedSchedule = {
          ...existingSchedule,
          todos: [...existingSchedule.todos, newTodo].sort((a, b) =>
            a.time.localeCompare(b.time)
          ),
        };

        setSchedules((prevSchedules) =>
          prevSchedules.map((item) =>
            item.date === date ? updatedSchedule : item
          )
        );
        setSelectedSchedule(updatedSchedule);
      }
    } catch (err) {
      setError(err.message);
      console.error("Error adding todo:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return {
    schedules,
    selectedSchedule,
    sortedSchedules,
    loading,
    error,
    selectScheduleByDate,
    updateCheckedStatus,
    deleteTodo,
    addTodo,
  };
};
