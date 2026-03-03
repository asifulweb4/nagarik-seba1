<?php
// Configuration
$bkash_number = "01XXXXXXXXX"; // আপনার বিকাশ নাম্বার এখানে দিন
$admin_whatsapp = "880XXXXXXXXX"; // আপনার WhatsApp/Telegram নাম্বার

// Handle order form submission
$success_message = "";
$error_message = "";

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'order') {
    $service = htmlspecialchars(strip_tags($_POST['service'] ?? ''));
    $serial = htmlspecialchars(strip_tags($_POST['serial'] ?? ''));
    $phone = htmlspecialchars(strip_tags($_POST['phone'] ?? ''));
    $amount = htmlspecialchars(strip_tags($_POST['amount'] ?? ''));
    
    if (empty($service) || empty($serial) || empty($phone)) {
        $error_message = "সকল তথ্য পূরণ করুন।";
    } else {
        // You can add email/database logic here
        // For now just show success
        $success_message = "আপনার অর্ডার গ্রহণ করা হয়েছে! বিকাশে পেমেন্ট করুন: $bkash_number";
    }
}
?>
<!DOCTYPE html>
<html lang="bn">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>প্রিমিয়াম সার্ভিস – দ্রুত ও বিশ্বস্ত</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&family=Tiro+Bangla:ital@0;1&display=swap" rel="stylesheet">
<style>
  :root {
    --bg: #0a0e1a;
    --bg2: #0f1629;
    --card: #131d35;
    --card2: #1a2640;
    --accent: #f5a623;
    --accent2: #e8880a;
    --green: #00e676;
    --cyan: #00b4d8;
    --text: #e8eaf6;
    --muted: #8090b0;
    --border: rgba(255,255,255,0.07);
    --glow: rgba(245, 166, 35, 0.15);
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'Hind Siliguri', sans-serif;
    font-size: 16px;
    line-height: 1.7;
    overflow-x: hidden;
  }

  /* ── HERO ── */
  .hero {
    min-height: 100vh;
    background: linear-gradient(135deg, #0a0e1a 0%, #0d1a3a 50%, #0a1525 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 40px 20px;
    position: relative;
    overflow: hidden;
  }

  .hero::before {
    content: '';
    position: absolute;
    width: 600px; height: 600px;
    background: radial-gradient(circle, rgba(245,166,35,0.08) 0%, transparent 70%);
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
  }

  .hero::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: 
      radial-gradient(1px 1px at 20% 30%, rgba(255,255,255,0.15) 0%, transparent 100%),
      radial-gradient(1px 1px at 80% 70%, rgba(255,255,255,0.1) 0%, transparent 100%),
      radial-gradient(1px 1px at 50% 50%, rgba(255,255,255,0.08) 0%, transparent 100%);
    pointer-events: none;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(245,166,35,0.12);
    border: 1px solid rgba(245,166,35,0.3);
    border-radius: 50px;
    padding: 6px 18px;
    font-size: 13px;
    color: var(--accent);
    font-weight: 500;
    letter-spacing: 0.5px;
    margin-bottom: 24px;
    animation: fadeUp 0.6s ease both;
  }

  .badge span { 
    width: 7px; height: 7px;
    background: var(--green);
    border-radius: 50%;
    display: inline-block;
    box-shadow: 0 0 8px var(--green);
    animation: pulse 2s infinite;
  }

  .hero h1 {
    font-family: 'Tiro Bangla', serif;
    font-size: clamp(2rem, 6vw, 3.8rem);
    line-height: 1.3;
    background: linear-gradient(135deg, #fff 30%, var(--accent) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 16px;
    animation: fadeUp 0.6s 0.1s ease both;
    opacity: 0;
  }

  .hero p.sub {
    font-size: clamp(15px, 2.5vw, 18px);
    color: var(--muted);
    max-width: 600px;
    margin: 0 auto 36px;
    animation: fadeUp 0.6s 0.2s ease both;
    opacity: 0;
  }

  .hero-btns {
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
    justify-content: center;
    animation: fadeUp 0.6s 0.3s ease both;
    opacity: 0;
  }

  .btn-primary {
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    color: #000;
    font-weight: 700;
    font-size: 16px;
    padding: 14px 32px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    text-decoration: none;
    display: inline-block;
    transition: transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 4px 20px rgba(245,166,35,0.4);
    font-family: 'Hind Siliguri', sans-serif;
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(245,166,35,0.5);
  }

  .btn-outline {
    background: transparent;
    color: var(--text);
    font-weight: 600;
    font-size: 16px;
    padding: 13px 30px;
    border: 1.5px solid rgba(255,255,255,0.2);
    border-radius: 10px;
    cursor: pointer;
    text-decoration: none;
    display: inline-block;
    transition: all 0.2s;
    font-family: 'Hind Siliguri', sans-serif;
  }

  .btn-outline:hover {
    border-color: var(--accent);
    color: var(--accent);
  }

  /* ── TRUST STRIP ── */
  .trust-strip {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 14px;
    padding: 20px 20px 0;
    animation: fadeUp 0.6s 0.45s ease both;
    opacity: 0;
    position: relative;
    z-index: 1;
  }

  .trust-item {
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(255,255,255,0.04);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 8px 16px;
    font-size: 13px;
    color: var(--muted);
  }

  .trust-item .icon { font-size: 16px; }

  /* ── SECTIONS ── */
  section { padding: 70px 20px; }

  .container { max-width: 1100px; margin: 0 auto; }

  .section-header {
    text-align: center;
    margin-bottom: 50px;
  }

  .section-header .eyebrow {
    font-size: 12px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--accent);
    font-weight: 600;
    margin-bottom: 10px;
  }

  .section-header h2 {
    font-family: 'Tiro Bangla', serif;
    font-size: clamp(1.6rem, 4vw, 2.4rem);
    color: #fff;
    margin-bottom: 10px;
  }

  .section-header p {
    color: var(--muted);
    font-size: 15px;
    max-width: 500px;
    margin: 0 auto;
  }

  /* ── SERVICE CATEGORIES ── */
  .services-section { background: var(--bg2); }

  .category-block { margin-bottom: 50px; }

  .category-label {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
    font-weight: 600;
    color: var(--cyan);
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-bottom: 20px;
    padding-bottom: 12px;
    border-bottom: 1px solid var(--border);
    width: 100%;
  }

  .services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 16px;
  }

  .service-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 22px 20px;
    cursor: pointer;
    transition: all 0.25s;
    position: relative;
    overflow: hidden;
  }

  .service-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, var(--glow), transparent);
    opacity: 0;
    transition: opacity 0.25s;
  }

  .service-card:hover {
    border-color: rgba(245,166,35,0.4);
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  }

  .service-card:hover::before { opacity: 1; }

  .service-card .sname {
    font-size: 15px;
    font-weight: 600;
    color: var(--text);
    margin-bottom: 12px;
    line-height: 1.4;
    position: relative;
  }

  .service-card .price {
    font-size: 22px;
    font-weight: 700;
    color: var(--accent);
    position: relative;
  }

  .service-card .price span {
    font-size: 13px;
    color: var(--muted);
    font-weight: 400;
  }

  .service-card .order-btn {
    position: absolute;
    bottom: 16px; right: 16px;
    background: var(--accent);
    color: #000;
    font-size: 11px;
    font-weight: 700;
    padding: 5px 12px;
    border-radius: 6px;
    opacity: 0;
    transition: opacity 0.2s;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    cursor: pointer;
    border: none;
    font-family: 'Hind Siliguri', sans-serif;
  }

  .service-card:hover .order-btn { opacity: 1; }

  /* SIM cards horizontal */
  .sim-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 14px;
  }

  .sim-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 18px;
    text-align: center;
    cursor: pointer;
    transition: all 0.25s;
  }

  .sim-card:hover {
    border-color: rgba(245,166,35,0.4);
    transform: translateY(-2px);
  }

  .sim-card .operator {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 6px;
  }

  .sim-card .sim-price {
    font-size: 20px;
    font-weight: 700;
    color: var(--accent);
  }

  /* ── FEATURES ── */
  .features-section { background: var(--bg); }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
  }

  .feature-box {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 28px 20px;
    text-align: center;
  }

  .feature-icon {
    font-size: 36px;
    margin-bottom: 14px;
    display: block;
  }

  .feature-box h3 {
    font-size: 15px;
    font-weight: 600;
    margin-bottom: 8px;
  }

  .feature-box p {
    font-size: 13px;
    color: var(--muted);
  }

  /* ── SERVER ACCOUNT ── */
  .server-section {
    background: linear-gradient(135deg, #0d1a3a, #0a1525);
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
  }

  .server-card {
    background: linear-gradient(135deg, rgba(245,166,35,0.08), rgba(0,180,216,0.05));
    border: 1px solid rgba(245,166,35,0.2);
    border-radius: 20px;
    padding: 40px;
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    align-items: center;
  }

  .server-card .srv-text { flex: 1; min-width: 250px; }

  .server-card h3 {
    font-family: 'Tiro Bangla', serif;
    font-size: 1.6rem;
    color: var(--accent);
    margin-bottom: 12px;
  }

  .server-card p {
    color: var(--muted);
    margin-bottom: 20px;
    font-size: 15px;
  }

  .check-list { list-style: none; }

  .check-list li {
    padding: 6px 0;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .check-list li::before {
    content: '✓';
    color: var(--green);
    font-weight: 700;
    font-size: 14px;
    flex-shrink: 0;
  }

  /* ── ORDER MODAL ── */
  .modal-overlay {
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.75);
    backdrop-filter: blur(6px);
    z-index: 1000;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }

  .modal-overlay.active { display: flex; }

  .modal {
    background: var(--card2);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 36px;
    max-width: 480px;
    width: 100%;
    position: relative;
    animation: modalIn 0.3s ease;
  }

  @keyframes modalIn {
    from { transform: scale(0.92) translateY(20px); opacity: 0; }
    to { transform: scale(1) translateY(0); opacity: 1; }
  }

  .modal-close {
    position: absolute;
    top: 14px; right: 18px;
    background: none;
    border: none;
    color: var(--muted);
    font-size: 22px;
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 6px;
    transition: color 0.2s;
  }

  .modal-close:hover { color: var(--text); }

  .modal h3 {
    font-family: 'Tiro Bangla', serif;
    font-size: 1.4rem;
    margin-bottom: 6px;
    color: #fff;
  }

  .modal .service-info {
    background: rgba(245,166,35,0.08);
    border: 1px solid rgba(245,166,35,0.2);
    border-radius: 10px;
    padding: 14px 16px;
    margin-bottom: 22px;
  }

  .modal .service-info .sname { font-size: 14px; color: var(--muted); }
  .modal .service-info .sprice { font-size: 24px; font-weight: 700; color: var(--accent); }

  .form-group { margin-bottom: 16px; }

  .form-group label {
    display: block;
    font-size: 13px;
    color: var(--muted);
    margin-bottom: 7px;
    font-weight: 500;
  }

  .form-group input,
  .form-group select {
    width: 100%;
    background: rgba(255,255,255,0.04);
    border: 1.5px solid rgba(255,255,255,0.1);
    border-radius: 10px;
    padding: 12px 14px;
    color: var(--text);
    font-size: 15px;
    font-family: 'Hind Siliguri', sans-serif;
    outline: none;
    transition: border-color 0.2s;
  }

  .form-group input:focus,
  .form-group select:focus {
    border-color: var(--accent);
  }

  .form-group select option { background: var(--card2); }

  .bkash-box {
    background: linear-gradient(135deg, rgba(230,0,60,0.1), rgba(230,0,60,0.05));
    border: 1px solid rgba(230,0,60,0.25);
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 20px;
  }

  .bkash-box .bl { font-size: 12px; color: #ff6b8a; margin-bottom: 4px; }
  .bkash-box .num {
    font-size: 20px;
    font-weight: 700;
    color: #fff;
    letter-spacing: 1px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .copy-btn {
    background: rgba(230,0,60,0.2);
    border: none;
    color: #ff6b8a;
    font-size: 11px;
    font-weight: 600;
    padding: 4px 10px;
    border-radius: 6px;
    cursor: pointer;
    font-family: 'Hind Siliguri', sans-serif;
  }

  .steps-list {
    list-style: none;
    margin-bottom: 20px;
    counter-reset: step;
  }

  .steps-list li {
    counter-increment: step;
    font-size: 13px;
    color: var(--muted);
    padding: 5px 0 5px 28px;
    position: relative;
  }

  .steps-list li::before {
    content: counter(step);
    position: absolute;
    left: 0;
    background: var(--accent);
    color: #000;
    font-size: 10px;
    font-weight: 700;
    width: 18px; height: 18px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 7px;
  }

  .alert {
    padding: 12px 16px;
    border-radius: 10px;
    font-size: 14px;
    margin-bottom: 16px;
  }

  .alert-success {
    background: rgba(0,230,118,0.1);
    border: 1px solid rgba(0,230,118,0.25);
    color: var(--green);
  }

  .alert-error {
    background: rgba(230,80,80,0.1);
    border: 1px solid rgba(230,80,80,0.25);
    color: #ff8080;
  }

  /* ── HOW IT WORKS ── */
  .how-section { background: var(--bg2); }

  .steps-row {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
    counter-reset: howstep;
  }

  .how-step {
    flex: 1;
    min-width: 180px;
    max-width: 220px;
    text-align: center;
  }

  .step-num {
    width: 52px; height: 52px;
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    color: #000;
    font-weight: 800;
    font-size: 20px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 16px;
    box-shadow: 0 6px 20px rgba(245,166,35,0.3);
  }

  .how-step h4 { font-size: 15px; font-weight: 600; margin-bottom: 6px; }
  .how-step p { font-size: 13px; color: var(--muted); }

  /* ── CONTACT ── */
  .contact-section { background: var(--bg); }

  .contact-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
  }

  .contact-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 28px;
    display: flex;
    gap: 16px;
    align-items: flex-start;
    text-decoration: none;
    color: var(--text);
    transition: all 0.2s;
  }

  .contact-card:hover {
    border-color: rgba(245,166,35,0.4);
    transform: translateY(-2px);
  }

  .contact-icon {
    width: 48px; height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    flex-shrink: 0;
  }

  .contact-card .ct-info { font-size: 14px; color: var(--muted); margin-top: 4px; }

  /* ── FOOTER ── */
  footer {
    background: var(--bg2);
    border-top: 1px solid var(--border);
    padding: 30px 20px;
    text-align: center;
  }

  footer p {
    color: var(--muted);
    font-size: 13px;
  }

  /* ── STICKY CTA ── */
  .sticky-cta {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 900;
    display: none;
  }

  .sticky-cta.visible { display: block; }

  .sticky-cta a {
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    color: #000;
    font-weight: 700;
    font-size: 14px;
    padding: 14px 28px;
    border-radius: 50px;
    text-decoration: none;
    display: inline-block;
    box-shadow: 0 6px 25px rgba(245,166,35,0.5);
    white-space: nowrap;
  }

  /* ── NAV ── */
  nav {
    position: sticky;
    top: 0;
    z-index: 800;
    background: rgba(10,14,26,0.92);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
    padding: 14px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }

  .nav-logo {
    font-family: 'Tiro Bangla', serif;
    font-size: 1.2rem;
    color: var(--accent);
    font-weight: 700;
  }

  .nav-links {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
  }

  .nav-links a {
    color: var(--muted);
    text-decoration: none;
    font-size: 14px;
    padding: 6px 12px;
    border-radius: 8px;
    transition: all 0.2s;
  }

  .nav-links a:hover {
    color: var(--text);
    background: rgba(255,255,255,0.05);
  }

  /* ── ANIMATIONS ── */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }

  /* ── TOAST ── */
  .toast {
    position: fixed;
    bottom: 30px; right: 20px;
    background: var(--green);
    color: #000;
    padding: 12px 20px;
    border-radius: 10px;
    font-weight: 600;
    font-size: 14px;
    z-index: 2000;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.3s;
  }

  .toast.show { opacity: 1; transform: translateY(0); }

  /* ── RESPONSIVE ── */
  @media (max-width: 600px) {
    .server-card { padding: 24px; }
    .modal { padding: 24px; }
    nav { flex-wrap: wrap; }
    .nav-links { display: none; }
  }
