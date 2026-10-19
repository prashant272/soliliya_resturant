<!DOCTYPE html>
<html lang="en" class="scroll-smooth translated-ltr">
    <head>
        <script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "Restavracija Wilma",
  "description": "Restavracija v Ljubljani s slovensko kulinariko, poslovnimi kosili, zajtrki in večerjami.",
  "telephone": "+38640791618",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Dunajska cesta 106",
    "postalCode": "1000",
    "addressLocality": "Ljubljana",
    "addressCountry": "SI"
  },
  "servesCuisine": [
    "Slovenian",
    "Traditional Slovenian cuisine"
  ],
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "07:30",
      "closes": "22:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "08:30",
      "closes": "23:00"
    }
  ]
}
</script>

<script
    src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    async>
</script>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Wilma Restaurant | Ljubljana - Tastes of Slovenia &amp; Business Elegance</title>
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Font Awesome Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- Google Fonts -->
     <link rel="stylesheet" href="css/main.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;800&amp;family=Plus+Jakarta+Sans:wght@300;400;500;600;700&amp;display=swap" rel="stylesheet">
    <!-- QRCode.js Library -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>

    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        slovenia: {
                            green: '#2d5a27',
                            lightgreen: '#4a7c44',
                            sage: '#8fa382',
                            gold: '#d4af37',
                            cream: '#fcfbf7',
                            dark: '#1c241b',
                            charcoal: '#283227',
                        }
                    },
                    fontFamily: {
                        heading: ['Cinzel', 'serif'],
                        body: ['Plus Jakarta Sans', 'sans-serif'],
                    }
                }
            }
        }
    </script>
