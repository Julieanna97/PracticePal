import Link from "next/link";

export default function CaseStudyTopNav() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between bg-[#1a0808] px-6 py-[22px] md:px-12">
      <Link
        href="/"
        className="font-black uppercase tracking-[0.12em] text-[#f5a0c8] transition hover:opacity-70"
        style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1.15rem" }}
      >
        Julie Anne Cantillep
      </Link>

      <div className="flex items-center gap-11">
        <Link
          href="/"
          className="relative pb-0.5 font-black uppercase tracking-[0.12em] text-[#f5a0c8] transition hover:opacity-85 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-[#f5a0c8] after:transition-transform after:duration-300 hover:after:scale-x-100"
          style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1.15rem" }}
        >
          Portfolio
        </Link>
        <Link
          href="https://github.com/Julieanna97"
          target="_blank"
          rel="noopener noreferrer"
          className="relative pb-0.5 font-black uppercase tracking-[0.12em] text-[#f5a0c8] transition hover:opacity-85 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-[#f5a0c8] after:transition-transform after:duration-300 hover:after:scale-x-100"
          style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1.15rem" }}
        >
          GitHub
        </Link>
        <Link
          href="/#contact"
          className="relative pb-0.5 font-black uppercase tracking-[0.12em] text-[#f5a0c8] transition hover:opacity-85 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-[#f5a0c8] after:transition-transform after:duration-300 hover:after:scale-x-100"
          style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1.15rem" }}
        >
          Contact
        </Link>
      </div>
    </nav>
  );
}