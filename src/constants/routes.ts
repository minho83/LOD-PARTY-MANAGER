export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  AUTH_ERROR: "/auth-error",

  // 파티
  PARTIES: "/parties",
  PARTY_DETAIL: (id: string) => `/parties/${id}`,
  PARTY_CREATE: "/parties/create",

  // 내 정보
  MY_PARTIES: "/my/parties",
  MY_APPLICATIONS: "/my/applications",
  MY_NOTIFICATIONS: "/my/notifications",
  MY_BOOKMARKS: "/my/bookmarks",

  // 프로필
  PROFILE: "/profile",
  PROFILE_CHARACTERS: "/profile/characters",
  PROFILE_MATCHING: "/profile/matching",

  // 관리자
  ADMIN: "/admin",
  ADMIN_TEMPLATES: "/admin/templates",
  ADMIN_TEMPLATE_CREATE: "/admin/templates/create",
  ADMIN_TEMPLATE_EDIT: (id: string) => `/admin/templates/${id}/edit`,
  ADMIN_USERS: "/admin/users",
} as const;
