export const FESTIVAL_INFO = {
  title: "2025 4개 교회 연합 성탄 찬양제",
  date: "2025.12.20 (토)",
  time: "오후 3시",
  location: "새문안교회 4층 대예배당",
  address: "서울시 종로구 새문안로 79",
  invitationMessage: "예수님의 탄생을 축하하며 기쁨과 찬양의 자리에 여러분을 초대합니다.",
  introText: "이 찬양제는 4개 교회의 청년 찬양대가 연합하여 주님께 영광 돌리는 자리입니다. 하나 됨과 기쁨, 그리고 감사가 넘치는 시간이 되기를 소망합니다.",
  planningIntent: "지역 사회의 청년들이 믿음 안에서 하나 되고, 찬양을 통해 영적으로 교제하며 성장하기 위해 기획되었습니다.",
};

export const CHOIRS = [
  {
    id: 1,
    name: "새문안교회 한기림찬양대",
    description: "하나님을 한 소리로 기리는 무리",
    image: "/placeholder-choir-1.jpg",
  },
  {
    id: 2,
    name: "동숭교회 OO 찬양대",
    description: "찬양으로 복음을 전하는 사람들",
    image: "/placeholder-choir-2.jpg",
  },
  {
    id: 3,
    name: "자양교회 OO 찬양대",
    description: "주님을 향한 사랑을 노래합니다",
    image: "/placeholder-choir-3.jpg",
  },
  {
    id: 4,
    name: "정릉교회 OO 찬양대",
    description: "화음과 영성으로 하나 된 찬양대",
    image: "/placeholder-choir-4.jpg",
  },
];

export const PROGRAM = [
  { time: "15:00", title: "개회 기도", performer: "김목사님" },
  { time: "15:10", title: "경배와 찬양", performer: "연합 찬양팀" },
  { time: "15:30", title: "은혜 교회 찬양", performer: "은혜 교회 청년 찬양대" },
  { time: "15:45", title: "소망 교회 찬양", performer: "소망 교회 청년 찬양대" },
  { time: "15:15", title: "믿음 교회 찬양", performer: "믿음 교회 청년 찬양대" },
  { time: "16:00", title: "4개 교회 단체 찬양", performer: "사랑 교회 청년 찬양대" },
  { time: "16:10", title: "연합 합창", performer: "전체 찬양대" },
  { time: "16:20", title: "폐회 기도", performer: "이목사님" },
];

export const LOCATION = {
  name: "새문안교회 지하2층 언더우드홀",
  address: "서울시 종로구 새문안로 79",
  latitude: 37.5700,
  longitude: 126.9718,
  naverMapUrl: "https://naver.me/G657fW17", // Placeholder
  publicTransport: "지하철 5호선 광화문역 1번 출구에서 270m, 8번출구에서 150m(후문)",
  parking: "교회 지하 주차장 (B5-B6) 이용 가능합니다. 만차 시 콘코디언빌딩 지하주차장 주차 후 교회 1층 로비에서 주차 할인 요청",
};

export const BGM_PLAYLIST = [
  {
    title: "Silent Night",
    artist: "Kevin MacLeod",
    src: "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Silent%20Night.mp3", // Public Domain
  },
  {
    title: "Oh Holy Night",
    artist: "Kevin MacLeod",
    src: "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Oh%20Holy%20Night.mp3", // Public Domain
  },
  {
    title: "It Came Upon a Midnight Clear",
    artist: "Kevin MacLeod",
    src: "https://incompetech.com/music/royalty-free/mp3-royaltyfree/It%20Came%20Upon%20a%20Midnight%20Clear.mp3", // Public Domain
  },
];
