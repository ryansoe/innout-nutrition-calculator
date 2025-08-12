import React from "react";
import { foods, type FoodItem as PresetFoodItem } from "../presets/data";
import FoodItem from "./FoodItem";

export type FoodListProps = {
  onAdd?: (item: PresetFoodItem) => void;
};

function FoodList({ onAdd }: FoodListProps) {
  const [items] = React.useState<PresetFoodItem[]>(foods);

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider text-gray-600">
              IMAGE
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider text-gray-600">
              DISH
            </th>
            <th className="px-4 py-3 text-right text-xs font-semibold tracking-wider text-gray-600">
              SIZE (g)
            </th>
            <th className="px-4 py-3 text-right text-xs font-semibold tracking-wider text-gray-600">
              CALORIES
            </th>
            <th className="px-4 py-3 text-right text-xs font-semibold tracking-wider text-gray-600">
              PROTEIN (g)
            </th>
            <th className="px-4 py-3 text-right text-xs font-semibold tracking-wider text-gray-600">
              CARBS (g)
            </th>
            <th className="px-4 py-3 text-right text-xs font-semibold tracking-wider text-gray-600">
              FAT (g)
            </th>
            <th className="px-4 py-3 text-right text-xs font-semibold tracking-wider text-gray-600">
              SUGARS (g)
            </th>
            <th className="px-4 py-3 text-right text-xs font-semibold tracking-wider text-gray-600">
              ACTIONS
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {items.map((item) => (
            <FoodItem key={item.name} item={item} onAdd={onAdd} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FoodList;
