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

  const countMap = React.useMemo(() => {
    const map = new Map<string, number>();
    selectedMap.forEach((val, key) => map.set(key, val.count));
    return map;
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

  const totalItems = items.reduce((sum, i) => sum + i.count, 0);

  return (
    <div className="relative">
      {/* ── HERO ── */}
      <section className="hero-glow relative overflow-hidden px-4 py-20 sm:py-28 md:py-36">
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          {/* Eyebrow */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-zinc-400">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-red animate-pulse" />
            In-N-Out Nutrition Calculator
          </div>

          {/* Headline */}
          <h1 className="text-gradient-red mb-6 font-lusitana text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            Track Your Macros,
            <br />
            <span className="text-white">Animal-Style.</span>
          </h1>

          {/* Subheading */}
          <p className="mx-auto mb-10 max-w-xl text-base text-zinc-400 sm:text-lg">
            Build your In-N-Out order and see live calories, macros, sodium,
            and more. Adjust quantities in the tray at the bottom.
          </p>

        </div>
      </section>

      {/* ── MENU SECTION ── */}
      <section className="px-4 pb-40">
        <div className="mx-auto max-w-7xl">
          {/* Section header */}
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-brand-red">
                Full Menu
              </p>
              <h2 className="font-lusitana text-2xl font-bold text-white sm:text-3xl">
                Main Dishes &amp; Drinks
              </h2>
            </div>
            {totalItems > 0 && (
              <div className="rounded-full bg-brand-red px-3 py-1 text-sm font-bold text-white">
                {totalItems} item{totalItems !== 1 ? "s" : ""} in tray
              </div>
            )}
          </div>

          <FoodList onAdd={increase} countMap={countMap} />
        </div>
      </section>

      <NutritionSummary
        items={items}
        onIncrease={increase}
        onDecrease={decrease}
        onReset={reset}
      />
    </div>
  );
}
