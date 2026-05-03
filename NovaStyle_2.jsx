import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";

// ─── Google Fonts (injected once) ───────────────────────────────────────────
const FontLoader = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,900;1,400;1,700&family=Montserrat:wght@200;300;400;500;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);
  return null;
};

// ─── Unsplash placeholder images (fashion/luxury) ────────────────────────────
const COLLECTION = [
  {
    id: 1,
    title: "Obsidian Coat",
    category: "Outerwear",
    img: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80",
    span: "tall",
  },
  {
    id: 2,
    title: "Ivory Silk Blouse",
    category: "Tops",
    img: "https://images.unsplash.com/photo-1594938298603-c8148c4b4f41?w=800&q=80",
    span: "normal",
  },
  {
    id: 3,
    title: "Midnight Trousers",
    category: "Bottoms",
    img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80",
    span: "normal",
  },
  {
    id: 4,
    title: "Le Grand Ensemble",
    category: "Sets",
    img: "https://images.unsplash.com/photo-1558171813-1a64b5f4af52?w=800&q=80",
    span: "wide",
  },
  {
    id: 5,
    title: "Velvet Blazer",
    category: "Outerwear",
    img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
    span: "tall",
  },
  {
    id: 6,
    title: "Cashmere Wrap",
    category: "Accessories",
    img: "https://images.unsplash.com/photo-1601762603339-fd61e28b698a?w=800&q=80",
    span: "normal",
  },
  {
    id: 7,
    title: "Noir Dress",
    category: "Dresses",
    img: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&q=80",
    span: "normal",
  },
  {
    id: 8,
    title: "Structured Jacket",
    category: "Outerwear",
    img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&q=80",
    span: "wide",
  },
];

// ─── SVG Icons ────────────────────────────────────────────────────────────────
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.564 4.14 1.544 5.876L0 24l6.278-1.524A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.034-1.384l-.36-.214-3.727.904.936-3.623-.235-.372A9.779 9.779 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182c5.43 0 9.818 4.388 9.818 9.818 0 5.43-4.388 9.818-9.818 9.818z" />
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 6.75z" />
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
    <circle cx="12" cy="12" r="9.75" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75v5.25l3.75 3" />
  </svg>
);

const MapPinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
  </svg>
);

// ─── Grain overlay ─────────────────────────────────────────────────────────
const GrainOverlay = () => (
  <div
    style={{
      position: "fixed",
      inset: 0,
      pointerEvents: "none",
      zIndex: 9999,
      opacity: 0.03,
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
    }}
  />
);

// ─── Gold divider ──────────────────────────────────────────────────────────
const GoldDivider = () => (
  <div className="flex items-center gap-4 justify-center my-8">
    <div style={{ width: 60, height: 1, background: "linear-gradient(90deg, transparent, #D4AF37)" }} />
    <div style={{ width: 6, height: 6, background: "#D4AF37", transform: "rotate(45deg)" }} />
    <div style={{ width: 60, height: 1, background: "linear-gradient(90deg, #D4AF37, transparent)" }} />
  </div>
);

