export function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm leading-7 text-muted sm:px-6">
        <p className="font-bold text-ink">Vet Exam Notes</p>
        <p className="mt-1">
          獣医学生の国試対策を支えるためのオリジナル学習サイトです。掲載データはダミーで、実運用時は
          Supabaseから配信します。
        </p>
      </div>
    </footer>
  );
}
