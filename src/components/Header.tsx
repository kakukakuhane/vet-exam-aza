import Link from "next/link";
import { GraduationCap, Search } from "lucide-react";
import { AuthButton } from "./AuthButton";

const navItems = [
  { href: "/", label: "ホーム" },
  { href: "/practice", label: "演習作成" },
  { href: "/admin", label: "分析" },
  { href: "/lectures", label: "講義動画" }
];

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-line/80 bg-paper/92 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-2">
          <span className="on-dark grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink">
            <GraduationCap size={19} aria-hidden />
          </span>
          <span className="truncate text-base font-extrabold tracking-normal sm:text-lg">
            Vet Exam Notes
          </span>
        </Link>
        <nav className="hidden items-center gap-1 rounded-full border border-line bg-white px-1 py-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-1.5 text-sm font-semibold text-muted transition hover:bg-mint hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/#search"
            className="grid h-9 w-9 place-items-center rounded-full border border-line bg-white text-ink transition hover:border-ink"
            aria-label="検索へ移動"
          >
            <Search size={17} aria-hidden />
          </Link>
          <AuthButton />
        </div>
      </div>
    </header>
  );
}
