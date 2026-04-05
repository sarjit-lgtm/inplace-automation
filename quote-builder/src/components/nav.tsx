"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Dashboard" },
  { href: "/quotes", label: "Quotes" },
  { href: "/catalog", label: "Catalog" },
  { href: "/suppliers", label: "Suppliers" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="bg-black text-white px-8 py-4">
      <div className="max-w-6xl mx-auto flex items-center gap-8">
        <Link href="/" className="text-xl font-bold tracking-tight">
          INPLACE STUDIO
        </Link>
        <div className="flex gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`hover:text-gray-300 ${
                pathname === link.href ? "text-white font-medium" : "text-gray-400"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
