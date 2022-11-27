export const PUBLIC_ROUTES = {
  NEW_PASSWORD: '/new-password',
  LOGIN: '/login',
} as const;

export const PRIVATE_ROUTES = {
  HOME: '/',
} as const;

export const ROUTES = {
  ...PUBLIC_ROUTES,
  ...PRIVATE_ROUTES,
} as const;
