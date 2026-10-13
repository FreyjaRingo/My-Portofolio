import Link from "next/link";

export default function NotFound() {
  return (
    <section className="case notfound" aria-labelledby="nf-title">
      <p className="case-kicker mono">
        <span className="case-code">404</span>
        Security not found
      </p>
      <h1 id="nf-title" className="case-title">
        This page does not exist.
      </h1>
      <p className="case-tagline">The link may be old. Go back to the overview, or press / to search the site.</p>
      <div className="hero-actions">
        <Link href="/" className="btn btn-primary">
          Back to overview
        </Link>
      </div>
    </section>
  );
}
