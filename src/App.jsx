import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

// ─── Google Fonts ──────────────────────────────────────────────────────────
const FontLoader = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&family=Syncopate:wght@400;700&family=Barlow:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);
  return null;
};

// ─── Design Tokens ────────────────────────────────────────────────────────
const T = {
  black: "#080808",
  white: "#F2F2F2",
  grey: {
    100: "#E8E8E8",
    300: "#AAAAAA",
    500: "#555555",
    700: "#222222",
    800: "#141414",
    900: "#0F0F0F",
  },
  border: "rgba(255,255,255,0.08)",
  borderHover: "rgba(255,255,255,0.35)",
};

// ─── Collection Data ───────────────────────────────────────────────────────
const COLLECTION = [
  {
    id: 1,
    title: "LV MONOGRAM SET",
    category: "Sets",
    sub: "White Edition",
    img: "https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=800&q=85",
    tag: "NEW DROP",
    span: "tall",
  },
  {
    id: 2,
    title: "CARGO UTILITY",
    category: "Bottoms",
    sub: "Tactical Series",
    img: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&q=85",
    tag: "BESTSELLER",
    span: "normal",
  },
  {
    id: 3,
    title: "OVERSIZED GRAPHIC",
    category: "Tops",
    sub: "Street Series",
    img: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=800&q=85",
    tag: null,
    span: "normal",
  },
  {
    id: 4,
    title: "HYPEBEAST COLLAB",
    category: "Limited",
    sub: "Drop 001",
    img: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&q=85",
    tag: "LIMITED",
    span: "wide",
  },
  {
    id: 5,
    title: "GRAFFITI TEE",
    category: "Tops",
    sub: "Tie-Dye Edition",
    img: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&q=85",
    tag: "HOT",
    span: "tall",
  },
  {
    id: 6,
    title: "MONOCHROME HOODIE",
    category: "Outerwear",
    sub: "Core Collection",
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=85",
    tag: null,
    span: "normal",
  },
  {
    id: 7,
    title: "RUNNER PACK",
    category: "Accessories",
    sub: "Utility Drop",
    img: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&q=85",
    tag: "NEW",
    span: "normal",
  },
  {
    id: 8,
    title: "STREET LAYERING",
    category: "Sets",
    sub: "Full Look",
    img: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=800&q=85",
    tag: "TRENDING",
    span: "wide",
  },
];

// ─── Noise Overlay ─────────────────────────────────────────────────────────
const NoiseOverlay = () => (
  <div
    style={{
      position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999, opacity: 0.045,
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
    }}
  />
);

// ─── Scrolling Ticker ──────────────────────────────────────────────────────
const TICKER_ITEMS = ["New Drop SS25", "In-Store Only", "Guelma", "Urban Streetwear", "Limited Pieces", "No Online Sales", "Visit Us Daily", "09AM–09PM"];

