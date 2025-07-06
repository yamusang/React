import { useEffect, useState } from "react";
import "./Box.css";

export default function Box() {

  const [boxwidth, setWidth] = useState(120);
  const [boxheight, setHeight] = useState(100);
  const [posLeft, setLeft] = useState(800);
  const [posTop, setTop] = useState(300);


  function handleResize(e) {
    if (e.target.id === "width_inc") {
      setWidth(boxwidth + 10);
    } else if (e.target.id === "width_dec") {
      setWidth(boxwidth - 10);
    } else if (e.target.id === "height_inc") {
      setHeight(boxheight + 10);
    } else if (e.target.id === "height_dec") {
      setHeight(boxheight - 10);
    }
  }
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case "ArrowUp":
          setTop(posTop - 10);
          break;
        case "ArrowRight":
          setLeft(posLeft + 10);
          break;
        case "ArrowDown":
          setTop(posTop + 10);
          break;
        case "ArrowLeft":
          setLeft(posLeft - 10);
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <>
      <NavBar></NavBar>
      <DaumVideo></DaumVideo>
      <div id="buttons">
        <button onClick={handleResize} id="width_inc">
          로고 가로+
        </button>
        <button onClick={handleResize} id="width_dec">
          로고 가로-
        </button>
        <button onClick={handleResize} id="height_inc">
          로고 세로+
        </button>
        <button onClick={handleResize} id="height_dec">
          로고 세로-
        </button>
        <hr />
      </div>
      <div id="container">
        <SandBox
          width={boxwidth}
          height={boxheight}
          left={posLeft}
          top={posTop}
        />
      </div>
    </>
  );
}

function SandBox(props) {
  const boxstyle = {
    width: `${props.width}px`,
    height: `${props.height}px`,
    left: `${props.left}px`,
    top: `${props.top}px`,
    position: "absolute",
    background:
      "url(https://www.ncdinos.com/assets/images/logo-89b7b3780358b9ebce0ce8b015097d41.png)",
  };
  return <div id="box" style={boxstyle}></div>;
}

