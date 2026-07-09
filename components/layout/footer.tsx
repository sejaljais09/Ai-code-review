export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 text-center md:flex-row">
        <div>
          <h3 className="text-lg font-semibold">
            AI Code Review Assistant
          </h3>

          <p className="text-sm text-muted-foreground">
            Built with Next.js, TypeScript and AI.
          </p>
        </div>

        <p className="text-sm text-muted-foreground">
          © 2026 AI Code Review Assistant. All rights reserved.
        </p>
      </div>
    </footer>
  );
}