</style>
</head>
<body>

<!-- NAV -->
<nav>
  <div class="nav-logo">⚡ প্রিমিয়াম সার্ভিস</div>
  <div class="nav-links">
    <a href="#services">সার্ভিস</a>
    <a href="#how">কীভাবে কাজ করে</a>
    <a href="#contact">যোগাযোগ</a>
  </div>
  <a href="#services" class="btn-primary" style="font-size:13px;padding:9px 18px;">অর্ডার করুন</a>
</nav>

<!-- HERO -->
<div class="hero">
  <div class="badge"><span></span> লাইভ সার্ভিস চলছে</div>
  <h1>দ্রুত ও বিশ্বস্ত<br>প্রিমিয়াম সার্ভিস</h1>
  <p class="sub">NID, জন্ম নিবন্ধন, কল লিস্ট, বিকাশ/নগদ ইনফো সহ সকল সরকারি সার্ভিস — দ্রুত ও গোপনীয়ভাবে।</p>
  <div class="hero-btns">
    <a href="#services" class="btn-primary">সার্ভিস দেখুন</a>
    <a href="#contact" class="btn-outline">ইনবক্স করুন</a>
  </div>
  <div class="trust-strip">
    <div class="trust-item"><span class="icon">🔒</span> ১০০% গোপনীয়</div>
    <div class="trust-item"><span class="icon">⚡</span> দ্রুত ডেলিভারি</div>
    <div class="trust-item"><span class="icon">✅</span> বিশ্বস্ত সার্ভিস</div>
    <div class="trust-item"><span class="icon">💳</span> বিকাশ পেমেন্ট</div>
  </div>
