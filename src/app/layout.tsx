import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav>
          <Link href="/">Home</Link>
          <Link href="/webgl">WebGL Page</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
