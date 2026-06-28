import type { ReactNode } from "react";

export const metadata = {
  title: "Genie · Admin",
  description: "Model routing and run history for Genie.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
          maxWidth: 880,
          margin: "0 auto",
          padding: "2rem 1rem",
          color: "#111",
        }}
      >
        <h1 style={{ marginBottom: 4 }}>🧞 Genie Admin</h1>
        <p style={{ marginTop: 0, color: "#777", fontSize: 14 }}>
          Configure model routing and review recent demo runs.
        </p>
        {children}
      </body>
    </html>
  );
}