const Ticker = () => {
  const repeated = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div style={{ overflow: "hidden", borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}`, background: T.grey[900], padding: "10px 0" }}>
      <motion.div
        animate={{ x: ["0%", "-33.33%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        style={{ display: "flex", whiteSpace: "nowrap" }}
      >
        {repeated.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontSize: 11,
              fontWeight: 400,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: i % 2 === 0 ? T.white : T.grey[500],
              padding: "0 28px",
            }}
          >
            {i % 2 === 0 ? item : "✦"}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

// ─── Custom Cursor ─────────────────────────────────────────────────────────
const StreetCursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hov, setHov] = useState(false);

  useEffect(() => {
    const mv = (e) => setPos({ x: e.clientX, y: e.clientY });
    const on = (e) => { if (e.target.closest("[data-hover]")) setHov(true); };
    const off = () => setHov(false);
    window.addEventListener("mousemove", mv);
    window.addEventListener("mouseover", on);
    window.addEventListener("mouseout", off);
    return () => {
      window.removeEventListener("mousemove", mv);
      window.removeEventListener("mouseover", on);
      window.removeEventListener("mouseout", off);
    };
  }, []);

  return (
    <>
      <motion.div
        className="hidden md:block"
        animate={{ x: pos.x - 4, y: pos.y - 4, scale: hov ? 0 : 1 }}
        transition={{ type: "spring", stiffness: 800, damping: 35 }}
        style={{ position: "fixed", top: 0, left: 0, width: 8, height: 8, background: T.white, zIndex: 9998, pointerEvents: "none" }}
      />
      <motion.div
        className="hidden md:block"
        animate={{ x: pos.x - 18, y: pos.y - 18, scale: hov ? 2 : 1, opacity: hov ? 0.9 : 0.35 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        style={{ position: "fixed", top: 0, left: 0, width: 36, height: 36, border: `1px solid ${T.white}`, zIndex: 9997, pointerEvents: "none" }}
      />
    </>
  );
};

// ─── Navbar ────────────────────────────────────────────────────────────────
const Navbar = ({ scrolled }) => (
  <motion.nav
    initial={{ y: -70, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: scrolled ? "14px 32px" : "22px 32px",
      background: scrolled ? "rgba(8,8,8,0.97)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? `1px solid ${T.border}` : "none",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      transition: "all 0.2s ease",
    }}
  >
    <div style={{ fontFamily: "'Syncopate', sans-serif", color: T.white, fontSize: 16, letterSpacing: "0.12em", fontWeight: 700 }}>
      NOVA<span style={{ color: T.grey[300] }}>STYLE</span>
    </div>
    <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
      {["COLLECTION", "LOOKBOOK", "STORE"].map((item) => (
        <a
          key={item}
          href={`#${item.toLowerCase()}`}
          data-hover
          className="hidden md:block"
          style={{ fontFamily: "'Oswald', sans-serif", fontSize: 11, letterSpacing: "0.22em", fontWeight: 400, color: T.grey[300], textDecoration: "none", transition: "color 0.15s" }}
          onMouseEnter={(e) => (e.target.style.color = T.white)}
          onMouseLeave={(e) => (e.target.style.color = T.grey[300])}
        >
          {item}
        </a>
      ))}
      <div
        data-hover
        style={{ fontFamily: "'Oswald', sans-serif", fontSize: 11, letterSpacing: "0.15em", background: T.white, color: T.black, padding: "8px 18px", cursor: "none", fontWeight: 600 }}
      >
        GUELMA STORE
      </div>
    </div>
  </motion.nav>
);

// ─── Hero ──────────────────────────────────────────────────────────────────
const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} id="lookbook" style={{ position: "relative", height: "100vh", overflow: "hidden", background: T.black }}>
      <motion.div style={{ y, position: "absolute", inset: "-10%", zIndex: 0 }}>
        <img
          src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1600&q=85"
          alt="hero"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%", filter: "brightness(0.3) contrast(1.15)" }}
        />
      </motion.div>

      {/* Diagonal stripe pattern */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
        background: "repeating-linear-gradient(135deg, transparent, transparent 60px, rgba(255,255,255,0.012) 60px, rgba(255,255,255,0.012) 61px)",
      }} />

      {/* Vertical accent lines */}
      {[12, 88].map((left) => (
        <motion.div
          key={left}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            position: "absolute", top: "8%", bottom: "8%", left: `${left}%`,
            width: 1, background: `linear-gradient(180deg, transparent, rgba(255,255,255,0.1), transparent)`,
            zIndex: 1, transformOrigin: "top",
          }}
        />
      ))}

      <motion.div
        style={{ opacity, position: "relative", zIndex: 2, height: "100%", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center", padding: "0 clamp(24px, 6vw, 80px)" }}
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}
        >
          <div style={{ width: 32, height: 1, background: T.white }} />
          <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 11, letterSpacing: "0.35em", color: T.grey[300], textTransform: "uppercase" }}>
            SS25 Collection
          </span>
        </motion.div>

        {/* Big Title */}
        {["NOVA", "STYLE"].map((word, wi) => (
          <div key={word} style={{ overflow: "hidden" }}>
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 + wi * 0.09, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: "'Syncopate', sans-serif",
                fontSize: "clamp(56px, 16vw, 200px)",
                fontWeight: 700, lineHeight: 0.88, margin: 0,
                letterSpacing: "-0.02em",
                color: wi === 0 ? T.white : "transparent",
                WebkitTextStroke: wi === 1 ? `1.5px ${T.white}` : "none",
                display: "block",
              }}
            >
              {word}
            </motion.h1>
          </div>
        ))}

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.55 }}
          style={{ fontFamily: "'Barlow', sans-serif", fontStyle: "italic", fontSize: "clamp(13px, 2vw, 18px)", color: T.grey[300], marginTop: 24, marginBottom: 44, letterSpacing: "0.04em", maxWidth: 400 }}
        >
          Raw. Unfiltered. Guelma's finest streetwear destination.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.65 }}
          style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}
        >
          <button
            data-hover
            onClick={() => document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" })}
            style={{ fontFamily: "'Oswald', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", background: T.white, color: T.black, border: "none", padding: "14px 36px", cursor: "none" }}
          >
            EXPLORE DROP
          </button>
          <button
            data-hover
            onClick={() => document.getElementById("store")?.scrollIntoView({ behavior: "smooth" })}
            style={{ fontFamily: "'Oswald', sans-serif", fontSize: 12, fontWeight: 400, letterSpacing: "0.2em", textTransform: "uppercase", background: "transparent", color: T.white, border: `1px solid rgba(255,255,255,0.3)`, padding: "14px 36px", cursor: "none" }}
          >
            FIND STORE
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          style={{ position: "absolute", bottom: 36, right: "clamp(24px, 6vw, 80px)", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}
        >
          <motion.div
            animate={{ scaleY: [1, 0.3, 1] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: 1, height: 44, background: T.white, transformOrigin: "top" }}
          />
          <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 9, letterSpacing: "0.3em", color: T.grey[500], textTransform: "uppercase" }}>scroll</span>
        </motion.div>
      </motion.div>
    </section>
  );
};

