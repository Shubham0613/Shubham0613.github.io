/* Shubham Creator Hub — upgrade layer (self-contained, no dependencies).
   Adds: "Nova" chatbot about Shubham, command palette (Ctrl/Cmd+K), scroll HUD, cursor glow,
   animated nebula background, Revenue Planner calculator, and a Work-with-me card.
   Edit the KB object below to change anything the chatbot says. */
(() => {
"use strict";
const L = {
  li: "https://www.linkedin.com/", gh: "https://github.com/Shubham0613", ig: "https://www.instagram.com/shubham.nova._/",
  mom: "https://www.youtube.com/@MindOverMachines.O", pde: "https://www.youtube.com/@ProjectDarkEarth",
  pbi: "https://app.powerbi.com/view?r=eyJrIjoiYjFhNjliNmUtZTI0Ni00Y2UxLWJjOTctNjdjMzQyYjQwN2UwIiwidCI6Ijg3MGY4ZTE2LTllMWQtNDNjNi1hZGUwLWMxMDY1ODAxYTc2MiJ9"
};
/* ---------- Knowledge base: only confirmed facts. Update here when things change. ---------- */
const INTENTS = [
  {k: ["hi", "hello", "hey", "namaste", "hola"], a: "Hi, I'm Nova, Shubham's site assistant. Ask me about his education, projects, skills, certifications, channels, the roles he's targeting, or how to reach him."},
  {k: ["who", "about", "introduce", "yourself", "shubham", "background"], a: "Shubham Gawande is an IT graduate from India (B.Tech IT, 2026) with a practical focus on IT operations, networking, and data analytics with Excel, SQL and Power BI. He also builds websites and creator projects. He's still working out the best mix of employment, specialization and independent work, so he doesn't fit one job title."},
  {k: ["education", "degree", "btech", "b.tech", "diploma", "college", "study", "graduat", "qualification"], a: "He holds a B.Tech in Information Technology (completed 2026) and a three-year Diploma in Information Technology."},
  {k: ["skill", "tech stack", "tools", "power bi", "powerbi", "excel", "dax", "power query", "mysql", "postgresql", "expertise", "technology", "pivot"], a: "Skills listed on his profile: Excel (pivot tables, XLOOKUP, dashboards), Power Query, Power BI and DAX, SQL with MySQL and PostgreSQL, plus networking, IT support, Windows and Linux basics and technical documentation. Exposure varies by tool; the best evidence is his projects."},
  {k: ["python", "java", "coding", "programmer", "developer", "programming", "code"], a: "He has Python and Java fundamentals from academic work and has explored Next.js, Prisma and Supabase. The roles he is targeting lean towards non-coding technical work (IT support, networking, data and BI) rather than programming-heavy ones."},
  {k: ["project", "portfolio", "built", "build", "dashboard"], a: "Main projects: AI-IT Operations Analytics (Power BI, SQL and Excel on 1,500 IT incident records), a Smart Motion-Based Dustbin built with Arduino, and Fintrack-AI (a web app still in development). See [the live dashboard](" + L.pbi + ") or scroll to Projects."},
  {k: ["ticket", "sla", "incident", "analytics", "itsm", "operations analytics", "csat", "kpi"], a: "AI-IT Operations Analytics analyses 1,500 IT incident records for priorities, service quality and SLA performance: 977 resolved tickets and 91.8% SLA compliance. SQL (MySQL) is used to extract and validate the data behind the Excel and Power BI views. [Open the dashboard](" + L.pbi + ")."},
  {k: ["ai", "machine learning", "ml", "model", "artificial"], a: "In the IT Operations Analytics project, AI means analysing AI-predicted priority fields against recorded priorities. It is not a machine-learning model that Shubham trained. His profile also lists AWS Academy Machine Learning Foundations training."},
  {k: ["iot", "arduino", "dustbin", "sensor", "servo", "embedded"], a: "The Smart Motion-Based Dustbin is an IoT project using an Arduino Uno, an ultrasonic sensor and a servo motor so the bin responds to nearby motion."},
  {k: ["fintrack", "finance app", "nextjs", "next.js", "prisma", "supabase"], a: "Fintrack-AI is a developing web-app project exploring Next.js, Prisma, PostgreSQL and Supabase. It's in progress, so features are still being built."},
  {k: ["youtube", "channel", "videos", "mind over machines", "dark earth", "subscribe", "content", "faceless"], a: "Two channels: [Mind Over Machines](" + L.mom + ") for practical AI tools and digital productivity, and [Project Dark Earth](" + L.pde + ") for mysteries, history and exploration. Content is built with AI-assisted workflows; factual topics aim to separate evidence from legend."},
  {k: ["creator", "studio", "script", "seo", "thumbnail", "planner", "workflow"], a: "The Creator Studio has a Workflow Studio, Script Studio, YouTube SEO Studio, Thumbnail Prompt Studio and a Content Planner with CSV export. They run locally from templates in your browser, not live AI."},
  {k: ["cert", "internship", "cisco", "cybersecurity", "aws", "learnvern", "training", "ccna"], a: "Training and certifications on his profile include the AICTE-Cisco Virtual Internship, Cisco Introduction to Cybersecurity, Cisco Operating Systems Basics, AWS Academy Machine Learning Foundations and LearnVern IoT courses. He is exploring CCNA but does not currently claim that certification."},
  {k: ["network", "networking", "noc", "troubleshoot", "subnet", "routing", "switching", "support engineer", "service desk", "help desk"], a: "Networking and IT support are his first career priority: IP addressing, routing and switching fundamentals, troubleshooting, operating systems and incident management. Target roles include IT Support, Service Desk, NOC and Network Support."},
  {k: ["sales", "business development", "bde", "customer support", "remote", "work from home", "operations associate"], a: "Beyond IT and data roles he is also open to remote support and operations roles and to business development or sales support. He is positioning transferable skills such as communication, documentation and problem-solving, and does not claim direct-sales experience."},
  {k: ["job", "hire", "hiring", "role", "career", "opportunity", "opportunities", "resume", "cv", "available", "fresher", "employ"], a: "He's looking for entry-level roles: IT support and network operations first, then data, MIS and reporting analyst roles, then remote operations and sales support. Locations: Pune and other Indian hubs, or remote. Best way to start a conversation: [LinkedIn](" + L.li + ")."},
  {k: ["contact", "email", "reach", "connect", "linkedin", "github", "instagram", "social", "message", "phone"], a: "Find him on [LinkedIn](" + L.li + "), [GitHub](" + L.gh + ") and [Instagram](" + L.ig + "). I don't share personal contact details here."},
  {k: ["where", "location", "pune", "city", "india", "live", "based", "bhopal", "bengaluru", "mumbai"], a: "He's from India. His recent job search centres on Pune, Maharashtra, and also covers Bhopal, Bengaluru, Mumbai, Delhi, Gurgaon and remote roles."},
  {k: ["earn", "revenue", "money", "monetiz", "income", "adsense", "affiliate"], a: "The Revenue Lab lists real setup paths (AdSense, YouTube Studio, Amazon Associates India, Gumroad, Ko-fi) and a Revenue Planner where you enter your own assumptions. Nothing there promises earnings."},
  {k: ["planet", "solar", "3d", "music", "site", "website", "space", "orrery"], a: "The hero is a real-time 3D solar system: click a planet to focus, drag to rotate, scroll to zoom. The music button controls background tracks."},
  {k: ["thanks", "thank", "great", "awesome", "cool"], a: "Happy to help. Anything else about Shubham's work?"},
  {k: ["bye", "goodbye", "later"], a: "Goodbye! Thanks for visiting."}
];
const FALLBACK = "I don't have a confirmed answer to that. I can talk about Shubham's education, projects, skills, channels, job interests or how to connect. Try one of the buttons below.";
const SUGGEST = ["Who is Shubham?", "Projects", "Skills", "Certifications", "Roles he wants", "YouTube channels"];
const GENERIC = ["about", "who", "shubham", "project", "work", "build", "built", "know", "code", "site", "background", "introduce", "yourself", "message", "connect"];
const hit = (q, w) => (w.length <= 3 ? new RegExp("\\b" + w.replace(/\./g, "\\.") + (w.length === 3 ? "s?" : "") + "\\b").test(q) : q.includes(w));
function answer(input) {
  const q = String(input || "").toLowerCase().slice(0, 300);
  let best = null, top = 0;
  INTENTS.forEach(it => { const s = it.k.reduce((n, w) => n + (hit(q, w) ? (GENERIC.includes(w) ? .5 : w.length > 4 ? 2 : 1.2) : 0), 0); if (s > top) { top = s; best = it; } });
  return best ? best.a : FALLBACK;
}
if (typeof module !== "undefined") module.exports = {answer};
if (typeof document === "undefined") return;

/* ---------- Styles ---------- */
const css = `
#nebula{position:fixed;inset:0;z-index:-2;pointer-events:none;overflow:hidden}
#nebula i{position:absolute;border-radius:50%;filter:blur(90px);opacity:.38;animation:nb 40s ease-in-out infinite alternate}
#nebula i:nth-child(1){width:55vw;height:55vw;left:-12vw;top:5vh;background:#1b5a8a}
#nebula i:nth-child(2){width:48vw;height:48vw;right:-10vw;top:35vh;background:#4b2a8f;animation-delay:-12s}
#nebula i:nth-child(3){width:40vw;height:40vw;left:30vw;bottom:-14vh;background:#0f6b66;animation-delay:-24s}
@keyframes nb{to{transform:translate3d(6vw,-5vh,0) scale(1.15)}}
#hud-bar{position:fixed;top:0;left:0;height:3px;width:100%;transform-origin:0 50%;transform:scaleX(0);z-index:60;background:linear-gradient(90deg,#7fe9e0,#bfb1ff,#ff9a3c);box-shadow:0 0 14px #7fe9e0}
#cursor-glow{position:fixed;left:0;top:0;width:320px;height:320px;margin:-160px 0 0 -160px;border-radius:50%;pointer-events:none;z-index:-1;background:radial-gradient(circle,rgba(127,233,224,.12),transparent 65%);transition:opacity .3s}
#nova-btn{position:fixed;right:18px;bottom:70px;z-index:55;width:56px;height:56px;border-radius:50%;border:1px solid rgba(127,233,224,.5);background:radial-gradient(circle at 30% 25%,#1d3a4d,#07101b);color:#7fe9e0;font-size:24px;cursor:pointer;box-shadow:0 0 28px rgba(127,233,224,.28),0 12px 34px rgba(0,0,0,.5)}
#nova-btn:hover{transform:scale(1.07)}
#nova{position:fixed;right:18px;bottom:136px;z-index:56;width:min(380px,calc(100vw - 24px));max-height:min(560px,72vh);display:flex;flex-direction:column;border:1px solid rgba(127,233,224,.3);border-radius:20px;background:rgba(6,11,21,.94);backdrop-filter:blur(22px);box-shadow:0 30px 90px rgba(0,0,0,.6);overflow:hidden}
#nova[hidden]{display:none}
#nova header{display:flex;align-items:center;justify-content:space-between;padding:13px 16px;border-bottom:1px solid rgba(175,205,235,.14);font-weight:750;font-size:14px}
#nova header small{display:block;font-weight:500;color:#8fa3b8;font-size:11px}
#nova header button{background:none;border:0;color:#a9b3c7;font-size:20px;cursor:pointer;min-width:36px;min-height:36px}
#nova-log{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:10px}
.nv-m{max-width:88%;padding:10px 13px;border-radius:14px;font-size:13.5px;line-height:1.55;overflow-wrap:anywhere}
.nv-b{align-self:flex-start;background:rgba(127,233,224,.09);border:1px solid rgba(127,233,224,.2);color:#e7f5f3}
.nv-u{align-self:flex-end;background:linear-gradient(110deg,#a4e8df,#d4c7ff);color:#081013}
.nv-m a{color:#7fe9e0;text-decoration:underline}.nv-u a{color:#081013}
#nova-chips{display:flex;gap:6px;flex-wrap:wrap;padding:0 14px 10px}
#nova-chips button{border:1px solid rgba(170,198,235,.25);background:rgba(8,15,27,.8);color:#d8e5f7;border-radius:999px;padding:6px 11px;font:600 11px inherit;font-family:inherit;cursor:pointer}
#nova-chips button:hover{border-color:#7fe9e0}
#nova form{display:flex;gap:8px;padding:10px 12px;border-top:1px solid rgba(175,205,235,.14)}
#nova input{flex:1;min-width:0;background:rgba(4,8,14,.9);color:#f4f6fb;border:1px solid rgba(180,218,220,.22);border-radius:10px;padding:10px 12px;font:inherit;font-size:14px}
#nova form button{border:0;border-radius:10px;padding:0 14px;background:linear-gradient(110deg,#a4e8df,#d4c7ff);color:#081013;font-weight:800;cursor:pointer}
#pal{position:fixed;inset:0;z-index:80;display:grid;place-items:start center;padding-top:16vh;background:rgba(2,4,9,.65);backdrop-filter:blur(6px)}
#pal[hidden]{display:none}
#pal div{width:min(520px,92vw);border:1px solid rgba(127,233,224,.35);border-radius:16px;background:#070d18;box-shadow:0 30px 90px #000;overflow:hidden}
#pal input{width:100%;background:none;border:0;border-bottom:1px solid rgba(175,205,235,.14);color:#f4f6fb;padding:16px;font:inherit;font-size:16px;outline:none}
#pal ul{list-style:none;margin:0;padding:6px;max-height:50vh;overflow:auto}
#pal li{padding:10px 12px;border-radius:10px;cursor:pointer;color:#cdd8ea;font-size:14px}
#pal li[aria-selected=true]{background:rgba(127,233,224,.14);color:#fff}
#pal small{display:block;padding:8px 14px;color:#7b8ba0;font-size:11px;border-top:1px solid rgba(175,205,235,.1)}
.kbd-hint{position:fixed;left:16px;bottom:16px;z-index:50;font-size:11px;color:#8fa3b8;border:1px solid rgba(175,205,235,.18);border-radius:999px;padding:6px 12px;background:rgba(6,12,23,.85);cursor:pointer}
.rv-out{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px;margin-top:18px}
.rv-out div{padding:14px;border:1px solid var(--line);border-radius:14px;background:rgba(7,11,25,.62)}
.rv-out span{display:block;font-size:11px;color:var(--muted)}.rv-out strong{font-size:20px;color:var(--cyan)}
.rv-total{grid-column:1/-1;border-color:rgba(127,233,224,.5)!important}
@media(max-width:600px){.kbd-hint{display:none}#nova{right:12px;bottom:130px}#nova-btn{right:12px}}
@media(prefers-reduced-motion:reduce){#nebula i{animation:none}#cursor-glow{display:none}}`;
const st = document.createElement("style"); st.textContent = css; document.head.append(st);
const $ = (t, p = {}, kids = []) => { const n = document.createElement(t); Object.assign(n, p); n.append(...kids); return n; };

/* ---------- Nebula background + scroll HUD + cursor glow ---------- */
document.body.prepend($("div", {id: "nebula", ariaHidden: "true"}, [$("i"), $("i"), $("i")]));
const bar = $("div", {id: "hud-bar", ariaHidden: "true"}); document.body.append(bar);
let tick = false;
addEventListener("scroll", () => { if (tick) return; tick = true; requestAnimationFrame(() => { const h = document.documentElement; bar.style.transform = "scaleX(" + Math.min(1, scrollY / Math.max(1, h.scrollHeight - innerHeight)) + ")"; tick = false; }); }, {passive: true});
if (matchMedia("(pointer:fine)").matches && !matchMedia("(prefers-reduced-motion:reduce)").matches) {
  const g = $("div", {id: "cursor-glow", ariaHidden: "true"}); document.body.append(g);
  addEventListener("pointermove", e => { g.style.transform = "translate3d(" + e.clientX + "px," + e.clientY + "px,0)"; }, {passive: true});
}

/* ---------- Chatbot ---------- */
const log = $("div", {id: "nova-log", ariaLive: "polite"}), chips = $("div", {id: "nova-chips"});
const input = $("input", {type: "text", maxLength: 200, placeholder: "Ask about Shubham…", ariaLabel: "Message for Nova", autocomplete: "off"});
const panel = $("div", {id: "nova", hidden: true, role: "dialog", ariaLabel: "Nova assistant"}, [
  $("header", {}, [$("div", {}, ["Nova ", $("small", {textContent: "Ask about Shubham · answers come from a fixed profile"})]), $("button", {type: "button", ariaLabel: "Close chat", textContent: "×", onclick: () => toggle(false)})]),
  log, chips, $("form", {onsubmit: e => { e.preventDefault(); send(input.value); input.value = ""; }}, [input, $("button", {type: "submit", textContent: "Send"})])
]);
const launcher = $("button", {id: "nova-btn", type: "button", ariaLabel: "Open Nova assistant", textContent: "✦", onclick: () => toggle(panel.hidden)});
document.body.append(panel, launcher);
function say(text, cls) {
  const m = $("div", {className: "nv-m " + cls});
  if (cls === "nv-u") m.textContent = text;
  else { let last = 0; text.replace(/\[([^\]]+)\]\((https:[^)]+)\)/g, (s, label, url, i) => { m.append(text.slice(last, i), $("a", {href: url, target: "_blank", rel: "noopener noreferrer", textContent: label})); last = i + s.length; return s; }); m.append(text.slice(last)); }
  log.append(m); log.scrollTop = log.scrollHeight;
}
function send(t) { t = String(t).trim(); if (!t) return; say(t, "nv-u"); setTimeout(() => say(answer(t), "nv-b"), 60); }
SUGGEST.forEach(s => chips.append($("button", {type: "button", textContent: s, onclick: () => send(s)})));
function toggle(open) { panel.hidden = !open; launcher.setAttribute("aria-expanded", String(open)); if (open) { if (!log.children.length) say(answer("hello"), "nv-b"); input.focus(); } }
addEventListener("keydown", e => { if (e.key === "Escape" && !panel.hidden) toggle(false); });