</div>

<!-- SERVICES -->
<section class="services-section" id="services">
  <div class="container">
    <div class="section-header">
      <div class="eyebrow">আমাদের সার্ভিস</div>
      <h2>প্রিমিয়াম সার্ভিস সমূহ</h2>
      <p>যেকোনো সার্ভিসে ক্লিক করে অর্ডার করুন</p>
    </div>

    <!-- Premium Services -->
    <div class="category-block">
      <div class="category-label">🏆 প্রিমিয়াম সার্ভিস</div>
      <div class="services-grid">
        <?php
        $premium = [
          ["নাম্বার টু লোকেশন", 429],
          ["NID সাইন কপি (ভোটার নাম্বার দিয়ে)", 99],
          ["ফরম নাম্বার দিয়ে সাইন কপি", 99],
          ["অফিসিয়াল সার্ভার কপি (NID)", 119],
          ["টিন সার্টিফিকেট", 129],
        ];
        foreach ($premium as $s): ?>
        <div class="service-card" onclick="openOrder('<?= htmlspecialchars($s[0]) ?>', <?= $s[1] ?>)">
          <div class="sname"><?= $s[0] ?></div>
          <div class="price">৳<?= $s[1] ?> <span>/সার্ভিস</span></div>
          <button class="order-btn">অর্ডার</button>
        </div>
        <?php endforeach; ?>
      </div>
    </div>

    <!-- SIM Biometric -->
    <div class="category-block">
      <div class="category-label">📱 সিম বায়োমেট্রিক সার্ভিস</div>
      <div class="sim-grid">
        <?php
        $sims = [
          ["BL (বাংলালিংক)", 99, "#e40000"],
          ["GP (গ্রামীণফোন)", 119, "#006faf"],
          ["Robi / Airtel", 129, "#e40000"],
          ["Teletalk", 249, "#00813a"],
        ];
        foreach ($sims as $s): ?>
        <div class="sim-card" onclick="openOrder('সিম বায়োমেট্রিক – <?= $s[0] ?>', <?= $s[1] ?>)">
          <div class="operator" style="color:<?= $s[2] ?>"><?= $s[0] ?></div>
          <div class="sim-price">৳<?= $s[1] ?></div>
        </div>
        <?php endforeach; ?>
      </div>
    </div>

    <!-- Call List -->
    <div class="category-block">
      <div class="category-label">📞 কল লিস্ট সার্ভিস</div>
      <div class="services-grid">
        <div class="service-card" onclick="openOrder('কল লিস্ট – ৩ মাস', 699)">
          <div class="sname">কল লিস্ট – ৩ মাস</div>
          <div class="price">৳699 <span>/৩ মাস</span></div>
          <button class="order-btn">অর্ডার</button>
        </div>
        <div class="service-card" onclick="openOrder('কল লিস্ট – ৬ মাস', 1199)">
          <div class="sname">কল লিস্ট – ৬ মাস</div>
          <div class="price">৳1199 <span>/৬ মাস</span></div>
          <button class="order-btn">অর্ডার</button>
        </div>
      </div>
    </div>

    <!-- Mobile Finance -->
    <div class="category-block">
      <div class="category-label">💳 মোবাইল ফাইন্যান্স ইনফরমেশন</div>
      <div class="services-grid">
        <div class="service-card" onclick="openOrder('বিকাশ ইনফরমেশন', 799)">
          <div class="sname">বিকাশ ইনফরমেশন</div>
          <div class="price">৳799</div>
          <button class="order-btn">অর্ডার</button>
        </div>
        <div class="service-card" onclick="openOrder('নগদ ইনফরমেশন', 799)">
          <div class="sname">নগদ ইনফরমেশন</div>
          <div class="price">৳799</div>
          <button class="order-btn">অর্ডার</button>
        </div>
      </div>
    </div>

    <!-- Document Services -->
    <div class="category-block">
      <div class="category-label">📄 ডকুমেন্ট সার্ভিস</div>
      <div class="services-grid">
        <div class="service-card" onclick="openOrder('নতুন জন্ম নিবন্ধন', 1050)">
          <div class="sname">নতুন জন্ম নিবন্ধন</div>
          <div class="price">৳1050</div>
          <button class="order-btn">অর্ডার</button>
        </div>
        <div class="service-card" onclick="openOrder('অরিজিনাল স্মার্ট কার্ড', 2499)">
          <div class="sname">অরিজিনাল স্মার্ট কার্ড</div>
          <div class="price">৳2499</div>
          <button class="order-btn">অর্ডার</button>
        </div>
        <div class="service-card" onclick="openOrder('NID কার্ড সংশোধন', 0)" id="nid-correction">
          <div class="sname">NID কার্ড সংশোধন</div>
          <div class="price" style="font-size:15px;color:var(--cyan)">যোগাযোগ করুন</div>
          <button class="order-btn">জিজ্ঞেস করুন</button>
        </div>
        <div class="service-card" onclick="openOrder('ভূমি সেবা', 0)">
          <div class="sname">ভূমি সেবা</div>
          <div class="price" style="font-size:15px;color:var(--cyan)">যোগাযোগ করুন</div>
          <button class="order-btn">জিজ্ঞেস করুন</button>
        </div>
        <div class="service-card" onclick="openOrder('BMET সেবা', 0)">
          <div class="sname">BMET সেবা</div>
          <div class="price" style="font-size:15px;color:var(--cyan)">যোগাযোগ করুন</div>
          <button class="order-btn">জিজ্ঞেস করুন</button>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- SERVER ACCOUNT -->
