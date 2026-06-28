"use client";

import { useState } from "react";

/**
 * A collapsible explainer for the model-routing section. Client-side so the
 * expand/collapse is instant — a small, self-contained interaction.
 */
export function HelpPanel() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ margin: "4px 0 20px" }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        style={{
          padding: "6px 12px",
          border: "1px solid #ccc",
          borderRadius: 6,
          background: open ? "#eef2ff" : "#fff",
          cursor: "pointer",
          fontSize: 14,
        }}
      >
        {open ? "▲ Hide help" : "▾ How does routing work?"}
      </button>

      {open && (
        <div
          style={{
            marginTop: 10,
            padding: "12px 16px",
            background: "#f6f8fa",
            border: "1px solid #e1e4e8",
            borderRadius: 8,
            fontSize: 14,
            lineHeight: 1.5,
            color: "#333",
          }}
        >
          <p style={{ margin: "0 0 8px" }}>
            Each task is handled by a <strong>provider:model</strong> pair. Genie defaults to
            the cheapest capable model per task:
          </p>
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            <li>
              <code>triage</code> — a small, fast model decides whether a PR is demoable.
            </li>
            <li>
              <code>script_gen</code> — a stronger model writes the Playwright script.
            </li>
            <li>
              <code>summarize</code> / <code>heal</code> — supporting steps.
            </li>
          </ul>
          <p style={{ margin: "8px 0 0", color: "#666" }}>
            Overrides saved here win over the environment defaults.
          </p>
        </div>
      )}
    </div>
  );
}