// ─── Cursor follower ───────────────────────────────────────────────────────
const GoldCursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    const over = (e) => {
      if (e.target.closest("[data-cursor='hover']")) setHovered(true);
    };
    const out = () => setHovered(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    window.addEventListener("mouseout", out);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mouseout", out);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] hidden md:block"
        animate={{ x: pos.x - 6, y: pos.y - 6, scale: hovered ? 0 : 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        style={{ width: 12, height: 12, background: "#D4AF37", opacity: 0.8 }}
      />
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9997] hidden md:block"
        animate={{ x: pos.x - 20, y: pos.y - 20, scale: hovered ? 1.6 : 1, opacity: hovered ? 0.6 : 0.25 }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        style={{ width: 40, height: 40, border: "1px solid #D4AF37" }}
      />
    </>
  );
};

// ─── Navbar ────────────────────────────────────────────────────────────────
const Navbar = ({ scrolled }) => (
  <motion.nav
    initial={{ y: -80, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      padding: scrolled ? "16px 40px" : "24px 40px",
      background: scrolled ? "rgba(5,5,5,0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(212,175,55,0.15)" : "none",
      transition: "all 0.4s ease",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    }}
  >
    <div style={{ fontFamily: "'Playfair Display', serif", color: "#D4AF37", fontSize: 22, letterSpacing: "0.15em", fontWeight: 700 }}>
      NOVA STYLE
    </div>
    <div style={{ display: "flex", gap: 32, fontFamily: "'Montserrat', sans-serif", fontSize: 11, letterSpacing: "0.2em", fontWeight: 500, color: "rgba(255,255,255,0.6)" }}>
      {["Collection", "Lookbook", "Visit Us"].map((item) => (
        <a
          key={item}
          href={`#${item.toLowerCase().replace(" ", "-")}`}
          data-cursor="hover"
          style={{ textDecoration: "none", color: "inherit", transition: "color 0.3s" }}
          onMouseEnter={(e) => (e.target.style.color = "#D4AF37")}
          onMouseLeave={(e) => (e.target.style.color = "rgba(255,255,255,0.6)")}
          className="hidden md:block"
        >
          {item.toUpperCase()}
        </a>
      ))}
    </div>
  </motion.nav>
);

// ─── Hero Section ─────────────────────────────────────────────────────────
const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const scrollToCollection = () => {
    document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" });
  };

  const chars = "NOVA STYLE".split("");

  return (
    <section
      ref={ref}
      id="lookbook"
      style={{ position: "relative", height: "100vh", overflow: "hidden", background: "#050505" }}
    >
      {/* Parallax BG */}
      <motion.div style={{ y, position: "absolute", inset: "-10%", zIndex: 0 }}>
        <img
          src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1600&q=85"
          alt="Hero"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(5,5,5,0.55) 0%, rgba(5,5,5,0.3) 40%, rgba(5,5,5,0.75) 80%, #050505 100%)",
          }}
        />
      </motion.div>

      {/* Decorative horizontal lines */}
      <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none" }}>
        {[15, 85].map((top) => (
          <motion.div
            key={top}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.4, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "absolute",
              top: `${top}%`,
              left: "5%",
              right: "5%",
              height: 1,
              background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)",
              transformOrigin: "left",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        style={{ opacity, position: "relative", zIndex: 2, height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 24px" }}
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.3em" }}
          animate={{ opacity: 1, letterSpacing: "0.5em" }}
          transition={{ duration: 1, delay: 0.3 }}
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: 11,
            fontWeight: 500,
            color: "#D4AF37",
            marginBottom: 28,
            textTransform: "uppercase",
          }}
        >
          Collection SS 2025
        </motion.p>

        {/* Title — letter by letter */}
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(52px, 14vw, 160px)",
            fontWeight: 700,
            lineHeight: 0.9,
            letterSpacing: "-0.02em",
            margin: 0,
            display: "flex",
            gap: "0.04em",
          }}
        >
          {chars.map((char, i) => (
            <motion.span
              key={i}
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.75, delay: 0.5 + i * 0.045, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: "inline-block",
                background: char === " " ? "none" : "linear-gradient(135deg, #F5E27A 0%, #D4AF37 40%, #A0742A 100%)",
                WebkitBackgroundClip: char === " " ? "none" : "text",
                WebkitTextFillColor: char === " " ? "transparent" : "transparent",
                color: char === " " ? "transparent" : "transparent",
                width: char === " " ? "0.35em" : "auto",
              }}
            >
              {char}
            </motion.span>
          ))}
        </h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.2 }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic",
            fontSize: "clamp(14px, 2.5vw, 20px)",
            color: "rgba(255,255,255,0.55)",
            marginTop: 20,
            marginBottom: 52,
            letterSpacing: "0.05em",
          }}
        >
          Where elegance meets identity
        </motion.p>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={scrollToCollection}
          data-cursor="hover"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#050505",
            background: "linear-gradient(135deg, #F5E27A 0%, #D4AF37 50%, #A0742A 100%)",
            border: "none",
            padding: "16px 44px",
            cursor: "pointer",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <span style={{ position: "relative", zIndex: 1 }}>Explore Collection</span>
        </motion.button>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          style={{ position: "absolute", bottom: 40, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}
        >
          <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 9, letterSpacing: "0.3em", color: "rgba(255,255,255,0.35)", textTransform: "uppercase" }}>Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: 1, height: 40, background: "linear-gradient(180deg, #D4AF37, transparent)" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

// ─── Section Header ────────────────────────────────────────────────────────
const SectionHeader = ({ eyebrow, title, subtitle }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <div ref={ref} style={{ textAlign: "center", maxWidth: 560, margin: "0 auto", padding: "0 24px" }}>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: "0.4em", color: "#D4AF37", textTransform: "uppercase", marginBottom: 16 }}
      >
        {eyebrow}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1 }}
        style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 6vw, 56px)", fontWeight: 700, color: "#fff", margin: 0, lineHeight: 1.1 }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 13, fontWeight: 300, color: "rgba(255,255,255,0.45)", marginTop: 16, lineHeight: 1.8, letterSpacing: "0.03em" }}
        >
          {subtitle}
        </motion.p>
      )}
      <GoldDivider />
    </div>
  );
};

