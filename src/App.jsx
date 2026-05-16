import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// ─── Google Fonts ──────────────────────────────────────────────────────────
const FontLoader = () => {
  useEffect(() => {
    const link = document.createElement("link");
    // Clean, premium, minimalist font
    link.href =
      "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);
  return null;
};

// ─── Data ────────────────────────────────────────────────────────────────
const COLLECTION = [
  {
    id: 1,
    title: "OFF-WHITE DUCK GRAPHIC TEE",
    img: "/images/offwhite-duck.jpg",
    price: "DA 3,500",
    category: "T-Shirts",
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    status: "IN STOCK",
  },
  {
    id: 2,
    title: "OFF-WHITE KAWS EDITION - WHITE",
    img: "/images/offwhite-kaws-white1.jpg",
    price: "DA 3,500",
    category: "T-Shirts",
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    status: "IN STOCK",
  },
  {
    id: 3,
    title: "OFF-WHITE KAWS EDITION - WHITE",
    img: "/images/off-white-kaws-white2.jpg",
    price: "DA 3,500",
    category: "T-Shirts",
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    status: "IN STOCK",
  },
  {
    id: 4,
    title: "OFF-WHITE KAWS EDITION - WHITE",
    img: "/images/off- white-kaws-white3.jpg",
    price: "DA 3,500",
    category: "T-Shirts",
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    status: "IN STOCK",
  },
  {
    id: 5,
    title: "OFF-WHITE KAWS EDITION - BLACK",
    img: "/images/off-white-kaws-black1.jpg",
    price: "DA 3,500",
    category: "T-Shirts",
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    status: "IN STOCK",
  },
  {
    id: 6,
    title: "OFF-WHITE KAWS EDITION - BLACK",
    img: "/images/off-white-kaws-black2.jpg",
    price: "DA 3,500",
    category: "T-Shirts",
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    status: "IN STOCK",
  },
  {
    id: 7,
    title: "BALENCIAGA TIE-DYE LOGO TEE",
    img: "/images/balenciaga-tiedye.jpg",
    price: "DA 2,700",
    category: "T-Shirts",
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    status: "IN STOCK",
  },
];

// ─── Navbar ──────────────────────────────────────────────────────────────
const Navbar = () => (
  <nav
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "24px 48px",
      background: "rgba(0,0,0,0.8)",
      backdropFilter: "blur(10px)",
      borderBottom: "1px solid #1A1A1A",
    }}
  >
    <div
      style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: 16,
        fontWeight: 600,
        color: "#FFFFFF",
        letterSpacing: "0.2em",
        textTransform: "uppercase",
      }}
    >
      NovaStyle
    </div>
    <div className="hidden md:flex gap-12 items-center">
      {["T-Shirts", "Ensembles", "Archive"].map((item) => (
        <a
          key={item}
          href={`#${item.toLowerCase()}`}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 12,
            fontWeight: 400,
            color: "#888888",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            textDecoration: "none",
            transition: "color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.color = "#FFFFFF")}
          onMouseLeave={(e) => (e.target.style.color = "#888888")}
        >
          {item}
        </a>
      ))}
    </div>
  </nav>
);

// ─── Subtle Banner ───────────────────────────────────────────────────────
const SubtleBanner = () => (
  <div
    style={{
      padding: "16px 48px",
      borderBottom: "1px solid #1A1A1A",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      background: "#000000",
      marginTop: "80px", // Offset for fixed navbar
    }}
  >
    <span
      style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: 11,
        color: "#666666",
        letterSpacing: "0.15em",
        textTransform: "uppercase",
      }}
    >
      NOVA STYLE // DROP 01
    </span>
    <span
      style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: 11,
        color: "#666666",
        letterSpacing: "0.15em",
        textTransform: "uppercase",
      }}
    >
      CURATED ESSENTIALS
    </span>
  </div>
);

// ─── Hero ────────────────────────────────────────────────────────────────
const Hero = () => {
  return (
    <section
      style={{
        minHeight: "85vh",
        background: "#000000",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 48px",
        position: "relative",
        borderBottom: "1px solid #1A1A1A",
      }}
    >
      <div style={{ zIndex: 10, maxWidth: 800 }}>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(60px, 12vw, 160px)",
            fontWeight: 900,
            color: "#FFFFFF",
            lineHeight: 1,
            margin: 0,
            letterSpacing: "-0.04em",
            textTransform: "uppercase",
          }}
        >
          Elevated Basics.
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 16,
            fontWeight: 300,
            color: "#888888",
            maxWidth: 500,
            marginTop: 32,
            lineHeight: 1.6,
          }}
        >
          High-end minimalist streetwear. Focusing strictly on premium t-shirts and luxury ensembles designed for a modern aesthetic.
        </motion.p>
        
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            marginTop: 48,
            background: "transparent",
            color: "#FFFFFF",
            border: "1px solid #333333",
            padding: "16px 48px",
            fontFamily: "'Inter', sans-serif",
            fontSize: 12,
            fontWeight: 400,
            letterSpacing: "0.15em",
            cursor: "pointer",
            textTransform: "uppercase",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "#111111";
            e.target.style.borderColor = "#666666";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "transparent";
            e.target.style.borderColor = "#333333";
          }}
          onClick={() =>
            document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" })
          }
        >
          View Collection
        </motion.button>
      </div>

      {/* Minimal Architectural Elements */}
      <div
        className="hidden md:block"
        style={{
          position: "absolute",
          bottom: 48,
          right: 48,
          fontFamily: "'Inter', sans-serif",
          color: "#444444",
          fontSize: 11,
          fontWeight: 400,
          letterSpacing: "0.2em",
          textAlign: "right",
          textTransform: "uppercase",
        }}
      >
        <div>01 — 25</div>
        <div style={{ marginTop: 8 }}>Guelma</div>
      </div>
    </section>
  );
};

