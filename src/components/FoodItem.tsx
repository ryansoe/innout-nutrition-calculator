import React from "react";
import type { FoodItem as PresetFoodItem } from "../presets/data";

export type FoodItemProps = {
  item: PresetFoodItem;
  onAdd?: (item: PresetFoodItem) => void;
  count?: number;
};

function FoodItem({ item, onAdd, count = 0 }: FoodItemProps) {
  return (
    <tr className="transition-colors hover:bg-white/5">
      <td className="px-4 py-3">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="h-10 w-10 rounded object-contain"
          />
        ) : null}
      </td>
      <td className="px-4 py-3 text-left font-bold text-white">{item.name}</td>
      <td className="px-4 py-3 text-right tabular-nums text-zinc-400">
        {item.servingSizeg}
      </td>
      <td className="px-4 py-3 text-right tabular-nums font-semibold text-zinc-100">
        {item.calories}
      </td>
      <td className="px-4 py-3 text-right tabular-nums text-zinc-300">
        {item.proteing}
      </td>
      <td className="px-4 py-3 text-right tabular-nums text-zinc-300">
        {item.totalCarbg}
      </td>
      <td className="px-4 py-3 text-right tabular-nums text-zinc-300">
        {item.totalFatg}
      </td>
      <td className="px-4 py-3 text-right tabular-nums text-zinc-300">
        {item.sugarsg}
      </td>
      <td className="px-4 py-3 text-right">
        <button
          type="button"
          onClick={() => onAdd?.(item)}
          className="inline-flex h-8 items-center justify-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-3 text-sm font-semibold text-zinc-300 transition-colors hover:border-brand-red hover:bg-brand-red hover:text-white"
          aria-label={`Add ${item.name}`}
        >
          <span>+</span>
          {count > 0 && (
            <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-white/20 px-1 text-xs font-bold tabular-nums">
              {count}
            </span>
          )}
        </button>
      </td>
    </tr>
  );
}

export default FoodItem;
