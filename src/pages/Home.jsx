import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import "./Home.css";
import bcLogo from "../assets/bc-dark-logo.png";
import nightBloom from "../assets/night-bloom.webp";
import laGuera from "../assets/la-guera.webp";
import pragma from "../assets/pragma.webp";
import bristolVideo from "../assets/bristol-hero.mp4";
import bristolPoster from "../assets/bristol-hero-poster.webp";

// --- Animation presets ----------------------------------------------------
const ease = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

// --- Featured projects data ----------------------------------------------
const projects = [
  {
    tag: "E-COMMERCE",
    title: "Night Bloom Apothecary",
    blurb:
      "Full custom skincare store with Stripe checkout, Supabase backend, and admin dashboard.",
    accent: "linear-gradient(135deg, #2a1a1f 0%, #4a2837 100%)",
    href: "https://nightbloomapothecary.com",
    image: nightBloom,
  },
  {
    tag: "SAAS · LIVE TOOL",
    title: "Pragma Options",
    blurb:
      "Real-time options trading platform with custom data visualization and live market feeds.",
    accent: "linear-gradient(135deg, #0f1f2c 0%, #1a3a52 100%)",
    href: "https://pragmaoptions.com",
    image: pragma,
    objectPosition: "top",
  },
  {
    tag: "RESTAURANT",
    title: "La Guera Cantina",
    blurb:
      "Full restaurant site with a custom catering system — online requests, Stripe deposits, and a dashboard the owner uses to manage bookings end-to-end.",
    accent: "linear-gradient(135deg, #1f1a0f 0%, #3d2f1a 100%)",
    href: "https://laguera-cantina-git-master-victors-projects-fe6bc915.vercel.app/",
    image: laGuera,
  },
];

const packages = [
  {
    name: "Starter",
    price: "$1,200 – $1,500",
    timeline: "1–2 weeks",
    blurb:
      "A clean, professional online presence. Perfect for restaurants and solo businesses ready to look the part.",
    features: [
      "4–5 page custom site",
      "Mobile responsive",
      "Basic SEO setup",
      "Contact form & Maps embed",
    ],
  },
  {
    name: "Standard",
    price: "$3,000 – $4,000",
    timeline: "2–3 weeks",
    blurb:
      "Polished design with analytics, blog, and SEO that actively brings in customers and builds your brand.",
    features: [
      "Everything in Starter",
      "Custom UI & animations",
      "Analytics & email integration",
      "Extended SEO + ADA basics",
    ],
    featured: true,
  },
  {
    name: "Premium",
    price: "$5,500 – $7,500",
    timeline: "3–6 weeks",
    blurb:
      "Full custom build with admin dashboard, product management, and Stripe checkout. Your complete digital storefront.",
    features: [
      "Everything in Standard",
      "Custom logo design",
      "Admin dashboard + database",
      "Stripe checkout + order management",
    ],
  },
];

const process = [
  { n: "01", title: "Discovery", body: "Free 30-minute call to understand your business and goals." },
  { n: "02", title: "Proposal", body: "Fixed-price scope, clear timeline, no surprises." },
  { n: "03", title: "Build", body: "Weekly check-ins. You see progress as it happens." },
  { n: "04", title: "Launch", body: "Site goes live. Optional retainer for ongoing care." },
];

// --- Components -----------------------------------------------------------

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header className={`bcd-nav ${scrolled ? "bcd-nav--scrolled" : ""}`}>
        <a href="#top" className="bcd-logo">
          <img src={bcLogo} alt="Bell City Digital" className="bcd-logo__mark" />
          <span className="bcd-logo__bell">BELL CITY</span>
          <span className="bcd-logo__digital">DIGITAL</span>
        </a>
        <nav className="bcd-nav__links">
          <a href="#work">Work</a>
          <a href="#services">Services</a>
          <a href="#process">Process</a>
          <a href="#about">About</a>
          <a href="#contact" className="bcd-nav__cta">
            Contact
          </a>
        </nav>
        <button
          className="bcd-nav__hamburger"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="bcd-mobile-menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
            {open ? (
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="3" y1="18" x2="21" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </header>
      <AnimatePresence>
        {open && (
          <motion.nav
            id="bcd-mobile-menu"
            className="bcd-nav__mobile-panel"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.25, ease } }}
            exit={{ opacity: 0, y: -12, transition: { duration: 0.2, ease } }}
          >
            <a href="#work" onClick={close}>Work</a>
            <a href="#services" onClick={close}>Services</a>
            <a href="#process" onClick={close}>Process</a>
            <a href="#about" onClick={close}>About</a>
            <a href="#contact" className="bcd-nav__cta" onClick={close}>Contact</a>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}