// ─── Section Header ────────────────────────────────────────────────────────
const SectionHead = ({ eyebrow, title, sub }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div ref={ref} style={{ maxWidth: 700, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
      <motion.span
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.3 }}
        style={{ fontFamily: "'Oswald', sans-serif", fontSize: 10, fontWeight: 400, letterSpacing: "0.45em", color: T.grey[300], textTransform: "uppercase", display: "block", marginBottom: 14 }}
      >
        {eyebrow}
      </motion.span>
      <div style={{ overflow: "hidden" }}>
        <motion.h2
          initial={{ y: "100%" }}
          animate={inView ? { y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontFamily: "'Syncopate', sans-serif", fontSize: "clamp(28px, 6vw, 64px)", fontWeight: 700, color: T.white, margin: 0, lineHeight: 1, letterSpacing: "-0.01em" }}
        >
          {title}
        </motion.h2>
      </div>
      {sub && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.35, delay: 0.18 }}
          style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, color: T.grey[500], marginTop: 14, letterSpacing: "0.04em" }}
        >
          {sub}
        </motion.p>
      )}
      <div style={{ display: "flex", alignItems: "center", gap: 16, justifyContent: "center", margin: "32px 0" }}>
        <div style={{ flex: 1, maxWidth: 80, height: 1, background: T.grey[700] }} />
        <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: 9, letterSpacing: "0.4em", color: T.grey[500], textTransform: "uppercase" }}>NS</span>
        <div style={{ flex: 1, maxWidth: 80, height: 1, background: T.grey[700] }} />
      </div>
    </div>
  );
};

// ─── Collection Card ───────────────────────────────────────────────────────
const Card = ({ item, index }) => {
  const [hov, setHov] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const spanClass = item.span === "tall" ? "row-span-2" : item.span === "wide" ? "col-span-2" : "";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.055, ease: [0.22, 1, 0.36, 1] }}
      className={spanClass}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      data-hover
      style={{
        position: "relative", overflow: "hidden", background: T.grey[800], cursor: "none",
        minHeight: item.span === "tall" ? 480 : 260,
        border: `1px solid ${hov ? T.borderHover : T.border}`,
        transition: "border-color 0.2s",
      }}
    >
      <motion.img
        src={item.img}
        alt={item.title}
        animate={{ scale: hov ? 1.07 : 1, filter: hov ? "brightness(0.55) contrast(1.1)" : "brightness(0.45) contrast(1.05)" }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />

      {item.tag && (
        <div style={{ position: "absolute", top: 14, left: 14, fontFamily: "'Oswald', sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", background: T.white, color: T.black, padding: "4px 10px" }}>
          {item.tag}
        </div>
      )}
      <div style={{ position: "absolute", top: 14, right: 14, fontFamily: "'Barlow', sans-serif", fontSize: 9, letterSpacing: "0.2em", color: T.grey[300], textTransform: "uppercase" }}>
        {item.category}
      </div>

      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "40px 18px 18px", background: "linear-gradient(0deg, rgba(8,8,8,0.97) 0%, transparent 100%)" }}>
        <p style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(15px, 2.5vw, 20px)", fontWeight: 600, color: T.white, margin: 0, letterSpacing: "0.05em", textTransform: "uppercase" }}>
          {item.title}
        </p>
        <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 11, color: T.grey[300], margin: "4px 0 0", letterSpacing: "0.1em" }}>
          {item.sub}
        </p>
        <motion.div
          animate={{ opacity: hov ? 1 : 0, y: hov ? 0 : 8 }}
          transition={{ duration: 0.18 }}
          style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 8, fontFamily: "'Oswald', sans-serif", fontSize: 10, fontWeight: 500, letterSpacing: "0.2em", color: T.white, textTransform: "uppercase" }}
        >
          <div style={{ width: 18, height: 1, background: T.white }} />
          <span>View Item</span>
          <motion.span animate={{ x: hov ? 4 : 0 }} transition={{ duration: 0.18 }}>→</motion.span>
        </motion.div>
      </div>

      {/* Corner accents on hover */}
      <motion.div animate={{ opacity: hov ? 1 : 0 }} transition={{ duration: 0.15 }} style={{ position: "absolute", top: 0, left: 0, width: 18, height: 18, borderTop: `2px solid ${T.white}`, borderLeft: `2px solid ${T.white}`, pointerEvents: "none" }} />
      <motion.div animate={{ opacity: hov ? 1 : 0 }} transition={{ duration: 0.15 }} style={{ position: "absolute", bottom: 0, right: 0, width: 18, height: 18, borderBottom: `2px solid ${T.white}`, borderRight: `2px solid ${T.white}`, pointerEvents: "none" }} />
    </motion.div>
  );
};

