import React from "react";

const PORTFOLIO_URL = "https://ryansoe.vercel.app/";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-zinc-950">
      <div className="mx-auto max-w-5xl px-4 py-6 text-center text-xs text-zinc-600">
        Built by{" "}
        <a
          href={PORTFOLIO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-400 underline decoration-zinc-700 underline-offset-2 transition-colors hover:text-white hover:decoration-white"
        >
          Ryan Soe
        </a>
        {" · "}
        Unofficial tool. Nutrition data from{" "}
        <a
          href="https://www.in-n-out.com/menu/nutrition-info"
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-400 underline decoration-zinc-700 underline-offset-2 transition-colors hover:text-white hover:decoration-white"
        >
          In-N-Out
        </a>
        .
      </div>
    </footer>
  );
}
