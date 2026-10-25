/**
 * ELISA COSTANZO — HALLOWEEN EDITION
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

  function init() {
    if (!document.body) return;
    document.documentElement.classList.add('ec-halloween');
    const style = document.createElement('style');
    style.id = 'ec-halloween-styles';
    style.textContent = styles;
    document.head.appendChild(style);

    const ribbon = document.createElement('aside');
    ribbon.className = 'ec-h-banner';
    ribbon.setAttribute('aria-label', 'Decorazione stagionale Halloween');
    ribbon.innerHTML = `<span class="ec-h-banner__tag">✦ HALLOWEEN EDITION ✦</span><span class="ec-h-banner__spark" aria-hidden="true">☾</span><span class="ec-h-banner__copy">Ogni voce ha un lato misterioso.</span><button type="button" class="ec-h-banner__close" aria-label="Chiudi il messaggio di Halloween" title="Chiudi">×</button>`;
    document.body.insertBefore(ribbon, document.body.firstChild);
    ribbon.querySelector('button').addEventListener('click', () => ribbon.remove());

    const scene = document.createElement('div');
    scene.className = 'ec-h-scene';
    scene.setAttribute('aria-hidden', 'true');
    scene.innerHTML = `<div class="ec-h-scene__glow"></div><div class="ec-h-web ec-h-web--left">${webSvg}</div><div class="ec-h-web ec-h-web--right">${webSvg}</div><div class="ec-h-moon"></div><div class="ec-h-bat ec-h-bat--a">${batSvg}</div><div class="ec-h-bat ec-h-bat--b">${batSvg}</div><div class="ec-h-bat ec-h-bat--c">${batSvg}</div><span class="ec-h-sparkle ec-h-sparkle--a">✧</span><span class="ec-h-sparkle ec-h-sparkle--b">✦</span><span class="ec-h-sparkle ec-h-sparkle--c">✧</span><div class="ec-h-pumpkin">${pumpkinSvg}</div>`;
    document.body.appendChild(scene);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
