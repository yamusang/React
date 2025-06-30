import React from 'react'
import TwiceUL, { BtsUL } from './TestUL'
// export default가 아닌 것은 표현식 기호 { 함수이름 } 형태로 import 


// Day1_03 : TestUL.jsx의 컴포넌트 2개를 화면에 출력하기 위한 부모 컴퍼넌트
//           index.js 에서 App 컴포넌트로 동작합니다.
export default function App
() {
  return (
    <div>App2
        <TwiceUL/>
        <BtsUL/>
    </div>
  );
}
// 컴포넌트는 함수로 정의합니다.(함수형 컴포넌트)
// 파일명과 함수이름이 동일할 필요 없습니다.