<style>
    /* ================= GLOBAL ================= */
    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      background-color: #fdfbf7;
      color: #1e2a1e;
      overflow-x: hidden;
    }
    
    .font-heading { font-family: 'Cinzel', serif; }
    
    /* ============================================================
       ✨ HERO SECTION — FULL ATTRACTIVE + 3D RESTAURANT LOOK
       ============================================================ */
    .bg-hero-pattern {
      background:

        url(images/hero.jpeg);
      background-size: cover;
      background-position: center;
      background-attachment: fixed;
      position: relative;
      perspective: 1400px;
      overflow: hidden;
      min-height: 72vh;
      padding-top: 4rem;
      padding-bottom: 4rem;
    }
    
    /* Animated gold + green glow blobs */
    .bg-hero-pattern::before {
      content: '';
      position: absolute;
      top: -30%; left: -15%;
      width: 85%; height: 130%;
      background: radial-gradient(circle, rgba(201,162,39,0.30) 0%, transparent 65%);
      border-radius: 50%;
      animation: floatGlow 9s ease-in-out infinite;
      pointer-events: none;
      filter: blur(20px);
    }
    .bg-hero-pattern::after {
      content: '';
      position: absolute;
      bottom: -30%; right: -15%;
      width: 75%; height: 110%;
      background: radial-gradient(circle, rgba(74,124,68,0.35) 0%, transparent 65%);
      border-radius: 50%;
      animation: floatGlow 12s ease-in-out infinite reverse;
      pointer-events: none;
      filter: blur(20px);
    }
    
    /* Rotating conic light beam */
    #home > div::before {
      content: '';
      position: absolute;
      top: 50%; left: 50%;
      width: 200%; height: 200%;
      background: conic-gradient(from 0deg,
        transparent 0deg,
        rgba(201,162,39,0.08) 60deg,
        transparent 120deg,
        rgba(201,162,39,0.06) 240deg,
        transparent 300deg);
      transform: translate(-50%, -50%);
      animation: rotateBeam 25s linear infinite;
      pointer-events: none;
      z-index: 0;
    }
    
    @keyframes floatGlow {
      0%,100% { transform: translate(0,0) scale(1); }
      50%     { transform: translate(5%,5%) scale(1.12); }
    }
    @keyframes rotateBeam {
      from { transform: translate(-50%,-50%) rotate(0deg); }
      to   { transform: translate(-50%,-50%) rotate(360deg); }
    }
    
    /* Hero content container — floating 3D card */
    #home .max-w-4xl {
      position: relative;
      z-index: 3;
      padding: 2.25rem 2rem;
      border-radius: 32px;
      background: rgba(20, 30, 20, 0.35);
      backdrop-filter: blur(2px);
      -webkit-backdrop-filter: blur(14px);
      border: 1px solid rgba(201, 162, 39, 0.35);
      box-shadow:
        0 30px 60px -20px rgba(0,0,0,0.5),
        0 0 0 1px rgba(255,255,255,0.06) inset,
        0 0 60px -10px rgba(201,162,39,0.25);
      transform-style: preserve-3d;
      transition: transform 0.7s cubic-bezier(0.23, 1, 0.32, 1),
                  box-shadow 0.7s ease;
      animation: heroFloat 6s ease-in-out infinite;
    }
    
    @keyframes heroFloat {
      0%,100% { transform: translateY(0) rotateY(0deg) rotateX(0deg); }
      50%     { transform: translateY(-10px) rotateY(1.5deg) rotateX(1deg); }
    }
    
    #home .max-w-4xl:hover {
      transform: translateY(-12px) rotateY(4deg) rotateX(3deg) scale(1.01);
      box-shadow:
        0 45px 80px -25px rgba(0,0,0,0.6),
        0 0 0 1px rgba(255,255,255,0.1) inset,
        0 0 80px -5px rgba(201,162,39,0.4);
      animation-play-state: paused;
    }
    
    /* Hero text colors on dark glass */
    #home h1 {
      color: #ffffff !important;
      text-shadow: 0 2px 20px rgba(0,0,0,0.5), 0 1px 0 rgba(0,0,0,0.3);
      letter-spacing: 0.02em;
      transform-style: preserve-3d;
      transition: transform 0.5s ease;
    }
    #home .max-w-4xl:hover h1 {
      transform: translateZ(30px);
    }
    
    #home h1 .text-slovenia-gold {
      background: linear-gradient(135deg, #ffffff 0%, #ffffff 50%, #ffffff 100%);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      display: inline-block;
      animation: goldShimmer 4s ease-in-out infinite;
      filter: drop-shadow(0 2px 8px rgba(201,162,39,0.5));
    }
    @keyframes goldShimmer {
      0%,100% { filter: drop-shadow(0 2px 8px rgba(201,162,39,0.5)); }
      50%     { filter: drop-shadow(0 2px 20px rgba(245,215,110,0.9)); }
    }
    
    #home p.text-gray-200 {
      color: rgba(255,255,255,0.88) !important;
      text-shadow: 0 1px 10px rgba(0,0,0,0.4);
      transition: transform 0.5s ease;
    }
    #home .max-w-4xl:hover p.text-gray-200 {
      transform: translateZ(20px);
    }
    
    /* Location pill on hero */
    #home .bg-slovenia-gold\/20 {
      background: rgba(201,162,39,0.15) !important;
      border: 1px solid rgba(201,162,39,0.55) !important;
      color: #f5d76e !important;
      backdrop-filter: blur(10px);
      box-shadow: 0 8px 24px -8px rgba(201,162,39,0.4);
      animation: pillPulse 3s ease-in-out infinite;
    }
    @keyframes pillPulse {
      0%,100% { box-shadow: 0 8px 24px -8px rgba(201,162,39,0.4); }
      50%     { box-shadow: 0 8px 32px -4px rgba(201,162,39,0.75); }
    }
    
    /* Highlight badge cards — 3D glass with hover lift */
    #home .bg-slovenia-dark\/60 {
      background: rgba(255,255,255,0.10) !important;
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      border: 1px solid rgba(201,162,39,0.30) !important;
      box-shadow: 0 10px 30px -12px rgba(0,0,0,0.4);
      transition: transform 0.5s cubic-bezier(0.23,1,0.32,1),
                  box-shadow 0.5s ease,
                  border-color 0.4s ease;
      transform-style: preserve-3d;
      will-change: transform;
    }
    #home .bg-slovenia-dark\/60:hover {
      transform: translateY(-8px) rotateX(6deg) rotateY(-4deg) scale(1.05);
      border-color: rgba(201,162,39,0.8) !important;
      box-shadow:
        0 25px 45px -15px rgba(0,0,0,0.5),
        0 0 40px -8px rgba(201,162,39,0.6);
    }
    #home .bg-slovenia-dark\/60 h4 { color: #ffffff !important; }
    #home .bg-slovenia-dark\/60 p  { color: rgba(255,255,255,0.75) !important; }
    #home .bg-slovenia-dark\/60 i  {
      transition: transform 0.5s ease;
      filter: drop-shadow(0 0 8px rgba(201,162,39,0.5));
    }
    #home .bg-slovenia-dark\/60:hover i {
      transform: scale(1.25) rotate(-8deg);
    }
    
    /* Hero CTA buttons */
    #home a[href="#booking"],
    #home a[href="#menu"] {
      position: relative;
      overflow: hidden;
      transition: transform 0.4s cubic-bezier(0.23,1,0.32,1),
                  box-shadow 0.4s ease;
      transform-style: preserve-3d;
    }
    #home a[href="#booking"]:hover {
      transform: translateY(-5px) translateZ(20px) scale(1.04);
      box-shadow: 0 22px 40px -12px rgba(201,162,39,0.7),
                  0 0 40px -6px rgba(201,162,39,0.5);
    }
    #home a[href="#menu"]:hover {
      transform: translateY(-5px) translateZ(20px) scale(1.04);
      box-shadow: 0 22px 40px -12px rgba(255,255,255,0.3);
    }
    
    /* ================= GLASS CARD ================= */
    .glass-card {
      background: rgba(255,255,255,0.82);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(201,162,39,0.22);
      border-radius: 20px;
    }
    
    /* ================= PRINTABLE PASS ================= */
    .printable-pass {
      background: radial-gradient(circle at top right, #fdfbf7, #f4efe6);
    }
    
    /* ============================================================
       ✨ ALL BUTTONS HOVER (3D)
       ============================================================ */
    button,
    a.btn-gold,
    a[href^="#booking"],
    a[href^="tel"],
    .menu-filter-btn {
      transition: transform 0.4s cubic-bezier(0.23,1,0.32,1),
                  box-shadow 0.4s ease,
                  color 0.3s ease,
                  border-color 0.3s ease;
      will-change: transform;
      position: relative;
      overflow: hidden;
      transform-style: preserve-3d;
    }
    
    button::after,
    a.btn-gold::after {
      content: '';
      position: absolute;
      top: 0; left: -75%;
      width: 50%; height: 100%;
      background: linear-gradient(120deg, transparent, rgba(255,255,255,0.5), transparent);
      transform: skewX(-20deg);
      transition: left 0.7s ease;
      pointer-events: none;
    }
    button:hover::after,
    a.btn-gold:hover::after { left: 125%; }
    
    button:hover,
    a.btn-gold:hover,
    .menu-filter-btn:hover {
      transform: translateY(-4px) translateZ(15px);
      box-shadow: 0 18px 32px -12px rgba(201,162,39,0.55);
    }
    button:active,
    a.btn-gold:active { transform: translateY(-1px) scale(0.98); }
    
    /* Gold buttons */
    .btn-gold,
    button[type="submit"],
    .bg-slovenia-gold {
      background: #c9a227 !important;
      color: #1e2a1e !important;
      font-weight: 600;
      box-shadow: 0 4px 14px rgba(201,162,39,0.28);
    }
    .btn-gold:hover,
    button[type="submit"]:hover,
    .bg-slovenia-gold:hover {
      box-shadow: 0 20px 38px -12px rgba(201,162,39,0.7);
      transform: translateY(-4px) translateZ(15px) scale(1.02);
    }
    
    /* Green/dark buttons */
    .bg-slovenia-green:hover {
      transform: translateY(-4px) translateZ(15px);
      box-shadow: 0 18px 34px -12px rgba(45,90,39,0.55);
    }
    
    /* Phone pill */
    a[href^="tel"]:hover {
      border-color: #c9a227 !important;
      transform: translateY(-3px) translateZ(10px);
    }
    
    /* Filter buttons */
    .menu-filter-btn { border: 1px solid transparent; }
    .menu-filter-btn:hover {
      border-color: #c9a227 !important;
      color: #2d5a27 !important;
      transform: translateY(-3px) translateZ(10px);
    }
    
    /* ============================================================
       ✨ ALL IMAGES HOVER (3D)
       ============================================================ */
    img {
      transition: transform 0.6s cubic-bezier(0.23,1,0.32,1),
                  box-shadow 0.5s ease,
                  filter 0.5s ease;
      will-change: transform;
      border-radius: inherit;
    }
    
    section img:not([alt*="logo" i]):not([alt*="Logo"]):hover {
      transform: perspective(900px) rotateY(-4deg) rotateX(3deg) scale(1.07);
      box-shadow: 0 28px 50px -18px rgba(0,0,0,0.35),
                  0 0 40px -10px rgba(201,162,39,0.3);
      filter: brightness(1.08) saturate(1.12);
      z-index: 2;
      position: relative;
    }
    
    #about .grid img:hover,
    #gallery img:hover {
      transform: perspective(900px) rotateY(-5deg) rotateX(3deg) scale(1.08);
      box-shadow: 0 30px 55px -18px rgba(45,90,39,0.35);
      filter: brightness(1.08) saturate(1.15);
    }
    
    /* ============================================================
       ✨ CARD CONTAINERS HOVER (3D)
       ============================================================ */
    .menu-card {
      background: #ffffff !important;
      border: 1px solid #ede8dd !important;
      transition: transform 0.5s cubic-bezier(0.23,1,0.32,1),
                  box-shadow 0.5s ease,
                  border-color 0.3s ease;
      transform-style: preserve-3d;
      will-change: transform;
      box-shadow: 0 4px 14px rgba(0,0,0,0.03);
      border-radius: 20px;
      position: relative;
      overflow: hidden;
    }
    .menu-card::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(201,162,39,0.08), transparent 60%);
      opacity: 0;
      transition: opacity 0.4s ease;
      pointer-events: none;
    }
    .menu-card:hover::before { opacity: 1; }
    .menu-card:hover {
      transform: translateY(-10px) rotateX(3deg) rotateY(2deg) scale(1.03);
      box-shadow: 0 30px 50px -18px rgba(45,90,39,0.28),
                  0 0 30px -8px rgba(201,162,39,0.25);
      border-color: #c9a227 !important;
    }
    .menu-card h3 { color: #1e2a1e; transition: color 0.3s ease; }
    .menu-card:hover h3 { color: #c9a227; }
    .menu-card p  { color: #5a6b5a !important; }
    .menu-card .text-slovenia-sage { color: #8fa382 !important; }
    .menu-card .bg-slovenia-green\/40 {
      background: #f0f5ee !important;
      color: #2d5a27 !important;
    }
    
    /* Booking form card */
    #booking .bg-white.rounded-3xl {
      transition: transform 0.5s cubic-bezier(0.23,1,0.32,1),
                  box-shadow 0.5s ease;
    }
    #booking .bg-white.rounded-3xl:hover {
      transform: translateY(-6px) translateZ(20px);
      box-shadow: 0 35px 65px -22px rgba(45,90,39,0.28),
                  0 0 40px -10px rgba(201,162,39,0.2);
    }
    
    /* Contact cards */
    #contact .bg-slovenia-cream,
    #contact .bg-white.rounded-3xl,
    #contact .rounded-3xl {
      transition: transform 0.5s cubic-bezier(0.23,1,0.32,1),
                  box-shadow 0.5s ease,
                  border-color 0.3s ease;
    }
    #contact .bg-slovenia-cream:hover,
    #contact .bg-white.rounded-3xl:hover {
      transform: translateY(-6px) translateZ(20px) rotateX(2deg);
      box-shadow: 0 30px 55px -20px rgba(45,90,39,0.25);
      border-color: rgba(201,162,39,0.6);
    }
    
    /* About quote card */
    #about .bg-slovenia-green {
      transition: transform 0.5s ease, box-shadow 0.5s ease;
    }
    #about .bg-slovenia-green:hover {
      transform: translateY(-6px) rotate(-1deg) translateZ(20px);
      box-shadow: 0 30px 55px -20px rgba(45,90,39,0.5),
                  0 0 40px -10px rgba(201,162,39,0.3);
    }
    
    /* Header */
    header a { transition: all 0.3s ease; }
    header a:hover { color: #c9a227 !important; }
    
    /* Booking radio label cards */
    #bookingForm label {
      transition: transform 0.35s ease, box-shadow 0.35s ease,
                  border-color 0.3s ease;
    }
    #bookingForm label:hover {
      transform: translateY(-4px) translateZ(10px);
      box-shadow: 0 16px 30px -14px rgba(45,90,39,0.28);
      border-color: #c9a227 !important;
    }
    
    /* Chat widget */
    .chat-widget button:first-child {
      transition: transform 0.4s ease, box-shadow 0.4s ease;
    }
    .chat-widget button:first-child:hover {
      transform: scale(1.15) rotate(-6deg);
      box-shadow: 0 0 0 10px rgba(201,162,39,0.18),
                  0 18px 34px -12px rgba(45,90,39,0.55);
    }
    
    /* Modal */
    #bookingModal .bg-white.rounded-3xl {
      animation: modalPop 0.4s cubic-bezier(0.23,1,0.32,1);
    }
    @keyframes modalPop {
      from { opacity: 0; transform: scale(0.92) translateY(16px) rotateX(-6deg); }
      to   { opacity: 1; transform: scale(1) translateY(0) rotateX(0deg); }
    }
    
    /* Footer links */
    footer a {
      transition: color 0.3s ease, transform 0.3s ease;
      display: inline-block;
    }
    footer a:hover {
      color: #c9a227 !important;
      transform: translateY(-3px);
    }
    
    /* ================= SMALL UTILITIES ================= */
    span.font-size { font-size: 9px; text-align: center; }
    .slovenia-font  { font-size: 10px; }
    .padding-3      { padding: 3px; }
    
    /* ============================================================
       ✨ RESPONSIVE
       ============================================================ */
    @media (max-width: 1024px) {
      #home h1 { font-size: 3rem; }
      .bg-hero-pattern { background-attachment: scroll; }
    }
    
    @media (max-width: 768px) {
      #home .max-w-4xl {
        padding: 1.75rem 1.25rem;
        animation: none;
      }
      #home .max-w-4xl:hover,
      #home .bg-slovenia-dark\/60:hover,
      #home a[href="#booking"]:hover,
      #home a[href="#menu"]:hover {
        transform: translateY(-3px) !important;
      }
      .menu-card:hover,
      #about .grid img:hover,
      #gallery img:hover,
      section img:not([alt*="logo" i]):hover {
        transform: translateY(-3px) scale(1.02) !important;
      }
      button:hover,
      a.btn-gold:hover {
        transform: translateY(-2px) !important;
      }
      #contact .bg-slovenia-cream:hover,
      #contact .bg-white.rounded-3xl:hover,
      #booking .bg-white.rounded-3xl:hover {
        transform: translateY(-3px) !important;
      }
      .bg-hero-pattern {
        min-height: 65vh;
        background-attachment: scroll;
        padding-top: 3rem;
        padding-bottom: 3rem;
      }
      #home h1 { font-size: 2.3rem; }
      #home > div::before { animation: none; }
    }
    
    @media (max-width: 480px) {
      .bg-hero-pattern {
        min-height: 60vh;
        padding-top: 2.5rem;
        padding-bottom: 2.5rem;
      }
      #home .max-w-4xl { padding: 1.25rem 1rem; border-radius: 22px; }
      #home h1 { font-size: 1.85rem; }
      #home p.text-gray-200 { font-size: 0.92rem; }
      .menu-card { border-radius: 16px; }
      button, a.btn-gold { font-size: 0.85rem; }
    }
    
    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.001ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.001ms !important;
      }
    }
    
    /* Hide Google Translate junk */
    .skiptranslate,
    .goog-te-banner-frame { display: none !important; }
    body { top: 0 !important; }

    /* ============================================================
   ✨ COMING SOON POPUP — SIMPLE & LIGHT
   ============================================================ */
#comingSoonPopup {
  display: none;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 9999;
}
#comingSoonPopup.flex,
#comingSoonPopup.show {
  display: flex;
  opacity: 1;
}

/* Popup card */
#comingSoonPopup > div {
  position: relative;
  background: #ffffff;
  border: 1px solid #ede8dd;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 50px -15px rgba(0,0,0,0.15);
  animation: popupIn 0.35s ease;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

@keyframes popupIn {
  from { opacity: 0; transform: translateY(20px) scale(0.96); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}

#comingSoonPopup > div:hover {
  transform: translateY(-3px);
  box-shadow: 0 25px 55px -15px rgba(0,0,0,0.2);
}

/* Close (X) button */
#closeComingSoon {
  transition: color 0.3s ease, border-color 0.3s ease;
}
#closeComingSoon:hover {
  border-color: #c9a227;
  color: #2d5a27;
}

/* Icon circle */
#comingSoonPopup > div > div:nth-of-type(1) {
  background: #f0f5ee;
  border: 1px solid #c9a227;
  transition: transform 0.3s ease;
}
#comingSoonPopup > div > div:nth-of-type(1):hover {
  transform: scale(1.05);
}

/* Brand text */
#comingSoonPopup p.text-slovenia-gold:first-of-type {
  color: #c9a227 !important;
}

/* Heading */
#comingSoonPopup h2 {
  color: #1e2a1e;
}
#comingSoonPopup h2 span.text-slovenia-gold {
  color: #c9a227 !important;
}

