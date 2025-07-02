//Day1_05 : KPopUL 컴포넌트의 부모 컴포넌트
//           ㄴ   {members} 배열을 부모가 전달
//            index.js에서 App의 파일 위치 수정

import KPopUL from "./KPopUL";


export default function App() {
    const twice = ["나연❤", "모모", "다현", "지효","사나","쯔위"]
    return (
    <div>
      {/* 자식 컴포넌트에 정의한속성들은(members, title, 새로운 속성,,,,)
       하나의 객체로 자식 컴포넌트에게 전달 */}
        <KPopUL members={twice} title={"트와이스"}/>
        <KPopUL members={["슈가","지민","제이홉","뷔"]} title={"BTS"}/>
    </div>
  )
}
