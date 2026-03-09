export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200/70 bg-white/70 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-8 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:text-sm lg:px-8">
        <p>(c) {new Date().getFullYear()} BPMN.GEN. All rights reserved.</p>
        <div className="flex items-center gap-2 sm:gap-3">
          <a href="#features" className="rounded-md px-2 py-1 transition hover:bg-zinc-100/80 hover:text-zinc-900">
            Product
          </a>
          <a href="#pricing" className="rounded-md px-2 py-1 transition hover:bg-zinc-100/80 hover:text-zinc-900">
            Pricing
          </a>
          <a href="#faq" className="rounded-md px-2 py-1 transition hover:bg-zinc-100/80 hover:text-zinc-900">
            FAQ
          </a>
        </div>
      </div>
    </footer>
  );
}