// ─── Collection Grid ─────────────────────────────────────────────────────
const Collection = () => (
  <section id="collection" style={{ background: "#000000", padding: "120px 48px" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 64 }}>
      <h2
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "clamp(40px, 8vw, 80px)",
          fontWeight: 900,
          color: "#FFFFFF",
          letterSpacing: "-0.02em",
          margin: 0,
          textTransform: "uppercase",
          lineHeight: 1,
        }}
      >
        The Collection
      </h2>
      <span
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 18,
          fontWeight: 700,
          color: "#666666",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          marginBottom: 8,
        }}
      >
        07 Items
      </span>
    </div>
    
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: 64,
      }}
    >
      {COLLECTION.map((item) => (
        <div key={item.id} style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              overflow: "hidden",
              aspectRatio: "3/4",
              background: "#111111",
              marginBottom: 24,
            }}
          >
            <motion.img
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              src={item.img}
              alt={item.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "grayscale(100%)",
                opacity: 0.9,
              }}
            />
          </div>
          
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "16px" }}>
            <h3
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 28,
                fontWeight: 900,
                color: "#FFFFFF",
                margin: 0,
                letterSpacing: "-0.01em",
                textTransform: "uppercase",
                lineHeight: 1.1,
              }}
            >
              {item.title}
            </h3>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 18,
                fontWeight: 600,
                color: "#888888",
              }}
            >
              {item.price}
            </span>
          </div>
          
          {item.sizes && (
            <div className="flex gap-2 mt-3">
              {item.sizes.map((size) => (
                <div
                  key={size}
                  className="border border-gray-600 text-gray-400 text-xs px-2 py-1 uppercase tracking-widest hover:bg-white hover:text-black transition-colors cursor-pointer"
                >
                  {size}
                </div>
              ))}
            </div>
          )}

          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 16,
              fontWeight: 700,
              color: item.status === "SOLD OUT" ? "#444444" : "#666666",
              marginTop: 12,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            {item.status}
          </span>
        </div>
      ))}
    </div>
  </section>
);

// ─── Minimalist Footer ────────────────────────────────────────────────────
const Footer = () => (
  <footer
    style={{
      background: "#000000",
      borderTop: "1px solid #1A1A1A",
      padding: "80px 48px 48px",
      display: "flex",
      flexDirection: "column",
    }}
  >
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: 64,
        marginBottom: 80,
      }}
    >
      <div>
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 16,
            fontWeight: 600,
            color: "#FFFFFF",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          NovaStyle
        </div>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 12,
            fontWeight: 400,
            color: "#666666",
            lineHeight: 1.6,
            maxWidth: 300,
          }}
        >
          A minimalist approach to modern streetwear.
        </p>
      </div>
      
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <h4 style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 500, color: "#444444", margin: 0, letterSpacing: "0.15em", textTransform: "uppercase" }}>Navigation</h4>
        {["Shop", "About", "Terms", "Contact"].map(link => (
          <a key={link} href="#" style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#888888", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color = "#FFF"} onMouseLeave={e => e.target.style.color = "#888888"}>
            {link}
          </a>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <h4 style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 500, color: "#444444", margin: 0, letterSpacing: "0.15em", textTransform: "uppercase" }}>Location</h4>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#888888" }}>
          Guelma, Algeria
        </div>
        <a href="mailto:info@novastyle.com" style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#888888", textDecoration: "none", marginTop: 8 }}>
          info@novastyle.com
        </a>
      </div>
    </div>
    
    <div style={{ borderTop: "1px solid #1A1A1A", paddingTop: 32, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#444444" }}>
        © {new Date().getFullYear()} NovaStyle
      </span>
      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#444444", textTransform: "uppercase", letterSpacing: "0.1em" }}>
        All Rights Reserved
      </span>
    </div>
  </footer>
);

export default function App() {
  return (
    <div style={{ background: "#000000", minHeight: "100vh" }}>
      <FontLoader />
      <Navbar />
      <SubtleBanner />
      <Hero />
      <Collection />
      <Footer />
      <style>{`
        body { 
          margin: 0; 
          background: #000000; 
          color: #FFFFFF; 
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        /* Elegant Minimal Scrollbar */
        ::-webkit-scrollbar { 
          width: 4px; 
        }
        ::-webkit-scrollbar-track { 
          background: #000000; 
        }
        ::-webkit-scrollbar-thumb { 
          background: #333333; 
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #666666;
        }
        
        ::selection { 
          background: #333333; 
          color: #FFFFFF; 
        }
        
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
}
