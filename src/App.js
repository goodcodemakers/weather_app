//weather
import "./App.css";
import { useState, useEffect } from "react";
import gpsmap from "./mapjson.json";

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
  const [hoursrainfall, setHoursrainfall] = useState([]);
  const [hourstemperature, setHourstemperature] = useState([]);
  const [hourshumidity, setHourshumidity] = useState([]);
  const [hourswindtext, setHourswindtext] = useState([]);
  const [hourswind, setHourswind] = useState([]);
  // const [searchtext, setSearchtext] = useState("안양");
  // const [filterdata, setFilterdata] = useState([]);

  // setFilterdata(filteringdata);

  console.log(gpsmap.gps[3].two);
  const onehours = "시간";
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
  const url_API = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?serviceKey=${key_API}&numOfRows=360&pageNo=1&base_date=${today}&base_time=${todaytime}&nx=59&ny=123&dataType=json&pageNo=1&totalCount=360`;
  const RightNow_API = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=${key_API}&numOfRows=10&pageNo=1&base_date=${today}&base_time=${todaytime}&nx=59&ny=123&dataType=json`;
  useEffect(() => {
    fetch(url_API)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // const filteringdata = gpsmap.gps.filter((item) =>
        //   // item.two.includes(searchtext)
        // );
        //6~11 강수형태 "0"1234
        for (let i = 6; i <= 11; i++) {
          let copy = weather;
          copy.push(data.response.body.items.item[i].fcstValue);
          if (copy[i - 6] == 0) {
            copy[i - 6] = "날씨는 맑음 입니다.";
          } else if (copy[i - 6] == 1) {
            copy[i - 6] = "날씨는 비가 내립니다.";
          } else if (copy[i - 6] == 2) {
            copy[i - 6] = "날씨는 눈과 비가 내립니다.";
          } else if (copy[i - 6] == 3) {
            copy[i - 6] = "날씨는 눈이 내립니다.";
          } else if (copy[i - 6] == 4) {
            copy[i - 6] = "현재 날씨는 폭우 입니다.";
          } else if (copy[i - 6] == 5) {
            copy[i - 6] = "날씨는 빗방울이 떨어지겠습니다.";
          } else if (copy[i - 6] == 6) {
            copy[i - 6] = "날씨는 비나 눈이 흩날립니다.";
          }
          setweather([...copy]);
        }

        //12~ 17 강수량 "강수없음"
        for (let i = 12; i <= 17; i++) {
          let futureRainfall = hoursrainfall;
          futureRainfall.push(data.response.body.items.item[i].fcstValue);
          if (futureRainfall[i - 12] == "강수없음") {
            futureRainfall[i - 12] = "강수량이 없습니다";
          } else if (futureRainfall[i - 12] == "1.0mm 미만") {
            futureRainfall[i - 12] = "1.0mm 미만의 강수량이 있습니다";
          } else if (futureRainfall[i - 12] == "30.0~50.0mm") {
            futureRainfall[i - 12] = "30.0~50.0mm의 강수량이 있습니다";
          } else if (futureRainfall[i - 12] == "50.0mm 이상") {
            futureRainfall[i - 12] = "50.0mm 이상 강수량이 있습니다";
          } else {
            futureRainfall[i - 12] = `${
              futureRainfall[i - 12]
            }의 강수량이 있습니다`;
          }
          setHoursrainfall([...futureRainfall]);
        }
        //18~23 하늘형태 "3"맑음
        //24~29 기온 "8"도
        for (let i = 24; i <= 29; i++) {
          let futureTemperature = hourstemperature;
          futureTemperature.push(data.response.body.items.item[i].fcstValue);
          setHourstemperature([...futureTemperature]);
        }
        //30~35 습도 "45"%
        for (let i = 30; i <= 35; i++) {
          let futureHumidity = hourshumidity;
          futureHumidity.push(data.response.body.items.item[i].fcstValue);
          setHourshumidity([...futureHumidity]);
        }
        //48~53 풍향 "4"풍
        for (let i = 48; i <= 53; i++) {
          let futureWindtext = hourswindtext;
          futureWindtext.push(data.response.body.items.item[i].fcstValue);
          if (futureWindtext[i - 48] <= 45) {
            futureWindtext[i - 48] = "북풍";
          } else if (
            futureWindtext[i - 48] > 45 &&
            futureWindtext[i - 48] <= 135
          ) {
            futureWindtext[i - 48] = "동풍";
          } else if (
            futureWindtext[i - 48] > 135 &&
            futureWindtext[i - 48] <= 225
          ) {
            futureWindtext[i - 48] = "남풍";
          } else if (futureWindtext[i - 48] > 225 && winddirection <= 315) {
            futureWindtext[i - 48] = "서풍";
          } else {
            futureWindtext[i - 48] = "북풍";
          }
          setHourswindtext([...futureWindtext]);
        }
        //54~59 풍속  "2"m/s
        for (let i = 54; i <= 59; i++) {
          let futurewind = hourswind;
          futurewind.push(data.response.body.items.item[i].fcstValue);
          setHourswind([...futurewind]);
        }
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
  // const changetext = (event) => {
  //   setSearchtext(event.target.value);
  // };
  return (
    <div className="container">
      <h1 className="title">일기 단기 예보</h1>
      <div className="currently">
        <div className="inputlist">
          <input type="text" placeholder="시/군/구를 입력하세요" />
        </div>
        <div>
          <div className="col">
            <h3>현재 날씨</h3>
            <p>{text}</p>
            <h3>현재 기온</h3>
            <p>{temperature}º 입니다.</p>

            <h3>습도</h3>
            <p>{humidity}%입니다.</p>
            <h3>
              1시간 <br />
              강수량
            </h3>
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
        </div>
      </div>
      <div className="weatherbtn">
        <div className="colbtn">
          <button className="btnsize">현재</button>
          <button className="btnsize">1시간후</button>
          <button className="btnsize">2시간후</button>
        </div>
        <div className="colbtn">
          <button className="btnsize">3시간후</button>
          <button className="btnsize">4시간후</button>
          <button className="btnsize">5시간후</button>
          <button className="btnsize">6시간후</button>
        </div>
      </div>
      <div className="onehours">
        <h3>1{onehours} 후 날씨</h3>
        <p>
          1{onehours} 뒤 {weather[0]}
        </p>
        <h3> 기온</h3>
        <p>{hourstemperature[0]}º 입니다.</p>
        <h3>습도</h3>
        <p>{hourshumidity[0]}%입니다.</p>
        <h3>1{onehours} 강수량</h3>
        <p>{hoursrainfall[0]}</p>
        <h3>풍속</h3>
        <p>{hourswind[0]}m/s 입니다</p>
        <h3>풍향</h3>
        <p> {hourswindtext[0]} 입니다.</p>
      </div>
      <div className="twohours">
        <h3>두 시간 후 날씨</h3>
        <p>두 시간 뒤 {weather[1]}</p>
        <h3> 기온</h3>
        <p>{hourstemperature[1]}º 입니다.</p>
        <h3>습도</h3>
        <p>{hourshumidity[1]}%입니다.</p>
        <h3>1시간 강수량</h3>
        <p>{hoursrainfall[1]}</p>
        <h3>풍속</h3>
        <p>{hourswind[1]}m/s 입니다</p>
        <h3>풍향</h3>
        <p> {hourswindtext[1]} 입니다.</p>
      </div>
      <div className="threehours">
        <h3>세 시간 후 날씨</h3>
        <p>세 시간 뒤 {weather[2]}</p>
        <h3> 기온</h3>
        <p>{hourstemperature[2]}º 입니다.</p>
        <h3>습도</h3>
        <p>{hourshumidity[2]}%입니다.</p>
        <h3>1시간 강수량</h3>
        <p>{hoursrainfall[2]}</p>
        <h3>풍속</h3>
        <p>{hourswind[2]}m/s 입니다</p>
        <h3>풍향</h3>
        <p> {hourswindtext[2]} 입니다.</p>
      </div>
      <div className="fourhours">
        <h3>네 시간 후 날씨</h3>
        <p>네 시간 뒤 {weather[3]}</p>
        <h3> 기온</h3>
        <p>{hourstemperature[3]}º 입니다.</p>
        <h3>습도</h3>
        <p>{hourshumidity[3]}%입니다.</p>
        <h3>1시간 강수량</h3>
        <p>{hoursrainfall[3]}</p>
        <h3>풍속</h3>
        <p>{hourswind[3]}m/s 입니다</p>
        <h3>풍향</h3>
        <p> {hourswindtext[3]} 입니다.</p>
      </div>
      <div className="fivehours">
        <h3>다섯 시간 후 날씨</h3>
        <p>다섯 시간 뒤 {weather[4]}</p>
        <h3> 기온</h3>
        <p>{hourstemperature[4]}º 입니다.</p>
        <h3>습도</h3>
        <p>{hourshumidity[4]}%입니다.</p>
        <h3>1시간 강수량</h3>
        <p>{hoursrainfall[4]}</p>
        <h3>풍속</h3>
        <p>{hourswind[4]}m/s 입니다</p>
        <h3>풍향</h3>
        <p> {hourswindtext[4]} 입니다.</p>
      </div>
      <div className="sixehours">
        <h3>여섯 시간 후 날씨</h3>
        <p>여섯 시간 뒤 {weather[5]}</p>
        <h3> 기온</h3>
        <p>{hourstemperature[5]}º 입니다.</p>
        <h3>습도</h3>
        <p>{hourshumidity[5]}%입니다.</p>
        <h3>1시간 강수량</h3>
        <p>{hoursrainfall[5]}</p>
        <h3>풍속</h3>
        <p>{hourswind[5]}m/s 입니다</p>
        <h3>풍향</h3>
        <p> {hourswindtext[5]} 입니다.</p>
      </div>
    </div>
  );
}

export default App;
