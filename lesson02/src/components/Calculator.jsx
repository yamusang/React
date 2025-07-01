// Day2_04 : 이벤트, useState 연습. 출력값, 오류 등에 활용. 유효성 검사


import { useState } from "react";

export default function InputState() {
  const [first, setFirst] = useState('');
  const [second, setSecond] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('') //오류메시지 저장 상태값

// 입력값의 유효성 검사 함수
  function validation(value){
  console.log(/^-?\d+(\.\d+)?$/.test(value), value)//정규식.test(값)
  if(/^-?\d+(\.\d+)?$/.test(value)){
    return true
  } else {
    setError('유효하지 않은 입력입니다.')
    setResult('')
    return false
  }
}
function handleAdd(){
  if(validation(first) && validation(second)){
    setResult(Number(first)+Number(second))
    setError('')
  }
}
function handleSub(){
  setResult(first-second)
}
function handleMul(){
  setResult(first*second)
}
function handleDiv(){
  //second가 0일 때는 Infinity() => 유효성 검사 필요
  // first가 0일 때는 0
  if(Number(second)!==0 && validation(first) && validation(second)){
    setResult(first/second)
    setError('')
  }else if(Number(second)===0){
    setError('0으로 나눌 수 없습니다.')
  }
}
  // e 변수는 : 발생한 이벤트 정보 입력값을 저장하는 변수
  return (
    <div>
      <h3>계산기</h3>
      <div style={{color:'red',fontSize:'0.8rem'}}>{error}</div>
      <input
        type="text"
        placeholder="첫번째 입력하세요."
        value={first}
        onChange={(e) => setFirst(e.target.value)}
        //onChange ={(e) => handleNumberInput(e.target.value)} 입력중에는 정확한 정규식 검사 불가
      />
      <button onClick={handleAdd}>＋</button>
      <button onClick={handleSub}>－</button>
      <button onClick={handleMul}>×</button>
      <button onClick={handleDiv}>÷</button>
      <input
        type="number"
        placeholder="두번째 입력하세요."
        value={second}
        onChange={(e) => setSecond(e.target.value)}
      />
      <hr />
      <span>
        결과:{result}
      </span>
    </div>
  );
}