// ─── Collection Section ────────────────────────────────────────────────────
const Collection = () => (
  <section id="collection" style={{ background: T.black, padding: "100px 0 80px" }}>
    <SectionHead eyebrow="SS25 — Guelma" title="THE DROP" sub="Curated pieces for the culture. Available in-store only." />
    <div style={{ maxWidth: 1300, margin: "0 auto", padding: "0 20px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 12 }}>
      {COLLECTION.map((item, i) => <Card key={item.id} item={item} index={i} />)}
    </div>
  </section>
);

// ─── Manifesto ─────────────────────────────────────────────────────────────
const Manifesto = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section style={{ background: T.grey[900], padding: "100px 24px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", bottom: -40, right: -20, fontFamily: "'Syncopate', sans-serif", fontSize: "clamp(120px, 30vw, 320px)", fontWeight: 700, color: "rgba(255,255,255,0.02)", lineHeight: 1, pointerEvents: "none", userSelect: "none" }}>25</div>

      <div ref={ref} style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 40, alignItems: "end" }} className="manifesto-grid">
          <div>
            {["WEAR YOUR", "IDENTITY."].map((line, i) => (
              <div key={i} style={{ overflow: "hidden" }}>
                <motion.h2
                  initial={{ y: "110%" }}
                  animate={inView ? { y: 0 } : {}}
                  transition={{ duration: 0.45, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    fontFamily: "'Syncopate', sans-serif",
                    fontSize: "clamp(36px, 9vw, 110px)",
                    fontWeight: 700,
                    color: i === 0 ? T.white : "transparent",
                    WebkitTextStroke: i === 1 ? `1.5px ${T.white}` : "none",
                    margin: 0, lineHeight: 0.95, letterSpacing: "-0.02em",
                  }}
                >
                  {line}
                </motion.h2>
              </div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.25 }}
            style={{ maxWidth: 240, paddingBottom: 12 }}
          >
            <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, color: T.grey[300], lineHeight: 1.7, letterSpacing: "0.03em" }}>
              Nova Style is more than a store. It's a movement. We curate the pieces that define the streets of Guelma.
            </p>
            <div style={{ marginTop: 20, width: "100%", height: 1, background: T.grey[700] }} />
            <p style={{ fontFamily: "'Oswald', sans-serif", fontSize: 10, color: T.grey[500], letterSpacing: "0.3em", marginTop: 12, textTransform: "uppercase" }}>
              Est. 2020 · Guelma, DZ
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ─── Visit Us ──────────────────────────────────────────────────────────────
const VisitUs = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="store" style={{ background: T.black, padding: "100px 24px", borderTop: `1px solid ${T.border}` }}>
      <SectionHead eyebrow="Find Us IRL" title="THE STORE" sub="Come through. See it. Feel it. Own it." />
      <div ref={ref} style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: "relative", border: `1px solid ${T.border}` }}
        >
          <iframe
            title="Nova Style Guelma"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24920!2d7.4283!3d36.4620!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12f04dcd17c05c8d%3A0x4a4eec1d9c4c0d08!2sGuelma%2C%20Algeria!5e0!3m2!1sen!2s!4v1700000000000"
            width="100%" height="380"
            style={{ border: "none", display: "block", filter: "grayscale(1) contrast(1.1) brightness(0.65)" }}
            loading="lazy"
          />
          {[["top:0;left:0", "border-top:2px solid #F2F2F2;border-left:2px solid #F2F2F2"], ["top:0;right:0", "border-top:2px solid #F2F2F2;border-right:2px solid #F2F2F2"], ["bottom:0;left:0", "border-bottom:2px solid #F2F2F2;border-left:2px solid #F2F2F2"], ["bottom:0;right:0", "border-bottom:2px solid #F2F2F2;border-right:2px solid #F2F2F2"]].map(([pos, b], i) => (
            <div key={i} style={{ position: "absolute", ...Object.fromEntries(pos.split(";").map(s => s.split(":"))), width: 18, height: 18, ...Object.fromEntries(b.split(";").map(s => { const [k, v] = s.split(":"); return [k.replace(/-([a-z])/g, (_, c) => c.toUpperCase()), v]; })) }} />
          ))}
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "flex", flexDirection: "column", gap: 14 }}
        >
          {[{ label: "HOURS", value: "Open Daily: 09:00 AM – 09:00 PM" }, { label: "LOCATION", value: "Rue Principale, Guelma 24000, Algeria" }].map(({ label, value }) => (
            <div key={label} style={{ padding: "18px", border: `1px solid ${T.border}`, background: T.grey[900] }}>
              <p style={{ fontFamily: "'Oswald', sans-serif", fontSize: 9, fontWeight: 500, letterSpacing: "0.35em", color: T.grey[500], textTransform: "uppercase", margin: "0 0 8px" }}>{label}</p>
              <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, color: T.white, margin: 0, lineHeight: 1.5 }}>{value}</p>
            </div>
          ))}

          <motion.a
            href="tel:+213XXXXXXXXX"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            data-hover
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, background: T.white, color: T.black, padding: "16px", fontFamily: "'Oswald', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none" }}
          >
            📞 CALL NOW
          </motion.a>

          <div style={{ display: "flex", gap: 12 }}>
            {[{ label: "INSTAGRAM", icon: "📸", href: "https://instagram.com/novastyle" }, { label: "WHATSAPP", icon: "💬", href: "https://wa.me/213XXXXXXXXX" }].map(({ label, icon, href }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileTap={{ scale: 0.96 }}
                data-hover
                style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "14px", border: `1px solid ${T.border}`, fontFamily: "'Oswald', sans-serif", fontSize: 10, fontWeight: 400, letterSpacing: "0.15em", color: T.grey[300], textDecoration: "none", textTransform: "uppercase", transition: "all 0.18s" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = T.white; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = T.grey[300]; e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = T.border; }}
              >
                {icon} {label}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ─── Footer ────────────────────────────────────────────────────────────────
const Footer = () => (
  <footer style={{ background: T.grey[900], borderTop: `1px solid ${T.border}`, padding: "40px 24px" }}>
    <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: 14, textAlign: "center" }}>
      <div style={{ fontFamily: "'Syncopate', sans-serif", color: T.white, fontSize: 20, fontWeight: 700, letterSpacing: "0.1em" }}>
        NOVA<span style={{ color: T.grey[500] }}>STYLE</span>
      </div>
      <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 11, color: T.grey[500], letterSpacing: "0.1em", margin: 0 }}>
        Guelma, Algeria · Urban Streetwear · Est. 2020
      </p>
      <div style={{ width: "100%", maxWidth: 400, height: 1, background: T.grey[700] }} />
      <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 10, color: T.grey[700], margin: 0, letterSpacing: "0.1em" }}>
        © {new Date().getFullYear()} Nova Style. All rights reserved.
      </p>
    </div>
  </footer>
);

// ─── App Root ──────────────────────────────────────────────────────────────
export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div style={{ background: T.black, minHeight: "100vh", overflowX: "hidden" }}>
      <FontLoader />
      <NoiseOverlay />
      <StreetCursor />
      <Navbar scrolled={scrolled} />
      <Hero />
      <Ticker />
      <Collection />
      <Manifesto />
      <VisitUs />
      <Footer />

      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        body { margin: 0; cursor: none; background: #080808; }
        @media (max-width: 768px) { body { cursor: auto; } }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #080808; }
        ::-webkit-scrollbar-thumb { background: #333; }
        html { scroll-behavior: smooth; }
        @media (max-width: 640px) {
          .manifesto-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 580px) {
          div[style*="minmax(260px"] { grid-template-columns: 1fr 1fr !important; gap: 8px !important; }
        }
      `}</style>
    </div>
  );
}