// ─── Collection Card ───────────────────────────────────────────────────────
const CollectionCard = ({ item, index }) => {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const spanClass =
    item.span === "tall"
      ? "row-span-2"
      : item.span === "wide"
      ? "col-span-2"
      : "";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={spanClass}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-cursor="hover"
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#111",
        cursor: "none",
        aspectRatio: item.span === "tall" ? undefined : "3/4",
        minHeight: item.span === "tall" ? 500 : 280,
      }}
    >
      {/* Image */}
      <motion.img
        src={item.img}
        alt={item.title}
        animate={{ scale: hovered ? 1.08 : 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />

      {/* Base gradient */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg, rgba(5,5,5,0.7) 0%, transparent 50%)" }} />

      {/* Category pill */}
      <div
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          fontFamily: "'Montserrat', sans-serif",
          fontSize: 9,
          fontWeight: 600,
          letterSpacing: "0.2em",
          color: "#D4AF37",
          textTransform: "uppercase",
          border: "1px solid rgba(212,175,55,0.4)",
          padding: "5px 12px",
          background: "rgba(5,5,5,0.6)",
          backdropFilter: "blur(8px)",
        }}
      >
        {item.category}
      </div>

      {/* Bottom info */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px 24px" }}>
        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 600, color: "#fff", margin: 0, marginBottom: 4 }}>
          {item.title}
        </p>

        {/* Hover CTA */}
        <motion.div
          initial={false}
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
          transition={{ duration: 0.3 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontFamily: "'Montserrat', sans-serif",
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "0.2em",
            color: "#D4AF37",
            textTransform: "uppercase",
            marginTop: 8,
          }}
        >
          <span>Inspect Details</span>
          <motion.span animate={{ x: hovered ? 4 : 0 }} transition={{ duration: 0.3 }} style={{ fontSize: 14 }}>→</motion.span>
        </motion.div>
      </div>

      {/* Hover gold border */}
      <motion.div
        initial={false}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ position: "absolute", inset: 0, border: "1px solid rgba(212,175,55,0.5)", pointerEvents: "none" }}
      />
    </motion.div>
  );
};

// ─── Collection Section ────────────────────────────────────────────────────
const Collection = () => (
  <section id="collection" style={{ background: "#050505", padding: "100px 0 80px" }}>
    <SectionHeader
      eyebrow="SS 2025 Lookbook"
      title="The Collection"
      subtitle="Each piece is a statement. Crafted with precision, worn with intention."
    />
    <div
      style={{
        maxWidth: 1280,
        margin: "0 auto",
        padding: "0 24px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: 16,
      }}
      className="lookbook-grid"
    >
      {COLLECTION.map((item, i) => (
        <CollectionCard key={item.id} item={item} index={i} />
      ))}
    </div>
  </section>
);

// ─── Brand Story Section ───────────────────────────────────────────────────
const BrandStory = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section style={{ background: "#080808", padding: "100px 24px", position: "relative", overflow: "hidden" }}>
      {/* BG text watermark */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontFamily: "'Playfair Display', serif", fontSize: "clamp(80px, 20vw, 200px)", fontWeight: 900, color: "rgba(212,175,55,0.03)", whiteSpace: "nowrap", pointerEvents: "none", userSelect: "none" }}>
        NOVA
      </div>

      <div ref={ref} style={{ maxWidth: 900, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: "0.4em", color: "#D4AF37", textTransform: "uppercase", marginBottom: 24 }}
        >
          Our Philosophy
        </motion.p>
        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.15 }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic",
            fontSize: "clamp(22px, 4.5vw, 40px)",
            fontWeight: 400,
            color: "rgba(255,255,255,0.85)",
            lineHeight: 1.55,
            margin: 0,
          }}
        >
          "Fashion is not just what you wear — it is the language you speak before you say a word."
        </motion.blockquote>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, color: "#D4AF37", letterSpacing: "0.15em", marginTop: 28 }}
        >
          — Nova Style, Guelma
        </motion.p>
      </div>
    </section>
  );
};

