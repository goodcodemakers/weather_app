//weather
import "./App.css";
import { useState, useEffect } from "react";
import gpsmap from "./mapjson.json";
import Showbox from "./component/Showbox";
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
  const [weather, setweather] = useState([]);
  const [hoursrainfall, setHoursrainfall] = useState([]);
  const [hourstemperature, setHourstemperature] = useState([]);
  const [hourshumidity, setHourshumidity] = useState([]);
  const [hourswindtext, setHourswindtext] = useState([]);
  const [hourswind, setHourswind] = useState([]);
  const [a, seta] = useState([]);
  const [b, setb] = useState([]);
  const [show, setShow] = useState([]);
  const [searchvalue, setSearchvalue] = useState([]);

  const [selectedOption, setSelectedOption] = useState("");
  const [selectedTwoOption, setSelectedTwoOption] = useState("");
  const selectOne = (e) => {
    setSelectedOption(e.target.value);
  };
  const selectTwo = (e) => {
    setSelectedTwoOption(e.target.value);
  };
  let selectgu = gpsmap.gps.filter(
    (e) => e.one === "서울특별시" && e.two === "종로구"
  );
  //종복되는값을 제거하여 뽑아낸뒤 이어도에 일치하는 값을 뽑아내기
  let arr2 = [...new Set(selectgu.map((e) => e.two))];
  //json파일에서 중복되는 값을 제거하여 뽑아내기

  let selectone = [
    {
      one: "서울특별시",
      two: [
        "종로구",
        "중구",
        "용산구",
        "성동구",
        "광진구",
        "동대문구",
        "중랑구",
        "성북구",
        "강북구",
        "도봉구",
        "노원구",
        "은평구",
        "서대문구",
        "마포구",
        "양천구",
        "강서구",
        "구로구",
        "금천구",
        "영등포구",
        "동작구",
        "관악구",
        "서초구",
        "강남구",
        "송파구",
        "강동구",
      ],
    },
    {
      one: "부산광역시",
      two: [
        "중구",
        "서구",
        "동구",
        "영도구",
        "부산진구",
        "동래구",
        "남구",
        "북구",
        "해운대구",
        "사하구",
        "금정구",
        "강서구",
        "연제구",
        "수영구",
        "사상구",
        "기장군",
      ],
    },
    {
      one: "대구광역시",
      two: [
        "중구",
        "동구",
        "서구",
        "남구",
        "북구",
        "수성구",
        "달서구",
        "달성군",
      ],
    },
    {
      one: "인천광역시",
      two: [
        "중구",
        "동구",
        "미추홀구",
        "연수구",
        "남동구",
        "부평구",
        "계양구",
        "서구",
        "강화군",
        "옹진군",
      ],
    },
    {
      one: "광주광역시",
      two: ["동구", "서구", "남구", "북구", "광산구"],
    },
    {
      one: "대전광역시",
      two: ["동구", "중구", "서구", "유성구", "대덕구"],
    },
    { one: "울산광역시", two: ["중구", "남구", "동구", "북구", "울주군"] },
    { one: "세종특별자치시", two: ["세종특별자치시"] },
    {
      one: "경기도",
      two: [
        "수원시장안구",
        "수원시권선구",
        "수원시팔달구",
        "수원시영통구",
        "성남시수정구",
        "성남시중원구",
        "성남시분당구",
        "의정부시",
        "안양시만안구",
        "안양시동안구",
        "부천시",
        "광명시",
        "평택시",
        "동두천시",
        "안산시상록구",
        "안산시단원구",
        "고양시덕양구",
        "고양시일산동구",
        "고양시일산서구",
        "과천시",
        "구리시",
        "남양주시",
        "오산시",
        "시흥시",
        "군포시",
        "의왕시",
        "하남시",
        "용인시처인구",
        "용인시기흥구",
        "용인시수지구",
        "파주시",
        "이천시",
        "안성시",
        "김포시",
        "화성시",
        "광주시",
        "양주시",
        "포천시",
        "여주시",
        "연천군",
        "가평군",
        "양평군",
      ],
    },
    {
      one: "강원도",
      two: [
        "춘천시",
        "원주시",
        "강릉시",
        "동해시",
        "태백시",
        "속초시",
        "삼척시",
        "홍천군",
        "횡성군",
        "영월군",
        "평창군",
        "정선군",
        "철원군",
        "화천군",
        "양구군",
        "인제군",
        "고성군",
        "양양군",
      ],
    },
    {
      one: "충청북도",
      two: [
        "청주시상당구",
        "청주시서원구",
        "청주시흥덕구",
        "청주시청원구",
        "충주시",
        "제천시",
        "보은군",
        "옥천군",
        "영동군",
        "증평군",
        "진천군",
        "괴산군",
        "음성군",
        "단양군",
      ],
    },
    {
      one: "충청남도",
      two: [
        "천안시동남구",
        "천안시서북구",
        "공주시",
        "보령시",
        "아산시",
        "서산시",
        "논산시",
        "계룡시",
        "당진시",
        "금산군",
        "부여군",
        "서천군",
        "청양군",
        "홍성군",
        "예산군",
        "태안군",
      ],
    },
    {
      one: "전라북도",
      two: [
        "천안시동남구",
        "천안시서북구",
        "공주시",
        "보령시",
        "아산시",
        "서산시",
        "논산시",
        "계룡시",
        "당진시",
        "금산군",
        "부여군",
        "서천군",
        "청양군",
        "홍성군",
        "예산군",
        "태안군",
      ],
    },
    {
      one: "전라남도",
      two: [
        "목포시",
        "여수시",
        "순천시",
        "나주시",
        "광양시",
        "담양군",
        "곡성군",
        "구례군",
        "고흥군",
        "보성군",
        "화순군",
        "장흥군",
        "강진군",
        "해남군",
        "영암군",
        "무안군",
        "함평군",
        "영광군",
        "장성군",
        "완도군",
        "진도군",
        "신안군",
      ],
    },
    {
      one: "경상북도",
      two: [
        "포항시남구",
        "포항시북구",
        "경주시",
        "김천시",
        "안동시",
        "구미시",
        "영주시",
        "영천시",
        "상주시",
        "문경시",
        "경산시",
        "군위군",
        "의성군",
        "청송군",
        "영양군",
        "영덕군",
        "청도군",
        "고령군",
        "성주군",
        "칠곡군",
        "예천군",
        "봉화군",
        "울진군",
        "울릉군",
      ],
    },
    {
      one: "경상남도",
      two: [
        "창원시의창구",
        "창원시성산구",
        "창원시마산합포구",
        "창원시마산회원구",
        "창원시진해구",
        "진주시",
        "통영시",
        "사천시",
        "김해시",
        "밀양시",
        "거제시",
        "양산시",
        "의령군",
        "함안군",
        "창녕군",
        "고성군",
        "남해군",
        "하동군",
        "산청군",
        "함양군",
        "거창군",
        "합천군",
      ],
    },
    { one: "제주특별자치도", two: ["제주시", "서귀포시"] },
    {
      one: "이어도",
    },
  ];

  // const [filterdata, setFilterdata] = useState([]);
  // let btnSequence = [
  //   "현재",
  //   "1시간뒤",
  //   "2시간뒤",
  //   "3시간뒤",
  //   "4시간뒤",
  //   "5시간뒤",
  //   "6시간뒤",
  // ];

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
        // console.log(data.response.body.items.item);

        // seta([text, ddddd]);
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
        seta([
          {
            id: 1,
            active: false,
            weather: weather[0],
            temper: hourstemperature[0],
            humidity: hourshumidity[0],
            rain: hoursrainfall[0],
            wind: hourswind[0],
            windtext: hourswindtext[0],
          },
          {
            id: 2,
            active: false,
            weather: weather[1],
            temper: hourstemperature[1],
            humidity: hourshumidity[1],
            rain: hoursrainfall[1],
            wind: hourswind[1],
            windtext: hourswindtext[1],
          },
          {
            id: 3,
            active: false,
            weather: weather[2],
            temper: hourstemperature[2],
            humidity: hourshumidity[2],
            rain: hoursrainfall[2],
            wind: hourswind[2],
            windtext: hourswindtext[2],
          },
          {
            id: 4,
            active: false,
            weather: weather[3],
            temper: hourstemperature[3],
            humidity: hourshumidity[3],
            rain: hoursrainfall[3],
            wind: hourswind[3],
            windtext: hourswindtext[3],
          },
          {
            id: 5,
            active: false,
            weather: weather[4],
            temper: hourstemperature[4],
            humidity: hourshumidity[4],
            rain: hoursrainfall[4],
            wind: hourswind[4],
            windtext: hourswindtext[4],
          },
          {
            id: 6,
            active: false,
            weather: weather[5],
            temper: hourstemperature[5],
            humidity: hourshumidity[5],
            rain: hoursrainfall[5],
            wind: hourswind[5],
            windtext: hourswindtext[5],
          },
        ]);

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
              <option value={e.one} key={i}>
                {e.one}
              </option>
            ))}
          </select>
          <select className="selectStyle" onChange={selectTwo}>
            {selectone.map(
              (e, i) =>
                e.one === selectedOption &&
                e.two.map((t, j) => (
                  <option value={e.two[t]} key={j}>
                    {t}
                  </option>
                ))
            )}
          </select>
        </div>
        <div className="present">
          <h3>현재 날씨</h3>
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
