"use client";
import FoodList from "@/components/FoodList";
import NutritionSummary, {
  type SelectedItem,
} from "@/components/NutritionSummary";
import React from "react";
import type { FoodItem as PresetFoodItem } from "@/presets/data";

export default function Home() {
  const [selectedMap, setSelectedMap] = React.useState<
    Map<string, { item: PresetFoodItem; count: number }>
  >(new Map());

  const items: SelectedItem[] = React.useMemo(() => {
    return Array.from(selectedMap.values());
  }, [selectedMap]);

  const increase = (item: PresetFoodItem) => {
    setSelectedMap((prev) => {
      const next = new Map(prev);
      const current = next.get(item.name) ?? { item, count: 0 };
      next.set(item.name, { item, count: current.count + 1 });
      return next;
    });
  };

  const decrease = (item: PresetFoodItem) => {
    setSelectedMap((prev) => {
      const next = new Map(prev);
      const current = next.get(item.name);
      if (!current) return next;
      const newCount = current.count - 1;
      if (newCount <= 0) {
        next.delete(item.name);
      } else {
        next.set(item.name, { item, count: newCount });
      }
      return next;
    });
  };

  const reset = () => setSelectedMap(new Map());

  return (
    <div className="container mx-auto px-4">
      <section className="relative py-16 sm:py-20 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4 text-red-600">
            In-N-Out Nutrition Calculator
          </h1>
          <p className="text-base sm:text-lg text-gray-600">
            Quickly explore In-N-Out menu nutrition. Add items to your tray to
            see live totals for calories, macros, sodium and more. Use the
            summary at the bottom to adjust quantities or reset.
          </p>
        </div>
      </section>

      <h2 className="text-2xl font-bold mb-4">Main Dishes</h2>
      <FoodList onAdd={increase} />
      <NutritionSummary
        items={items}
        onIncrease={increase}
        onDecrease={decrease}
        onReset={reset}
      />

      <p className="text-sm text-gray-500 mt-4">
        All information can be found in the{" "}
        <a
          href="https://www.in-n-out.com/menu/nutrition-info"
          target="_blank"
          rel="noopener noreferrer"
          className="text-red-600 hover:underline"
        >
          In-N-Out Nutrition Information
        </a>
        .
      </p>
    </div>
  );
}
