import React from "react";

const PORTFOLIO_URL = "https://ryansoe.vercel.app/";

export default function Footer() {
  return (
    <footer className="bg-red-600 text-white">
      <div className="mx-auto max-w-5xl px-4 py-8 text-center text-sm">
        Created by{" "}
        <a
          href={PORTFOLIO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium underline decoration-white/60 underline-offset-2 hover:decoration-white"
        >
          Ryan Soe
        </a>
      </div>
    </footer>
  );
}
