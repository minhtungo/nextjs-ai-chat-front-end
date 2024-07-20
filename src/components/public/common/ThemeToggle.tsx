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
    return <Skeleton className={cn("h-10 w-10", className)} />;
  }

  return (
    <Button
      variant={variant}
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={cn(className)}
    >
      {theme === "dark" ? (
        <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      ) : (
        <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default ThemeToggle;
