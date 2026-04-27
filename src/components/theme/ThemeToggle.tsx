"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const handleClick = () => {
    if (theme === "light") setTheme("dark");
    else setTheme("light");
  };


  return (
    <Button
      variant="icon"
      size="icon"
      onClick={handleClick}
      aria-label="Toggle theme"
      className="h-10 w-10 bg-linear-to-r from-black to-black dark:from-white dark:to-white hover:from-red-400 hover:to-primary dark:hover:from-red-400 dark:hover:to-primary transition duration-400 ease-in-out hover:scale-105 group"
    >
      <Sun className="h-5.5! w-5.5! rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-white" />
      <Moon className="h-5.5! w-5.5! absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-black group-hover:text-white" />
    </Button>
  );
}
