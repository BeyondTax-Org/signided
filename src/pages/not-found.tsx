import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="flex min-h-[60vh] items-center justify-center px-6">
        <div className="text-center">
          <p
            className="mb-2 text-[60px] font-bold"
            style={{ color: "var(--am)", letterSpacing: "-0.04em" }}
          >
            404
          </p>
          <h1 className="mb-2 text-[20px] font-bold">Page not found</h1>
          <p className="mb-6 text-[14px]" style={{ color: "var(--tx2)" }}>
            The page you're looking for doesn't exist.
          </p>
          <a
            href="/"
            className="inline-flex rounded-[var(--r-md)] px-6 py-2.5 text-[14px] font-semibold transition-all hover:-translate-y-px"
            style={{ background: "var(--am)", color: "var(--am-cta-fg)" }}
          >
            Go home
          </a>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