<section class="server-section">
  <div class="container">
    <div class="server-card">
      <div class="srv-text">
        <h3>🖥️ সার্ভার একাউন্ট সুবিধা</h3>
        <p>যারা নিজে নিজে কাজ করতে চান — জন্ম নিবন্ধন, NID, বিকাশ/নগদ ইনফো সহ অন্যান্য কাজ — তাদের জন্য সার্ভার একাউন্ট নিয়ে কাজ করার সুযোগ আছে।</p>
        <ul class="check-list">
          <li>নিজের একাউন্টে লগিন করে কাজ করুন</li>
          <li>যেকোনো সময় যেকোনো জায়গা থেকে</li>
          <li>সম্পূর্ণ গোপনীয়</li>
          <li>দ্রুত ও সহজ ইন্টারফেস</li>
        </ul>
      </div>
      <div>
        <a href="#contact" class="btn-primary">একাউন্ট নিতে ইনবক্স করুন</a>
      </div>
    </div>
  </div>
</section>

<!-- FEATURES -->
<section class="features-section">
  <div class="container">
    <div class="section-header">
      <div class="eyebrow">কেন আমরা</div>
      <h2>আমাদের বিশেষত্ব</h2>
    </div>
    <div class="features-grid">
      <div class="feature-box">
        <span class="feature-icon">🔒</span>
        <h3>১০০% গোপনীয়তা</h3>
        <p>আপনার তথ্য সম্পূর্ণ সুরক্ষিত থাকে</p>
      </div>
      <div class="feature-box">
        <span class="feature-icon">⚡</span>
        <h3>দ্রুত ডেলিভারি</h3>
        <p>অর্ডার দেওয়ার পরেই দ্রুত কাজ শুরু</p>
      </div>
      <div class="feature-box">
        <span class="feature-icon">✅</span>
        <h3>বিশ্বস্ত ও অভিজ্ঞ</h3>
        <p>বহু বছরের অভিজ্ঞতা সম্পন্ন টিম</p>
      </div>
      <div class="feature-box">
        <span class="feature-icon">💬</span>
        <h3>২৪/৭ সাপোর্ট</h3>
        <p>যেকোনো সমস্যায় আমরা পাশে আছি</p>
      </div>
    </div>
  </div>
