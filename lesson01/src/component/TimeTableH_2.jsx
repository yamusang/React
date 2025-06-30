//day1_08 : 부모 컴포넌트가 자식에게 전달하는 데이터(프로퍼티) 연습
//                         ㄴ 객체 타입 변수로 저장하기 -> 변수명 props. prop는 여러 속성 저장
//          부모 컴포넌트는 App4
import '../css/TimeTableH.css'
export default function TimeTableH(props) {

    return (
    <div>
        <h3 className='title'>{props.title}</h3>
        <table >
            {/* 리액트에서는 tr을 tbody, thead 부모요소 아래에 포함합니다. */}
            <tbody>
                <tr>
                    <th className='theading'>TIME</th>
                    {/* time배열의 값들로 td 태그 요소 만들기 */}
                    {props.time.map((item,idx)=>(
                        <td key={idx} className='tdata'>{item}</td>
                    ))}
                </tr>
                <tr>
                    <th className='theading'>TODO</th>
                    {/* todo 배열의 값들로 td 태그 요소 만들기 */}
                    {props.todo.map((item,idx)=>(
                        <td key={idx} className='tdata'>{item}</td>
                    ))}
                </tr>
            </tbody>
        </table>
    </div>
  )
}