/* Description */
#comingSoonPopup p.text-gray-300 {
  color: #5a6b5a !important;
}

/* Decorative line */
#comingSoonPopup .bg-slovenia-gold {
  background: #c9a227 !important;
}

/* Location */
#comingSoonPopup p.text-gray-400 {
  color: #8fa382 !important;
}

/* Follow us button */
#comingSoonOkay {
  background: #c9a227;
  color: #1e2a1e;
  font-weight: 700;
  transition: transform 0.3s ease;
}
#comingSoonOkay:hover {
  transform: translateY(-2px);
}

/* Backdrop */
#comingSoonPopup.bg-black\/80 {
  background: rgba(0, 0, 0, 0.55) !important;
  backdrop-filter: blur(4px);
}

/* Responsive */
@media (max-width: 640px) {
  #comingSoonPopup > div {
    padding: 1.75rem 1.25rem !important;
    border-radius: 18px !important;
  }
  #comingSoonPopup h2 { font-size: 1.6rem !important; }
}




/* Signup modal ki maximum height */
#authModal > div {
    height: auto;
    max-height: 90vh;
    max-height: 90dvh;
    display: flex;
    flex-direction: column;
    min-height: 0;
}

/* Header aur tabs apni jagah rahenge */
#authModal > div > div:first-child,
#authModal > div > div:nth-child(2) {
    flex-shrink: 0;
}

/* Signup form ke andar scrolling */
#signupForm {
    flex: 1 1 auto;
    min-height: 0;
    max-height: calc(90vh - 180px);
    max-height: calc(90dvh - 180px);
    overflow-y: scroll !important;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    overscroll-behavior-y: contain;
}

/* Scrollbar styling */
#signupForm::-webkit-scrollbar {
    width: 6px;
}

#signupForm::-webkit-scrollbar-thumb {
    background: #aaa;
    border-radius: 10px;
}

/* ============================================================
   ✨ REMOVE ALL HOVER BACKGROUNDS (User Request)
   ============================================================ */
button:hover,
a.btn-gold:hover,
a[href^="#booking"]:hover,
a[href^="tel"]:hover,
.menu-filter-btn:hover,
.bg-slovenia-gold:hover,
button[type="submit"]:hover,
.bg-slovenia-green:hover,
header a:hover,
footer a:hover,
#bookingForm label:hover,
#about .bg-slovenia-green:hover,
.menu-card:hover,
#home a[href="#booking"]:hover,
#home a[href="#menu"]:hover,
#home .bg-slovenia-dark\/60:hover {
  background: inherit !important;
  background-color: transparent !important;
}
</style>
</head>

