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
- victory js

  시간 별 기온을 차트화 하기 위해서 사용.
  차트를 디자인화 하는 부분에서 편리하다고 생각하여 사용.
### 폴더 구조
```
├─assets
│  └─svgs
├─components
│  └─Loading
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
│  │  ├─CurrentWeather
│  │  ├─DailyWeather
│  │  ├─EtcInfo
│  │  ├─HourlyWeather
│  │  │  └─HourList
│  │  │      ├─HourTempItem
│  │  │      └─HumidityItem
│  │  └─SunTime
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
### 개발 특이점
- 로컬스토리지를 이용해서 위치 데이터 저장
- 로컬스토리지가 비었을 때는 메인 화면으로 가지않고 날짜 위치를 추가하는 화면으로 강제함.
- 네이버 클라우드 플랫폼 geocoding을 이용해서 키워드를 통해 원하는 위치의 위도와 경도 불러옴.
- 네이버 클라우드 플랫폼의 cors문제를 해결하기 위해 헤로쿠를 이용하여 프록시 서버 구축
- 헤로쿠 서버 상태에 따라 주소 검색에 많은 시간이 소요될 수 있습니다.
- 아침 6시와 저녁 7시 사이는 light 모드 그 외의 시간은 dark 모드로 설정.
