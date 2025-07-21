import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Menu } from "lucide-react";

export default function NavBar() {
  return (
   <header className="flex h-20 w-full items-center justify-between px-6 bg-[var(--navbar-bg)] text-[var(--navbar-text)] shadow-md">
  <Sheet>
    <SheetTrigger asChild>
      <Button variant="ghost" size="icon" className="lg:hidden text-[var(--navbar-text)] hover:bg-[var(--navbar-hover)]">
        <Menu className="h-6 w-6" />
      </Button>
    </SheetTrigger>
    <SheetContent side="left" className="bg-[var(--navbar-bg)] text-[var(--navbar-text)]">
      <div className="grid gap-4 mt-6">
        {["Home", "About", "Services", "Contact"].map((item) => (
          <Link
            key={item}
            href={`/${item.toLowerCase()}`}
            className="text-lg font-semibold hover:text-[var(--navbar-hover)] transition-colors"
          >
            {item}
          </Link>
        ))}
      </div>
    </SheetContent>
  </Sheet>

  <div className="text-xl font-bold tracking-tight">ExpenseTracker</div>

  <nav className="hidden lg:flex gap-6">
    {["Home", "About", "Services", "Contact"].map((item) => (
      <Link
        key={item}
        href={`/${item.toLowerCase()}`}
        className="text-sm font-medium px-3 py-2 rounded-md hover:bg-[var(--navbar-hover)] transition-colors"
      >
        {item}
      </Link>
    ))}
  </nav>
</header>

  );
}
