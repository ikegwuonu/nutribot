import Link from "next/link";
import { Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/theme-toggle";

interface NavbarProps {
  showFullNav?: boolean;
}

export default function Navbar({ showFullNav = true }: NavbarProps) {
  return (
    <header className="border-b border-border/40 dark:bg-black bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Utensils className="h-6 w-6 text-green-600" />
          <span className="text-xl font-bold dark:text-white">NutriBot</span>
        </Link>

        {showFullNav && (
          <>
            <nav className="hidden md:flex gap-6">
              <Link
                href="/"
                className="text-sm font-medium hover:text-green-600 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/plan"
                className="text-sm font-medium hover:text-green-600 transition-colors"
              >
                Plan
              </Link>
              <Link
                href="#how-it-works"
                className="text-sm font-medium hover:text-green-600 transition-colors"
              >
                Recipes
              </Link>
              <Link
                href="/#calculator"
                className="text-sm font-medium hover:text-green-600 transition-colors"
              >
                Calculator
              </Link>
            </nav>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Button
                variant={"outline"}
                className="bg-green-600 hover:bg-green-700"
              >
                Get Started
              </Button>
            </div>
          </>
        )}

        {!showFullNav && <ThemeToggle />}
      </div>
    </header>
  );
}
