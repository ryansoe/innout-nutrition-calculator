import React from "react";
import type { FoodItem as PresetFoodItem } from "../presets/data";

export type SelectedItem = {
  item: PresetFoodItem;
  count: number;
};

export type NutritionSummaryProps = {
  items: SelectedItem[];
  onIncrease?: (item: PresetFoodItem) => void;
  onDecrease?: (item: PresetFoodItem) => void;
  onReset?: () => void;
};

function formatWithUnit(value: number, unit?: string) {
  return unit ? `${value}${unit}` : `${value}`;
}

function computeTotals(items: SelectedItem[]) {
  return items.reduce(
    (acc, { item, count }) => {
      acc.servingSizeg += item.servingSizeg * count;
      acc.calories += item.calories * count;
      acc.proteing += item.proteing * count;
      acc.totalCarbg += item.totalCarbg * count;
      acc.totalFatg += item.totalFatg * count;
      acc.sugarsg += item.sugarsg * count;
      acc.sodiummg += item.sodiummg * count;
      acc.cholesterolmg += item.cholesterolmg * count;
      acc.count += count;
      return acc;
    },
    {
      servingSizeg: 0,
      calories: 0,
      proteing: 0,
      totalCarbg: 0,
      totalFatg: 0,
      sugarsg: 0,
      sodiummg: 0,
      cholesterolmg: 0,
      count: 0,
    }
  );
}

