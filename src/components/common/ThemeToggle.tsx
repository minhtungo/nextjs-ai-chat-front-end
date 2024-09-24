"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { FC, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface ThemeToggleProps {
  className?: string;
  variant?: any;
}

const ThemeToggle: FC<ThemeToggleProps> = ({
  className,
  variant = "ghost",
}) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Skeleton className="!size-7 sm:!size-8" />;
  }

  return (
    <Button
      variant={variant}
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={cn(
        "!size-7 text-muted-foreground transition-all sm:!size-8 sm:text-foreground",
        className,
      )}
    >
      {theme === "dark" ? (
        <Moon className="absolute size-[18px] rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
      ) : (
        <Sun className="size-[18px] rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default ThemeToggle;
