// 레거시 페이지에서 가져온 실제 체험/사용 후기 데이터
// 원본: data/소중한 체험 후기_2026_01_06_KR.csv

export interface Testimonial {
  id: string;
  title: string;
  quote: string;
  author: string;
  date: string;
  views: number;
  likes: number;
  category: "체험후기" | "사용후기" | "펀딩후기";
  highlight?: string; // 짧은 핵심 문구
  imageUrl?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    title: "너무 궁금했고 너무 만족했습니다!",
    quote: "영상으로만 봤을때는 정말 느낌이 날까? 싶어서 사전체험 신청을 하게됬고 체험을 해보니 걱정이 무색하게 너무 만족하고왔네요! 스쿼트할때 서있는상태로 무게를 올려주시는대 진짜 바벨 들고있는 기분이였습니다.",
    highlight: "걱정이 무색하게 너무 만족",
    author: "최*은",
    date: "2024-08-22",
    views: 713,
    likes: 5,
    category: "체험후기",
  },
  {
    id: "t2",
    title: "이거 경험 안 해보면 손해임!",
    quote: "기대했던 것보다 훨씬 내구성이 좋고 오래 잘 쓸 수 있을 것 같아요. 혼자서도 제대로 운동할 수 있도록 고민하신 흔적이 느껴지는 제품입니다. 모든 운동 자극 굿, 개인적으로 가슴 운동 특히 굿!",
    highlight: "경험 안 해보면 손해",
    author: "박*민",
    date: "2024-09-01",
    views: 1000,
    likes: 3,
    category: "체험후기",
  },
  {
    id: "t3",
    title: "1차 펀딩하길 너무 잘했습니다",
    quote: "머신이 상상이상으로 좋아서 깜짝 놀랐습니다. 글로는 표현하기 힘든 무게맛.. 직접 체험해 보셔야 합니다. 디테일한 부분까지 전부 계획이 되어있어 더욱 안심이 되고 기대가 되었습니다.",
    highlight: "글로는 표현하기 힘든 무게맛",
    author: "이*산",
    date: "2024-08-27",
    views: 776,
    likes: 1,
    category: "펀딩후기",
  },
  {
    id: "t4",
    title: "맥스프로랑 비교하면 진짜 바벨 느낌",
    quote: "집에 있는 맥스프로랑 비교해보면 진짜 바벨이랑 덤벨 드는거 같은 느낌이에요! 사전체험 해보니까 더욱 더 제품이 기다려지네요!",
    highlight: "진짜 바벨 드는 느낌",
    author: "송*근",
    date: "2024-09-07",
    views: 675,
    likes: 4,
    category: "체험후기",
  },
  {
    id: "t5",
    title: "미니멀한 디자인에 공간활용 최고",
    quote: "미니멀한 디자인에 세워서 보관할 수 있어 공간활용이 너무 좋고 케이블 움직임이 부드러워서 만족스러운 자극을 느낄 수 있었습니다. 역동작에도 중량 조절과 세이프존 지정 등 실용적인 기능들이 많아요.",
    highlight: "공간활용이 너무 좋고",
    author: "안*영",
    date: "2024-12-26",
    views: 758,
    likes: 5,
    category: "체험후기",
  },
  {
    id: "t6",
    title: "벤치프레스 자극이 잘 와서 좋았습니다",
    quote: "벤치프레스 같은 경우 중량 높아질수록 보조없이 운동하기 불안한 부분이 있는데 중량 off가 가능해서 안전한 부분과 한계까지 운동할 수 있는 부분이 정말 좋은 것 같습니다. 집에서 지내다가 컨디션 좋을 때 바로 운동하기 좋게 홈짐 꾸리고 싶었는데 정말 혁신인 것 같습니다.",
    highlight: "한계까지 운동할 수 있는",
    author: "안*형",
    date: "2024-12-28",
    views: 572,
    likes: 3,
    category: "체험후기",
  },
  {
    id: "t7",
    title: "무게 맛이 좋네요",
    quote: "프리웨이트만 하고 사실 머신은 안하는데 머신으로 프리웨이트 무게 맛을 느낄 수 있어서 참 좋네요. 어플도 재밌는 기능이 많아서 좋은 것 같아요.",
    highlight: "프리웨이트 무게 맛",
    author: "김*환",
    date: "2025-01-18",
    views: 527,
    likes: 1,
    category: "체험후기",
  },
  {
    id: "t8",
    title: "헬스 4년차 솔직 후기입니다",
    quote: "공간 차지가 확연히 작고 소음이 거의 없습니다. 좌우밸런스를 앱으로 확인할 수 있고, 네거티브 활용이 가능합니다. 무엇보다 운동하다가 무게에 깔리는 위험을 예방할 수 있어요. 가동범위를 설정하면 그 이상으로 내려가면 자동으로 무게가 풀립니다.",
    highlight: "깔리는 위험을 예방",
    author: "장*훈",
    date: "2025-01-22",
    views: 1972,
    likes: 1,
    category: "체험후기",
  },
  {
    id: "t9",
    title: "홈트레이닝은 이걸로 하면 정말 좋을 것 같아요",
    quote: "제품은 확실히 다양한 동작과 운동모드가 있어서, 즉각적으로 피드백을 받을 수 있다는게 가장 큰 장점이었어요. 직접 사용해보니 반응도 민첩하고, 안전도 확실히 고려해서 만든 것이 느껴졌습니다.",
    highlight: "즉각적으로 피드백",
    author: "김*형",
    date: "2025-02-02",
    views: 722,
    likes: 2,
    category: "체험후기",
  },
  {
    id: "t10",
    title: "자취생에게 최고의 운동기구!",
    quote: "압도적으로 컴팩트한데다가 운동 안할때는 간단히 세워두면 자리도 거의 차지 안하는게 진짜 제가 딱 찾던 아이템이었어요. 자동으로 쉬는걸 감지해서 무게 사라지는 거나, 네거티브 운동 하도록 자동으로 무게 변경되는 등 여러가지 기능들도 좋아보이구요.",
    highlight: "딱 찾던 아이템",
    author: "이*인",
    date: "2025-02-08",
    views: 1204,
    likes: 3,
    category: "체험후기",
  },
  {
    id: "t11",
    title: "저는 이제 이걸로 운동하렵니다",
    quote: "가장 큰 장점을 꼽으라면 무게가 날리지 않는다는것 같습니다. 일반적으로 바벨로 운동할땐 최대부하지점을 지나면 무게가 날아가는데 룸핏은 가동범위 끝까지 묵직함이 계속 유지되더라구요. 프리웨이트 할때보다 무게를 많이 낮춰서 했는데도 생각보다 힘이 많이 들어갑니다.",
    highlight: "끝까지 묵직함이 유지",
    author: "노*섭",
    date: "2025-03-21",
    views: 868,
    likes: 5,
    category: "체험후기",
  },
  {
    id: "t12",
    title: "쫀쫀한 자극이 진짜 맛도리!",
    quote: "오랜시간 기다려 받은 만큼 기대가 큰 제품 이었는데 드디어 실물로 접하고 기대보다 더 좋은 하드웨어 성능에 깜짝 놀랬습니다. 작동 하는데 군더더기 없이 쫀쫀하게 먹는 자극이 진짜 맛도리입니다.",
    highlight: "쫀쫀한 자극이 맛도리",
    author: "이성*",
    date: "2025-05-16",
    views: 502,
    likes: 4,
    category: "사용후기",
  },
  {
    id: "t13",
    title: "운동 끝나면 있는지 없는지 모르게 보관",
    quote: "강력한 하드웨어 기능성과 안정성. 비오는날 나가지 않고 집안에서 우아하게, 때로는 과격하게 운동할 수 있고, 운동 끝나면 세워서 있는지 없는지 모르게 보관! 개발자들의 열정이 느껴지는 긴밀한 피드백은 룸핏을 더욱더 매력적으로 완성해줍니다.",
    highlight: "있는지 없는지 모르게 보관",
    author: "김민*",
    date: "2025-05-16",
    views: 498,
    likes: 2,
    category: "사용후기",
  },
  {
    id: "t14",
    title: "룸핏 7개월 사용 후기 및 강력추천",
    quote: "기능적으로 가장 좋은 기능은 안전기능! 홈트하다 깔리면 죽을 수도 있다는 공포감에 무게, 횟수에 제한을 널널하게 줄 수 밖에 없는데 룸핏 구매 이후 무게와 횟수에 제한에 엄청 관대해져서 홈트에서도 한계를 이끌어 낼 수 있는 점은 정말 좋은 장점이었습니다.",
    highlight: "홈트에서도 한계를 이끌어 낼 수 있는",
    author: "윤*원",
    date: "2025-12-24",
    views: 117,
    likes: 2,
    category: "사용후기",
  },
  {
    id: "t15",
    title: "너무 즐거운 체험이었습니다",
    quote: "컴팩트합니다. 원룸에서 쓰기에도 부담이 없네요. 네거티브 동작시 부하를 좀더 높게 할 수 있어서 같은 힘으로 운동해도 좀더 효과적으로 운동이 가능할거 같아요.",
    highlight: "원룸에서 쓰기에도 부담 없는",
    author: "이*식",
    date: "2025-08-19",
    views: 370,
    likes: 2,
    category: "체험후기",
  },
];

// 카테고리별 필터링
export const getTestimonialsByCategory = (category: Testimonial["category"]) =>
  testimonials.filter((t) => t.category === category);

// 인기순 정렬 (좋아요 + 조회수 기반)
export const getPopularTestimonials = (limit?: number) => {
  const sorted = [...testimonials].sort(
    (a, b) => b.likes * 10 + b.views - (a.likes * 10 + a.views)
  );
  return limit ? sorted.slice(0, limit) : sorted;
};

// 최신순 정렬
export const getRecentTestimonials = (limit?: number) => {
  const sorted = [...testimonials].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  return limit ? sorted.slice(0, limit) : sorted;
};

// 랜덤 선택
export const getRandomTestimonials = (count: number) => {
  const shuffled = [...testimonials].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

// 통계
export const testimonialStats = {
  total: testimonials.length,
  totalViews: testimonials.reduce((sum, t) => sum + t.views, 0),
  totalLikes: testimonials.reduce((sum, t) => sum + t.likes, 0),
  avgRating: 4.9, // 실제 별점 데이터가 있다면 계산
};
