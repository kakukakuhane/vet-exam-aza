export function MarkdownRenderer({ content }: { content: string }) {
  const lines = content.split("\n");

  return (
    <div className="prose-lite">
      {lines.map((line, index) => {
        if (!line.trim()) return <div key={index} className="h-3" />;
        if (line.startsWith("## ")) {
          return <h2 key={index}>{line.replace("## ", "")}</h2>;
        }
        if (line.startsWith("### ")) {
          return <h3 key={index}>{line.replace("### ", "")}</h3>;
        }
        if (line.startsWith("- ")) {
          return (
            <p key={index} className="rounded-lg bg-mint/45 px-3 py-2 text-sm font-semibold">
              {line.replace("- ", "")}
            </p>
          );
        }
        return (
          <p key={index} className="text-base leading-8 text-ink">
            {line}
          </p>
        );
      })}
    </div>
  );
}
