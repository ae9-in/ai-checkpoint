import { Link } from "@tanstack/react-router";
import { ChevronRight, Home } from "lucide-react";

type BreadcrumbItem = {
  label: string;
  to?: string;
  hash?: string;
};

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="flex items-center gap-2 py-4 px-6 max-w-7xl mx-auto w-full text-xs sm:text-sm text-soft/50 font-medium">
      <Link to="/" className="hover:text-white transition-colors flex items-center gap-1">
        <Home size={14} />
        <span>Home</span>
      </Link>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <div key={item.label} className="flex items-center gap-2">
            <ChevronRight size={14} className="text-soft/30" />
            {isLast || !item.to ? (
              <span className="text-cyan font-semibold">{item.label}</span>
            ) : (
              <Link to={item.to} hash={item.hash} className="hover:text-white transition-colors">
                {item.label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
