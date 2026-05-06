import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// ─── Google Fonts ──────────────────────────────────────────────────────────
const FontLoader = () => {
  useEffect(() => {
    const link = document.createElement("link");
    // Using ultra-bold, aggressive fonts
    link.href =
      "https://fonts.googleapis.com/css2?family=Oswald:wght@500;700&family=Space+Grotesk:wght@600;700&family=Teko:wght@600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);
  return null;
};

// ─── Data ────────────────────────────────────────────────────────────────
const COLLECTION = [
  {
    id: 1,
    title: "HEAVY HOODIE // 01",
    img: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&q=85",
    price: "$120",
    status: "IN STOCK",
  },
  {
    id: 2,
    title: "TACTICAL CARGO // 02",
    img: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&q=85",
    price: "$145",
    status: "LIMITED",
  },
  {
    id: 3,
    title: "GRAPHIC TEE // 03",
    img: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=800&q=85",
    price: "$65",
    status: "IN STOCK",
  },
  {
    id: 4,
    title: "UTILITY VEST // 04",
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=85",
    price: "$180",
    status: "SOLD OUT",
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
      padding: "20px 40px",
      background: "#000000",
      borderBottom: "4px solid #FFFFFF",
      textTransform: "uppercase",
    }}
  >
    <div
      style={{
        fontFamily: "'Teko', sans-serif",
        fontSize: 36,
        fontWeight: 700,
        color: "#FFFFFF",
        letterSpacing: "2px",
        lineHeight: 1,
      }}
    >
      NOVA<span style={{ color: "#FF0000" }}>STYLE</span>
    </div>
    <div className="hidden md:flex gap-10 items-center">
      {["Drop 01", "Archive", "Intel"].map((item) => (
        <a
          key={item}
          href={`#${item.toLowerCase()}`}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 16,
            fontWeight: 700,
            color: "#FFFFFF",
            textDecoration: "none",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.target.style.color = "#FF0000")}
          onMouseLeave={(e) => (e.target.style.color = "#FFFFFF")}
        >
          {item}
        </a>
      ))}
    </div>
  </nav>
);

// ─── Hero ────────────────────────────────────────────────────────────────
const Hero = () => {
  return (
    <section
      style={{
        height: "100vh",
        background: "#000000",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 40px",
        position: "relative",
        borderBottom: "4px solid #FFFFFF",
        overflow: "hidden",
      }}
    >
      {/* Massive Background Graphic */}
      <div
        style={{
          position: "absolute",
          right: -40,
          bottom: -40,
          fontFamily: "'Teko', sans-serif",
          fontSize: "30vw",
          color: "transparent",
          WebkitTextStroke: "2px #1A1A1A",
          lineHeight: 0.8,
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        RAW.
      </div>

      <div style={{ zIndex: 10 }}>
        <motion.h1
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: "linear" }}
          style={{
            fontFamily: "'Teko', sans-serif",
            fontSize: "clamp(80px, 15vw, 220px)",
            color: "#FFFFFF",
            lineHeight: 0.85,
            margin: 0,
            textTransform: "uppercase",
            letterSpacing: "2px",
          }}
        >
          URBAN <br />
          <span style={{ color: "#FF0000" }}>STREETWEAR</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 18,
            color: "#FFFFFF",
            maxWidth: 400,
            marginTop: 40,
            fontWeight: 700,
            borderLeft: "6px solid #FF0000",
            paddingLeft: 20,
            textTransform: "uppercase",
          }}
        >
          NO COMPROMISE. PURE INDUSTRIAL AESTHETICS. DESIGNED FOR THE STREETS.
        </motion.p>
        
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          style={{
            marginTop: 40,
            background: "#FFFFFF",
            color: "#000000",
            border: "4px solid #FFFFFF",
            padding: "16px 40px",
            fontFamily: "'Oswald', sans-serif",
            fontSize: 24,
            fontWeight: 700,
            cursor: "crosshair",
            textTransform: "uppercase",
            letterSpacing: "1px",
            transition: "all 0.1s",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "#FF0000";
            e.target.style.borderColor = "#FF0000";
            e.target.style.color = "#FFFFFF";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "#FFFFFF";
            e.target.style.borderColor = "#FFFFFF";
            e.target.style.color = "#000000";
          }}
          onClick={() =>
            document.getElementById("drop 01")?.scrollIntoView({ behavior: "smooth" })
          }
        >
          SHOP DROP 01
        </motion.button>
      </div>

      {/* Industrial HUD Elements */}
      <div
        className="hidden md:block"
        style={{
          position: "absolute",
          top: 140,
          right: 40,
          fontFamily: "'Space Grotesk', sans-serif",
          color: "#FFFFFF",
          fontSize: 14,
          fontWeight: 700,
          textAlign: "right",
          border: "2px solid #333",
          padding: "10px",
          background: "rgba(0,0,0,0.5)",
        }}
      >
        <div>LAT: 36.4620° N</div>
        <div>LON: 7.4283° E</div>
        <div style={{ color: "#FF0000", marginTop: 5 }}>[ SYSTEM ONLINE ]</div>
      </div>
      
      {/* Grid crosshairs */}
      <div style={{ position: "absolute", bottom: 40, right: 40, width: 40, height: 40, borderRight: "4px solid #FFF", borderBottom: "4px solid #FFF" }}></div>
    </section>
  );
};

