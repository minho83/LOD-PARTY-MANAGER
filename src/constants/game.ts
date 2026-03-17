// LOD 게임 직업
export const JOB_CLASSES = [
  { id: 0, name: "공통", icon: "⚔️" },
  { id: 1, name: "전사", icon: "🛡️" },
  { id: 2, name: "도적", icon: "🗡️" },
  { id: 3, name: "마법사", icon: "🔮" },
  { id: 4, name: "성직자", icon: "✨" },
  { id: 5, name: "무도가", icon: "👊" },
] as const;

export const JOB_CLASS_NAMES = JOB_CLASSES.map((j) => j.name);
export type JobClassName = (typeof JOB_CLASS_NAMES)[number];

// 게임 모드
export const GAME_MODES = [
  "일반",
  "하드",
  "헬",
  "레이드",
  "PVP",
  "이벤트",
] as const;
export type GameMode = (typeof GAME_MODES)[number];

// 티어/등급
export const TIERS = [
  "입문",
  "초급",
  "중급",
  "상급",
  "최상급",
  "전설",
] as const;
export type Tier = (typeof TIERS)[number];

// 파티 포지션
export const POSITIONS = [
  "탱커",
  "딜러",
  "힐러",
  "서포터",
  "자유",
] as const;
export type Position = (typeof POSITIONS)[number];

// 파티 상태 한글 매핑
export const PARTY_STATUS_LABELS = {
  RECRUITING: "모집중",
  FULL: "모집완료",
  IN_PROGRESS: "진행중",
  COMPLETED: "완료",
  CANCELLED: "취소",
} as const;

// 파티 모드 한글 매핑
export const PARTY_MODE_LABELS = {
  FREE_FORM: "자유양식",
  TEMPLATE: "정해진양식",
} as const;

// 파티 상태 색상
export const PARTY_STATUS_COLORS = {
  RECRUITING: "text-green-400",
  FULL: "text-blue-400",
  IN_PROGRESS: "text-yellow-400",
  COMPLETED: "text-gray-400",
  CANCELLED: "text-red-400",
} as const;

// 최대 파티 인원
export const MAX_PARTY_SIZE = 8;
export const MIN_PARTY_SIZE = 2;
export const DEFAULT_PARTY_SIZE = 4;

// 파티 만료 기간 (일)
export const PARTY_EXPIRY_DAYS = 7;
