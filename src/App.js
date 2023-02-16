//weather
import "./App.css";
import { useState, useEffect } from "react";
import gpsmap from "./mapjson.json";
import Showbox from "./component/Showbox";
import { selectone } from "./component/Map";
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
  const [text, setText] = useState("");
  const [wind, setWind] = useState("빈값");
  const [winddirection, setWinddirection] = useState("빈값");
  const [windtext, setWindtext] = useState("북쪽");

  // *** weatherInfo 하나로 줄이셈
  // const [weather, setweather] = useState([]);
  // const [hoursrainfall, setHoursrainfall] = useState([]);
  // const [hourstemperature, setHourstemperature] = useState([]);
  // const [hourshumidity, setHourshumidity] = useState([]);
  // const [hourswindtext, setHourswindtext] = useState([]);
  // const [hourswind, setHourswind] = useState([]);

  // *** 합친 날씨 정보 ***
  const [weatherInfo, setWeatherInfo] = useState([]);

  const [a, seta] = useState([]);
  const [b, setb] = useState([]);
  const [show, setShow] = useState([]);

  const [selectedOption, setSelectedOption] = useState("");
  const [selectedOptionTwo, setSelectedOptionTwo] = useState("");
  //selectede옵션 관리
  const [xValue, setXValue] = useState(60);
  const [yValue, setYValue] = useState(127);
  const selectOne = (e) => {
    setSelectedOption(e.target.value);
  };
  const selectTwo = (e) => {
    setSelectedOptionTwo(e.target.value);
    //미추홀구
    let select3 = selectone.find((e) => e.one === selectedOption);

    setXValue(select3.xValue[select3.two.indexOf(e.target.value)]);
    setYValue(select3.yValue[select3.two.indexOf(e.target.value)]);
  };

  // let selectgu = gpsmap.gps.filter((e) => e.one === "이어도");
  //종복되는값을 제거하여 뽑아낸뒤 이어도에 일치하는 값을 뽑아내기
  // let arr2 = [...new Set(selectgu.map((e) => e.xValue))];
  // let arr1 = selectgu.map((e) => e.two); 중복되는값도 같이뽑아 x값찾기
  // let arr2 = selectgu.map((e) => e.xValue);
  // let arr3 = [...new Set(selectgu.map((e) => e.yValue))];
  // let arr3 = selectgu.map((e) => e.yValue);
  //json파일에서 중복되는 값을 제거하여 뽑아내기
  // console.log(arr1);
  // console.log(arr2);
  // console.log(arr3);

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

  useEffect(() => {
    const RightNow_API = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=${key_API}&numOfRows=10&pageNo=1&base_date=${today}&base_time=${todaytime}&nx=${xValue}&ny=${yValue}&dataType=json`;
    const url_API = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?serviceKey=${key_API}&numOfRows=360&pageNo=1&base_date=${today}&base_time=${todaytime}&nx=${xValue}&ny=${yValue}&dataType=json&pageNo=1&totalCount=360`;

    fetch(url_API)
      .then((res) => res.json())
      .then((data) => {
        // seta([text, ddddd]);
        // const filteringdata = gpsmap.gps.filter((item) =>
        //   // item.two.includes(searchtext)
        // );
        //6~11 강수형태 "0"1234
        let copy = [];
        for (let i = 6; i <= 11; i++) {
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
        }
        // setweather(copy);

        //12~ 17 강수량 "강수없음"
        let futureRainfall = [];
        for (let i = 12; i <= 17; i++) {
          // let futureRainfall = hoursrainfall;
          futureRainfall.push(data.response.body.items.item[i].fcstValue);
          if (futureRainfall[i - 12] == "강수없음") {
            futureRainfall[i - 12] = 0;
          } else if (futureRainfall[i - 12] == "1.0mm 미만") {
            futureRainfall[i - 12] = "1.0mm 미만";
          } else if (futureRainfall[i - 12] == "30.0~50.0mm") {
            futureRainfall[i - 12] = "30.0~50.0mm";
          } else if (futureRainfall[i - 12] == "50.0mm 이상") {
            futureRainfall[i - 12] = "50.0mm 이상";
          } else {
            futureRainfall[i - 12] = `${futureRainfall[i - 12]}`;
          }
        }
        // setHoursrainfall(futureRainfall);

        //18~23 하늘형태 "3"맑음
        //24~29 기온 "8"도
        let futureTemperature = [];
        for (let i = 24; i <= 29; i++) {
          // let futureTemperature = hourstemperature;
          // futureTemperature.push(data.response.body.items.item[i].fcstValue);
          // setHourstemperature(futureTemperature);
          futureTemperature.push(data.response.body.items.item[i].fcstValue);
        }
        // setHourstemperature(futureTemperature);

        //30~35 습도 "45"%
        let futureHumidity = [];
        for (let i = 30; i <= 35; i++) {
          // let futureHumidity = hourshumidity;
          futureHumidity.push(data.response.body.items.item[i].fcstValue);
        }
        // setHourshumidity(futureHumidity);

        //48~53 풍향 "4"풍
        let futureWindtext = [];
        for (let i = 48; i <= 53; i++) {
          // let futureWindtext = hourswindtext;
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
        }
        // setHourswindtext(futureWindtext);

        //54~59 풍속  "2"m/s
        let futurewind = [];
        for (let i = 54; i <= 59; i++) {
          // let futurewind = hourswind;
          futurewind.push(data.response.body.items.item[i].fcstValue);
        }
        // setHourswind(futurewind);

        // 날씨정보 하나로 합침
        let weatherInfoCopy = [
          {
            weather: [...copy],
            futureRainfall: [...futureRainfall], // Hoursrainfall
            futureWindtext: [...futureWindtext], // Hourswindtext
            futureTemperature: [...futureTemperature], // Hourstemperature
            futureHumidity: [...futureHumidity], // Hourshumidity
            hoursWind: [...futurewind], // Hourswind
          },
        ];

        // 6가지 날씨 정보 세팅
        setWeatherInfo(weatherInfoCopy);
        // console.log('weatherInfoCopy =  ', weatherInfoCopy)
        console.log("weatherInfo = ", weatherInfo);

        // 현재 날씨
        seta([
          {
            id: 1,
            active: false,
            weather: weatherInfo[0].weather[0], // weather[0],
            temper: weatherInfo[0].futureTemperature[0], //hourstemperature[0],
            humidity: weatherInfo[0].futureHumidity[0], //hourshumidity[0],
            rain: weatherInfo[0].futureRainfall[0], // hoursrainfall[0],
            wind: weatherInfo[0].hoursWind[0], // hourswind[0],
            windtext: weatherInfo[0].futureWindtext[0], // hourswindtext[0],
          },
          {
            id: 2,
            active: false,
            weather: weatherInfo[0].weather[1], // weather[0],
            temper: weatherInfo[0].futureTemperature[1], //hourstemperature[0],
            humidity: weatherInfo[0].futureHumidity[1], //hourshumidity[0],
            rain: weatherInfo[0].futureRainfall[1], // hoursrainfall[0],
            wind: weatherInfo[0].hoursWind[1], // hourswind[0],
            windtext: weatherInfo[0].futureWindtext[1], // hourswindtext[0],
          },
          {
            id: 3,
            active: false,
            weather: weatherInfo[0].weather[2], // weather[0],
            temper: weatherInfo[0].futureTemperature[2], //hourstemperature[0],
            humidity: weatherInfo[0].futureHumidity[2], //hourshumidity[0],
            rain: weatherInfo[0].futureRainfall[2], // hoursrainfall[0],
            wind: weatherInfo[0].hoursWind[2], // hourswind[0],
            windtext: weatherInfo[0].futureWindtext[2], // hourswindtext[0],
          },
          {
            id: 4,
            active: false,
            weather: weatherInfo[0].weather[3], // weather[0],
            temper: weatherInfo[0].futureTemperature[3], //hourstemperature[0],
            humidity: weatherInfo[0].futureHumidity[3], //hourshumidity[0],
            rain: weatherInfo[0].futureRainfall[3], // hoursrainfall[0],
            wind: weatherInfo[0].hoursWind[3], // hourswind[0],
            windtext: weatherInfo[0].futureWindtext[3], // hourswindtext[0],
          },
          {
            id: 5,
            active: false,
            weather: weatherInfo[0].weather[4], // weather[0],
            temper: weatherInfo[0].futureTemperature[4], //hourstemperature[0],
            humidity: weatherInfo[0].futureHumidity[4], //hourshumidity[0],
            rain: weatherInfo[0].futureRainfall[4], // hoursrainfall[0],
            wind: weatherInfo[0].hoursWind[4], // hourswind[0],
            windtext: weatherInfo[0].futureWindtext[4], // hourswindtext[0],
          },
          {
            id: 6,
            active: false,
            weather: weatherInfo[0].weather[5], // weather[0],
            temper: weatherInfo[0].futureTemperature[5], //hourstemperature[0],
            humidity: weatherInfo[0].futureHumidity[5], //hourshumidity[0],
            rain: weatherInfo[0].futureRainfall[5], // hoursrainfall[0],
            wind: weatherInfo[0].hoursWind[5], // hourswind[0],
            windtext: weatherInfo[0].futureWindtext[5], // hourswindtext[0],
          },
        ]);
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
  }, [xValue, yValue]);

  useEffect(() => {
    setb([
      {
        id: 0,
        active: true,
        weather: text,
        temper: temperature,
        humidity: humidity,
        rain: rainfall,
        wind: wind,
        windtext: windtext,
      },
      ...a,
    ]);
  }, [text, temperature, humidity, rainfall, wind, windtext, a]);

  const toggle = (key) => {
    setb((b) =>
      b.map((e) =>
        e.id == key ? { ...e, active: true } : { ...e, active: false }
      )
    );
  };

  useEffect(() => {
    let show1 = b.filter((e) => e.active == true);
    setShow(show1);
  }, [b]);

  return (
    <div className="container">
      <h1 className="title">일기 단기 예보</h1>
      <div className="currently">
        <div className="inputlist">
          <select className="selectStyle" onChange={selectOne}>
            {selectone.map((e, i) => (
              <option value={e.one} key={i} className="option">
                {e.one}
              </option>
            ))}
          </select>
          <select className="selectStyle" onChange={selectTwo}>
            {selectone.map(
              (e, i) =>
                e.one === selectedOption &&
                e.two.map((t, j) => (
                  <option value={t} key={j} className="option">
                    {t}
                  </option>
                ))
            )}
          </select>
        </div>
        <div className="present">
          <h2>한시간당 날씨 예보</h2>
          <Showbox show={show} />
        </div>
      </div>
      <div className="weatherbtn">
        <div className="colbtn">
          {b.map((e) => (
            <>
              <button
                className="btnsize"
                key={e.id}
                onClick={() => {
                  toggle(e.id);
                }}
              >
                {e.id === 0 ? "현재" : e.id + "시간"}
              </button>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
