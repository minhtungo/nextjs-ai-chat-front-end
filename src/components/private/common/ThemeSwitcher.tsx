"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { LaptopMinimal, MoonStar, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { FC } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
interface ThemeSwitcherProps {}

const THEME_OPTIONS = [
  {
    value: "system",
    icon: <LaptopMinimal className="size-4" />,
  },
  {
    value: "light",
    icon: <Sun className="size-4" />,
  },
  {
    value: "dark",
    icon: <MoonStar className="size-4" />,
  },
];

const ThemeSwitcher: FC<ThemeSwitcherProps> = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Skeleton className="!size-7 sm:!size-8" />;
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
          className="rounded-full text-muted-foreground hover:text-foreground"
        >
          {icon}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};

export default ThemeSwitcher;
