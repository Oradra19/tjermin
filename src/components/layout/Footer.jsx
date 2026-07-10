import Link from "next/link";
import { FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer id="footer" className="bg-[#10182B] py-10 text-slate-400">
      <Container>
        <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
          {/* Left */}
          <div>
            <Link
              href="/"
              className="text-xl font-bold tracking-tight text-white"
            >
              TJERMIN
            </Link>

            <p className="mt-2 text-sm text-slate-500">
              © 2026 AutoElite. All rights reserved.
            </p>
          </div>

          {/* Center */}
          <nav className="flex flex-wrap items-center gap-8 text-sm">
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>

            <a href="/#catalog" className="transition hover:text-white">
              Inventory
            </a>

            <a href="/#about" className="transition hover:text-white">
              Financing
            </a>

            <a href="#" className="transition hover:text-white">
              Blog
            </a>

            <a href="#footer" className="transition hover:text-white">
              Contact
            </a>
          </nav>

          {/* Right */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-700 transition hover:bg-slate-600"
            >
              <FaFacebookF className="text-white text-sm" />
            </a>

            <a
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-700 transition hover:bg-slate-600"
            >
              <FaTwitter className="text-white text-sm" />
            </a>

            <a
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-700 transition hover:bg-slate-600"
            >
              <FaYoutube className="text-white text-sm" />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
