//weather
import "./App.css";

function App() {
  const time = new Date();
  const year = time.getFullYear(); //년도
  let month = time.getMonth() + 1; //월
  let date = time.getDate(); //일
  let hours = time.getHours(); //시
  let minutes = time.getMinutes(); //분
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
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 30) {
    (minutes = "00"), (hours = hours - 1);
  } else {
    minutes = 30;
  }
  let today = `${year}${month}${date}`;
  let todaytime = `${hours}${minutes}`;
  console.log(year); //년도
  console.log(month); //월
  console.log(date); //일
  console.log(hours); //시
  console.log(minutes); //분
  console.log(today); //현재날짜 API맞게 수정

  const key_API =
    "ZwjdolGMPlwKDKgf7%2FdwTHL5iLxRG%2Fy3e%2FsoWTXzd6eFglmK8ReAW%2BCBY0gYHK%2Bm7JJPqa0sHX1s5SnXsKbD%2Fw%3D%3D";
  const url_API = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?serviceKey=${key_API}&numOfRows=360&pageNo=1&base_date=${today}&base_time=1300&nx=59&ny=123&dataType=json&pageNo=1&totalCount=360`;
  const RightNow_API = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=${key_API}&numOfRows=10&pageNo=1&base_date=${today}&base_time=1300&nx=59&ny=123&dataType=json`;
  fetch(url_API)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
  fetch(RightNow_API)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
  return (
    <>
      <h1>일기 단기 예보</h1>
      <h2>현위치 </h2>
      <p>기온</p>
      {/* T1H 3배열 */}
      <p>비오는 형태</p>
      {/*강수형태 PTY  0배열 */}
      <p>습도</p>
      {/* REH  1배열*/}
      <p>1시간 강수량</p>
      {/*RN1 2배열 */}
      <p>풍속</p>
      {/* WSD 7배열 */}
      <p>풍향</p>
      {/* VEC 5배열 */}
    </>
  );
}

export default App;
