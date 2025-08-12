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

  // Only show when there is at least one item
  if (items.length === 0) return null;

  return (
    <section className="fixed inset-x-0 bottom-0 z-50">
      <div className="container mx-auto px-4 pb-2">
        <div className="rounded-xl bg-red-600 text-white shadow-lg overflow-hidden flex flex-col max-h-[50vh]">
          <div className="flex items-center justify-between px-5 py-4">
            <h2 className="text-2xl font-bold">Nutrition Summary</h2>
            <button
              type="button"
              className="h-10 w-10 rounded-full bg-white/90 text-red-700 flex items-center justify-center shadow"
              aria-label={expanded ? "Collapse" : "Expand"}
              onClick={() => setExpanded((v) => !v)}
            >
              <span
                className={`transition-transform ${
                  expanded ? "rotate-180" : "rotate-0"
                }`}
              >
                ⌄
              </span>
            </button>
          </div>

          <div className="bg-red-600/90 flex-1 min-h-0">
            <div
              className="overflow-x-auto overflow-y-auto h-full max-h-[calc(50vh-72px)]"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              <table className="min-w-full">
                <thead className="sticky top-0 z-10 bg-red-600">
                  <tr className="text-left text-sm font-semibold">
                    <th className="px-3 py-3">DISH</th>
                    <th className="px-3 py-3 text-center">SIZE(g)</th>
                    <th className="px-3 py-3 text-center">CALORIES</th>
                    <th className="px-3 py-3 text-center">PROTEIN(g)</th>
                    <th className="px-3 py-3 text-center">CARBS(g)</th>
                    <th className="px-3 py-3 text-center">FAT(g)</th>
                    <th className="px-3 py-3 text-center">SUGARS(g)</th>
                    <th className="px-3 py-3 text-center">SODIUM(mg)</th>
                    <th className="px-3 py-3 text-center">CHOLESTEROL(mg)</th>
                    <th className="px-3 py-3 text-center">ACTION</th>
                  </tr>
                </thead>

                {expanded && (
                  <tbody>
                    {items.map(({ item, count }) => (
                      <tr key={item.name} className="border-t border-white/30">
                        <td className="px-3 py-3 ">{item.name}</td>
                        <td className="px-3 py-3 text-center tabular-nums">
                          {item.servingSizeg} ({count})
                        </td>
                        <td className="px-3 py-3 text-center tabular-nums">
                          {item.calories} ({count})
                        </td>
                        <td className="px-3 py-3 text-center tabular-nums">
                          {item.proteing} ({count})
                        </td>
                        <td className="px-3 py-3 text-center tabular-nums">
                          {item.totalCarbg} ({count})
                        </td>
                        <td className="px-3 py-3 text-center tabular-nums">
                          {item.totalFatg} ({count})
                        </td>
                        <td className="px-3 py-3 text-center tabular-nums">
                          {item.sugarsg} ({count})
                        </td>
                        <td className="px-3 py-3 text-center tabular-nums">
                          {item.sodiummg} ({count})
                        </td>
                        <td className="px-3 py-3 text-center tabular-nums">
                          {item.cholesterolmg} ({count})
                        </td>
                        <td className="px-3 py-3 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              type="button"
                              className="h-10 w-10 rounded-md bg-white/90 text-red-700 font-bold shadow"
                              onClick={() => onDecrease?.(item)}
                              aria-label={`Decrease ${item.name}`}
                            >
                              -
                            </button>
                            <span className="w-6 text-center tabular-nums">
                              {count}
                            </span>
                            <button
                              type="button"
                              className="h-10 w-10 rounded-md bg-white/90 text-red-700 font-bold shadow"
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
                )}

                <tfoot className="sticky bottom-0 z-10 bg-red-600">
                  <tr className="border-t border-white/30 font-semibold">
                    <td className="px-3 py-4">TOTAL({totals.count})</td>
                    <td className="px-3 py-4 text-center tabular-nums">
                      {formatWithUnit(totals.servingSizeg, "g")}
                    </td>
                    <td className="px-3 py-4 text-center tabular-nums">
                      {formatWithUnit(totals.calories)}
                    </td>
                    <td className="px-3 py-4 text-center tabular-nums">
                      {formatWithUnit(totals.proteing, "g")}
                    </td>
                    <td className="px-3 py-4 text-center tabular-nums">
                      {formatWithUnit(totals.totalCarbg, "g")}
                    </td>
                    <td className="px-3 py-4 text-center tabular-nums">
                      {formatWithUnit(totals.totalFatg, "g")}
                    </td>
                    <td className="px-3 py-4 text-center tabular-nums">
                      {formatWithUnit(totals.sugarsg, "g")}
                    </td>
                    <td className="px-3 py-4 text-center tabular-nums">
                      {formatWithUnit(totals.sodiummg, "mg")}
                    </td>
                    <td className="px-3 py-4 text-center tabular-nums">
                      {formatWithUnit(totals.cholesterolmg, "mg")}
                    </td>
                    <td className="px-3 py-4 text-center">
                      <div className="flex items-center justify-end">
                        <button
                          type="button"
                          onClick={onReset}
                          className="rounded-xl bg-white/90 px-4 py-2 text-red-700 font-semibold shadow"
                        >
                          Reset
                        </button>
                      </div>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