function NavBar() {
  function ticketClick() {
    window.open(
      "https://www.ncdinos.com/auth/ticket.do",
      "티켓",
      "width=480,height=650"
    );
  }

  return (
    <header>
      <nav className="top-nav">
        <ul>
          <li>
            <a id="ticket" onClick={ticketClick}>
              티켓
            </a>
          </li>
          <li>
            <a href="https://store.ncdinos.com/">팀스토어</a>
          </li>
          <li>
            <a href="https://www.ncdinospodshop.com/">POD샵</a>
          </li>
          <li className="sns-wrap">
            <a href="https://www.ncdinos.com/auth/login.do">로그인</a>
            <a href="https://www.ncdinos.com/auth/join.do">회원가입</a>
          </li>
        </ul>
      </nav>
      <div className="header-wrap">
        <div>
          <h1 className="logo">
            <a href="https://www.ncdinos.com/homepage.do" className="hidden">
              NC Dinos
            </a>
          </h1>
          <nav className="menu-wrap">
            <ul className="menu">
              <li>
                <a href="https://www.ncdinos.com/dinos/intro.do">다이노스</a>
              </li>
              <li>
                <a href="https://www.ncdinos.com/story/photo.do">스토리</a>
              </li>
              <li>
                <a href="https://www.ncdinos.com/game/majorSchedule.do">
                  경기정보
                </a>
              </li>
              <li>
                <a href="https://www.ncdinos.com/record/majorRank.do">기록실</a>
              </li>
              <li>
                <a href="https://www.ncdinos.com/player/all/list.do">선수단</a>
              </li>
              <li>
                <a href="https://www.ncdinos.com/fan/rally/list.do">팬</a>
              </li>
              <li>
                <a href="https://www.ncdinos.com/junior/index.do">
                  주니어 다이노스
                </a>
              </li>
            </ul>
            <div className="hidden-div">
              <div className="submenu">
                <h1></h1>
                <ul>
                  <li>
                    <a href="https://www.ncdinos.com/dinos/intro.do">
                      구단소개
                    </a>
                  </li>
                  <li>
                    <a href="https://www.ncdinos.com/dinos/news.do">구단소식</a>
                  </li>
                  <li>
                    <a href="https://www.ncdinos.com/dinos/vi.do">구단 VI</a>
                  </li>
                  <li>
                    <a href="https://www.ncdinos.com/dinos/stadium.do">
                      구장, 시설안내
                    </a>
                  </li>
                  <li>
                    <a href="https://www.ncdinos.com/dinos/socialcontribution.do">
                      D-NATION
                    </a>
                  </li>
                  <li>
                    <a href="https://www.ncdinos.com/dinos/partner.do">
                      후원,제휴
                    </a>
                  </li>
                </ul>
                <ul>
                  <li>
                    <a href="https://www.ncdinos.com/story/photo.do">포토</a>
                  </li>
                  <li>
                    <a href="https://www.ncdinos.com/story/movie.do">영상</a>
                  </li>
                </ul>
                <ul>
                  <h5>정규리그</h5>
                  <li>
                    <a href="https://www.ncdinos.com/game/majorSchedule.do">
                      경기일정/결과
                    </a>
                  </li>
                  <li>
                    <a href="https://www.ncdinos.com/game/majorScore.do">
                      박스 스코어
                    </a>
                  </li>
                  <li>
                    <a href="https://www.ncdinos.com/game/majorGameNote.do">
                      게임노트
                    </a>
                  </li>
                  <h5>퓨처스</h5>
                  <li>
                    <a href="https://www.ncdinos.com/game/minorSchedule.do">
                      경기 일정/결과
                    </a>
                  </li>
                  <li>
                    <a href="https://www.ncdinos.com/game/minorScore.do">
                      박스 스코어
                    </a>
                  </li>
                </ul>
                <ul>
                  <h5>정규리그</h5>
                  <li>
                    <a href="https://www.ncdinos.com/record/majorRank.do">
                      팀기록
                    </a>
                  </li>
                  <h5>퓨처스</h5>
                  <li>
                    <a href="https://www.ncdinos.com/record/minorRank.do">
                      팀기록
                    </a>
                  </li>
                </ul>
                <ul>
                  <li>
                    <a href="https://www.ncdinos.com/player/all/list.do">
                      선수단 전체
                    </a>
                  </li>
                  <li>
                    <a href="https://www.ncdinos.com/player/staff/list.do">
                      코칭스태프
                    </a>
                  </li>
                  <li>
                    <a href="https://www.ncdinos.com/player/trainer/list.do">
                      트레이너
                    </a>
                  </li>
                  <li>
                    <a href="https://www.ncdinos.com/player/pitcher/list.do">
                      투수
                    </a>
                  </li>
                  <li>
                    <a href="https://www.ncdinos.com/player/catcher/list.do">
                      포수
                    </a>
                  </li>
                  <li>
                    <a href="https://www.ncdinos.com/player/infielder/list.do">
                      내야수
                    </a>
                  </li>
                  <li>
                    <a href="https://www.ncdinos.com/player/outfielder/list.do">
                      외야수
                    </a>
                  </li>
                </ul>
                <ul>
                  <li>
                    <a href="https://www.ncdinos.com/fan/rally/list.do">
                      랠리 다이노스
                    </a>
                  </li>
                  <li>
                    <a href="https://www.ncdinos.com/fan/music.do">
                      다이노스 뮤직
                    </a>
                  </li>
                  <li>
                    <a href="https://www.ncdinos.com/fan/wallPaper.do">
                      월페이퍼
                    </a>
                  </li>
                  <li>
                    <a href="https://www.ncdinos.com/term/contact.do">
                      의견보내기
                    </a>
                  </li>
                  <li>
                    <a href="https://www.ncdinos.com/fan/groundPhoto.do">
                      그라운드 포토타임
                    </a>
                  </li>
                  <li>
                    <a href="https://www.ncdinos.com/fan/tourProgram.do">
                      투어 프로그램
                    </a>
                  </li>
                </ul>
                <ul>
                  <li>
                    <a href="https://www.ncdinos.com/junior/index.do">소개</a>
                  </li>
                  <li>
                    <a href="https://www.ncdinos.com/junior/event.do?eventType=4">
                      베이스볼 아카데미
                    </a>
                  </li>
                  <li>
                    <a href="https://www.ncdinos.com/junior/event.do?eventType=5">
                      응원타임
                    </a>
                  </li>
                  <li>
                    <a href="https://www.ncdinos.com/junior/event.do?eventType=6">
                      응원타임 클래스
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

function DaumVideo() {
  useEffect(() => {
    const REST_API_KEY = "1d62c9cf1a2869895c4e52f2998100a2";
    const headers = {
      method: "GET",
      headers: {
        Authorization: `KakaoAK ${REST_API_KEY}`,
      },
    };
    const query = "NCDinos";
    const url = `https://dapi.kakao.com/v2/search/vclip?query=${query}&sort=recency`;
    async function loadVideo() {
      try {
        const response = await fetch(url, headers);
        const data = await response.json();
        printVideo(data.documents, 2);
      } catch (error) {
        console.error("오류:", error);
      }
    }

    loadVideo().then(() => {});

    function printVideo(docs, count) {
      const ul = document.getElementById("kakaoVideo");
      for (let i = 0; i < count; i++) {
        const li = document.createElement("li");
        const uturl =
          docs[i].url.slice(0, 23) + "embed/" + docs[i].url.slice(-11);
        li.innerHTML = `<iframe width="560" height="315" src="${uturl}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
        ul.appendChild(li);
      }
    }
  }, []);

  return (
    <div id="root">
      <ul id="kakaoVideo"></ul>
    </div>
  );
}
