"use client";

import { Label } from "@/components/ui/label";
import { FC, useEffect, useState } from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { useTheme } from "next-themes";
import { Moon, Paintbrush, Sun } from "lucide-react";

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return;
  }

  return (
    <div className="flex select-none items-center justify-between gap-1.5 px-2 py-1.5 text-sm transition-colors">
      <Label className="flex gap-x-1.5" htmlFor="theme-mode">
        <Paintbrush className="size-4" />
        Theme
      </Label>
      <Switch
        id="theme-mode"
        checked={theme === "dark"}
        onCheckedChange={(checked: boolean) =>
          setTheme(checked ? "dark" : "light")
        }
      />
    </div>
  );
};

const Switch: FC<
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
> = (props) => (
  <SwitchPrimitives.Root
    className="peer relative inline-flex h-5 w-10 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input"
    {...props}
  >
    <Moon className="pointer-events-none absolute left-[1px] size-3.5 text-background data-[state=unchecked]:hidden" />
    <SwitchPrimitives.Thumb className="pointer-events-none z-10 block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-[1.5px]" />
    <Sun className="pointer-events-none absolute right-[1px] size-3.5 text-foreground data-[state=checked]:hidden" />
  </SwitchPrimitives.Root>
);

export default ThemeSwitch;
