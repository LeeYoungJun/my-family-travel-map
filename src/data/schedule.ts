export interface PlaceInfo {
  name: string
  lat: number
  lng: number
  address?: string
  description?: string
  rating?: number
}

export interface DaySchedule {
  day: number
  date: string
  weekday: string
  title: string
  city: string
  country: string
  lat: number
  lng: number
  zoom: number
  image: string
  transport: string
  activities: string
  hotel?: PlaceInfo
  restaurants?: PlaceInfo[]
}

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토']

// Unsplash city photos
const cityImages: Record<string, string> = {
  '프라하': 'https://images.unsplash.com/photo-1592906209472-a36b1f3782ef?w=800&q=80',
  '쿠트나호라': 'https://images.unsplash.com/photo-1600623471616-8c1966c91ff6?w=800&q=80',
  '체스키크룸로프': 'https://images.unsplash.com/photo-1560452992-e0f8d2b11029?w=800&q=80',
  '할슈타트': 'https://images.unsplash.com/photo-1617103996702-96ff29b1c467?w=800&q=80',
  '잘츠부르크': 'https://images.unsplash.com/photo-1609866138210-84bb689f3c61?w=800&q=80',
  '비엔나': 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=800&q=80',
}

interface ItineraryEntry {
  title: string; city: string; country: string; lat: number; lng: number; zoom: number
  transport: string; activities: string; hotel?: PlaceInfo; restaurants?: PlaceInfo[]
}

