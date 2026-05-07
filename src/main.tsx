import { Component, StrictMode, type ErrorInfo, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { PrivyProvider } from "@privy-io/react-auth";
import { AppRuntimeErrorState } from "./components/system/AppRuntimeErrorState";
import { getRouter } from "./router";
import { AUTH_ENABLED, PRIVY_APP_ID } from "./lib/runtime";
import "./styles.css";

const router = getRouter();

function toError(value: unknown) {
  if (value instanceof Error) {
    return value;
  }

  if (typeof value === "string") {
    return new Error(value);
  }

  return new Error("Unexpected runtime error");
}

class AppErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Application render failed", error, info);
  }

  componentDidMount() {
    window.addEventListener("error", this.handleWindowError);
    window.addEventListener("unhandledrejection", this.handleUnhandledRejection);
  }

  componentWillUnmount() {
    window.removeEventListener("error", this.handleWindowError);
    window.removeEventListener("unhandledrejection", this.handleUnhandledRejection);
  }

  handleWindowError = (event: ErrorEvent) => {
    this.setState({ error: toError(event.error ?? event.message) });
  };

  handleUnhandledRejection = (event: PromiseRejectionEvent) => {
    this.setState({ error: toError(event.reason) });
  };

  render() {
    if (this.state.error) {
      return <AppRuntimeErrorState error={this.state.error} />;
    }

    return this.props.children;
  }
}

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
    <AppErrorBoundary>
      <App />
    </AppErrorBoundary>
  </StrictMode>
);