// ─── Scrolling Warning Ticker ────────────────────────────────────────────
const Ticker = () => (
  <div
    style={{
      background: "#FF0000",
      padding: "12px 0",
      borderBottom: "4px solid #FFFFFF",
      overflow: "hidden",
      whiteSpace: "nowrap",
    }}
  >
    <motion.div
      animate={{ x: ["0%", "-50%"] }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      style={{
        display: "inline-block",
        fontFamily: "'Teko', sans-serif",
        fontSize: 36,
        fontWeight: 700,
        color: "#000000",
        letterSpacing: "3px",
      }}
    >
      {[...Array(12)].map((_, i) => (
        <span key={i} style={{ paddingRight: 40 }}>
          WARNING: HIGH VOLTAGE // NEW DROP AVAILABLE //
        </span>
      ))}
    </motion.div>
  </div>
);

// ─── Collection Grid ─────────────────────────────────────────────────────
const Collection = () => (
  <section id="drop 01" style={{ background: "#111111", padding: "100px 40px" }}>
    <h2
      style={{
        fontFamily: "'Teko', sans-serif",
        fontSize: "clamp(60px, 10vw, 120px)",
        color: "#FFFFFF",
        margin: "0 0 40px",
        lineHeight: 1,
        textTransform: "uppercase",
      }}
    >
      LATEST DROP.
    </h2>
    
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: 40,
      }}
    >
      {COLLECTION.map((item) => (
        <div
          key={item.id}
          style={{
            border: "4px solid #FFFFFF",
            background: "#000000",
            position: "relative",
          }}
        >
          {/* Price Tag */}
          <div
            style={{
              position: "absolute",
              top: -4,
              left: -4,
              background: "#FF0000",
              color: "#FFFFFF",
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 18,
              fontWeight: 700,
              padding: "8px 16px",
              zIndex: 2,
              border: "4px solid #FF0000",
            }}
          >
            {item.price}
          </div>
          
          {/* Status Tag */}
          <div
            style={{
              position: "absolute",
              top: 15,
              right: 15,
              color: item.status === "SOLD OUT" ? "#FF0000" : "#FFFFFF",
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 12,
              fontWeight: 700,
              zIndex: 2,
            }}
          >
            [{item.status}]
          </div>

          <div
            style={{
              overflow: "hidden",
              borderBottom: "4px solid #FFFFFF",
              aspectRatio: "3/4",
            }}
          >
            <motion.img
              whileHover={{ scale: 1.05, filter: "grayscale(0%) contrast(1.1)" }}
              transition={{ duration: 0.2 }}
              src={item.img}
              alt={item.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "grayscale(100%) contrast(1.2)",
              }}
            />
          </div>
          <div style={{ padding: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontSize: 26,
                color: "#FFFFFF",
                margin: 0,
                textTransform: "uppercase",
              }}
            >
              {item.title}
            </h3>
            <div style={{ width: 30, height: 30, border: "2px solid #FFFFFF", display: "flex", justifyContent: "center", alignItems: "center", color: "#FFF", fontWeight: 700 }}>+</div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

// ─── Brutalist Footer ────────────────────────────────────────────────────
const Footer = () => (
  <footer
    style={{
      background: "#000000",
      borderTop: "4px solid #FFFFFF",
      padding: "80px 40px",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: 60,
    }}
  >
    <div>
      <div
        style={{
          fontFamily: "'Teko', sans-serif",
          fontSize: 80,
          color: "#FFFFFF",
          lineHeight: 0.9,
        }}
      >
        NOVASTYLE
      </div>
      <p
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 16,
          fontWeight: 700,
          color: "#FFFFFF",
          marginTop: 20,
        }}
      >
        NO COMPROMISE STREETWEAR.
      </p>
    </div>
    
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <h4 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 24, color: "#FF0000", margin: "0 0 10px 0" }}>LINKS</h4>
      {["SHOP", "ABOUT", "TERMS", "CONTACT"].map(link => (
        <a key={link} href="#" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#FFFFFF", textDecoration: "none", fontWeight: 700 }}>{link}</a>
      ))}
    </div>

    <div style={{ textAlign: "left" }}>
      <h4 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 24, color: "#FF0000", margin: "0 0 10px 0" }}>HQ</h4>
      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 700, color: "#FFFFFF" }}>
        GUELMA, ALGERIA
      </div>
      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700, color: "#FFFFFF", marginTop: 20 }}>
        [ SYSTEM: SECURE ]
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div style={{ background: "#000000", minHeight: "100vh" }}>
      <FontLoader />
      <Navbar />
      <Hero />
      <Ticker />
      <Collection />
      <Footer />
      <style>{`
        body { 
          margin: 0; 
          background: #000000; 
          color: #FFFFFF; 
          cursor: crosshair; /* Industrial cursor */
        }
        
        /* Brutalist Scrollbar */
        ::-webkit-scrollbar { 
          width: 12px; 
        }
        ::-webkit-scrollbar-track { 
          background: #000000; 
          border-left: 2px solid #333; 
        }
        ::-webkit-scrollbar-thumb { 
          background: #FF0000; 
        }
        
        /* High Contrast Selection */
        ::selection { 
          background: #FF0000; 
          color: #000000; 
        }
        
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
}