</section>

<!-- HOW IT WORKS -->
<section class="how-section" id="how">
  <div class="container">
    <div class="section-header">
      <div class="eyebrow">প্রক্রিয়া</div>
      <h2>কীভাবে কাজ করে</h2>
      <p>মাত্র ৪টি ধাপে আপনার সার্ভিস পান</p>
    </div>
    <div class="steps-row">
      <div class="how-step">
        <div class="step-num">১</div>
        <h4>সার্ভিস বেছে নিন</h4>
        <p>আপনার প্রয়োজনীয় সার্ভিসে ক্লিক করুন</p>
      </div>
      <div class="how-step">
        <div class="step-num">২</div>
        <h4>তথ্য দিন</h4>
        <p>সিরিয়াল নাম্বার ও ফোন নাম্বার দিন</p>
      </div>
      <div class="how-step">
        <div class="step-num">৩</div>
        <h4>বিকাশে পেমেন্ট</h4>
        <p>নির্দিষ্ট পরিমাণ বিকাশে সেন্ড মানি করুন</p>
      </div>
      <div class="how-step">
        <div class="step-num">৪</div>
        <h4>ডেলিভারি পান</h4>
        <p>দ্রুততার সাথে আপনার কাজ সম্পন্ন হবে</p>
      </div>
    </div>
  </div>