export default function NutritionSummary({
  items,
  onIncrease,
  onDecrease,
  onReset,
}: NutritionSummaryProps) {
  const [expanded, setExpanded] = React.useState(false);
  const totals = computeTotals(items);

  if (items.length === 0) return null;

  return (
    <section className="fixed inset-x-0 bottom-0 z-50">
      <div className="container mx-auto px-4 pb-3">
        {/*
          FROSTED GLASS PANEL
          - glass-panel provides backdrop-blur + semi-dark bg + borders
          - NO overflow-hidden here — it clips backdrop-filter in Chrome/Safari
          - Only the inner scrollable div uses overflow-auto
        */}
        <div
          className="glass-panel flex flex-col rounded-2xl shadow-2xl shadow-black/60"
        >
          {/* ── HEADER ── */}
          <div className="flex shrink-0 items-center justify-between px-5 py-4">
            {/* Left: title + totals summary */}
            <div>
              <h2 className="font-lusitana text-base font-bold text-white sm:text-lg">
                Nutrition Summary
              </h2>
              <p className="text-xs text-zinc-400">
                {totals.count} item{totals.count !== 1 ? "s" : ""}
                {" · "}
                <span className="font-semibold text-brand-red">
                  {totals.calories} kcal
                </span>
              </p>
            </div>

            {/* Right: macro mini-stats + controls */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Macro breakdown — hidden on very small screens */}
              <div className="hidden items-center gap-2 sm:flex">
                <div className="text-center">
                  <div className="text-xs font-bold tabular-nums text-blue-300">
                    {formatWithUnit(totals.proteing, "g")}
                  </div>
                  <div className="text-[10px] text-zinc-500">Protein</div>
                </div>
                <div className="h-6 w-px bg-white/10" />
                <div className="text-center">
                  <div className="text-xs font-bold tabular-nums text-amber-300">
                    {formatWithUnit(totals.totalCarbg, "g")}
                  </div>
                  <div className="text-[10px] text-zinc-500">Carbs</div>
                </div>
                <div className="h-6 w-px bg-white/10" />
                <div className="text-center">
                  <div className="text-xs font-bold tabular-nums text-red-300">
                    {formatWithUnit(totals.totalFatg, "g")}
                  </div>
                  <div className="text-[10px] text-zinc-500">Fat</div>
                </div>
              </div>

              {/* Divider */}
              <div className="hidden h-8 w-px bg-white/10 sm:block" />

              {/* Reset button */}
              <button
                type="button"
                onClick={onReset}
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
              >
                Reset
              </button>

              {/* Expand / collapse toggle */}
              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
                aria-label={expanded ? "Collapse" : "Expand"}
                onClick={() => setExpanded((v) => !v)}
              >
                <span
                  className="text-base leading-none transition-transform duration-300"
                  style={{
                    display: "inline-block",
                    transform: expanded ? "rotate(0deg)" : "rotate(180deg)",
                  }}
                >
                  ⌄
                </span>
              </button>
            </div>
          </div>

          {/* ── ANIMATED TABLE ── CSS grid-rows trick for smooth height transition */}
          <div
            className={`grid min-h-0 transition-[grid-template-rows] duration-300 ease-in-out ${
              expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
          >
            <div className="min-h-0 overflow-hidden">
            <div
              className="overflow-x-auto overflow-y-auto border-t border-white/10"
              style={{ WebkitOverflowScrolling: "touch", maxHeight: "calc(50vh - 80px)" }}
            >
              <table className="min-w-full text-sm">
                <thead
                  className="sticky top-0 z-10 border-b border-white/10"
                  style={{
                    background: "rgba(10, 4, 4, 0.85)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                  }}
                >
                  <tr className="text-left text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                    <th className="px-4 py-2.5">Dish</th>
                    <th className="px-3 py-2.5 text-center">Size</th>
                    <th className="px-3 py-2.5 text-center">Cal</th>
                    <th className="px-3 py-2.5 text-center text-blue-400">
                      Protein
                    </th>
                    <th className="px-3 py-2.5 text-center text-amber-400">
                      Carbs
                    </th>
                    <th className="px-3 py-2.5 text-center text-red-400">
                      Fat
                    </th>
                    <th className="px-3 py-2.5 text-center">Sugars</th>
                    <th className="px-3 py-2.5 text-center">Sodium</th>
                    <th className="px-3 py-2.5 text-center">Cholest.</th>
                    <th className="px-3 py-2.5 text-center">Qty</th>
                  </tr>
                </thead>

                <tbody>
                  {items.map(({ item, count }) => (
                    <tr
                      key={item.name}
                      className="border-b border-white/5 transition-colors hover:bg-white/5"
                    >
                      <td className="px-4 py-3 font-medium text-zinc-200">
                        {item.name}
                      </td>
                      <td className="px-3 py-3 text-center tabular-nums text-zinc-400">
                        {item.servingSizeg > 0
                          ? `${item.servingSizeg}g`
                          : "—"}
                      </td>
                      <td className="px-3 py-3 text-center tabular-nums font-semibold text-white">
                        {item.calories}
                      </td>
                      <td className="px-3 py-3 text-center tabular-nums text-blue-300">
                        {item.proteing}g
                      </td>
                      <td className="px-3 py-3 text-center tabular-nums text-amber-300">
                        {item.totalCarbg}g
                      </td>
                      <td className="px-3 py-3 text-center tabular-nums text-red-300">
                        {item.totalFatg}g
                      </td>
                      <td className="px-3 py-3 text-center tabular-nums text-zinc-400">
                        {item.sugarsg}g
                      </td>
                      <td className="px-3 py-3 text-center tabular-nums text-zinc-400">
                        {item.sodiummg}mg
                      </td>
                      <td className="px-3 py-3 text-center tabular-nums text-zinc-400">
                        {item.cholesterolmg}mg
                      </td>
                      <td className="px-3 py-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            type="button"
                            className="flex h-7 w-7 items-center justify-center rounded-md border border-white/10 bg-white/5 text-zinc-300 transition-colors hover:border-brand-red hover:bg-brand-red hover:text-white"
                            onClick={() => onDecrease?.(item)}
                            aria-label={`Decrease ${item.name}`}
                          >
                            −
                          </button>
                          <span className="w-5 text-center text-sm font-bold tabular-nums text-white">
                            {count}
                          </span>
                          <button
                            type="button"
                            className="flex h-7 w-7 items-center justify-center rounded-md border border-white/10 bg-white/5 text-zinc-300 transition-colors hover:border-brand-red hover:bg-brand-red hover:text-white"
                            onClick={() => onIncrease?.(item)}
                            aria-label={`Increase ${item.name}`}
                          >
                            +
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>

                <tfoot
                  className="sticky bottom-0 z-10 border-t border-white/20"
                  style={{
                    background: "rgba(10, 4, 4, 0.9)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                  }}
                >
                  <tr className="font-bold">
                    <td className="px-4 py-3 text-xs uppercase tracking-wider text-zinc-400">
                      Total ({totals.count})
                    </td>
                    <td className="px-3 py-3 text-center tabular-nums text-zinc-400">
                      {totals.servingSizeg > 0
                        ? `${totals.servingSizeg}g`
                        : "—"}
                    </td>
                    <td className="px-3 py-3 text-center tabular-nums text-base text-brand-red">
                      {totals.calories}
                    </td>
                    <td className="px-3 py-3 text-center tabular-nums text-blue-300">
                      {totals.proteing}g
                    </td>
                    <td className="px-3 py-3 text-center tabular-nums text-amber-300">
                      {totals.totalCarbg}g
                    </td>
                    <td className="px-3 py-3 text-center tabular-nums text-red-300">
                      {totals.totalFatg}g
                    </td>
                    <td className="px-3 py-3 text-center tabular-nums text-zinc-400">
                      {totals.sugarsg}g
                    </td>
                    <td className="px-3 py-3 text-center tabular-nums text-zinc-400">
                      {totals.sodiummg}mg
                    </td>
                    <td className="px-3 py-3 text-center tabular-nums text-zinc-400">
                      {totals.cholesterolmg}mg
                    </td>
                    <td className="px-3 py-3" />
                  </tr>
                </tfoot>
              </table>
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
