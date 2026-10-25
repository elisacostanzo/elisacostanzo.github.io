/**
 * ELISA COSTANZO — HALLOWEEN EDITION | RAGNATELE & ZUCCHE
 * Add once to the <head> of each HTML page:
 * <script src="halloween.js" defer></script>
 *
 * By default, active from October 20 through November 2 (each year).
 * Preview at any time with ?halloween=1; disable in a browser with ?halloween=0.
 * Completely removable: delete the script tag from your pages.
 * No dependencies, no external assets, no cookies, no tracking.
 */
(() => {
  'use strict';

  const now = new Date();
  const month = now.getMonth(); // 0 = January
  const day = now.getDate();
  const params = new URLSearchParams(window.location.search);
  const override = params.get('halloween');
  const inSeason = (month === 9 && day >= 20) || (month === 10 && day <= 2);
  const enabled = override === '1' || (override !== '0' && inSeason);
  if (!enabled || document.documentElement.classList.contains('ec-halloween')) return;

  const styles = String.raw`
    html.ec-halloween {
      --ec-h-orange: #df8547;
      --ec-h-copper: #ba714f;
      --ec-h-plum: #30233d;
      --ec-h-cream: #fff7ee;
      --ec-h-shadow: rgba(50, 23, 47, 0.18);
    }
    html.ec-halloween, html.ec-halloween body { overflow-x: clip; }
    html.ec-halloween body { position: relative; }

    /* A slim, accessible seasonal banner rather than a redesign of your layout. */
    .ec-h-banner {
      position: relative; z-index: 9990; display: flex; align-items: center;
      justify-content: center; gap: 17px; width: 100%; min-height: 49px;
      padding: 10px 54px; box-sizing: border-box;
      background: linear-gradient(100deg,#211a2e 0%,#39263b 43%,#261a32 100%);
      border-bottom: 1px solid rgba(243,168,111,.36);
      box-shadow: 0 5px 23px rgba(28,14,33,.12);
      color: #fff5e9; font-family: Georgia, 'Times New Roman', serif;
      font-size: 14px; letter-spacing: .015em; text-align: center;
    }
    .ec-h-banner__tag { font: 700 10px/1.3 system-ui, -apple-system, sans-serif;
      letter-spacing: .23em; color: #f7bf88; white-space: nowrap; }
    .ec-h-banner__copy { font-style: italic; opacity: .96; }
    .ec-h-banner__spark { color:#f6ba78; font-size: 16px; }
    .ec-h-banner__close {
      position: absolute; right: 15px; top: 50%; transform: translateY(-50%);
      display: grid; place-items: center; width: 30px; height: 30px;
      padding: 0; margin: 0; background: transparent; color: #ffefde;
      border: 1px solid rgba(255,255,255,.24); border-radius: 50%;
      cursor: pointer; font: 20px/1 system-ui, sans-serif;
      transition: background .2s ease, border-color .2s ease;
    }
    .ec-h-banner__close:hover { background: rgba(255,255,255,.13); border-color:#ffc58e; }
    .ec-h-banner__close:focus-visible { outline: 3px solid #ffc58e; outline-offset: 3px; }

    /* Decorative elements are never clickable and cannot block menus or forms. */
    .ec-h-scene, .ec-h-scene * { pointer-events: none !important; }
    .ec-h-scene { position: fixed; inset: 0; overflow: hidden; z-index: 8000;
      width: 100%; height: 100%; height: 100dvh; isolation: isolate; }
    .ec-h-scene__glow {
      position: absolute; inset: 0;
      background: radial-gradient(ellipse 400px 280px at 99% 0%, rgba(212,126,92,.095), transparent 70%),
                  radial-gradient(ellipse 360px 320px at 0% 96%, rgba(112,71,131,.085), transparent 71%);
    }
    .ec-h-web { position: absolute; top: 0; width: 135px; height: 135px;
      opacity: .35; stroke: #b57b74; fill: none; stroke-width: 1.4; }
    .ec-h-web--left { left:0; }
    .ec-h-web--right { right:0; transform: scaleX(-1); }
    .ec-h-moon { position: absolute; right: 7%; top: 17%; width: 55px; height: 55px;
      border-radius: 50%; background: #f0bc8d;
      box-shadow: 0 0 28px 7px rgba(241,169,103,.29), 0 0 65px 19px rgba(208,137,102,.11);
      opacity: .64; animation: ec-h-moon 6s ease-in-out infinite alternate; }
    .ec-h-moon:after { content:''; position:absolute; width: 54px; height:54px;
      border-radius: 50%; top:-12px; left:18px; background: #fffaf4;
      opacity:.9; }
    .ec-h-bat { position:absolute; color:#42304d; opacity:.64;
      width:42px; height:22px; filter: drop-shadow(0 4px 6px rgba(50,24,55,.16));
      animation: ec-h-float 7s ease-in-out infinite; }
    .ec-h-bat--a { top:17%; right:16%; transform: rotate(-13deg); width: 46px; }
    .ec-h-bat--b { top:25%; right:7%; animation-delay:-2.1s; transform:scale(.72) rotate(15deg); }
    .ec-h-bat--c { top:32%; left:2.1%; animation-delay:-4s; transform:scale(.63) rotate(-12deg); opacity:.38; }
    .ec-h-sparkle { position:absolute; color:#c78c6b; font-size:18px;
      opacity:.54; animation:ec-h-twinkle 3.7s ease-in-out infinite alternate; }
    .ec-h-sparkle--a { top:13%; right:13%; }
    .ec-h-sparkle--b { top:29%; right:22%; font-size:12px; animation-delay:-2s; }
    .ec-h-sparkle--c { bottom:19%; left:6%; font-size:12px; animation-delay:-.8s; }
    .ec-h-pumpkin { position:absolute; left:13px; bottom:19px; width:100px; height:100px;
      opacity:.83; filter:drop-shadow(0 6px 14px rgba(87,42,53,.20));
      animation:ec-h-pumpkin 5.6s ease-in-out infinite alternate; }

    /* Restrained accents: preserve original typography, photography and text. */
    html.ec-halloween :is(a, button, input, textarea, select):focus-visible {
      outline-color: #d48b5e; outline-offset: 3px;
    }
    html.ec-halloween :is(h1, h2) { text-shadow: 0 2px 20px rgba(161,104,130,.09); }
    html.ec-halloween :is(img, picture) { transition: filter .3s ease; }
    @keyframes ec-h-float { 0%, 100% { translate: 0 0; } 50% { translate: -6px -11px; } }
    @keyframes ec-h-moon { from { opacity:.49; } to { opacity:.73; } }
    @keyframes ec-h-twinkle { from { opacity:.18; scale:.8; } to {opacity:.62; scale:1.12;} }
    @keyframes ec-h-pumpkin { from {translate:0 0;} to {translate:0 -5px;} }

    @media (max-width: 680px) {
      .ec-h-banner { flex-wrap: wrap; row-gap: 2px; column-gap: 8px;
        min-height: 55px; padding: 9px 43px 9px 20px; font-size:12px; }
      .ec-h-banner__tag {font-size:9px; letter-spacing:.16em;}
      .ec-h-banner__spark { display:none; }
      .ec-h-web { width:80px; height:80px; opacity:.18; }
      .ec-h-web--left { display:none; }
      .ec-h-moon { width:34px; height:34px; right:10%; top:20%; }
      .ec-h-moon:after {width:34px; height:34px; top:-8px; left:13px;}
      .ec-h-bat--b, .ec-h-bat--c, .ec-h-sparkle--b, .ec-h-sparkle--c {display:none;}
      .ec-h-bat--a { right: 9%; top: 31%; width:30px; opacity:.35; }
      .ec-h-pumpkin {width:55px; height:55px; left:5px; bottom:8px; opacity:.64;}
    }
    @media (prefers-reduced-motion: reduce) {
      .ec-h-scene *, .ec-h-banner * { animation:none!important; transition:none!important; }
    }
  `;

  const batSvg = `<svg viewBox="0 0 100 46" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill="currentColor" d="M50 13c-2-8-7-12-12-10l-1 9C30 5 21 4 17 8 13 2 5 4 0 5c4 5 3 13 10 16 3 1 3 7 4 11 7-5 15-6 21-2 4-2 8-4 15-2 7-2 11 0 15 2 6-4 14-3 21 2 1-4 1-10 4-11 7-3 6-11 10-16-5-1-13-3-17 3-4-4-13-3-20 4l-1-9C57 1 52 5 50 13Z"/></svg>`;
  const webSvg = `<svg viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M0 0 140 0M0 0 0 140M0 0 138 138M0 0 134 65M0 0 65 134M0 0 80 136M0 0 136 80M0 0 130 30M0 0 30 130"/><path d="M25 0 Q23 13 14 21 Q14 26 0 25 M54 0 Q49 33 29 43 Q23 49 0 54 M88 0 Q80 50 46 69 Q37 79 0 88 M127 0 Q115 77 67 98 Q53 119 0 127"/></svg>`;
  const pumpkinSvg = `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs><linearGradient id="ec-pumpkin-grad" x1=".1" y1="0" x2="1" y2="1"><stop stop-color="#f6af62"/><stop offset="1" stop-color="#bc623a"/></linearGradient></defs><path d="M58 28Q55 17 65 12" fill="none" stroke="#65744a" stroke-width="7" stroke-linecap="round"/><path d="M60 27C38 14 11 39 17 75c3 23 30 36 43 32 17 5 46-10 47-36 1-31-24-52-47-44Z" fill="url(#ec-pumpkin-grad)" stroke="#a75435" stroke-width="2"/><path d="M60 28C46 35 42 86 60 107M60 28c16 15 18 61 0 79" fill="none" stroke="#b65d3d" stroke-width="2.2" opacity=".6"/><path d="m32 60 15-11 3 17Zm56 0L73 49l-3 17ZM47 80q13 11 26 0" fill="#3c293d" stroke="#3c293d" stroke-linecap="round" stroke-width="3"/><path d="M64 24q15-9 22-3" fill="none" stroke="#7f8851" stroke-width="4" stroke-linecap="round"/></svg>`;

  // Stronger corner webs (SVG encoded locally; no external images or downloads).
  const cornerWebSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 144" fill="none" aria-hidden="true"><g stroke="#ffd3a2" stroke-width="1.85" stroke-linecap="round" stroke-opacity="0.9"><path d="M0 0H144M0 0V144M0 0l144 144M0 0l144 72M0 0l72 144M0 0l144 29M0 0l29 144"/><path d="M24 0Q25 14 15 22Q12 25 0 24M50 0Q51 30 30 44Q19 51 0 50M80 0Q79 49 46 71Q24 82 0 80M116 0Q117 72 65 104Q32 120 0 116M140 0Q140 87 80 126Q48 144 0 140"/></g><circle cx="26" cy="43" r="2.5" fill="#f9a45b" opacity=".8"/><circle cx="65" cy="102" r="2" fill="#ffd8ad" opacity=".75"/></svg>`;
  const webArt = `url("data:image/svg+xml,${encodeURIComponent(cornerWebSvg)}")`;

  const strongerStyles = String.raw`
    /* Palette Halloween più marcata, mantenendo intatti font e fotografie. */
    html.ec-halloween {
      --blue: #514062;
      --magenta: #a64b58;
      --yellow: #ffc36c;
    }
    html.ec-halloween body {
      background:
        radial-gradient(ellipse 720px 480px at 9% 7%, rgba(135,58,143,.43), transparent 75%),
        radial-gradient(ellipse 840px 560px at 92% 13%, rgba(226,111,50,.33), transparent 75%),
        radial-gradient(ellipse 690px 560px at 47% 97%, rgba(110,48,110,.34), transparent 76%),
        linear-gradient(180deg, #20152e 0%, #341e3d 47%, #1b152b 100%);
      background-attachment: fixed;
    }
    html.ec-halloween header {
      border-bottom-color: rgba(255,173,87,.52);
      box-shadow: 0 7px 26px rgba(17,9,25,.29);
    }
    html.ec-halloween :is(.section-title, .brand-name) {
      text-shadow: 0 3px 24px rgba(255,147,78,.24), 0 9px 24px rgba(0,0,0,.32);
    }
    html.ec-halloween :is(.btn.primary, .menu-button) {
      background: linear-gradient(135deg,#ffdfaa 0%,#ffb65b 100%);
      color: #302036;
      box-shadow: 0 10px 29px rgba(244,113,46,.24);
    }
    html.ec-halloween :is(.btn:hover, .menu-button:hover) {
      box-shadow: 0 11px 29px rgba(255,147,61,.29);
    }
    html.ec-halloween :is(.card, .tile, details.details, .contact-note, .ig-marquee, .ig-card, .menu-card, .menu-item) {
      position: relative;
      isolation: isolate;
      border-color: rgba(255,173,97,.45);
      box-shadow: 0 19px 40px rgba(14,6,23,.34), 0 0 27px rgba(255,119,57,.11);
    }
    html.ec-halloween :is(.card, .tile) {
      background: linear-gradient(142deg, rgba(115,61,116,.46), rgba(43,29,55,.74));
    }

    /* Due ragnatele per ogni riquadro: una in alto a destra, una in basso a sinistra. */
    html.ec-halloween :is(.card, .tile, details.details, .contact-note, .ig-marquee, .ig-card, .menu-card, .menu-item)::before,
    html.ec-halloween :is(.card, .tile, details.details, .contact-note, .ig-marquee, .ig-card, .menu-card, .menu-item)::after {
      content: "";
      position: absolute;
      width: 116px;
      height: 116px;
      background-image: ${webArt};
      background-size: contain;
      background-repeat: no-repeat;
      z-index: 3;
      pointer-events: none;
      filter: drop-shadow(0 0 5px rgba(255,130,59,.42));
    }
    html.ec-halloween :is(.card, .tile, details.details, .contact-note, .ig-marquee, .ig-card, .menu-card, .menu-item)::before {
      top: -1px; right: -1px;
      transform: scaleX(-1);
      opacity: .96;
    }
    html.ec-halloween :is(.card, .tile, details.details, .contact-note, .ig-marquee, .ig-card, .menu-card, .menu-item)::after {
      bottom: -1px; left: -1px;
      transform: scaleY(-1);
      opacity: .57;
      width: 78px; height: 78px;
    }
    html.ec-halloween :is(.tile, .ig-card, .menu-item, details.details)::before {
      width: 84px; height: 84px; opacity: .9;
    }
    html.ec-halloween :is(.menu-item, .ig-card)::after { width: 49px; height: 49px; opacity: .45; }

    /* Ragnatele abbracciano il logo + ragnetto pendente. */
    html.ec-halloween .ec-h-logo-wrap {
      position: relative;
      isolation: isolate;
      overflow: visible;
    }
    html.ec-halloween .ec-h-logo-wrap::before,
    html.ec-halloween .ec-h-logo-wrap::after {
      content: "";
      position: absolute;
      width: 105px; height: 105px;
      top: -20px;
      background-image: ${webArt};
      background-repeat: no-repeat;
      background-size: contain;
      opacity: .98;
      filter: drop-shadow(0 0 6px rgba(255,143,60,.64));
      pointer-events: none;
      z-index: 4;
    }
    html.ec-halloween .ec-h-logo-wrap::before { left: -25px; }
    html.ec-halloween .ec-h-logo-wrap::after { right: -30px; transform: scaleX(-1); }
    html.ec-halloween .ec-h-logo-spider {
      position: absolute;
      right: -18px;
      top: 48%;
      width: 42px;
      height: 88px;
      pointer-events: none;
      z-index: 5;
      filter: drop-shadow(0 0 5px rgba(255,162,69,.6));
      transform-origin: 50% 0%;
      animation: ec-h-spider-swing 4.2s ease-in-out infinite alternate;
    }
    @keyframes ec-h-spider-swing { from {transform:rotate(-6deg)} to {transform:rotate(6deg)} }

    /* Più pipistrelli e decorazioni ambientali, sempre non interattivi. */
    .ec-h-scene { z-index: 50; }
    .ec-h-web { opacity: .67; stroke: #ffae72; stroke-width: 1.85; }
    .ec-h-web--left, .ec-h-web--right { width: 170px; height: 170px; }
    .ec-h-bat { color:#ffc080; opacity:.72; filter: drop-shadow(0 2px 8px rgba(255,151,68,.25)); }
    .ec-h-bat--d { top: 63%; right: 2%; animation-delay:-1.4s; width: 35px; opacity:.53; }
    .ec-h-bat--e { bottom: 14%; right: 21%; animation-delay:-3.7s; width: 26px; opacity:.55; }
    .ec-h-pumpkin { width: 119px; height: 119px; opacity:.94; }
    .ec-h-moon { opacity:.83; }
    .ec-h-banner {
      background: linear-gradient(95deg,#22102c 0%,#743a52 51%,#301b32 100%);
      border-bottom: 2px solid rgba(255,178,88,.78);
      box-shadow: 0 8px 25px rgba(0,0,0,.3);
    }
    .ec-h-banner__tag { color:#ffd0a0; }

    @media (max-width: 680px) {
      html.ec-halloween :is(.card, .tile, details.details, .contact-note, .ig-marquee, .ig-card, .menu-card, .menu-item)::before {
        width: 67px; height: 67px; opacity:.80;
      }
      html.ec-halloween :is(.card, .tile, details.details, .contact-note, .ig-marquee, .ig-card, .menu-card, .menu-item)::after {
        width: 43px; height: 43px; opacity:.43;
      }
      html.ec-halloween .ec-h-logo-wrap::before,
      html.ec-halloween .ec-h-logo-wrap::after { width: 61px; height: 61px; top: -11px; }
      html.ec-halloween .ec-h-logo-wrap::before { left:-12px; }
      html.ec-halloween .ec-h-logo-wrap::after { right:-12px; }
      html.ec-halloween .ec-h-logo-spider { right:-10px; width:27px; height:64px; top:38%; }
      .ec-h-web--left, .ec-h-web--right { width: 95px; height: 95px; opacity:.37; }
      .ec-h-bat--d, .ec-h-bat--e { display:none; }
      .ec-h-pumpkin {width:62px;height:62px;}
    }
    @media (prefers-reduced-motion: reduce) {
      .ec-h-logo-spider { animation:none !important; }
    }
  `;

  const spiderSvg = `<svg viewBox="0 0 42 88" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M21 0V51" stroke="#fbd4a4" stroke-width="1.8" stroke-linecap="round"/><path d="M14 62 5 57 1 51M14 67 5 66 1 73M14 71 7 78 5 85M28 62 37 57 41 51M28 67 37 66 41 73M28 71 35 78 37 85" stroke="#f9b56d" stroke-width="2.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="21" cy="69" r="10" fill="#2e1d32" stroke="#ffbd70" stroke-width="1.5"/><circle cx="21" cy="57" r="6" fill="#3c2241" stroke="#ffbd70" stroke-width="1.3"/><circle cx="18.6" cy="56" r="1.3" fill="#ffa553"/><circle cx="23.4" cy="56" r="1.3" fill="#ffa553"/></svg>`;

  function init() {
    if (!document.body) return;
    document.documentElement.classList.add('ec-halloween');
    const style = document.createElement('style');
    style.id = 'ec-halloween-styles';
    style.textContent = styles + strongerStyles;
    document.head.appendChild(style);

    const ribbon = document.createElement('aside');
    ribbon.className = 'ec-h-banner';
    ribbon.setAttribute('aria-label', 'Decorazione stagionale Halloween');
    ribbon.innerHTML = `<span class="ec-h-banner__tag">🦇 HALLOWEEN EDITION 🕸️</span><span class="ec-h-banner__spark" aria-hidden="true">☾</span><span class="ec-h-banner__copy">Ogni voce ha un lato misterioso.</span><button type="button" class="ec-h-banner__close" aria-label="Chiudi il messaggio di Halloween" title="Chiudi">×</button>`;
    document.body.insertBefore(ribbon, document.body.firstChild);
    ribbon.querySelector('button').addEventListener('click', () => ribbon.remove());

    const scene = document.createElement('div');
    scene.className = 'ec-h-scene';
    scene.setAttribute('aria-hidden', 'true');
    scene.innerHTML = `<div class="ec-h-scene__glow"></div><div class="ec-h-web ec-h-web--left">${webSvg}</div><div class="ec-h-web ec-h-web--right">${webSvg}</div><div class="ec-h-moon"></div><div class="ec-h-bat ec-h-bat--a">${batSvg}</div><div class="ec-h-bat ec-h-bat--b">${batSvg}</div><div class="ec-h-bat ec-h-bat--c">${batSvg}</div><div class="ec-h-bat ec-h-bat--d">${batSvg}</div><div class="ec-h-bat ec-h-bat--e">${batSvg}</div><span class="ec-h-sparkle ec-h-sparkle--a">✧</span><span class="ec-h-sparkle ec-h-sparkle--b">✦</span><span class="ec-h-sparkle ec-h-sparkle--c">✧</span><div class="ec-h-pumpkin">${pumpkinSvg}</div>`;
    document.body.appendChild(scene);

    // Decorate the existing header logo without changing its image or link.
    const logoImage = document.querySelector('header .logo-img, header .brand img, header img[alt*="Logo"]');
    const logoWrap = document.querySelector('header .logo-wrap') || (logoImage && logoImage.parentElement);
    if (logoWrap && !logoWrap.classList.contains('ec-h-logo-wrap')) {
      logoWrap.classList.add('ec-h-logo-wrap');
      const spider = document.createElement('span');
      spider.className = 'ec-h-logo-spider';
      spider.setAttribute('aria-hidden', 'true');
      spider.innerHTML = spiderSvg;
      logoWrap.appendChild(spider);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
