export interface User {
  id: string;
  name: string;
  email: string;
  workspace: string;
  avatar: string;
}

const KEY = "astro_x402_auth";

export function getUser(): User | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

export function setUser(user: User): void {
  localStorage.setItem(KEY, JSON.stringify(user));
}

export function clearUser(): void {
  localStorage.removeItem(KEY);
}

export function buildUserFromWallet(address: string): User {
  const shortAddress = `${address.slice(0, 4)}…${address.slice(-4)}`;
  const name = `Phantom ${shortAddress}`;

  return {
    id: `phantom:${address}`,
    name,
    email: address,
    workspace: `${address.slice(0, 8)}-workspace`,
    avatar: "◎",
  };
}

export function signOut(): void {
  clearUser();
}
