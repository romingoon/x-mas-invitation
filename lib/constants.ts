import { details } from "framer-motion/client";

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
    details: "새문안교회 한기림찬양대는 '하나님을 한소리로 기리는 무리'라는 뜻을 가진 찬양대 입니다. 5부예배(청년예배) 찬양을 담당하고 있으며 만18~35세의 청년들로 구성된 청년찬양대입니다.1972년 조직되어 50년이상의 역사를 가지고 있고 현재까지 청년들이 자발적으로 모여 군부대 찬양, 병원 선교 찬양, 광화문 음악회 등 세상의 현장 속에서 그리스도의 향기를 음악으로 전하는 사명을 계속해 나가고 있습니다. 현재 안정현 지휘자, 장연진 오르가니스트, 박형중 대장님과 백석준 목사님의 지도 아래 바쁜 일상 속에서도 하나님을 향한 마음으로 예배와 찬양의 자리에 기쁨으로 참여하고 있습니다.",
    image: "/assets/han.jpeg",
  },
  {
    id: 2,
    name: "동숭교회 은나노찬양대",
    description: "하나님의 권능을 크게 외치며 '모양넘어, 능력으로' 나아가는 공동체",
    details: `(대장 안민영, 지휘 조은영, 반주 이태운)
동숭교회 4부 청년예배를 담당하고 있는 은나노찬양대는 <은>혜를 <나>누며 <노>래하는 이름처럼 청년다운 열정으로 하나님께 영광을 올리며 성도들에게 위로와 기쁨을 전하는 찬양대입니다.`,
    image: "/assets/eunnano.jpeg",
  },
  {
    id: 3,
    name: "자양교회 뒤나미스찬양대",
    description: "하나님의 권능을 크게 외치며 '모양넘어, 능력으로' 나아가는 공동체",
    details: `(대장 오재욱, 지휘 조성은, 반주 문예원)
뒤나미스 찬양대는 자양교회 4부(청년)예배의 찬양을 담당하고 있습니다. 뒤나미스(Dynamis)란 '힘', '가능성' 그리고 '하나님의 권능'이라는 뜻의 헬라어로, 뒤나미스는 하나님의 권능을 크게 외치며 "모양넘어, 능력으로" 나아가는 공동체입니다.
우리는 하나님께서 찾으시는 예배자로 서기 위해 노력하며, 온전한 찬양을 위하 고민하며 훈련하고 있습니다.또한 신앙적 성숙과 풍성한 교제를 위해 다양한 프로그램과 모임으로 함께 성장하며 기도합니다.
`,
    image: "/assets/dunamis.jpeg",
  },
  {
    id: 4,
    name: "정릉교회 할렐루야찬양대",
    description: "찬양으로 하나님 한 분을 높이는 찬양대",
    details: `“할렐루야! 여호와를 찬양하라!”
할렐루야 찬양대는 그 이름에 맞게 찬양으로 하나님 한 분을 높이는 정릉교회 청년부 찬양대입니다.현재 임용철 대장님, 김세희 지휘자님, 이영은 반주자님의 인도 아래 주일 4부(청년부) 예배의 찬양과 추수감사절/ 부활절 / 성탄절 등 절기예배의 찬양을 담당하고 있습니다. 
비록 큰 규모의 찬양대는 아니지만, 작은 울림이라도 하나님께서 기뻐 받으시는 향기로운 찬양이 되기를 소망하며 매주 정성껏 예배와 찬양의 자리를 지키고 있습니다.
`,
    image: "/assets/hallel.jpeg",
  },
];

export const PROGRAM = [
  { time: "15:00", title: "개회 기도", performer: "김목사님" },
  { time: "15:10", title: "경배와 찬양", performer: "연합 찬양팀" },
  { time: "15:30", title: "은혜 교회 찬양", performer: "은혜 교회 청년 찬양대" },
  { time: "15:45", title: "소망 교회 찬양", performer: "소망 교회 청년 찬양대" },
  { time: "16:00", title: "믿음 교회 찬양", performer: "믿음 교회 청년 찬양대" },
  { time: "16:15", title: "4개 교회 단체 찬양", performer: "사랑 교회 청년 찬양대" },
  { time: "16:30", title: "연합 합창", performer: "전체 찬양대" },
  { time: "16:40", title: "폐회 기도", performer: "이목사님" },
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