// ─── Visit Us Section ─────────────────────────────────────────────────────
const VisitUs = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const info = [
    { icon: <ClockIcon />, label: "Hours", value: "Open Daily: 09:00 AM – 09:00 PM" },
    { icon: <MapPinIcon />, label: "Address", value: "Rue Principale, Guelma, Algeria 24000" },
  ];

  return (
    <section id="visit-us" style={{ background: "#050505", padding: "100px 24px" }}>
      <SectionHeader
        eyebrow="We'd love to see you"
        title="Visit Our Store"
        subtitle="Step inside and experience the collection in person. Our team is here to guide you."
      />

      <div
        ref={ref}
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 40,
          alignItems: "start",
        }}
      >
        {/* Map */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: "relative" }}
        >
          <div style={{ border: "1px solid rgba(212,175,55,0.25)", padding: 8, background: "#0a0a0a" }}>
            <iframe
              title="Nova Style - Guelma Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24920!2d7.4283!3d36.4620!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12f04dcd17c05c8d%3A0x4a4eec1d9c4c0d08!2sGuelma%2C%20Algeria!5e0!3m2!1sen!2s!4v1700000000000"
              width="100%"
              height="360"
              style={{ border: "none", display: "block", filter: "grayscale(1) invert(0.9) contrast(0.85)" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          {/* Gold corner accents */}
          {[["top-0 left-0", "border-t border-l"], ["top-0 right-0", "border-t border-r"], ["bottom-0 left-0", "border-b border-l"], ["bottom-0 right-0", "border-b border-r"]].map(([pos, borders], i) => (
            <div
              key={i}
              className={`absolute ${pos} w-5 h-5 ${borders}`}
              style={{ borderColor: "#D4AF37" }}
            />
          ))}
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: "flex", flexDirection: "column", gap: 32 }}
        >
          {/* Store info pills */}
          {info.map(({ icon, label, value }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
              style={{
                display: "flex",
                gap: 16,
                alignItems: "flex-start",
                padding: "20px 24px",
                border: "1px solid rgba(212,175,55,0.12)",
                background: "rgba(212,175,55,0.03)",
              }}
            >
              <div style={{ color: "#D4AF37", marginTop: 2 }}>{icon}</div>
              <div>
                <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: "0.25em", color: "#D4AF37", textTransform: "uppercase", margin: 0, marginBottom: 6 }}>{label}</p>
                <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.65)", margin: 0, lineHeight: 1.5 }}>{value}</p>
              </div>
            </motion.div>
          ))}

          {/* Call button */}
          <motion.a
            href="tel:+213XXXXXXXXX"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.55 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            data-cursor="hover"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              background: "linear-gradient(135deg, #F5E27A 0%, #D4AF37 50%, #A0742A 100%)",
              color: "#050505",
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              textDecoration: "none",
              padding: "18px 32px",
            }}
          >
            <PhoneIcon />
            <span>Click to Call</span>
          </motion.a>

          {/* Social links */}
          <div>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: "0.3em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", marginBottom: 16 }}>Find Us Online</p>
            <div style={{ display: "flex", gap: 16 }}>
              {[
                { icon: <InstagramIcon />, label: "Instagram", href: "https://instagram.com/novastyle" },
                { icon: <WhatsAppIcon />, label: "WhatsApp", href: "https://wa.me/213XXXXXXXXX" },
              ].map(({ icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, borderColor: "#D4AF37" }}
                  whileTap={{ scale: 0.95 }}
                  data-cursor="hover"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "12px 20px",
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "rgba(255,255,255,0.5)",
                    textDecoration: "none",
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: 11,
                    fontWeight: 500,
                    letterSpacing: "0.1em",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "#D4AF37"; e.currentTarget.style.borderColor = "rgba(212,175,55,0.5)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.5)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; }}
                >
                  {icon}
                  <span>{label}</span>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ─── Footer ───────────────────────────────────────────────────────────────
const Footer = () => (
  <footer style={{ background: "#030303", borderTop: "1px solid rgba(212,175,55,0.1)", padding: "48px 24px" }}>
    <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: 20, textAlign: "center" }}>
      <div style={{ fontFamily: "'Playfair Display', serif", color: "#D4AF37", fontSize: 28, fontWeight: 700, letterSpacing: "0.15em" }}>
        NOVA STYLE
      </div>
      <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.25)", letterSpacing: "0.05em" }}>
        Guelma, Algeria · Luxury Fashion · Est. 2020
      </p>
      <GoldDivider />
      <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em" }}>
        © {new Date().getFullYear()} Nova Style. All rights reserved.
      </p>
    </div>
  </footer>
);

// ─── Root App ─────────────────────────────────────────────────────────────
export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ background: "#050505", minHeight: "100vh", overflowX: "hidden" }}>
      <FontLoader />
      <GrainOverlay />
      <GoldCursor />
      <Navbar scrolled={scrolled} />
      <Hero />
      <Collection />
      <BrandStory />
      <VisitUs />
      <Footer />

      {/* Global styles */}
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        body { margin: 0; cursor: none; }
        @media (max-width: 768px) { body { cursor: auto; } }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #050505; }
        ::-webkit-scrollbar-thumb { background: #D4AF37; border-radius: 0; }
        html { scroll-behavior: smooth; }
        @media (max-width: 640px) {
          .lookbook-grid { grid-template-columns: 1fr 1fr !important; gap: 10px !important; }
        }
      `}</style>
    </div>
  );
}
