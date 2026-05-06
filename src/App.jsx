const fs = require('fs');

const filePath = 'c:\\Users\\Informatics\\OneDrive\\Documents\\GitHub\\nova-style\\NovaStyle_2.jsx';
let content = fs.readFileSync(filePath, 'utf-8');

// FontLoader
content = content.replace(
  /"https:\/\/fonts\.googleapis\.com\/css2\?family=Playfair\+Display[^"]+"/,
  '"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Oswald:wght@400;500;600;700&family=Syncopate:wght@400;700&display=swap"'
);

// Fonts
content = content.replace(/'Playfair Display', serif/g, "'Syncopate', sans-serif");
content = content.replace(/'Montserrat', sans-serif/g, "'Inter', sans-serif");

// Change some specific fonts to Oswald (like eyebrow texts, buttons)
content = content.replace(/fontFamily: "'Inter', sans-serif",\s+fontSize: (1[0123]|9),\s+fontWeight: 600,\s+letterSpacing/g, 'fontFamily: "\'Oswald\', sans-serif", fontSize: $1, fontWeight: 700, letterSpacing');
content = content.replace(/fontFamily: "'Inter', sans-serif",\s+fontSize: 11,\s+fontWeight: 600/g, 'fontFamily: "\'Oswald\', sans-serif", fontSize: 13, fontWeight: 700');

// Colors
content = content.replace(/#D4AF37/g, "#FFFFFF"); // Gold -> White
content = content.replace(/#F5E27A/g, "#EEEEEE"); // Light Gold -> Light Grey
content = content.replace(/#A0742A/g, "#777777"); // Dark Gold -> Grey
content = content.replace(/rgba\(212,175,55,/g, "rgba(255,255,255,"); // rgba Gold -> rgba White
content = content.replace(/background: "linear-gradient\(135deg, #EEEEEE 0%, #FFFFFF 40%, #777777 100%\)"/g, 'background: "#FFFFFF"'); // Simplify gradients for text
content = content.replace(/background: "linear-gradient\(135deg, #EEEEEE 0%, #FFFFFF 50%, #777777 100%\)"/g, 'background: "#FFFFFF"'); // Simplify gradients for buttons

// Snappier Animations (durations and easings)
content = content.replace(/duration: 0\.8/g, "duration: 0.4");
content = content.replace(/duration: 1\.4/g, "duration: 0.6");
content = content.replace(/duration: 0\.75/g, "duration: 0.3");
content = content.replace(/duration: 0\.9/g, "duration: 0.4");
content = content.replace(/duration: 1\.5/g, "duration: 0.6");
content = content.replace(/duration: 0\.7/g, "duration: 0.3");
content = content.replace(/duration: 0\.6/g, "duration: 0.3");
content = content.replace(/duration: 1/g, "duration: 0.4");
content = content.replace(/ease: \[0\.16, 1, 0\.3, 1\]/g, 'ease: "easeOut"');

// Names
content = content.replace(/GoldDivider/g, "MonochromeDivider");
content = content.replace(/GoldCursor/g, "UrbanCursor");
content = content.replace(/Gold corner accents/g, "Monochrome corner accents");

// Text changes
content = content.replace(/Where elegance meets identity/g, "WHERE STREET MEETS IDENTITY");
content = content.replace(/Each piece is a statement\. Crafted with precision, worn with intention\./g, "RAW. UNFILTERED. AUTHENTIC.");
content = content.replace(/"Fashion is not just what you wear — it is the language you speak before you say a word\."/g, '"THE STREETS ARE WATCHING. MAKE THEM STARE."');

// Button text color
content = content.replace(/color: "#050505",\s+background: "#FFFFFF",\s+border: "none",/g, 'color: "#000000", background: "#FFFFFF", border: "none", textTransform: "uppercase", fontWeight: 800,');

// Scrollbar color
content = content.replace(/background: #D4AF37;/g, "background: #FFFFFF;");

fs.writeFileSync('c:\\Users\\Informatics\\OneDrive\\Documents\\GitHub\\nova-style\\UrbanStyle.jsx', content, 'utf-8');
console.log("Transformed and written successfully");
