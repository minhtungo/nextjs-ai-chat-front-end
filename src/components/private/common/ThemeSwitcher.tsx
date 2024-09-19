"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { LaptopMinimal, MoonStar, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
interface ThemeSwitcherProps {}

const THEME_OPTIONS = [
  {
    value: "system",
    icon: <LaptopMinimal className="size-3.5" />,
  },
  {
    value: "light",
    icon: <Sun className="size-3.5" />,
  },
  {
    value: "dark",
    icon: <MoonStar className="size-3.5" />,
  },
];

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Skeleton className="h-[30px] w-[90px] rounded-full" />;
  }

  return (
    <ToggleGroup
      value={theme}
      onValueChange={setTheme}
      type="single"
      className="rounded-full border"
    >
      {THEME_OPTIONS.map(({ value, icon }) => (
        <ToggleGroupItem
          key={`theme-switcher-${value}`}
          value={value}
          aria-label="system"
          size="sm"
          className="rounded-full"
        >
          {icon}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};

export default ThemeSwitcher;