<body class="antialiased flex flex-col min-h-screen" style="">

    <!-- Navigation Bar -->
   <?php include ('header.php'); ?>
    <!-- Combined Auth Modal (Login / Signup) -->
    <div id="authModal" class="fixed inset-0 z-[10000] items-center justify-center bg-black/70 backdrop-blur-sm hidden">
        <div class="relative w-full max-w-md mx-4 bg-white rounded-3xl shadow-2xl overflow-hidden">
            <!-- Modal Header -->
            <div class="bg-slovenia-dark text-white p-6 text-center relative">
                <button onclick="closeAuthModal()" class="absolute top-4 right-4 text-gray-400 hover:text-white p-2">
                    <i class="fa-solid fa-xmark text-lg"></i>
                </button>
                <div class="w-14 h-14 bg-slovenia-gold text-slovenia-dark rounded-full flex items-center justify-center mx-auto mb-3">
                    <i class="fa-solid fa-user text-2xl"></i>
                </div>
                <h3 id="authTitle" class="font-heading text-xl font-bold"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Welcome Back</font></font></h3>
                <p id="authSubtitle" class="text-xs text-slovenia-sage mt-1"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Login to your Wilma account</font></font></p>
            </div>

            <!-- Toggle Tabs -->
            <div class="flex border-b border-gray-200">
                <button id="loginTab" onclick="switchAuthTab('login')" class="flex-1 py-3 text-sm font-bold text-slovenia-green border-b-2 border-slovenia-green bg-green-50 transition-all">
                    <i class="fa-solid fa-right-to-bracket mr-2"></i><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Login</font></font>
                </button>
                <button id="signupTab" onclick="switchAuthTab('signup')" class="flex-1 py-3 text-sm font-bold text-gray-500 border-b-2 border-transparent hover:text-slovenia-green hover:bg-gray-50 transition-all">
                    <i class="fa-solid fa-user-plus mr-2"></i><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Sign Up</font></font>
                </button>
            </div>

            <!-- Login Form -->
            <form id="loginForm" onsubmit="handleLogin(event)" class="p-6 space-y-4">
                <div>
                    <label class="block text-xs font-bold uppercase text-gray-700 mb-1"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Email Address</font></font></label>
                    <div class="relative">
                        <i class="fa-solid fa-envelope absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                        <input type="email" required placeholder="your@email.com" class="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-slovenia-green focus:outline-none text-sm">
                    </div>
                </div>
                <div>
                    <label class="block text-xs font-bold uppercase text-gray-700 mb-1"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Password</font></font></label>
                    <div class="relative">
                        <i class="fa-solid fa-lock absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                        <input type="password" required placeholder="••••••••" class="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-slovenia-green focus:outline-none text-sm">
                    </div>
                </div>
                <div class="flex items-center justify-between text-xs">
                    <a href="#" class="text-slovenia-green hover:text-slovenia-gold font-medium"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Forgot Password?</font></font></a>
                </div>
                <button type="submit" class="w-full py-3 bg-slovenia-green hover:bg-slovenia-lightgreen text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2">
                    <i class="fa-solid fa-right-to-bracket"></i><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Login</font></font>
                </button>
                <p class="text-center text-xs text-gray-500">
                    <font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Don't have an account? </font></font>
                    <button type="button" onclick="switchAuthTab('signup')" class="text-slovenia-green hover:text-slovenia-gold font-bold"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Sign Up</font></font></button>
                </p>
            </form>

            <!-- Signup Form -->
            <form id="signupForm" onsubmit="handleSignup(event)" class="p-6 space-y-4 hidden">
                <div>
                    <label class="block text-xs font-bold uppercase text-gray-700 mb-1"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Full Name</font></font></label>
                    <div class="relative">
                        <i class="fa-solid fa-user absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                        <input type="text" required placeholder="Janez Novak" class="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-slovenia-green focus:outline-none text-sm">
                    </div>
                </div>
                <div>
                    <label class="block text-xs font-bold uppercase text-gray-700 mb-1"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Email Address</font></font></label>
                    <div class="relative">
                        <i class="fa-solid fa-envelope absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                        <input type="email" required placeholder="your@email.com" class="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-slovenia-green focus:outline-none text-sm">
                    </div>
                </div>
                <div>
                    <label class="block text-xs font-bold uppercase text-gray-700 mb-1"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Phone Number</font></font></label>
                    <div class="relative">
                        <i class="fa-solid fa-phone absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                        <input type="tel" required placeholder="040 123 456" class="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-slovenia-green focus:outline-none text-sm">
                    </div>
                </div>
                <div>
                    <label class="block text-xs font-bold uppercase text-gray-700 mb-1"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Password</font></font></label>
                    <div class="relative">
                        <i class="fa-solid fa-lock absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                        <input type="password" required placeholder="••••••••" class="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-slovenia-green focus:outline-none text-sm">
                    </div>
                </div>
                <div>
                    <label class="block text-xs font-bold uppercase text-gray-700 mb-1"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Confirm Password</font></font></label>
                    <div class="relative">
                        <i class="fa-solid fa-lock absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                        <input type="password" required placeholder="••••••••" class="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-slovenia-green focus:outline-none text-sm">
                    </div>
                </div>
                <button type="submit" class="w-full py-3 bg-slovenia-gold hover:bg-yellow-500 text-slovenia-dark font-bold rounded-xl transition-all flex items-center justify-center gap-2">
                    <i class="fa-solid fa-user-plus"></i><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Create Account</font></font>
                </button>
                <p class="text-center text-xs text-gray-500">
                    <font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Already have an account? </font></font>
                    <button type="button" onclick="switchAuthTab('login')" class="text-slovenia-green hover:text-slovenia-gold font-bold"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Login</font></font></button>
                </p>
            </form>
        </div>
    </div>

   
    <!-- Hero Section -->
    <section id="home" class="relative min-h-[90vh] bg-hero-pattern flex items-center justify-center text-white px-4 py-20">
        <div class="max-w-4xl mx-auto text-center space-y-6">
            <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slovenia-gold/20 border border-slovenia-gold/40 backdrop-blur-md text-slovenia-gold text-xs uppercase tracking-widest font-semibold">
                <i class="fa-solid fa-location-dot"></i><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Vienna Street 106, Ljubljana
            </font></font></div>

            <h1 class="font-heading text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-tight"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">
                Tastes of Slovenia &amp; </font></font><span class="text-slovenia-gold"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Business Elegance</font></font></span>
            </h1>

            <p class="text-lg sm:text-xl text-gray-200 font-light max-w-2xl mx-auto leading-relaxed"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">
                Welcome to Wilma Restaurant. The perfect place for business lunches, meetings, breakfasts, relaxed dinners and top-notch Slovenian flavors.
            </font></font></p>

            <div class="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="#booking" class="w-full sm:w-auto px-8 py-4 bg-slovenia-gold hover:bg-yellow-500 text-slovenia-dark font-bold rounded-xl shadow-lg transition-all text-base transform hover:-translate-y-0.5">
                    <i class="fa-solid fa-calendar-check mr-2"></i><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Book a Table / 
                </font></font></a>
                <a href="#menu" class="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl backdrop-blur-md border border-white/30 transition-all text-base">
                    <i class="fa-solid fa-book-open mr-2"></i><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">View Menu
                </font></font></a>
            </div>

            <!-- Highlights Badges -->
            <div class="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-left max-w-3xl mx-auto">
                <div class="bg-slovenia-dark/60 backdrop-blur-md p-3.5 rounded-xl border border-white/10 flex items-center gap-3">
                    <i class="fa-solid fa-briefcase text-slovenia-gold text-xl"></i>
                    <div>
                        <h4 class="text-xs font-bold uppercase"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Corporate</font></font></h4>
                        <p class="text-[11px] text-gray-300"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Meetings &amp; Lunches</font></font></p>
                    </div>
                </div>
                <div class="bg-slovenia-dark/60 backdrop-blur-md p-3.5 rounded-xl border border-white/10 flex items-center gap-3">
                    <i class="fa-solid fa-champagne-glasses text-slovenia-gold text-xl"></i>
                    <div>
                        <h4 class="text-xs font-bold uppercase"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Private</font></font></h4>
                        <p class="text-[11px] text-gray-300"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Parties &amp; Dinners</font></font></p>
                    </div>
                </div>
                <div class="bg-slovenia-dark/60 backdrop-blur-md p-3.5 rounded-xl border border-white/10 flex items-center gap-3">
                    <i class="fa-solid fa-mug-hot text-slovenia-gold text-xl"></i>
                    <div>
                        <h4 class="text-xs font-bold uppercase"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Breakfast</font></font></h4>
                        <p class="text-[11px] text-gray-300"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Coffee &amp; Freshness</font></font></p>
                    </div>
                </div>
                <div class="bg-slovenia-dark/60 backdrop-blur-md p-3.5 rounded-xl border border-white/10 flex items-center gap-3">
                    <i class="fa-solid fa-wine-glass text-slovenia-gold text-xl"></i>
                    <div>
                        <h4 class="text-xs font-bold uppercase"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Drink</font></font></h4>
                        <p class="text-[11px] text-gray-300"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Slovenian Wines</font></font></p>
                    </div>
                </div>
            </div>

        </div>
    </section>

    <!-- About Us Section -->
    <section id="about" class="py-20 px-4 max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            <!-- Left Info Block -->
            <div class="space-y-6">
                <div class="inline-block px-3 py-1 bg-slovenia-green/10 text-slovenia-green font-semibold text-xs tracking-widest rounded-full uppercase"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">
                    About Wilma Restaurant
                </font></font></div>
                <h2 class="font-heading text-3xl sm:text-4xl font-bold text-slovenia-dark leading-tight"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">
                    Your First Choice for Business and Private Meetings in Ljubljana
                </font></font></h2>
                <p class="text-gray-600 leading-relaxed"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">
                    Restaurant </font></font><strong><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Wilma</font></font></strong><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;"> is located in a prime location at Dunajska cesta 106 in Ljubljana. We offer the perfect balance between top-notch Slovenian cuisine and a modern ambiance, suitable for business meetings, relaxed lunches, and formal dinners.
                </font></font></p>
                <p class="text-gray-600 leading-relaxed"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">
                    Whether you are planning a quick business breakfast, a presentation for clients (2 to 8 people or more), or an evening gathering over a glass of selected Slovenian wine, Wilma guarantees top-notch service and unforgettable flavors.
                </font></font></p>

                <!-- Features list -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div class="flex items-start gap-3">
                        <div class="w-8 h-8 rounded-full bg-slovenia-gold/20 text-slovenia-green flex items-center justify-center shrink-0">
                            <i class="fa-solid fa-check text-xs"></i>
                        </div>
                        <div>
                            <h4 class="font-semibold text-sm text-slovenia-dark"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Business Meetings</font></font></h4>
                            <p class="text-xs text-gray-500"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Tables for 2, 4 or 8 people with your peace of mind.</font></font></p>
                        </div>
                    </div>
                    <div class="flex items-start gap-3">
                        <div class="w-8 h-8 rounded-full bg-slovenia-gold/20 text-slovenia-green flex items-center justify-center shrink-0">
                            <i class="fa-solid fa-check text-xs"></i>
                        </div>
                        <div>
                            <h4 class="font-semibold text-sm text-slovenia-dark"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Traditional Flavors</font></font></h4>
                            <p class="text-xs text-gray-500"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Carniolan sausage, Štruklji and local dishes.</font></font></p>
                        </div>
                    </div>
                    <div class="flex items-start gap-3">
                        <div class="w-8 h-8 rounded-full bg-slovenia-gold/20 text-slovenia-green flex items-center justify-center shrink-0">
                            <i class="fa-solid fa-check text-xs"></i>
                        </div>
                        <div>
                            <h4 class="font-semibold text-sm text-slovenia-dark"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Quick Online Booking</font></font></h4>
                            <p class="text-xs text-gray-500"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Instant confirmation card with QR code.</font></font></p>
                        </div>
                    </div>
                    <div class="flex items-start gap-3">
                        <div class="w-8 h-8 rounded-full bg-slovenia-gold/20 text-slovenia-green flex items-center justify-center shrink-0">
                            <i class="fa-solid fa-check text-xs"></i>
                        </div>
                        <div>
                            <h4 class="font-semibold text-sm text-slovenia-dark"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Parking &amp; Access</font></font></h4>
                            <p class="text-xs text-gray-500"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Easy access on Dunajska cesta.</font></font></p>
                        </div>
                    </div>
                </div>

                <div class="pt-4 border-t border-gray-200 flex items-center gap-6">
                    <div>
                        <span class="block text-2xl font-bold font-heading text-slovenia-green"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">100%</font></font></span>
                        <span class="text-xs text-gray-500"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Local Ingredients</font></font></span>
                    </div>
                    <div class="h-8 w-px bg-gray-200"></div>
                    <div>
                        <span class="block text-2xl font-bold font-heading text-slovenia-green"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">040 791 618</font></font></span>
                        <span class="text-xs text-gray-500"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Direct Reservation Line</font></font></span>
                    </div>
                </div>

            </div>

            <!-- Right Image Cards -->
            <div class="grid grid-cols-2 gap-4 relative">
                <div class="space-y-4">
                    <img src="images/food.jpeg" alt="Wilma Interior" class="rounded-2xl shadow-md object-cover h-64 w-full">
                    <img src="images/hero.jpeg" alt="Slovenian Wine" class="rounded-2xl shadow-md object-cover h-48 w-full">
                </div>
                <div class="space-y-4 pt-8">
                    <img src="images/food3.jpeg" alt="Delicious Cuisine" class="rounded-2xl shadow-md object-cover h-48 w-full">
                    <div class="bg-slovenia-green text-white p-6 rounded-2xl shadow-lg flex flex-col justify-between  hover:text-black transition-colors duration-300">
                        <i class="fa-solid fa-quote-left text-2xl text-slovenia-gold"></i>
                        <p class="text-xs font-light italic my-2"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit; ">"Top-notch service and an exceptional environment for our business partners!"</font></font></p>
                        <span class="text-[11px] font-bold text-slovenia-gold"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">— Ljubljana Business Club</font></font></span>
                    </div>
                </div>
            </div>

        </div>
    </section>

    <!-- Menu Section -->
    <section id="menu" class="py-20 bg-white text-black">
        <div class="max-w-7xl mx-auto px-4">

            <div class="text-center max-w-3xl mx-auto space-y-4 mb-12">
                <span class="inline-block bg-slovenia-green/10 text-slovenia-dark uppercase tracking-widest text-xs font-semibold px-5 py-2 rounded-full"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Our Offer</font></font></span>
                <h2 class="font-heading text-3xl sm:text-5xl font-bold text-black"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Authentic Slovenian Flavors</font></font></h2>
                <p class="text-gray-600 text-sm"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Prepared with fresh local ingredients and the passion of our chefs.</font></font></p>

                <!-- Category Filter Buttons -->
                <div class="flex flex-wrap justify-center gap-2 pt-6" id="menuFilters">
                    <button onclick="filterMenu('all')" class="menu-filter-btn active bg-slovenia-gold text-slovenia-dark font-semibold px-4 py-2 rounded-full text-xs transition-all"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">All
                        </font></font></button>
                    <button onclick="filterMenu('breakfast')" class="menu-filter-btn bg-slovenia-charcoal text-gray-300 hover:text-white px-4 py-2 rounded-full text-xs transition-all"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Breakfast
                        </font></font></button>
                    <button onclick="filterMenu('lunch')" class="menu-filter-btn bg-slovenia-charcoal text-gray-300 hover:text-white px-4 py-2 rounded-full text-xs transition-all"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Lunch
                        </font></font></button>
                    <button onclick="filterMenu('dinner')" class="menu-filter-btn bg-slovenia-charcoal text-gray-300 hover:text-white px-4 py-2 rounded-full text-xs transition-all"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Dinner
                        </font></font></button>
                    <button onclick="filterMenu('drinks')" class="menu-filter-btn bg-slovenia-charcoal text-gray-300 hover:text-white px-4 py-2 rounded-full text-xs transition-all"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Drinks &amp; Wines</font></font></button>
                    <button onclick="filterMenu('corporate')" class="menu-filter-btn bg-slovenia-charcoal text-gray-300 hover:text-white px-4 py-2 rounded-full text-xs transition-all"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Business Packages</font></font></button>
                </div>
            </div>

            <!-- Menu Cards Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="menuContainer">

                <!-- Menu Item 1 -->
                <div class="menu-card bg-slovenia-charcoal/80 rounded-2xl p-5 border border-white/5 hover:border-slovenia-gold/40 transition-all group flex flex-col justify-between" data-category="lunch dinner">
                    <div>
                        <div class="flex justify-between items-start mb-2">
                            <h3 class="font-heading font-semibold text-lg text-white group-hover:text-slovenia-gold transition-colors"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">
                                Carniolan Sausage</font></font></h3>
                            <span class="text-slovenia-gold font-bold text-lg"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">€12.50</font></font></span>
                        </div>
                        <p class="text-xs text-gray-400 mb-4"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Traditional Carniolan sausage with horseradish, homemade mustard and fresh bread.</font></font></p>
                    </div>
                    <div class="flex items-center justify-between text-[11px] text-slovenia-sage pt-3 border-t border-white/10">
                        <span><i class="fa-solid fa-leaf mr-1"></i><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Traditional Dish</font></font></span>
                        <span class="bg-slovenia-green/40 text-slovenia-gold px-2 py-0.5 rounded"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Gluten-Free Opt</font></font></span>
                    </div>
                </div>

                <!-- Menu Item 2 -->
                <div class="menu-card bg-slovenia-charcoal/80 rounded-2xl p-5 border border-white/5 hover:border-slovenia-gold/40 transition-all group flex flex-col justify-between" data-category="lunch dinner">
                    <div>
                        <div class="flex justify-between items-start mb-2">
                            <h3 class="font-heading font-semibold text-lg text-white group-hover:text-slovenia-gold transition-colors"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">
                                Idrija Žlikrofi</font></font></h3>
                            <span class="text-slovenia-gold font-bold text-lg"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">€14.00</font></font></span>
                        </div>
                        <p class="text-xs text-gray-400 mb-4"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Stuffed žlikrofi with potatoes and herbs, served with roast beef sauce.</font></font></p>
                    </div>
                    <div class="flex items-center justify-between text-[11px] text-slovenia-sage pt-3 border-t border-white/10">
                        <span><i class="fa-solid fa-star mr-1"></i><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Popular</font></font></span>
                        <span class="bg-slovenia-green/40 text-slovenia-gold px-2 py-0.5 rounded"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Authentic</font></font></span>
                    </div>
                </div>

                <!-- Menu Item 3 -->
                <div class="menu-card bg-slovenia-charcoal/80 rounded-2xl p-5 border border-white/5 hover:border-slovenia-gold/40 transition-all group flex flex-col justify-between" data-category="breakfast">
                    <div>
                        <div class="flex justify-between items-start mb-2">
                            <h3 class="font-heading font-semibold text-lg text-white group-hover:text-slovenia-gold transition-colors"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">
                                Slovenian Business Breakfast</font></font></h3>
                            <span class="text-slovenia-gold font-bold text-lg"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">€9.50</font></font></span>
                        </div>
                        <p class="text-xs text-gray-400 mb-4"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Fresh bread, Slovenian honey, butter, homemade cheeses, dried meats, fresh orange juice and coffee.</font></font></p>
                    </div>
                    <div class="flex items-center justify-between text-[11px] text-slovenia-sage pt-3 border-t border-white/10">
                        <span><i class="fa-solid fa-clock mr-1"></i><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">until 11:00</font></font></span>
                        <span class="bg-slovenia-green/40 text-slovenia-gold px-2 py-0.5 rounded"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Set</font></font></span>
                    </div>
                </div>

                <!-- Menu Item 4 -->
                <div class="menu-card bg-slovenia-charcoal/80 rounded-2xl p-5 border border-white/5 hover:border-slovenia-gold/40 transition-all group flex flex-col justify-between" data-category="lunch dinner">
                    <div>
                        <div class="flex justify-between items-start mb-2">
                            <h3 class="font-heading font-semibold text-lg text-white group-hover:text-slovenia-gold transition-colors"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">
                                Prekmurje Bograc</font></font></h3>
                            <span class="text-slovenia-gold font-bold text-lg"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">€13.80</font></font></span>
                        </div>
                        <p class="text-xs text-gray-400 mb-4"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">A rich goulash stew with three types of meat, potatoes and spices.</font></font></p>
                    </div>
                    <div class="flex items-center justify-between text-[11px] text-slovenia-sage pt-3 border-t border-white/10">
                        <span><i class="fa-solid fa-fire mr-1"></i><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Warm Stew</font></font></span>
                        <span class="bg-slovenia-green/40 text-slovenia-gold px-2 py-0.5 rounded"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Traditional</font></font></span>
                    </div>
                </div>

                <!-- Menu Item 5 -->
                <div class="menu-card bg-slovenia-charcoal/80 rounded-2xl p-5 border border-white/5 hover:border-slovenia-gold/40 transition-all group flex flex-col justify-between" data-category="dinner corporate">
                    <div>
                        <div class="flex justify-between items-start mb-2">
                            <h3 class="font-heading font-semibold text-lg text-white group-hover:text-slovenia-gold transition-colors"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">
                                Slovenian Štrukli (Sweet or Savory)</font></font></h3>
                            <span class="text-slovenia-gold font-bold text-lg"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">€7.50</font></font></span>
                        </div>
                        <p class="text-xs text-gray-400 mb-4"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Cooked or baked dough with cottage cheese or walnut filling and breadcrumbs.</font></font></p>
                    </div>
                    <div class="flex items-center justify-between text-[11px] text-slovenia-sage pt-3 border-t border-white/10">
                        <span><i class="fa-solid fa-stroopwafel mr-1"></i><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Desserts</font></font></span>
                        <span class="bg-slovenia-green/40 text-slovenia-gold px-2 py-0.5 rounded"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">We recommend</font></font></span>
                    </div>
                </div>

                <!-- Menu Item 6 -->
                <div class="menu-card bg-slovenia-charcoal/80 rounded-2xl p-5 border border-white/5 hover:border-slovenia-gold/40 transition-all group flex flex-col justify-between" data-category="dinner">
                    <div>
                        <div class="flex justify-between items-start mb-2">
                            <h3 class="font-heading font-semibold text-lg text-white group-hover:text-slovenia-gold transition-colors"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">
                                Prekmurje Gibanica</font></font></h3>
                            <span class="text-slovenia-gold font-bold text-lg"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">€6.80</font></font></span>
                        </div>
                        <p class="text-xs text-gray-400 mb-4"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">A layered dessert with poppy seeds, cottage cheese, walnuts and apples. The true pride of Slovenia.</font></font></p>
                    </div>
                    <div class="flex items-center justify-between text-[11px] text-slovenia-sage pt-3 border-t border-white/10">
                        <span><i class="fa-solid fa-cake-candles mr-1"></i><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Dessert</font></font></span>
                        <span class="bg-slovenia-green/40 text-slovenia-gold px-2 py-0.5 rounded"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">AOP Certified</font></font></span>
                    </div>
                </div>

                <!-- Menu Item 7 -->
                <div class="menu-card bg-slovenia-charcoal/80 rounded-2xl p-5 border border-white/5 hover:border-slovenia-gold/40 transition-all group flex flex-col justify-between" data-category="drinks">
                    <div>
                        <div class="flex justify-between items-start mb-2">
                            <h3 class="font-heading font-semibold text-lg text-white group-hover:text-slovenia-gold transition-colors"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">
                                Rebula / Teran (Glass 0.1l)</font></font></h3>
                            <span class="text-slovenia-gold font-bold text-lg"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">€4.50</font></font></span>
                        </div>
                        <p class="text-xs text-gray-400 mb-4"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Top-quality Slovenian white or red wine from the Primorje and Karst regions.</font></font></p>
                    </div>
                    <div class="flex items-center justify-between text-[11px] text-slovenia-sage pt-3 border-t border-white/10">
                        <span><i class="fa-solid fa-wine-glass-empty mr-1"></i><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Slovenian Wine</font></font></span>
                        <span class="bg-slovenia-green/40 text-slovenia-gold px-2 py-0.5 rounded"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Premium</font></font></span>
                    </div>
                </div>

                <!-- Menu Item 8 -->
                <div class="menu-card bg-slovenia-charcoal/80 rounded-2xl p-5 border border-white/5 hover:border-slovenia-gold/40 transition-all group flex flex-col justify-between" data-category="corporate">
                    <div>
                        <div class="flex justify-between items-start mb-2">
                            <h3 class="font-heading font-semibold text-lg text-white group-hover:text-slovenia-gold transition-colors"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">
                                Business Lunch Menu (3-course)</font></font></h3>
                            <span class="text-slovenia-gold font-bold text-lg"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">€22.00</font></font></span>
                        </div>
                        <p class="text-xs text-gray-400 mb-4"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Soup of your choice + Main course (meat or vegan) + Daily dessert + Coffee.</font></font></p>
                    </div>
                    <div class="flex items-center justify-between text-[11px] text-slovenia-sage pt-3 border-t border-white/10">
                        <span><i class="fa-solid fa-briefcase mr-1"></i><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Corporate Choice</font></font></span>
                        <span class="bg-slovenia-green/40 text-slovenia-gold px-2 py-0.5 rounded"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Fast Service</font></font></span>
                    </div>
                </div>

                <!-- Menu Item 9 -->
                <div class="menu-card bg-slovenia-charcoal/80 rounded-2xl p-5 border border-white/5 hover:border-slovenia-gold/40 transition-all group flex flex-col justify-between" data-category="drinks breakfast">
                    <div>
                        <div class="flex justify-between items-start mb-2">
                            <h3 class="font-heading font-semibold text-lg text-white group-hover:text-slovenia-gold transition-colors"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">
                                Ljubljana Coffee &amp; Herbal Tea</font></font></h3>
                            <span class="text-slovenia-gold font-bold text-lg"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">€2.80</font></font></span>
                        </div>
                        <p class="text-xs text-gray-400 mb-4"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Freshly roasted coffee or homemade herbal tea from the Slovenian mountains with honey.</font></font></p>
                    </div>
                    <div class="flex items-center justify-between text-[11px] text-slovenia-sage pt-3 border-t border-white/10">
                        <span><i class="fa-solid fa-mug-hot mr-1"></i><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Potion</font></font></span>
                        <span class="bg-slovenia-green/40 text-slovenia-gold px-2 py-0.5 rounded"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Organic Honey</font></font></span>
                    </div>
                </div>

            </div>

        </div>
    </section>
    
    

    <!-- Table Booking Section -->
    <section id="booking" class="py-20 px-4 bg-slovenia-cream relative">
        <div class="max-w-4xl mx-auto">

            <div class="text-center space-y-3 mb-10">
                <span class="text-slovenia-green font-semibold text-xs tracking-widest uppercase"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Online Reservation</font></font></span>
                <h2 class="font-heading text-3xl sm:text-4xl font-bold text-slovenia-dark"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Reserve Your Table</font></font></h2>
                <p class="text-sm text-gray-600"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Select the number of people, date and purpose of your visit for quick confirmation.</font></font></p>
            </div>

            <!-- Booking Card -->
            <div class="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slovenia-gold/20">
                <form id="bookingForm" onsubmit="handleBookingSubmit(event)">

                    <!-- Step 1: Party Size Selection -->
                    <div class="mb-8">
                        <label class="block text-xs font-bold uppercase tracking-wider text-slovenia-dark mb-3"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">
                            1. Select Table Size *
                        </font></font></label>
                        <div class="grid grid-cols-3 gap-3 sm:gap-4">

                            <!-- 2 Persons -->
                            <label class="relative flex flex-col items-center justify-center p-4 border-2 border-gray-200 rounded-2xl cursor-pointer hover:border-slovenia-gold transition-all group text-center select-none has-[:checked]:border-slovenia-green has-[:checked]:bg-slovenia-green/5">
                                <input type="radio" name="guests" value="2" class="sr-only" checked="">
                                <i class="fa-solid fa-user-group text-2xl text-gray-400 group-hover:text-slovenia-green mb-2 transition-colors"></i>
                                <span class="font-bold text-sm text-slovenia-dark"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">2 People</font></font></span>
                                <span class="text-[11px] text-gray-500"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Private / Meeting</font></font></span>
                            </label>

                            <!-- 4 Persons -->
                            <label class="relative flex flex-col items-center justify-center p-4 border-2 border-gray-200 rounded-2xl cursor-pointer hover:border-slovenia-gold transition-all group text-center select-none has-[:checked]:border-slovenia-green has-[:checked]:bg-slovenia-green/5">
                                <input type="radio" name="guests" value="4" class="sr-only">
                                <i class="fa-solid fa-users text-2xl text-gray-400 group-hover:text-slovenia-green mb-2 transition-colors"></i>
                                <span class="font-bold text-sm text-slovenia-dark"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">4 People</font></font></span>
                                <span class="text-[11px] text-gray-500"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Lunch / Family</font></font></span>
                            </label>

                            <!-- 8 Persons -->
                            <label class="relative flex flex-col items-center justify-center p-4 border-2 border-gray-200 rounded-2xl cursor-pointer hover:border-slovenia-gold transition-all group text-center select-none has-[:checked]:border-slovenia-green has-[:checked]:bg-slovenia-green/5">
                                <input type="radio" name="guests" value="8" class="sr-only">
                                <i class="fa-solid fa-people-group text-2xl text-gray-400 group-hover:text-slovenia-green mb-2 transition-colors"></i>
                                <span class="font-bold text-sm text-slovenia-dark"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">8+ People</font></font></span>
                                <span class="text-[11px] text-gray-500"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Business Entertainment</font></font></span>
                            </label>

                        </div>
                    </div>

                    <!-- Step 2: Event Purpose -->
                    <div class="mb-8">
                        <label class="block text-xs font-bold uppercase tracking-wider text-slovenia-dark mb-3"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">
                            2. Purpose of Visit *
                        </font></font></label>
                        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            <label class="cursor-pointer border rounded-xl p-3 text-center text-xs font-medium transition-all">
                                <input type="radio" name="purpose" value="Poslovni Sestanek (Corporate)" class="sr-only" checked="">
                                <i class="fa-solid fa-briefcase block mb-1 text-sm"></i><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Business meeting
                            </font></font></label>
                            <label class="cursor-pointer border rounded-xl p-3 text-center text-xs font-medium transition-all">
                                <input type="radio" name="purpose" value="Zasebno Kosilo / Večerja" class="sr-only">
                                <i class="fa-solid fa-utensils block mb-1 text-sm"></i><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Individual service
                            </font></font></label>
                            <label class="cursor-pointer border rounded-xl p-3 text-center text-xs font-medium transition-all">
                                <input type="radio" name="purpose" value="Zajtrk &amp; Kava" class="sr-only">
                                <i class="fa-solid fa-mug-hot block mb-1 text-sm"></i><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Breakfast / Drinks
                            </font></font></label>
                            <label class="cursor-pointer border rounded-xl p-3 text-center text-xs font-medium transition-all">
                                <input type="radio" name="purpose" value="Mala Zabava / Proslava" class="sr-only">
                                <i class="fa-solid fa-cake-candles block mb-1 text-sm"></i><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Small party
                            </font></font></label>
                        </div>
                    </div>

                    <!-- Step 3: Date, Time & Contact Details -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

                        <div>
                            <label class="block text-xs font-bold uppercase text-gray-700 mb-1"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Visit Date *</font></font></label>
                            <input type="date" id="bookDate" required="" class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-slovenia-green focus:outline-none text-sm" min="2026-10-15">
                        </div>

                        <div>
                            <label class="block text-xs font-bold uppercase text-gray-700 mb-1"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Time / Time Slot *</font></font></label>
                            <select id="bookTime" required="" class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-slovenia-green focus:outline-none text-sm">
                                <option value=""><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Select Clock...</font></font></option>
                                <option value="08:30"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">08:30 (Breakfast)</font></font></option>
                                <option value="10:00"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">10:00 (Meeting / Coffee)</font></font></option>
                                <option value="12:00"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">12:00 (Business Lunch)</font></font></option>
                                <option value="13:30"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">13:30 (Lunch)</font></font></option>
                                <option value="17:00"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">17:00 (Early Dinner)</font></font></option>
                                <option value="19:00"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">19:00 (Dinner)</font></font></option>
                                <option value="20:30"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">20:30 (Evening Drinks)</font></font></option>
                            </select>
                        </div>

                        <div>
                            <label class="block text-xs font-bold uppercase text-gray-700 mb-1"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">First and Last Name *</font></font></label>
                            <input type="text" id="bookName" placeholder="For example, Janez Novak" required="" class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-slovenia-green focus:outline-none text-sm">
                        </div>

                        <div>
                            <label class="block text-xs font-bold uppercase text-gray-700 mb-1"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Phone Number *</font></font></label>
                            <input type="tel" id="bookPhone" placeholder="E.g. 040 123 456" required="" class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-slovenia-green focus:outline-none text-sm">
                        </div>

                        <div class="md:col-span-2">
                            <label class="block text-xs font-bold uppercase text-gray-700 mb-1"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Email Address *</font></font></label>
                            <input type="email" id="bookEmail" placeholder="janez@podjetje.si" required="" class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-slovenia-green focus:outline-none text-sm">
                        </div>

                        <div class="md:col-span-2">
                            <label class="block text-xs font-bold uppercase text-gray-700 mb-1"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Special Requests / Notes</font></font></label>
                            <textarea id="bookNotes" rows="2" placeholder="For example, we need a quiet table for a business conversation, cakes or a projector." class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-slovenia-green focus:outline-none text-sm"></textarea>
                        </div>

                    </div>

                    <!-- Submit Button -->
                    <button type="submit" class="w-full py-4 bg-slovenia-green hover:bg-slovenia-lightgreen text-white font-bold rounded-xl shadow-lg transition-all text-base flex items-center justify-center gap-2">
                        <i class="fa-solid fa-ticket"></i><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Confirm Reservation and Generate Pass
                    </font></font></button>

                    <p class="text-center text-xs text-gray-400 mt-3">
                        <i class="fa-solid fa-shield-halved mr-1"></i><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Free booking. Instant confirmation card with QR code.
                    </font></font></p>

                </form>
            </div>

        </div>
    </section>

    <!-- Confirmation Booking Pass Modal -->
    <div id="bookingModal" class="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm hidden flex items-center justify-center p-4 overflow-y-auto">
        <div class="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl transform transition-all my-8">

            <!-- Modal Header -->
            <div class="bg-slovenia-dark text-white p-6 text-center relative border-b border-slovenia-gold/30">
                <button onclick="closeModal()" class="absolute top-4 right-4 text-gray-400 hover:text-white p-2 text-xl">
                    <i class="fa-solid fa-xmark"></i>
                </button>
                <div class="w-12 h-12 bg-slovenia-gold text-slovenia-dark rounded-full flex items-center justify-center mx-auto font-heading font-bold text-2xl mb-2"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">
                    W
                </font></font></div>
                <h3 class="font-heading text-xl font-bold"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">WILMA RESTAURANT</font></font></h3>
                <p class="text-xs text-slovenia-gold"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Dunajska cesta 106, Ljubljana • Tel: 040 791 618</font></font></p>
            </div>

            <!-- Modal Content / Pass -->
            <div class="p-6 space-y-6 printable-pass" id="printablePassArea">

                <div class="text-center pb-4 border-b border-gray-300">
                    <div class="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full mb-2">
                        <i class="fa-solid fa-circle-check mr-1"></i><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Reservation Confirmed
                    </font></font></div>
                    <h4 class="text-lg font-bold text-slovenia-dark"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Reservation Pass</font></font></h4>
                    <p class="text-xs text-gray-500"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Please present this card upon arrival.</font></font></p>
                </div>

                <!-- Booking Details Table -->
                <div class="grid grid-cols-2 gap-4 text-xs bg-white p-4 rounded-xl border border-gray-200">
                    <div>
                        <span class="text-gray-400 block uppercase font-medium"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Reservation No.</font></font></span>
                        <span id="passRef" class="font-mono font-bold text-slovenia-green text-sm"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">#WLM-8921</font></font></span>
                    </div>
                    <div>
                        <span class="text-gray-400 block uppercase font-medium"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Guest Name</font></font></span>
                        <span id="passName" class="font-bold text-gray-800"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">John Novak</font></font></span>
                    </div>
                    <div>
                        <span class="text-gray-400 block uppercase font-medium"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Date and Time</font></font></span>
                        <span id="passDateTime" class="font-bold text-gray-800"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">15.10.2026 at 12:00</font></font></span>
                    </div>
                    <div>
                        <span class="text-gray-400 block uppercase font-medium"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Number of Persons</font></font></span>
                        <span id="passGuests" class="font-bold text-gray-800"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">4 People</font></font></span>
                    </div>
                    <div>
                        <span class="text-gray-400 block uppercase font-medium"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Purpose of Visit</font></font></span>
                        <span id="passPurpose" class="font-bold text-gray-800"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Business Meeting</font></font></span>
                    </div>
                    <div>
                        <span class="text-gray-400 block uppercase font-medium"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Phone</font></font></span>
                        <span id="passPhone" class="font-bold text-gray-800"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">040 123 456</font></font></span>
                    </div>
                </div>

                <!-- QR Code Display -->
                <div class="flex flex-col items-center justify-center p-4 bg-white rounded-xl border border-gray-200 text-center">
                    <div id="qrcode" class="mb-2"></div>
                    <span class="text-[10px] text-gray-400 uppercase tracking-widest"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Scan for Verification in Restaurant</font></font></span>
                </div>

                <div class="text-[11px] text-gray-500 text-center">
                    <p><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">For changes or cancellations, please call </font></font><strong><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">040 791 618</font></font></strong><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;"> .</font></font></p>
                </div>

            </div>

            <!-- Modal Action Buttons -->
            <div class="bg-gray-100 p-4 flex gap-3">
                <button onclick="printPass()" class="flex-1 py-3 bg-slovenia-dark text-white rounded-xl font-bold text-xs hover:bg-black transition-all flex items-center justify-center gap-2">
                    <i class="fa-solid fa-print"></i><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Print Pass (Print)
                </font></font></button>
                <button onclick="closeModal()" class="flex-1 py-3 bg-slovenia-gold text-slovenia-dark rounded-xl font-bold text-xs hover:bg-yellow-500 transition-all text-center"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">
                    Close
                </font></font></button>
            </div>

        </div>
    </div>

    <!-- Contact & Support Section -->
    <section id="contact" class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4">

            <div class="text-center max-w-2xl mx-auto mb-12 space-y-2">
                <span class="text-slovenia-green font-semibold text-xs tracking-widest uppercase"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Contact and Support</font></font></span>
                <h2 class="font-heading text-3xl sm:text-4xl font-bold text-slovenia-dark"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Visit Us or Contact Us</font></font></h2>
                <p class="text-sm text-gray-600"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">We are in the heart of Ljubljana on Dunajska cesta. We look forward to your visit.
                </font></font></p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

                <!-- Info Box -->
                <div class="bg-slovenia-cream p-8 rounded-3xl border border-slovenia-gold/20 space-y-6 flex flex-col justify-between">
                    <div>
                        <h3 class="font-heading text-xl font-bold text-slovenia-dark mb-6"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Restaurant Wilma</font></font></h3>

                        <div class="space-y-5 text-sm">
                            <div class="flex items-start gap-4">
                                <div class="w-10 h-10 rounded-full bg-slovenia-green text-white flex items-center justify-center shrink-0">
                                    <i class="fa-solid fa-location-dot"></i>
                                </div>
                                <div>
                                    <h4 class="font-bold text-slovenia-dark"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Address</font></font></h4>
                                    <p class="text-gray-600"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Dunajska cesta 106, 1000 Ljubljana, Slovenia</font></font></p>
                                </div>
                            </div>

                            <div class="flex items-start gap-4">
                                <div class="w-10 h-10 rounded-full bg-slovenia-green text-white flex items-center justify-center shrink-0">
                                    <i class="fa-solid fa-phone"></i>
                                </div>
                                <div>
                                    <h4 class="font-bold text-slovenia-dark"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Phone</font></font></h4>
                                    <p class="text-gray-600 font-semibold"><a href="tel:040791618" class="hover:text-slovenia-green"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">040 791 618</font></font></a></p>
                                </div>
                            </div>

                            <div class="flex items-start gap-4">
                                <div class="w-10 h-10 rounded-full bg-slovenia-green text-white flex items-center justify-center shrink-0">
                                    <i class="fa-solid fa-clock"></i>
                                </div>
                                <div>
                                    <h4 class="font-bold text-slovenia-dark"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Opening Hours</font></font></h4>
                                    <p class="text-gray-600 text-xs"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Monday - Friday: 07:30 - 22:00</font></font></p>
                                    <p class="text-gray-600 text-xs"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Saturday: 08:30 - 23:00</font></font></p>
                                    <p class="text-gray-600 text-xs"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Sunday &amp; Holidays: Closed</font></font></p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="p-4 bg-white rounded-2xl border border-gray-200 text-xs">
                        <span class="font-bold text-slovenia-dark block mb-1"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Parking:</font></font></span>
                        <p class="text-gray-500"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Free parking spaces for restaurant guests in front of the building.</font></font></p>
                    </div>

                </div>

                <!-- Contact / Support Form -->
                <div class="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-4">
                    <h3 class="font-heading text-xl font-bold text-slovenia-dark mb-2"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Send Message / Support</font></font></h3>
                    <p class="text-xs text-gray-500 mb-4"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Do you have a question about business events or special diets?
                    </font></font></p>

                    <form onsubmit="handleSupportSubmit(event)" class="space-y-4">
                        <div>
                            <label class="block text-xs font-bold uppercase text-gray-700 mb-1"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Your Name</font></font></label>
                            <input type="text" required="" placeholder="John Novak" class="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-slovenia-green focus:outline-none text-sm">
                        </div>
                        <div>
                            <label class="block text-xs font-bold uppercase text-gray-700 mb-1"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Email</font></font></label>
                            <input type="email" required="" placeholder="janez@example.com" class="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-slovenia-green focus:outline-none text-sm">
                        </div>
                        <div>
                            <label class="block text-xs font-bold uppercase text-gray-700 mb-1"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Message</font></font></label>
                            <textarea rows="3" required="" placeholder="How can we help you?" class="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-slovenia-green focus:outline-none text-sm"></textarea>
                        </div>
                        <button type="submit" class="w-full py-3 bg-slovenia-dark hover:bg-black text-white font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-2">
                            <i class="fa-solid fa-paper-plane"></i><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Send Message
                        </font></font></button>
                    </form>
                </div>

                <!-- Embedded Map Placeholder -->
                <div class="rounded-3xl overflow-hidden border border-gray-200 shadow-sm min-h-[320px] bg-gray-100 relative group">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2768.42314561284!2d14.5098!3d46.0754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476532882ad3108d%3A0x8bb8925f69c9b!2sDunajska%20cesta%20106%2C%201000%20Ljubljana%2C%20Slovenia!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s" class="w-full h-full min-h-[320px] border-0" allowfullscreen="" loading="lazy">
                    </iframe>
                </div>

            </div>

        </div>
    </section>

    <!-- Floating Live Support Widget -->
    <div class="fixed bottom-6 right-6 z-40">
        <!-- Chat Trigger Button -->
        <button onclick="toggleChat()" class="w-14 h-14 bg-slovenia-green hover:bg-slovenia-lightgreen text-white rounded-full shadow-2xl flex items-center justify-center text-2xl transition-all transform hover:scale-110 relative -translate-y-10">
            <i class="fa-solid fa-headset"></i>
            <span class="absolute -top-1 -right-1 w-4 h-4 bg-slovenia-gold rounded-full border-2 border-white animate-pulse"></span>
        </button>

        <!-- Chat Box -->
        <div id="chatBox" class="hidden bottom-18 right-0 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col">
            <div class="bg-slovenia-dark text-white p-4 flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full bg-slovenia-gold text-slovenia-dark flex items-center justify-center font-bold text-xs"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">
                        W
                    </font></font></div>
                    <div>
                        <h4 class="font-bold text-xs"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Wilma Assistant (Support)</font></font></h4>
                        <span class="text-[10px] text-slovenia-sage flex items-center gap-1">
                            <span class="w-2 h-2 bg-green-500 rounded-full inline-block"></span><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Available live
                        </font></font></span>
                    </div>
                </div>
                <button onclick="toggleChat()" class="text-gray-400 hover:text-white">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>

            <!-- Messages Area -->
            <div id="chatMessages" class="p-4 h-64 overflow-y-auto space-y-3 bg-gray-50 text-xs">
                <div class="bg-white p-3 rounded-2xl rounded-tl-none border border-gray-200 text-gray-700 max-w-[85%]"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">
                    Hello! Welcome to Wilma Restaurant in Ljubljana. How can we help you today? 😊
                </font></font></div>
            </div>

            <!-- Input Area -->
            <div class="p-3 bg-white border-t border-gray-200 flex gap-2">
                <input type="text" id="chatInput" onkeypress="handleChatKeyPress(event)" placeholder="Write a question..." class="flex-1 px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-1 focus:ring-slovenia-green">
                <button onclick="sendChatMessage()" class="w-9 h-9 bg-slovenia-green text-white rounded-xl flex items-center justify-center text-xs">
                    <i class="fa-solid fa-paper-plane"></i>
                </button>
            </div>
        </div>
    </div>

    <!-- Footer Section -->
   <?php include ('footer.php'); ?>
    <!-- COMING SOON POPUP -->