/* ---------- Command palette (Ctrl/Cmd+K) ---------- */
const items = [...document.querySelectorAll("nav .links a")].map(a => ({label: a.textContent.trim(), href: a.getAttribute("href")}))
  .concat([{label: "Content Planner", href: "#content-planner"}, {label: "Revenue Planner", href: "#revenue-planner"}, {label: "Ask Nova", act: () => toggle(true)}]);
const pIn = $("input", {type: "text", placeholder: "Jump to a section…", ariaLabel: "Command palette"}), pList = $("ul", {role: "listbox"});
const pal = $("div", {id: "pal", hidden: true}, [$("div", {}, [pIn, pList, $("small", {textContent: "↑↓ to move · Enter to go · Esc to close"})])]);
document.body.append(pal);
let sel = 0, shown = [];
function paint() { const q = pIn.value.toLowerCase(); shown = items.filter(i => i.label.toLowerCase().includes(q)); sel = Math.min(sel, Math.max(0, shown.length - 1)); pList.replaceChildren(...shown.map((i, n) => $("li", {role: "option", textContent: i.label, ariaSelected: String(n === sel), onclick: () => go(i)}))); }
function go(i) { pal.hidden = true; if (i.act) i.act(); else if (i.href) location.hash = i.href; }
function openPal(o) { pal.hidden = !o; if (o) { pIn.value = ""; sel = 0; paint(); pIn.focus(); } }
pIn.addEventListener("input", paint);
pIn.addEventListener("keydown", e => { if (e.key === "ArrowDown") { sel = Math.min(sel + 1, shown.length - 1); paint(); e.preventDefault(); } else if (e.key === "ArrowUp") { sel = Math.max(sel - 1, 0); paint(); e.preventDefault(); } else if (e.key === "Enter" && shown[sel]) go(shown[sel]); else if (e.key === "Escape") openPal(false); });
pal.addEventListener("click", e => { if (e.target === pal) openPal(false); });
addEventListener("keydown", e => { if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); openPal(pal.hidden); } });
document.body.append($("button", {className: "kbd-hint", type: "button", textContent: "Ctrl K · quick jump", onclick: () => openPal(true)}));

