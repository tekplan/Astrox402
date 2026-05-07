import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { PrivyProvider } from "@privy-io/react-auth";
import { getRouter } from "./router";
import { AUTH_ENABLED, PRIVY_APP_ID } from "./lib/runtime";
import "./styles.css";

const router = getRouter();

function App() {
  const content = <RouterProvider router={router} />;

  if (!AUTH_ENABLED) {
    return content;
  }

  return (
    <PrivyProvider
      appId={PRIVY_APP_ID}
      config={{
        loginMethods: ["email", "google", "github", "wallet"],
        embeddedWallets: {
          solana: { createOnLogin: "users-without-wallets" },
        },
        appearance: {
          theme: "dark",
          accentColor: "#22d3ee",
          showWalletLoginFirst: false,
          walletList: ["phantom", "solflare", "backpack"],
        },
      }}
    >
      {content}
    </PrivyProvider>
  );
}

const rootElement = document.getElementById("root")!;
createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
