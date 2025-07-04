import { useState } from "react";

export default function Box() {


function handleResize(e){
    
}


  const [boxwidth, setWidth] = useState(100);
  const [boxheight, setHeight] = useState(100);
  const [posLeft, setLeft] = useState(300);
  const [posTop, setTop] = useState(300);

  return (
    <>
      <button onClick={handleResize} id="width_inc">
        가로+
      </button>
      <button onClick={handleResize} id="width_dec">
        가로-
      </button>
      <button onClick={handleResize} id="height_inc">
        세로+
      </button>
      <button onClick={handleResize} id="height_dec">
        세로-
      </button>
      <hr />
      <div id="container">
        {/* SandBox 렌더링 하기 위해 너비, 높이를 전달해 줍니다. */}
        <SandBox />
      </div>
    </>
  );

  function SandBox(props){  
  //스타일 적용할 객체
  // Box 컴포넌트에서 전해준 너비, 높이를 스타일 객체에 적용합니다.
  const boxstyle = {
     width: `${props.width}px`,
     height: `${props.height}px`,
     left: `${props.left}px`,
     top: `${props.top}px`,
     position:'absolute',
     background: 'yellow'
  }
}
  return (
    <div id="box" style={boxstyle}>

    </div>
  )
}
