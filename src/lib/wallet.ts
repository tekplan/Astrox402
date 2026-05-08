export interface PhantomProvider {
  isPhantom?: boolean;
  publicKey?: { toString(): string } | null;
  connect: (options?: {
    onlyIfTrusted?: boolean;
  }) => Promise<{ publicKey: { toString(): string } }>;
  disconnect?: () => Promise<void>;
}

declare global {
  interface Window {
    solana?: PhantomProvider;
  }
}

export function getPhantomProvider(): PhantomProvider | null {
  if (typeof window === "undefined") return null;
  const provider = window.solana;
  return provider?.isPhantom ? provider : null;
}

export async function connectPhantom(): Promise<string> {
  const provider = getPhantomProvider();
  if (!provider) {
    throw new Error("Phantom wallet is not installed");
  }

  const response = await provider.connect();
  const address = response.publicKey?.toString();

  if (!address) {
    throw new Error("Phantom did not return a wallet address");
  }

  return address;
}

export async function disconnectPhantom(): Promise<void> {
  const provider = getPhantomProvider();
  await provider?.disconnect?.();
}

export function getConnectedPhantomAddress(): string | null {
  const provider = getPhantomProvider();
  return provider?.publicKey?.toString() ?? null;
}