</section>

<!-- CONTACT -->
<section class="contact-section" id="contact">
  <div class="container">
    <div class="section-header">
      <div class="eyebrow">যোগাযোগ</div>
      <h2>ইনবক্স করুন</h2>
      <p>শুধু সিরিয়াল নাম্বার লিখে মেসেজ করুন</p>
    </div>
    <div class="contact-grid">
      <a href="https://t.me/your_telegram" target="_blank" class="contact-card">
        <div class="contact-icon" style="background:rgba(0,136,204,0.15);color:#29b6f6;">✈️</div>
        <div>
          <div style="font-weight:600">Telegram</div>
          <div class="ct-info">দ্রুত রেসপন্সের জন্য Telegram-এ মেসেজ করুন</div>
        </div>
      </a>
      <a href="https://wa.me/<?= $admin_whatsapp ?>" target="_blank" class="contact-card">
        <div class="contact-icon" style="background:rgba(37,211,102,0.15);color:#25d366;">💬</div>
        <div>
          <div style="font-weight:600">WhatsApp</div>
          <div class="ct-info">WhatsApp-এ মেসেজ করুন</div>
        </div>
      </a>
      <div class="contact-card" style="cursor:default">
        <div class="contact-icon" style="background:rgba(230,0,60,0.15);color:#e6003c;">💳</div>
        <div>
          <div style="font-weight:600">বিকাশ পেমেন্ট</div>
          <div class="ct-info" style="font-size:16px;font-weight:700;color:var(--text);margin-top:6px"><?= $bkash_number ?></div>
        </div>
      </div>
    </div>

    <div style="margin-top:40px;background:var(--card);border:1px solid var(--border);border-radius:14px;padding:24px;text-align:center">
      <p style="color:var(--accent);font-weight:600;margin-bottom:8px">📝 মেসেজের ফরম্যাট</p>
      <p style="color:var(--muted);font-size:14px">শুধু সিরিয়াল নাম্বার লিখুন (যেমন: ১ / ২ / ৩)</p>
      <p style="margin-top:12px;font-size:15px;color:var(--cyan);font-weight:600">দেরি করবেন না — আজই কাজ শুরু করুন! ⚡</p>
    </div>
  </div>