const itinerary: ItineraryEntry[] = [
  {
    title: '인천 → 프라하 출발', city: '프라하', country: '체코', lat: 50.0755, lng: 14.4378, zoom: 13,
    transport: '✈ 비행기', activities: '인천공항 출발',
    hotel: { name: 'Hotel U Prince', lat: 50.0870, lng: 14.4208, address: 'Staroměstské nám. 29', description: '구시가 광장 바로 앞, 도착 후 체크인', rating: 4.5 },
    restaurants: [
      { name: 'Lokál Dlouhááá', lat: 50.0895, lng: 14.4250, address: 'Dlouhá 33', description: '정통 체코 요리, 도착 후 저녁 식사', rating: 4.4 },
    ],
  },
  {
    title: '프라하 도착 · 구시가지', city: '프라하', country: '체코', lat: 50.0875, lng: 14.4213, zoom: 15,
    transport: '🚇 대중교통', activities: '구시가 광장, 천문시계, 틴 성당',
    hotel: { name: 'Hotel U Prince', lat: 50.0870, lng: 14.4208, address: 'Staroměstské nám. 29', description: '구시가 광장 바로 앞 위치, 루프탑 테라스', rating: 4.5 },
    restaurants: [
      { name: 'Lokál Dlouhááá', lat: 50.0895, lng: 14.4250, address: 'Dlouhá 33', description: '정통 체코 요리 전문, 필스너 생맥주', rating: 4.4 },
      { name: 'Café Imperial', lat: 50.0906, lng: 14.4311, address: 'Na Poříčí 15', description: '아르데코 인테리어 카페, 브런치 유명', rating: 4.3 },
    ],
  },
  {
    title: '프라하 성 · 카를교', city: '프라하', country: '체코', lat: 50.0884, lng: 14.4013, zoom: 15,
    transport: '🚶 도보', activities: '프라하 성, 카를교, 성 비투스 대성당',
    hotel: { name: 'Hotel U Prince', lat: 50.0870, lng: 14.4208, address: 'Staroměstské nám. 29', description: '구시가 광장 바로 앞 위치, 루프탑 테라스', rating: 4.5 },
    restaurants: [
      { name: 'U Zlaté Studně', lat: 50.0891, lng: 14.3985, address: 'U Zlaté Studně 4', description: '프라하 성 전망 미슐랭 레스토랑', rating: 4.6 },
      { name: 'Kolkovna Olympia', lat: 50.0838, lng: 14.4121, address: 'Vítězná 7', description: '전통 체코 맥주홀, 가족 친화적', rating: 4.2 },
    ],
  },
  {
    title: '쿠트나호라 당일치기', city: '쿠트나호라', country: '체코', lat: 49.9481, lng: 15.2687, zoom: 14,
    transport: '🚆 기차', activities: '세들레츠 납골당, 성 바르바라 성당',
    hotel: { name: 'Hotel U Prince', lat: 50.0870, lng: 14.4208, address: 'Staroměstské nám. 29', description: '프라하 숙소 (당일치기)', rating: 4.5 },
    restaurants: [
      { name: 'Restaurace Dačický', lat: 49.9488, lng: 15.2680, address: 'Rakova 8', description: '쿠트나호라 중심부 체코 전통 식당', rating: 4.3 },
    ],
  },
  {
    title: '체스키크룸로프 이동', city: '체스키크룸로프', country: '체코', lat: 48.8127, lng: 14.3175, zoom: 14,
    transport: '🚌 버스', activities: '체스키크룸로프 성, 구시가 산책',
    hotel: { name: 'Hotel Růže', lat: 48.8115, lng: 14.3153, address: 'Horní 154', description: '16세기 예수회 건물 개조 호텔, 구시가 중심', rating: 4.4 },
    restaurants: [
      { name: 'Krčma v Šatlavské', lat: 48.8122, lng: 14.3162, address: 'Šatlavská 14', description: '중세풍 지하 레스토랑, 그릴 요리', rating: 4.5 },
      { name: 'Nonna Gina', lat: 48.8130, lng: 14.3158, address: 'Kájovská 52', description: '이탈리안 레스토랑, 파스타 맛집', rating: 4.3 },
    ],
  },
  {
    title: '체스키크룸로프 탐방', city: '체스키크룸로프', country: '체코', lat: 48.8127, lng: 14.3175, zoom: 15,
    transport: '🚶 도보', activities: '블타바강 래프팅, 전망대',
    hotel: { name: 'Hotel Růže', lat: 48.8115, lng: 14.3153, address: 'Horní 154', description: '16세기 예수회 건물 개조 호텔', rating: 4.4 },
    restaurants: [
      { name: 'Cikánská Jizba', lat: 48.8118, lng: 14.3148, address: 'Dlouhá 31', description: '보헤미안 스타일 식당, 라이브 음악', rating: 4.2 },
    ],
  },
  {
    title: '할슈타트 이동', city: '할슈타트', country: '오스트리아', lat: 47.5622, lng: 13.6493, zoom: 14,
    transport: '🚌 버스', activities: '할슈타트 도착, 마을 산책',
    hotel: { name: 'Heritage Hotel Hallstatt', lat: 47.5615, lng: 13.6488, address: 'Landungspl. 101', description: '호수 전망 부티크 호텔', rating: 4.6 },
    restaurants: [
      { name: 'Bräugasthof', lat: 47.5625, lng: 13.6498, address: 'Seestraße 120', description: '오스트리아 전통 양조장 레스토랑', rating: 4.3 },
    ],
  },
  {
    title: '할슈타트 호수 · 소금광산', city: '할슈타트', country: '오스트리아', lat: 47.5622, lng: 13.6493, zoom: 15,
    transport: '🚶 도보 / 🚢 보트', activities: '소금광산, 호수 유람선, 전망대',
    hotel: { name: 'Heritage Hotel Hallstatt', lat: 47.5615, lng: 13.6488, address: 'Landungspl. 101', description: '호수 전망 부티크 호텔', rating: 4.6 },
    restaurants: [
      { name: 'Restaurant zum Salzbaron', lat: 47.5619, lng: 13.6501, address: 'Marktpl. 104', description: '호수변 레스토랑, 송어 요리 유명', rating: 4.4 },
      { name: 'Maislinger', lat: 47.5628, lng: 13.6485, address: 'Gosaumühlstraße 83', description: '가정식 오스트리아 요리', rating: 4.1 },
    ],
  },
  {
    title: '잘츠부르크 이동', city: '잘츠부르크', country: '오스트리아', lat: 47.8095, lng: 13.0550, zoom: 13,
    transport: '🚆 기차', activities: '잘츠부르크 도착, 미라벨 정원',
    hotel: { name: 'Hotel Sacher Salzburg', lat: 47.8005, lng: 13.0398, address: 'Schwarzstraße 5-7', description: '잘자흐강변 5성급 호텔, 유명 자허토르테', rating: 4.7 },
    restaurants: [
      { name: 'Stiftskeller St. Peter', lat: 47.7975, lng: 13.0445, address: 'St.-Peter-Bezirk 1/4', description: '유럽 최고(最古) 레스토랑 (803년~)', rating: 4.5 },
      { name: 'Triangel', lat: 47.8010, lng: 13.0420, address: 'Wiener-Philharmoniker-Gasse 7', description: '잘츠부르크식 슈니첼 전문', rating: 4.3 },
    ],
  },
  {
    title: '잘츠부르크 관광', city: '잘츠부르크', country: '오스트리아', lat: 47.7981, lng: 13.0474, zoom: 15,
    transport: '🚶 도보', activities: '호엔잘츠부르크 성, 모차르트 생가, 게트라이데 거리',
    hotel: { name: 'Hotel Sacher Salzburg', lat: 47.8005, lng: 13.0398, address: 'Schwarzstraße 5-7', description: '잘자흐강변 5성급 호텔', rating: 4.7 },
    restaurants: [
      { name: 'Zwettler\'s', lat: 47.7994, lng: 13.0461, address: 'Kaigasse 3', description: '게트라이데 거리 근처 맥주 전문점', rating: 4.2 },
      { name: 'Café Tomaselli', lat: 47.7994, lng: 13.0449, address: 'Alter Markt 9', description: '1700년대 창업 전통 카페', rating: 4.4 },
    ],
  },
  {
    title: '비엔나 이동', city: '비엔나', country: '오스트리아', lat: 48.2082, lng: 16.3738, zoom: 13,
    transport: '🚆 기차', activities: '비엔나 도착, 슈테판 대성당',
    hotel: { name: 'Hotel Sacher Wien', lat: 48.2038, lng: 16.3695, address: 'Philharmoniker Str. 4', description: '오페라하우스 옆 전설적 5성급 호텔', rating: 4.8 },
    restaurants: [
      { name: 'Figlmüller', lat: 48.2083, lng: 16.3749, address: 'Wollzeile 5', description: '비엔나 최고의 슈니첼, 1905년 창업', rating: 4.5 },
      { name: 'Café Central', lat: 48.2107, lng: 16.3655, address: 'Herrengasse 14', description: '프로이트가 다녔던 유서깊은 카페', rating: 4.4 },
    ],
  },
  {
    title: '쇤브룬 궁전 · 시내', city: '비엔나', country: '오스트리아', lat: 48.1845, lng: 16.3122, zoom: 15,
    transport: '🚇 대중교통', activities: '쇤브룬 궁전, 나슈마르크트',
    hotel: { name: 'Hotel Sacher Wien', lat: 48.2038, lng: 16.3695, address: 'Philharmoniker Str. 4', description: '오페라하우스 옆 전설적 5성급 호텔', rating: 4.8 },
    restaurants: [
      { name: 'Naschmarkt Deli', lat: 48.1989, lng: 16.3621, address: 'Naschmarkt Stand 421', description: '나슈마르크트 내 다국적 델리', rating: 4.2 },
      { name: 'Plachutta', lat: 48.2081, lng: 16.3766, address: 'Wollzeile 38', description: '타펠슈피츠(소고기 수프) 전문 명가', rating: 4.6 },
    ],
  },
  {
    title: '비엔나 자유일정', city: '비엔나', country: '오스트리아', lat: 48.2082, lng: 16.3738, zoom: 14,
    transport: '🚶 도보', activities: '벨베데레 궁전, 프라터 공원',
    hotel: { name: 'Hotel Sacher Wien', lat: 48.2038, lng: 16.3695, address: 'Philharmoniker Str. 4', description: '오페라하우스 옆 전설적 5성급 호텔', rating: 4.8 },
    restaurants: [
      { name: 'Zum Schwarzen Kameel', lat: 48.2113, lng: 16.3668, address: 'Bognergasse 5', description: '1618년 창업 델리카테센 & 레스토랑', rating: 4.5 },
    ],
  },
  {
    title: '비엔나 → 인천 귀국', city: '비엔나', country: '오스트리아', lat: 48.2082, lng: 16.3738, zoom: 13,
    transport: '✈ 비행기', activities: '비엔나 공항 출발',
  },
]

function generateSchedule(): DaySchedule[] {
  const startDate = new Date(2026, 7, 15)
  const days: DaySchedule[] = []

  for (let i = 0; i < 14; i++) {
    const d = new Date(startDate)
    d.setDate(d.getDate() + i)
    const entry = itinerary[i]
    days.push({
      day: i + 1,
      date: `${d.getMonth() + 1}.${d.getDate()}`,
      weekday: WEEKDAYS[d.getDay()],
      ...entry,
      image: cityImages[entry.city],
    })
  }

  return days
}

export const schedule = generateSchedule()

// Unique cities for map markers
export const cityMarkers = Object.values(
  schedule.reduce<Record<string, { city: string; country: string; lat: number; lng: number }>>((acc, s) => {
    if (!acc[s.city]) {
      acc[s.city] = { city: s.city, country: s.country, lat: s.lat, lng: s.lng }
    }
    return acc
  }, {})
)

// Route path coordinates (ordered by day)
export const routePath = schedule.map(s => ({ lat: s.lat, lng: s.lng }))