<!-- popup -->

     <div id="comingSoonPopup" class="fixed inset-0 z-[9999] items-center justify-center bg-black/80 backdrop-blur-sm p-4 hidden">

        <div class="relative w-full max-w-md overflow-hidden rounded-3xl border border-slovenia-gold/40 bg-slovenia-dark p-8 text-center text-white shadow-2xl sm:p-10">

            <!-- Close Button -->
            <button id="closeComingSoon" type="button" aria-label="Close popup" class="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-gray-300 transition hover:bg-white/10 hover:text-white">
                <i class="fa-solid fa-xmark text-lg"></i>
            </button>

            <!-- Icon -->
            <div class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-slovenia-gold/50 bg-slovenia-gold/10">
                <i class="fa-solid fa-utensils text-3xl text-slovenia-gold"></i>
            </div>

            <!-- Brand -->
            <p class="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-slovenia-gold"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">
                Restaurant Wilma
            </font></font></p>

            <!-- Heading -->
            <h2 class="font-heading text-3xl font-bold leading-tight sm:text-4xl"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">
                Coming </font></font><span class="text-slovenia-gold"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">soon</font></font></span>
            </h2>

            <!-- Description -->
            <p class="mx-auto mt-4 max-w-sm text-sm leading-7 text-gray-300"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">
                Something special is coming! We are preparing a wonderful culinary experience for you in Ljubljana. Follow us and stay up to date with information about the grand opening.
            </font></font></p>

            <!-- Decorative Line -->
            <div class="mx-auto my-6 h-px w-20 bg-slovenia-gold"></div>

            <!-- Location -->
            <p class="mb-6 text-xs text-gray-400">
                <i class="fa-solid fa-location-dot mr-2 text-slovenia-gold"></i><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">
                Vienna Street 106, Ljubljana
            </font></font></p>

            <!-- Close Button -->
            <button id="comingSoonOkay" type="button" class="w-full rounded-xl bg-slovenia-gold px-6 py-3.5 font-bold text-slovenia-dark transition hover:bg-yellow-500"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">
                Follow us
            </font></font></button>

        </div>
    </div>

    <!-- POPUP SCRIPT -->
    <script>
    document.addEventListener("DOMContentLoaded", function () {
        const popup = document.getElementById("comingSoonPopup");
        const closeBtn = document.getElementById("closeComingSoon");
        const okayBtn = document.getElementById("comingSoonOkay");

        let popupTimer;

        function openComingSoon() {
            popup.classList.remove("hidden");
            popup.classList.add("flex");
            document.body.style.overflow = "hidden";
        }

        function closeComingSoon() {
            popup.classList.add("hidden");
            popup.classList.remove("flex");
            document.body.style.overflow = "";

            // Show popup again after 1 minute
            clearTimeout(popupTimer);
            popupTimer = setTimeout(openComingSoon, 60000);
        }

        // Show popup when the page loads
        setTimeout(openComingSoon, 800);

        closeBtn.addEventListener("click", closeComingSoon);
        okayBtn.addEventListener("click", closeComingSoon);

        // Close when clicking the dark background
        popup.addEventListener("click", function (event) {
            if (event.target === popup) {
                closeComingSoon();
            }
        });

        // Close with Escape key
        document.addEventListener("keydown", function (event) {
            if (
                event.key === "Escape" &&
                !popup.classList.contains("hidden")
            ) {
                closeComingSoon();
            }
        });
    });