</section>

<!-- FOOTER -->
<footer>
  <p>© <?= date('Y') ?> প্রিমিয়াম সার্ভিস। সকল স্বত্ব সংরক্ষিত।</p>
  <p style="margin-top:6px">১০০% গোপনীয়তা | দ্রুত ডেলিভারি | বিশ্বস্ত সার্ভিস</p>
</footer>

<!-- STICKY CTA -->
<div class="sticky-cta" id="stickyCta">
  <a href="#services">⚡ এখনই অর্ডার করুন</a>
</div>

<!-- ORDER MODAL -->
<div class="modal-overlay" id="modalOverlay" onclick="closeOnOverlay(event)">
  <div class="modal">
    <button class="modal-close" onclick="closeModal()">✕</button>
    <h3>অর্ডার করুন</h3>

    <div class="service-info">
      <div class="sname" id="modal-service-name">সার্ভিসের নাম</div>
      <div class="sprice" id="modal-service-price">৳0</div>
    </div>

    <?php if ($success_message): ?>
    <div class="alert alert-success"><?= $success_message ?></div>
    <?php endif; ?>

    <?php if ($error_message): ?>
    <div class="alert alert-error"><?= $error_message ?></div>
    <?php endif; ?>

    <form method="POST">
      <input type="hidden" name="action" value="order">
      <input type="hidden" name="service" id="form-service">
      <input type="hidden" name="amount" id="form-amount">

      <div class="form-group">
        <label>আপনার ফোন নাম্বার *</label>
        <input type="tel" name="phone" placeholder="01XXXXXXXXX" required>
      </div>

      <div class="form-group">
        <label>সিরিয়াল / তথ্য *</label>
        <input type="text" name="serial" placeholder="প্রয়োজনীয় নাম্বার বা তথ্য লিখুন" required>
      </div>

      <div class="bkash-box">
        <div class="bl">💳 বিকাশে পেমেন্ট করুন (Send Money)</div>
        <div class="num">
          <span id="bkash-display"><?= $bkash_number ?></span>
          <button type="button" class="copy-btn" onclick="copyBkash()">কপি</button>
        </div>
      </div>

      <ol class="steps-list">
        <li>উপরের বিকাশ নাম্বারে <strong>Send Money</strong> করুন</li>
        <li>নিচে ফোন নাম্বার ও প্রয়োজনীয় তথ্য দিন</li>
        <li>"অর্ডার নিশ্চিত করুন" বাটনে ক্লিক করুন</li>
        <li>দ্রুত ডেলিভারি পাবেন</li>
      </ol>

      <button type="submit" class="btn-primary" style="width:100%;text-align:center;">
        ✅ অর্ডার নিশ্চিত করুন
      </button>
    </form>
  </div>
</div>

<!-- TOAST -->
<div class="toast" id="toast">কপি হয়েছে! ✓</div>

<script>
const bkashNum = "<?= $bkash_number ?>";

function openOrder(name, price) {
  document.getElementById('modal-service-name').textContent = name;
  document.getElementById('modal-service-price').textContent = price > 0 ? '৳' + price : 'মূল্য জানতে যোগাযোগ করুন';
  document.getElementById('form-service').value = name;
  document.getElementById('form-amount').value = price;
  document.getElementById('modalOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('active');
  document.body.style.overflow = '';
}

function closeOnOverlay(e) {
  if (e.target === document.getElementById('modalOverlay')) closeModal();
}

function copyBkash() {
  navigator.clipboard.writeText(bkashNum).then(() => showToast('নাম্বার কপি হয়েছে! ✓'));
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}

// Sticky CTA
window.addEventListener('scroll', () => {
  const cta = document.getElementById('stickyCta');
  if (window.scrollY > 500) cta.classList.add('visible');
  else cta.classList.remove('visible');
});

// Escape to close modal
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// Open modal if POST success
<?php if ($success_message): ?>
document.addEventListener('DOMContentLoaded', () => {
  openOrder('', 0);
});
<?php endif; ?>
</script>
</body>
</html>