/* ---------- Revenue Planner (user-entered assumptions only) + Work-with-me ---------- */
const rl = document.getElementById("revenue-lab");
if (rl) {
  const f = (id, label, ph) => $("div", {className: "seo-field"}, [$("label", {htmlFor: id, textContent: label}), $("input", {id, type: "number", min: "0", step: "any", placeholder: ph, inputMode: "decimal"})]);
  const outs = {}, o = (id, label, cls) => { outs[id] = $("strong", {textContent: "₹0"}); return $("div", {className: cls || ""}, [$("span", {textContent: label}), outs[id]]); };
  const wrap = $("div", {className: "seo-tool", id: "revenue-planner"}, [
    $("div", {className: "eyebrow", textContent: "Scenario calculator"}), $("h3", {textContent: "Revenue Planner"}),
    $("p", {className: "seo-tool-intro", textContent: "Enter your own assumptions to see an illustrative monthly scenario. It is arithmetic on your inputs, not a forecast, and nothing is guaranteed."}),
    $("div", {className: "seo-form"}, [f("rvViews", "Monthly video views", "e.g. 50000"), f("rvRpm", "Ad revenue per 1,000 views (₹)", "e.g. 40"), f("rvClicks", "Monthly affiliate link clicks", "e.g. 800"), f("rvConv", "Affiliate conversion rate (%)", "e.g. 2"), f("rvComm", "Average commission per sale (₹)", "e.g. 150"), f("rvSales", "Digital product sales per month", "e.g. 10"), f("rvPrice", "Product price (₹)", "e.g. 299")]),
    $("div", {className: "rv-out", ariaLive: "polite"}, [o("ads", "Ads"), o("aff", "Affiliate"), o("prod", "Products"), o("tot", "Illustrative monthly total", "rv-total")]),
    $("p", {className: "notice", textContent: "Real income depends on approval, traffic, policy compliance, fees, taxes and payouts. Check each provider's terms."})
  ]);
  const grid = rl.querySelector(".revenue-grid"); (grid ? grid.after(wrap) : rl.append(wrap));
  const n = id => Math.max(0, parseFloat(document.getElementById(id).value) || 0), inr = v => new Intl.NumberFormat("en-IN", {style: "currency", currency: "INR", maximumFractionDigits: 0}).format(v);
  const calc = () => { const ads = n("rvViews") / 1000 * n("rvRpm"), aff = n("rvClicks") * n("rvConv") / 100 * n("rvComm"), prod = n("rvSales") * n("rvPrice"); outs.ads.textContent = inr(ads); outs.aff.textContent = inr(aff); outs.prod.textContent = inr(prod); outs.tot.textContent = inr(ads + aff + prod); };
  wrap.addEventListener("input", calc);
}
const contact = document.getElementById("contact");
if (contact) contact.append($("div", {className: "seo-tool", style: "margin-top:28px"}, [$("div", {className: "eyebrow", textContent: "Work with me"}), $("h3", {textContent: "Open to entry-level opportunities and collaborations"}), $("p", {className: "seo-tool-intro", textContent: "IT operations, cybersecurity-adjacent and sales roles, plus data and creator projects. Send a message on LinkedIn or Instagram, or ask Nova."}), $("button", {className: "btn primary", type: "button", textContent: "Ask Nova about Shubham ✦", onclick: () => toggle(true)})]));
})();