</script>
    <!--popup script END-->
    
    <script>
        // Mobile Menu Toggle
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileLinks = document.querySelectorAll('.mobile-link');

        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });

        // Menu Filtering Logic
        function filterMenu(category) {
            const cards = document.querySelectorAll('.menu-card');
            const filterBtns = document.querySelectorAll('.menu-filter-btn');

            filterBtns.forEach(btn => {
                btn.classList.remove('bg-slovenia-gold', 'text-slovenia-dark', 'active');
                btn.classList.add('bg-slovenia-charcoal', 'text-gray-300');
            });

            event.target.classList.remove('bg-slovenia-charcoal', 'text-gray-300');
            event.target.classList.add('bg-slovenia-gold', 'text-slovenia-dark', 'active');

            cards.forEach(card => {
                const categories = card.getAttribute('data-category');
                if (category === 'all' || categories.includes(category)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        }

        // Handle Booking Submission
        let qrCodeInstance = null;

        function handleBookingSubmit(e) {
            e.preventDefault();

            const name = document.getElementById('bookName').value;
            const phone = document.getElementById('bookPhone').value;
            const email = document.getElementById('bookEmail').value;
            const date = document.getElementById('bookDate').value;
            const time = document.getElementById('bookTime').value;
            const guests = document.querySelector('input[name="guests"]:checked').value;
            const purpose = document.querySelector('input[name="purpose"]:checked').value;

            // Generate Random Reference
            const refNum = '#WLM-' + Math.floor(1000 + Math.random() * 9000);

            // Update Pass Info
            document.getElementById('passRef').innerText = refNum;
            document.getElementById('passName').innerText = name;
            document.getElementById('passDateTime').innerText = `${date} ob ${time}`;
            document.getElementById('passGuests').innerText = `${guests} Osebe`;
            document.getElementById('passPurpose').innerText = purpose;
            document.getElementById('passPhone').innerText = phone;

            // Generate QR Code
            const qrContainer = document.getElementById('qrcode');
            qrContainer.innerHTML = '';
            qrCodeInstance = new QRCode(qrContainer, {
                text: `WILMA-RES|REF:${refNum}|NAME:${name}|GUESTS:${guests}|DATE:${date}`,
                width: 110,
                height: 110,
                colorDark: "#1c241b",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            });

            // Show Modal
            document.getElementById('bookingModal').classList.remove('hidden');
        }

        function closeModal() {
            document.getElementById('bookingModal').classList.add('hidden');
        }

        function printPass() {
            window.print();
        }

        // Support Form Submission
        function handleSupportSubmit(e) {
            e.preventDefault();
            alert("Hvala! Vaše sporočilo je bilo uspešno poslano. Ekipa Restavraciji Wilma vas bo kontaktirala v najkrajšem možnem času.");
            e.target.reset();
        }

        // Floating Chat Toggle & Logic
        function toggleChat() {
            const chatBox = document.getElementById('chatBox');
            chatBox.classList.toggle('hidden');
        }

        function handleChatKeyPress(e) {
            if (e.key === 'Enter') {
                sendChatMessage();
            }
        }

        function sendChatMessage() {
            const input = document.getElementById('chatInput');
            const msg = input.value.trim();
            if (!msg) return;

            const chatMessages = document.getElementById('chatMessages');

            // User Message
            const userMsgDiv = document.createElement('div');
            userMsgDiv.className = 'bg-slovenia-green text-white p-3 rounded-2xl rounded-tr-none max-w-[85%] ml-auto text-xs';
            userMsgDiv.innerText = msg;
            chatMessages.appendChild(userMsgDiv);

            input.value = '';
            chatMessages.scrollTop = chatMessages.scrollHeight;

            // Automated Assistant Reply
            setTimeout(() => {
                const botMsgDiv = document.createElement('div');
                botMsgDiv.className = 'bg-white p-3 rounded-2xl rounded-tl-none border border-gray-200 text-gray-700 max-w-[85%] text-xs';

                if (msg.toLowerCase().includes('rezervacija') || msg.toLowerCase().includes('miza') || msg.toLowerCase().includes('book')) {
                    botMsgDiv.innerText = "Mizo lahko hitro rezervirate na naši strani pod razdelkom 'Rezervacija'! Ali pa pokličete 040 791 618.";
                } else if (msg.toLowerCase().includes('naslov') || msg.toLowerCase().includes('kje') || msg.toLowerCase().includes('lokacija')) {
                    botMsgDiv.innerText = "Nahajamo se na naslovu Dunajska cesta 106, Ljubljana. Pred restavracijo je tudi parkirišče.";
                } else {
                    botMsgDiv.innerText = "Hvala za vaše vprašanje! Naša ekipa vam bo z veseljem odgovorila ali nas pokličite na 040 791 618.";
                }

                chatMessages.appendChild(botMsgDiv);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 800);
        }

        // Set default date to today in booking form
        document.addEventListener("DOMContentLoaded", () => {
            const dateInput = document.getElementById('bookDate');
            if (dateInput) {
                const today = new Date().toISOString().split('T')[0];
                dateInput.value = today;
                dateInput.min = today;
            }
        });

        // Download Website Code Function (Creates downloadable HTML file)
        function downloadWebsiteCode() {
            const htmlContent = "<!DOCTYPE html>\n" + document.documentElement.outerHTML;
            const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8" });
            const a = document.createElement("a");
            a.href = URL.createObjectURL(blob);
            a.download = "wilma_restaurant_ljubljana.html";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }

        // chatbot icon hidden code
        function toggleChat() {
            const chatBox = document.getElementById("chatBox");
            const triggerButton = chatBox.parentElement.querySelector("button");

            chatBox.classList.toggle("hidden");
            triggerButton.classList.toggle("hidden");
        }
    </script>
    
    <div id="goog-gt-tt" class="VIpgJd-yAWNEb-L7lbkb skiptranslate" style="display: none; border-radius: 12px; margin: 0 0 0 -23px; padding: 0; font-family: 'Google Sans', Arial, sans-serif;" data-id=""><div id="goog-gt-vt" class="VIpgJd-yAWNEb-hvhgNd"><div class="VIpgJd-yAWNEb-hvhgNd-Ud7fr">
        
    <img src="https://fonts.gstatic.com/s/i/productlogos/translate/v14/24px.svg" width="24" height="24" alt=""><div class=" VIpgJd-yAWNEb-hvhgNd-IuizWc-i3jM8c " dir="ltr">Original text</div></div><div class="VIpgJd-yAWNEb-hvhgNd-k77Iif"><div id="goog-gt-original-text" class="VIpgJd-yAWNEb-nVMfcd-fmcmS VIpgJd-yAWNEb-hvhgNd-axAV1"></div></div><div class="VIpgJd-yAWNEb-hvhgNd-N7Eqid ltr"><div class="VIpgJd-yAWNEb-hvhgNd-N7Eqid-B7I4Od ltr" dir="ltr"><div class="VIpgJd-yAWNEb-hvhgNd-UTujCb">Rate this translation</div><div class="VIpgJd-yAWNEb-hvhgNd-eO9mKe">Your feedback will be used to help improve Google Translate</div></div><div class="VIpgJd-yAWNEb-hvhgNd-xgov5 ltr"><button id="goog-gt-thumbUpButton" type="button" class="VIpgJd-yAWNEb-hvhgNd-bgm6sf" title="Good translation" aria-label="Good translation" aria-pressed="false"><span id="goog-gt-thumbUpIcon"><svg width="24" height="24" viewBox="0 0 24 24" focusable="false" class="VIpgJd-yAWNEb-hvhgNd-THI6Vb NMm5M"><path d="M21 7h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 0S7.08 6.85 7 7H2v13h16c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73V9c0-1.1-.9-2-2-2zM7 18H4V9h3v9zm14-7l-3 7H9V8l4.34-4.34L12 9h9v2z"></path></svg></span><span id="goog-gt-thumbUpIconFilled"><svg width="24" height="24" viewBox="0 0 24 24" focusable="false" class="VIpgJd-yAWNEb-hvhgNd-THI6Vb NMm5M"><path d="M21 7h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 0S7.08 6.85 7 7v13h11c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73V9c0-1.1-.9-2-2-2zM5 7H1v13h4V7z"></path></svg></span></button><button id="goog-gt-thumbDownButton" type="button" class="VIpgJd-yAWNEb-hvhgNd-bgm6sf" title="Poor translation" aria-label="Poor translation" aria-pressed="false"><span id="goog-gt-thumbDownIcon"><svg width="24" height="24" viewBox="0 0 24 24" focusable="false" class="VIpgJd-yAWNEb-hvhgNd-THI6Vb NMm5M"><path d="M3 17h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 24s7.09-6.85 7.17-7h5V4H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2zM17 6h3v9h-3V6zM3 13l3-7h9v10l-4.34 4.34L12 15H3v-2z"></path></svg></span><span id="goog-gt-thumbDownIconFilled"><svg width="24" height="24" viewBox="0 0 24 24" focusable="false" class="VIpgJd-yAWNEb-hvhgNd-THI6Vb NMm5M"><path d="M3 17h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 24s7.09-6.85 7.17-7V4H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2zm16 0h4V4h-4v13z"></path></svg></span></button></div></div><div id="goog-gt-votingHiddenPane" class="VIpgJd-yAWNEb-hvhgNd-aXYTce"><form id="goog-gt-votingForm" action="//translate.googleapis.com/translate_voting?client=te_lib" method="post" target="votingFrame" class="VIpgJd-yAWNEb-hvhgNd-aXYTce"><input type="text" name="sl" id="goog-gt-votingInputSrcLang"><input type="text" name="tl" id="goog-gt-votingInputTrgLang"><input type="text" name="query" id="goog-gt-votingInputSrcText"><input type="text" name="gtrans" id="goog-gt-votingInputTrgText"><input type="text" name="vote" id="goog-gt-votingInputVote"></form><iframe name="votingFrame" frameborder="0"></iframe></div></div></div>




<script>
        // Open Auth Modal
        function openAuthModal() {
            document.getElementById('authModal').classList.remove('hidden');
            document.getElementById('authModal').classList.add('flex');
            document.body.style.overflow = 'hidden';
            // Default to login tab
            switchAuthTab('login');
        }

        // Close Auth Modal
        function closeAuthModal() {
            document.getElementById('authModal').classList.add('hidden');
            document.getElementById('authModal').classList.remove('flex');
            document.body.style.overflow = '';
        }

        // Switch between Login and Signup tabs
        function switchAuthTab(tab) {
            const loginForm = document.getElementById('loginForm');
            const signupForm = document.getElementById('signupForm');
            const loginTab = document.getElementById('loginTab');
            const signupTab = document.getElementById('signupTab');
            const authTitle = document.getElementById('authTitle');
            const authSubtitle = document.getElementById('authSubtitle');

            if (tab === 'login') {
                loginForm.classList.remove('hidden');
                signupForm.classList.add('hidden');
                loginTab.classList.add('text-slovenia-green', 'border-slovenia-green', 'bg-green-50');
                loginTab.classList.remove('text-gray-500', 'border-transparent');
                signupTab.classList.remove('text-slovenia-green', 'border-slovenia-green', 'bg-green-50');
                signupTab.classList.add('text-gray-500', 'border-transparent');
                authTitle.innerHTML = '<font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Welcome Back</font></font>';
                authSubtitle.innerHTML = '<font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Login to your Wilma account</font></font>';
            } else {
                loginForm.classList.add('hidden');
                signupForm.classList.remove('hidden');
                signupTab.classList.add('text-slovenia-green', 'border-slovenia-green', 'bg-green-50');
                signupTab.classList.remove('text-gray-500', 'border-transparent');
                loginTab.classList.remove('text-slovenia-green', 'border-slovenia-green', 'bg-green-50');
                loginTab.classList.add('text-gray-500', 'border-transparent');
                authTitle.innerHTML = '<font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Create Account</font></font>';
                authSubtitle.innerHTML = '<font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Join Wilma Restaurant today</font></font>';
            }
        }

        // Handle Login Submission
        function handleLogin(e) {
            e.preventDefault();
            alert('Login successful! Welcome back to Wilma Restaurant.');
            closeAuthModal();
        }

        // Handle Signup Submission
        function handleSignup(e) {
            e.preventDefault();
            alert('Account created successfully! Welcome to Wilma Restaurant.');
            closeAuthModal();
        }

        // Close modal when clicking outside
        document.getElementById('authModal').addEventListener('click', function(e) {
            if (e.target === this) closeAuthModal();
        });

        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeAuthModal();
            }
        });
    </script>
</body>

</html>