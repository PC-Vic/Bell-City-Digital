import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import "./Home.css";
import bcLogo from "../assets/bc-dark-logo.png";

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
    href: "#",
  },
  {
    tag: "SAAS · LIVE TOOL",
    title: "Pragma Options",
    blurb:
      "Real-time options trading platform with custom data visualization and live market feeds.",
    accent: "linear-gradient(135deg, #0f1f2c 0%, #1a3a52 100%)",
    href: "https://pragmaoptions.com",
  },
  {
    tag: "RESTAURANT",
    title: "La Cocina (Demo)",
    blurb:
      "Sample restaurant build showing menu management, ordering link-out, and Maps integration.",
    accent: "linear-gradient(135deg, #1f1a0f 0%, #3d2f1a 100%)",
    href: "#",
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
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
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
    </header>
  );
}

function Hero() {
  return (
    <section className="bcd-hero" id="top">
      <div className="bcd-hero__atmosphere" aria-hidden="true">
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
  return (
    <section className="bcd-section bcd-work" id="work">
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
            className={`bcd-project ${i === 2 ? "bcd-project--wide" : ""}`}
            variants={fadeUp}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.4, ease }}
          >
            <div
              className="bcd-project__visual"
              style={{ background: p.accent }}
            >
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
          <a href="#">LinkedIn</a>
          <a href="#">Instagram</a>
          <a href="#">X</a>
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