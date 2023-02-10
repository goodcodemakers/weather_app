# weather_app
- 해당앱은 한국 각지의 날씨를 리엑트로 나타낸 날씨 어플입니다.
## 링크 주소 
- 깃허브 소스 주소
da
-배포 홈페이지 URL 
dad
<hr>
## update
1.첫 업데이트
- 업데이트로는 API를 가져와서 그 API에 해당되는 값이 무엇인지를 받아와 화면에 보내 주기 위해 정리함
2.두번째 업데이트 
- 해당 API가 현재의 날씨와 미래의 날씨를 각각의 다른 API를 가져와서 작업해야하는것을 깨닫고 
두 가지의 
## Dockment
1.<br>
- 디폴트값은 서울 종로구 의 위도와 경도로 하여 잡았으며
- 유저가 선택시 전국에 있는 도시명을 선태갛면 그 도시에 알맞는 시,구,군이 뜨게 설정하였으며 <br>
-해당 설정을 할 시에 API를 주소를 바꿔서 그 API에 맞는 데이터를 송출한다.
2. <br>
-해당 지역을 들고 온 다음에는 현재의 날씨를 보여주며 1시간부터하여 6시간 후의 날씨까지 알 수 있게 버튼을 배치하여 유저가 원하는 시간대의 정보를 얻을수 있게 하였습니다.

## exclamation point
- 해당 앱을 만들면서 내가 리엑트에 대해여 알고 있는것이 짧다는것을 알게되었으며 너무 많은 useState를 쓰게되었을 경우 잦은 오류가 걸렸으며 유지 보수가 힘들다는 점을 느껴 리엑트에서 제일중요한 컴포넌트 방식으로 짜지 않았다는 것을 느껴 최대한 파일은 분산하여 저장하려고 하였으며 초창기 API를 불러오는것만 useState를 20개넘게 썻지만 불필요한 useState를 줄이며 리랜더링했을경우에 걸리는 시간을 단축하였습니다.
-- 하지만 여전히 다른사람이 봣을 경우 쉽게 알아보기 힘들다는 단점을 있어 여러번의 수정 작업을 하는 중에 있습니다.

Weather App
This weather app is a React-based weather application that shows the weather in various locations in South Korea.

Links
GitHub source code repository: [Link not provided]
Deployed website URL: [Link not provided]
<hr>
Updates
First update
In this update, the API was imported and organized to retrieve the corresponding values and send them to the screen.
Second update
It was realized that the API needed to retrieve the current weather and future weather from different APIs. The two APIs were retrieved and used to display the current and future weather information.
Documentation
Default value:
The default value is set to the latitude and longitude of Seoul, Jongno-gu.
If the user selects a city name from anywhere in the country, the appropriate city, gu, and gun will be displayed.
When the user makes this selection, the API's address is changed and the appropriate data is transmitted.
After retrieving the location, the current weather is displayed and buttons are placed to show the weather from 1 hour to 6 hours later. The user can obtain the information of the desired time by pressing the desired button. If there are any parts that need to be supplemented, I would like to supplement them in the explanation.
