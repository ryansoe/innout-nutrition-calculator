import React from "react";
import { foods, type FoodItem as PresetFoodItem } from "../presets/data";
import FoodItem from "./FoodItem";

export type FoodListProps = {
  onAdd?: (item: PresetFoodItem) => void;
  countMap?: Map<string, number>;
};

function FoodList({ onAdd, countMap }: FoodListProps) {
  const [items] = React.useState<PresetFoodItem[]>(foods);

  return (
    <div className="overflow-x-auto rounded-xl border border-white/10">
      <table className="min-w-full divide-y divide-white/10">
        <thead className="bg-white/5">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider text-zinc-500">
              IMAGE
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider text-zinc-500">
              DISH
            </th>
            <th className="px-4 py-3 text-right text-xs font-semibold tracking-wider text-zinc-500">
              SIZE (g)
            </th>
            <th className="px-4 py-3 text-right text-xs font-semibold tracking-wider text-zinc-500">
              CALORIES
            </th>
            <th className="px-4 py-3 text-right text-xs font-semibold tracking-wider text-zinc-500">
              PROTEIN (g)
            </th>
            <th className="px-4 py-3 text-right text-xs font-semibold tracking-wider text-zinc-500">
              CARBS (g)
            </th>
            <th className="px-4 py-3 text-right text-xs font-semibold tracking-wider text-zinc-500">
              FAT (g)
            </th>
            <th className="px-4 py-3 text-right text-xs font-semibold tracking-wider text-zinc-500">
              SUGARS (g)
            </th>
            <th className="px-4 py-3 text-right text-xs font-semibold tracking-wider text-zinc-500">
              ACTIONS
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {items.map((item) => (
            <FoodItem
              key={item.name}
              item={item}
              onAdd={onAdd}
              count={countMap?.get(item.name) ?? 0}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FoodList;