function Hero() {
  return (
    <section className="bcd-hero" id="top">
      <div
        className="bcd-hero__atmosphere"
        aria-hidden="true"
        style={{ "--bristol-poster": `url(${bristolPoster})` }}
      >
        <video
          className="bcd-hero__video"
          autoPlay
          muted
          loop
          playsInline
          poster={bristolPoster}
        >
          <source src={bristolVideo} type="video/mp4" />
        </video>
        <div className="bcd-hero__scrim" />
        <div className="bcd-hero__grain" />
      </div>

      <motion.div
        className="bcd-hero__content"
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        <motion.div className="bcd-eyebrow" variants={fadeUp}>
          A Connecticut Studio
        </motion.div>
        <motion.h1 className="bcd-hero__headline" variants={fadeUp}>
          Websites for businesses<br />
          that <span className="bcd-hero__headline-italic">deserve better ones.</span>
        </motion.h1>
        <motion.p className="bcd-hero__sub" variants={fadeUp}>
          Bell City Digital builds custom websites for restaurants, shops, and local businesses — proudly based in Connecticut.
        </motion.p>
        <motion.div className="bcd-hero__cta-row" variants={fadeUp}>
          <a href="#work" className="bcd-btn bcd-btn--primary">
            See our work <span>→</span>
          </a>
          <a href="#contact" className="bcd-btn bcd-btn--ghost">
            Start a project
          </a>
        </motion.div>
      </motion.div>

      <div className="bcd-trust">
        <span>BRISTOL, CT</span>
        <span className="bcd-trust__sep">/</span>
        <span>FIXED PRICING</span>
        <span className="bcd-trust__sep">/</span>
        <span>FAST TURNAROUND</span>
        <span className="bcd-trust__sep">/</span>
        <span>NO SURPRISES</span>
      </div>
    </section>
  );
}

