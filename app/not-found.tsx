import Link from "next/link";

export default function NotFound() {
  return (
    <main className="nf">
      <div className="wrap">
        <p className="nf-code">404</p>
        <h1>Arre, yeh page nahi mila.</h1>
        <p className="lead">The page you were looking for isn&apos;t here. The nimbu-paani is, though.</p>
        <Link href="/" className="btn btn-primary">Back to Taazu</Link>
      </div>
    </main>
  );
}
