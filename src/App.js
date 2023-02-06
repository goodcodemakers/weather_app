//weather
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const time = new Date();
  const year = time.getFullYear(); //년도
  let month = time.getMonth() + 1; //월
  let date = time.getDate(); //일
  let hours = time.getHours(); //시
  let minutes = time.getMinutes(); //분
  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [refsources, setRefsources] = useState(0);
  const [rainfall, serRainfall] = useState(1.0);
  const [text, setText] = useState("빈값");
  const [wind, setWind] = useState("빈값");
  const [winddirection, setWinddirection] = useState("빈값");
  const [windtext, setWindtext] = useState("북쪽");
  const [weather, setweather] = useState([]);

  if (month < 10) {
    //월이 10월보다 작을경우 01로 나오게 설정
    month = "0" + month;
  } else {
    month = month;
  }
  if (date < 10) {
    //일이 나올때 01 02이런씩으로 나오게 설정
    date = "0" + date;
  } else {
    date = date;
  }
  if (minutes < 30) {
    minutes = "00";
    hours = hours - 1;
  } else {
    minutes = 30;
  }
  if (hours < 10) {
    hours = "0" + hours;
  }
  let today = `${year}${month}${date}`;
  let todaytime = `${hours}${minutes}`;
  // console.log(year); //년도
  // console.log(month); //월
  // console.log(date); //일
  // console.log(hours); //시
  // console.log(minutes); //분
  // console.log(today); //현재날짜 API맞게 수정

  const key_API =
    "ZwjdolGMPlwKDKgf7%2FdwTHL5iLxRG%2Fy3e%2FsoWTXzd6eFglmK8ReAW%2BCBY0gYHK%2Bm7JJPqa0sHX1s5SnXsKbD%2Fw%3D%3D";
  const url_API = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?serviceKey=${key_API}&numOfRows=360&pageNo=1&base_date=${today}&base_time=${todaytime}&nx=59&ny=123&dataType=json&pageNo=1&totalCount=360`;
  const RightNow_API = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=${key_API}&numOfRows=10&pageNo=1&base_date=${today}&base_time=${todaytime}&nx=59&ny=123&dataType=json`;
  useEffect(() => {
    fetch(url_API)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        let copy = [...weather];
        //6~11 강수형태 "0"1234
        for (let i = 6; i <= 11; i++) {
          copy.push(data.response.body.items.item[i].fcstValue);
          if (copy[i - 6] == 0) {
            setweather("맑음");
          } else if (copy[i - 6] == 1) {
          } else if (copy[i - 6] == 2) {
          } else if (copy[i - 6] == 3) {
          } else if (copy[i - 6] == 4) {
          } else if (copy[i - 6] == 5) {
          } else if (copy[i - 6] == 6) {
          }
        }

        //12~ 17 강수량 "강수없음"
        //18~23 하늘형태 "3"맑음
        //24~29 기온 "8"도
        //30~35 습도 "45"%
        //48~53 풍향 "4"풍
        //54~59 풍속  "2"m/s
      });

    fetch(RightNow_API)
      .then((res) => res.json())
      .then((data) => {
        setTemperature(data.response.body.items.item[3].obsrValue);

        setHumidity(data.response.body.items.item[1].obsrValue);
        setRefsources(data.response.body.items.item[0].obsrValue);
        serRainfall(data.response.body.items.item[2].obsrValue);
        setWind(data.response.body.items.item[7].obsrValue);
        setWinddirection(data.response.body.items.item[5].obsrValue);

        if (refsources == 0) {
          setText("현재 날씨는 맑음 입니다.");
        } else if (refsources == 1) {
          setText("현재 날씨는 비가 내립니다.");
        } else if (refsources == 2) {
          setText("현재 날씨는 눈과 비가 내립니다.");
        } else if (refsources == 3) {
          setText("현재 날씨는 눈이 내립니다.");
        } else if (refsources == 4) {
          setText("현재 날씨는 폭우 입니다.");
        } else if (refsources == 5) {
          setText("현재 날씨는 빗방울이 떨어지겠습니다.");
        } else {
          setText("현재 날씨는 비나 눈이 흩날립니다.");
        }
        if (winddirection <= 45) {
          setWindtext("북풍");
        } else if (winddirection > 45 && winddirection <= 135) {
          setWindtext("동풍");
        } else if (winddirection > 135 && winddirection <= 225) {
          setWindtext("남풍");
        } else if (winddirection > 225 && winddirection <= 315) {
          setWindtext("서풍");
        } else {
          setWindtext("북풍");
        }
      });
  }, []);

  return (
    <>
      <h1>일기 단기 예보</h1>
      <div className="currently">
        <h3>현재 날씨</h3>
        <p>{text}</p>
        <h3>현재 기온</h3>
        <p>{temperature}º 입니다.</p>
        <h3>습도</h3>
        <p>{humidity}%</p>
        <h3>1시간 강수량</h3>
        <p>
          {rainfall == 0
            ? "강수량이 없습니다."
            : `현재 강수량은 ${rainfall}mm미만입니다.`}
        </p>
        {/*RN1 2배열 */}
        <h3>풍속</h3>
        <p>{wind}m/s 입니다</p>
        {/* WSD 7배열 */}
        <h3>풍향</h3>
        <p>현재 {windtext} 입니다.</p>
        {/* VEC 5배열 */}
      </div>
      <div className="onehours">
        <h3>한시간 후 날씨</h3>
        <p>{weather}</p>
      </div>
      <div className="twohours"></div>
      <div className="threehours"></div>
      <div className="fourhours"></div>
      <div className="fivehours"></div>
      <div className="sixehours"></div>
    </>
  );
}

export default App;