function SectionHeader({ eyebrow, title, align = "left" }) {
  return (
    <motion.div
      className={`bcd-section-header bcd-section-header--${align}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={stagger}
    >
      <motion.div className="bcd-eyebrow" variants={fadeUp}>
        {eyebrow}
      </motion.div>
      <motion.h2 className="bcd-section-title" variants={fadeUp}>
        {title}
      </motion.h2>
    </motion.div>
  );
}

function Work() {
  const sectionRef = useRef(null);

  const handleMouseMove = (e) => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  const handleMouseEnter = () => {
    sectionRef.current?.classList.add("spotlight-active");
  };

  const handleMouseLeave = () => {
    sectionRef.current?.classList.remove("spotlight-active");
  };

  return (
    <section
      className="bcd-section bcd-work"
      id="work"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="bcd-section__head-row">
        <SectionHeader eyebrow="Featured Work" title="Recent projects" />
        <a href="#" className="bcd-section__link">
          View all <span>→</span>
        </a>
      </div>

      <motion.div
        className="bcd-work__grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
      >
        {projects.map((p, i) => (
          <motion.a
            key={p.title}
            href={p.href}
            target={p.href.startsWith("http") ? "_blank" : undefined}
            rel={p.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className={`bcd-project ${i === 2 ? "bcd-project--wide" : ""}`}
            variants={fadeUp}
            whileHover={{ y: -4}}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div
              className="bcd-project__visual"
              style={{ background: p.accent }}
            >
              {p.image && (
                <img
                  src={p.image}
                  alt={`${p.title} website`}
                  className="bcd-project__img"
                  style={p.objectPosition ? { objectPosition: p.objectPosition } : undefined}
                  loading="lazy"
                />
              )}
              <div className="bcd-project__visual-glow" />
            </div>
            <div className="bcd-project__body">
              <div className="bcd-project__tag">{p.tag}</div>
              <h3 className="bcd-project__title">{p.title}</h3>
              <p className="bcd-project__blurb">{p.blurb}</p>
              <div className="bcd-project__cta">View case study →</div>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
}

function Services() {
  return (
    <section className="bcd-section bcd-services" id="services">
      <SectionHeader eyebrow="What We Do" title="Three ways to work with us" />

      <motion.div
        className="bcd-services__grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
      >
        {packages.map((pkg) => (
          <motion.div
            key={pkg.name}
            className={`bcd-package ${pkg.featured ? "bcd-package--featured" : ""}`}
            variants={fadeUp}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.4, ease }}
          >
            {pkg.featured && (
              <div className="bcd-package__badge">MOST POPULAR</div>
            )}
            <div className="bcd-package__name">{pkg.name}</div>
            <div className="bcd-package__price">{pkg.price}</div>
            <div className="bcd-package__timeline">{pkg.timeline}</div>
            <p className="bcd-package__blurb">{pkg.blurb}</p>
            <ul className="bcd-package__features">
              {pkg.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <a href="#contact" className="bcd-package__cta">
              Get started →
            </a>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function Process() {
  return (
    <section className="bcd-section bcd-process" id="process">
      <SectionHeader
        eyebrow="How We Work"
        title="From first call to launch in weeks, not months."
      />

      <motion.div
        className="bcd-process__grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
      >
        {process.map((step) => (
          <motion.div key={step.n} className="bcd-step" variants={fadeUp}>
            <div className="bcd-step__num">{step.n}</div>
            <div className="bcd-step__title">{step.title}</div>
            <p className="bcd-step__body">{step.body}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function About() {
  return (
    <section className="bcd-section bcd-about" id="about">
      <motion.div
        className="bcd-about__grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
      >
        <div className="bcd-about__left">
          <motion.div className="bcd-eyebrow" variants={fadeUp}>
            The Studio
          </motion.div>
          <motion.h2 className="bcd-section-title" variants={fadeUp}>
            Small studio.<br />
            <span className="bcd-hero__headline-italic">Local roots.</span><br />
            <span className="bcd-hero__headline-italic">Built to last.</span>
          </motion.h2>
        </div>
        <motion.div className="bcd-about__right" variants={fadeUp}>
          <p>
            Bell City Digital is a two-person studio based in Bristol, Connecticut. We're small on purpose — fewer projects, more attention, work we're actually proud to put our name on.
          </p>
          <p>
            We listen first. We move with care. We deliver what we promise.
          </p>
          <p>
            Most of all, we treat small business owners as people, not invoices.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}

function Contact() {
  return (
    <section className="bcd-section bcd-contact" id="contact">
      <motion.div
        className="bcd-contact__inner"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
      >
        <motion.h2 className="bcd-contact__title" variants={fadeUp}>
          Ready to build<br />
          <span className="bcd-hero__headline-italic">something real?</span>
        </motion.h2>
        <motion.p className="bcd-contact__sub" variants={fadeUp}>
          Free 30-minute discovery call. No pressure, no pitch deck.
        </motion.p>
        <motion.div className="bcd-contact__cta-row" variants={fadeUp}>
          <a
            href="mailto:victor@bellcitydigital.com"
            className="bcd-btn bcd-btn--ghost bcd-btn--large"
          >
            Book a discovery call <span>→</span>
          </a>
          <a
            href="mailto:victor@bellcitydigital.com"
            className="bcd-contact__email"
          >
            victor@bellcitydigital.com
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bcd-footer">
      <div className="bcd-footer__inner">
        <div className="bcd-logo">
          <img src={bcLogo} alt="Bell City Digital" className="bcd-logo__mark" />
          <span className="bcd-logo__bell">BELL CITY</span>
          <span className="bcd-logo__digital">DIGITAL</span>
        </div>
        <div className="bcd-footer__copy">
          © {new Date().getFullYear()} Bell City Digital. Built in Bristol, CT.
        </div>
        <div className="bcd-footer__social">
          <a href="https://www.linkedin.com/in/dev-victor-nieves" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
            </svg>
          </a>
          <a href="https://www.instagram.com/bellcitydigital/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
          </a>
          <a href="https://www.tiktok.com/@bellcitydigital" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
            </svg>
          </a>
          <a href="#" aria-label="X">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}

// --- Main page ------------------------------------------------------------

export default function Home() {
  return (
    <div className="bcd-page">
      <Nav />
      <main>
        <Hero />
        <Work />
        <Services />
        <Process />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}