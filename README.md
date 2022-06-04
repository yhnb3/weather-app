# 날씨 앱 
## [배포페이지](https://thisisweather.netlify.app/)

## 과제 설명
### 개요
openweathermap API과 네이버 geocoding을 이용한 날씨 앱
### 실행 방법
```
root위치에 .env 파일 생성 후   

REACT_APP_WEATHER_APP_ID=당신의 앱 아이디  저장
```
```
// 실행
npm i
npm start
```
### 폴더 구조
```
├─assets
│  └─svgs
├─components
│  ├─CurrentWeather
│  ├─DailyWeather
│  ├─EtcInfo
│  ├─HourlyWeather
│  │  └─HourList
│  │      ├─HourTempItem
│  │      └─HumidityItem
│  ├─Lodaing
│  └─SunTime
├─hooks
│  └─worker
├─routes
│  ├─Manage
│  │  ├─AddMode
│  │  ├─EditMode
│  │  ├─Header
│  │  ├─ListMode
│  │  └─LocationItem
│  ├─Weather
│  └─_shared
│      └─Aside
│          └─LocationItem
├─services
├─states
├─styles
│  ├─base
│  ├─constants
│  └─mixins
├─types
└─utils
```
### Skills
- React
- Typescript
- React Query
- Recoil
- Sass
### Libraries
- classnames
  Scss를 위한 클래스 네임 컨트롤을 위해 사용.
- react-use
  useMount, useClickAway와 같은 훅을 편리하게 사용하기 위해 사용.
- store
  localStorage를 편히 이용하기 위해 사용.
- dayjs
  날짜를 편히 포맷팅하여 사용하기 위해 사용.
