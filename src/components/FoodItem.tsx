import React from "react";
import type { FoodItem as PresetFoodItem } from "../presets/data";

export type FoodItemProps = {
  item: PresetFoodItem;
  onAdd?: (item: PresetFoodItem) => void;
};

function FoodItem({ item, onAdd }: FoodItemProps) {
  return (
    <tr className="border-b border-gray-200 last:border-0">
      <td className="px-4 py-3">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="h-10 w-10 rounded object-contain"
          />
        ) : null}
      </td>
      <td className="px-4 py-3 text-left font-bold">{item.name}</td>
      <td className="px-4 py-3 text-right tabular-nums text-gray-700">
        {item.servingSizeg}
      </td>
      <td className="px-4 py-3 text-right tabular-nums font-semibold">
        {item.calories}
      </td>
      <td className="px-4 py-3 text-right tabular-nums">{item.proteing}</td>
      <td className="px-4 py-3 text-right tabular-nums">{item.totalCarbg}</td>
      <td className="px-4 py-3 text-right tabular-nums">{item.totalFatg}</td>
      <td className="px-4 py-3 text-right tabular-nums">{item.sugarsg}</td>
      <td className="px-4 py-3 text-right">
        <button
          type="button"
          onClick={() => onAdd?.(item)}
          className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
          aria-label={`Add ${item.name}`}
        >
          +
        </button>
      </td>
    </tr>
  );
}

export default FoodItem;
