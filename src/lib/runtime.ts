export const PRIVY_APP_ID = (import.meta.env.VITE_PRIVY_APP_ID as string | undefined)?.trim() ?? "";

export const AUTH_ENABLED = PRIVY_APP_ID.length > 0;
