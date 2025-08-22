import { useEffect, useMemo, useState } from "react";

/* ---------- helpers ---------- */
function buildProxyChain(url) {
  const enc = encodeURIComponent(url);
  return [
    url, // try direct first
    `https://api.allorigins.win/raw?url=${enc}`,
    `https://r.jina.ai/http://${url.replace(/^https?:\/\//, "")}`,
  ];
}

/* ---------- TradingView tape ---------- */
function TradingViewTape() {
  useEffect(() => {
    const container = document.getElementById("tv-ticker");
    if (!container || container.dataset.loaded) return;
    container.dataset.loaded = "true";
    const s = document.createElement("script");
    s.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    s.async = true;
    s.innerHTML = JSON.stringify({
      symbols: [
        { description: "BSE", proName: "BSE:SENSEX" },
        { description: "RIL", proName: "RELIANCE" },
        { description: "IDEA", proName: "IDEA" },
        { description: "NTPC", proName: "NTPC" },
        { description: "Britannia", proName: "BRITANNIA" },
        { description: "DHFL", proName: "DHFL" },
        { description: "EDUCOMP", proName: "EDUCOMP" },
        { description: "Exide", proName: "EXIDEIND" },
        { description: "GAIL", proName: "GAIL" },
        { description: "GTLINFRA", proName: "GTLINFRA" },
        { description: "HDFCBANK", proName: "HDFCBANK" },
        { description: "HDFC", proName: "HDFC" },
        { description: "IBREALEST", proName: "IBREALEST" },
        { description: "JPPOWER", proName: "JPPOWER" },
        { description: "KMSUGAR", proName: "KMSUGAR" },
        { description: "MOTHERSUMI", proName: "MOTHERSUMI" },
        { description: "MTNL", proName: "MTNL" },
        { description: "NBCC", proName: "NBCC" },
        { description: "ONGC", proName: "ONGC" },
        { description: "PETRONET", proName: "PETRONET" },
        { description: "PIDILITE", proName: "PIDILITIND" },
        { description: "PNB", proName: "PNB" },
        { description: "PNBGILTS", proName: "PNBGILTS" },
        { description: "POWERGRID", proName: "POWERGRID" },
        { description: "QUADRANT", proName: "QUADRANT" },
        { description: "RBLBANK", proName: "RBLBANK" },
        { description: "SAIL", proName: "SAIL" },
        { description: "STRTECH", proName: "STRTECH" },
        { description: "SUBROS", proName: "SUBROS" },
        { description: "SUZLON", proName: "SUZLON" },
        { description: "TTML", proName: "TTML" },
        { description: "TECHM", proName: "TECHM" },
        { description: "UJJIVANSFB", proName: "UJJIVANSFB" },
        { description: "WIPRO", proName: "WIPRO" },
        { description: "YESBANK", proName: "YESBANK" },
        { description: "USDINR", proName: "OANDA:USDINR" },
        { description: "AIRTEL", proName: "BHARTIARTL" },
        { description: "GOLD", proName: "GOLD" },
        { description: "SILVER", proName: "SILVER" },
        { description: "SBI", proName: "SBIN" },
        { description: "TCS", proName: "TCS" },
        { description: "INFY", proName: "INFY" },
        { description: "BDL", proName: "BDL" },
        { description: "ACC", proName: "ACC" },
        { description: "IGL", proName: "IGL" },
        { description: "HAL", proName: "HAL" },
      ],
      colorTheme: "dark",
      isTransparent: false,
      displayMode: "regular",
      locale: "in",
    });
    container.appendChild(s);
  }, []);
  return (
    <div className="tradingview-widget-container TradingViewWidget">
      <div id="tv-ticker" className="tradingview-widget-container__widget" />
      <div className="tradingview-widget-copyright" />
    </div>
  );
}

/* ---------- Local date/time (browser time zone) ---------- */
function useGeoClock(timeZoneOverride) {
  const [now, setNow] = useState(new Date());
  const { timeZone: sysTZ } = Intl.DateTimeFormat().resolvedOptions();
  const timeZone = timeZoneOverride || sysTZ;
  const locale = typeof navigator !== "undefined" ? navigator.language : "en-IN";

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const dateStr = now.toLocaleDateString(locale, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone,
  });
  const timeStr = now.toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZone,
    timeZoneName: "short",
  });

  const zoneCity = timeZone.split("/").pop()?.replace(/_/g, " ") || timeZone;
  return { dateStr, timeStr, timeZone, zoneCity };
}

/* ---------- Geolocation → City ---------- */
function useGeolocationCity() {
  const [coords, setCoords] = useState(null);
  const [city, setCity] = useState(null);
  const [region, setRegion] = useState(null);
  const [country, setCountry] = useState(null);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (typeof window === "undefined" || !("geolocation" in navigator)) {
      setStatus("error");
      return;
    }
    setStatus("asking");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords || {};
        setCoords({ lat: latitude, lon: longitude });
        setStatus("ok");
      },
      (err) => setStatus(err?.code === 1 ? "denied" : "error"),
      { enableHighAccuracy: false, maximumAge: 10 * 60 * 1000, timeout: 8000 }
    );
  }, []);

  useEffect(() => {
    if (!coords) return;
    const controller = new AbortController();
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coords.lat}&lon=${coords.lon}`;
    fetch(url, { headers: { Accept: "application/json" }, signal: controller.signal })
      .then((r) => r.json())
      .then((data) => {
        const a = data?.address || {};
        const foundCity =
          a.city || a.town || a.village || a.municipality || a.suburb || a.hamlet || null;
        const foundRegion = a.state_district || a.state || a.region || a.county || null;
        const foundCountry = a.country || null;
        setCity(foundCity);
        setRegion(foundRegion);
        setCountry(foundCountry);
      })
      .catch(() => {});
    return () => controller.abort();
  }, [coords]);

  const label = useMemo(() => {
    if (city && country) return `${city}, ${country}`;
    if (city && region) return `${city}, ${region}`;
    if (city) return city;
    return null;
  }, [city, region, country]);

  return { status, coords, city, region, country, label };
}

/* ---------- RSS Scroller (with proxy fallbacks) ---------- */
function RSSScroller({ url, width = "100%", height = "30", refreshMs = 5 * 60 * 1000, speed = 4 }) {
  const [items, setItems] = useState([]);
  const [err, setErr] = useState(null);

  const heightCSS = typeof height === "number" ? `${height}px` : height;
  const baseDuration = 40; // seconds for speed=1
  const duration = Math.max(8, baseDuration / (Number(speed) || 1));

  async function fetchWithFallbacks(feedUrl, signal) {
    const chain = buildProxyChain(feedUrl);
    let lastError = null;
    for (const u of chain) {
      try {
        const r = await fetch(u, {
          method: "GET",
          headers: { Accept: "application/rss+xml, application/xml, text/xml" },
          signal,
        });
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const text = await r.text();

        // If content is not XML (e.g., Jina readable view), bail to next candidate
        if (!/</.test(text) || !/(<rss|<feed|<item[\s>])/i.test(text)) {
          lastError = new Error("Not XML-like content");
          continue;
        }

        const doc = new window.DOMParser().parseFromString(text, "text/xml");
        const maybeErr = doc.querySelector("parsererror");
        if (maybeErr) throw new Error("XML parse error");

        const nodes = Array.from(doc.querySelectorAll("item"));
        const parsed =
          nodes.map((n) => {
            const title = n.querySelector("title")?.textContent?.trim() || "Untitled";
            const link = n.querySelector("link")?.textContent?.trim() || "#";
            return { title, link };
          }) ||
          [];
        if (parsed.length) return parsed;
        lastError = new Error("No <item> entries found");
      } catch (e) {
        lastError = e;
        // try next fallback
      }
    }
    throw lastError || new Error("All fallbacks failed");
  }

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    const load = async () => {
      try {
        setErr(null);
        const parsed = await fetchWithFallbacks(url, controller.signal);
        if (mounted) setItems(parsed);
      } catch (e) {
        if (mounted) setErr(e?.message || "Failed to load RSS");
      }
    };

    load();
    const id = setInterval(load, refreshMs);
    return () => {
      mounted = false;
      clearInterval(id);
      controller.abort();
    };
  }, [url, refreshMs]);

  const list = items.length ? items : [];

  return (
    <div
      className="rss-scroller"
      style={{
        width,
        height: heightCSS,
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
      aria-label="RSS Headlines"
    >
      {err ? (
        <div style={{ opacity: 0.8, paddingLeft: 8 }}>RSS load error: {String(err)}</div>
      ) : !list.length ? (
        <div style={{ opacity: 0.7, paddingLeft: 8 }}>Loading…</div>
      ) : (
        <div
          className="rss-track"
          style={{
            display: "flex",
            whiteSpace: "nowrap",
            animation: `rssMarquee ${duration}s linear infinite`,
            gap: "24px",
            paddingLeft: 12,
          }}
        >
          {[...list, ...list].map((item, idx) => (
            <a
              key={idx}
              href={item.link}
              target="_blank"
              rel="noreferrer"
              className="rss-item"
              style={{ color: "inherit", textDecoration: "none", paddingRight: 24 }}
              title={item.title}
            >
              {item.title}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @keyframes rssMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

/* ---------- News strip ---------- */
function NewsStrip() {
  const { dateStr, timeStr, zoneCity } = useGeoClock();
  const { status, label } = useGeolocationCity();
  const place = label || zoneCity;

  return (
    <div className="table_main_news">
      <div className="breaking_news">Latest News</div>

      <div className="main_news">
        <RSSScroller
          url="https://hindi.news18.com/rss/khabar/nation/nation.xml"
          width="100%"
          height="30"
          refreshMs={5 * 60 * 1000}
          speed={0.02}
        />
      </div>

      <div
        className="clock-box"
        id="augutsyaclockbox"
        title={`${dateStr}${status === "denied" ? " (location permission denied)" : ""}`}
      >
        <span>
          {place} • {timeStr}
        </span>
      </div>
    </div>
  );
}

/* ---------- Header ---------- */
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header id="header" className="header widget-header header-style2">
      <div className="nav">
        <div className="container-fluid">
          <div className="row">
            {/* Top widgets bar */}
            <div id="cover" className="col-12 cover">
              <TradingViewTape />
              <NewsStrip />
            </div>

            {/* Main header */}
            <div className="col-12 myzindex">
              <div className="header-wrap">
                {/* Search/Logo area */}
                <div className={`show-search ${searchOpen ? "active" : ""}`}>
                  <div id="logo" className="logo">
                    <a href="https://www.augutsya.com/" title="Augutsya">
                      <img
                        className="site-logo"
                        src="../atplogo_white.png"
                        alt="Augutsya"
                        width="217"
                        height="35"
                      />
                    </a>
                  </div>
                  {searchOpen && (
                    <div className="submenu top-search widget_search">
                      <form role="search" method="get" className="search-form" action="https://www.augutsya.com/">
                        <label>
                          <span className="screen-reader-text">Search for:</span>
                          <input type="search" className="search-field" placeholder="Search …" name="s" />
                        </label>
                        <input type="submit" className="search-submit" value="Search" />
                      </form>
                    </div>
                  )}
                </div>

                {/* Navigation */}
                <div className={`nav-wrap ${menuOpen ? "open" : ""}`}>
                  <nav id="mainnav" className="mainnav" role="navigation" onClick={() => setMenuOpen(false)}>
                    <ul id="menu-main" className="menu">
                      <li className="menu-item current-menu-item"><a href="/" aria-current="page">HOME</a></li>
                      <li className="menu-item"><a href="/services/">SERVICES</a></li>
                      <li className="menu-item"><a href="/store/">STORE</a></li>
                      <li className="menu-item"><a href="/utilities/">UTILITIES</a></li>
                      <li className="menu-item"><a href="/contact-us/">CONTACT</a></li>
                      <li className="menu-item"><a href="/about-us/">ABOUT US</a></li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Inline styles (kept from your version) */}
      <style>{`
:root {
  --header-bg: linear-gradient(180deg, #0b1324 0%, #0e1729 100%);
  --header-txt: #e5e7eb;
  --muted: #94a3b8;
  --accent: #3b82f6;
  --accent-2: #22d3ee;
  --border: rgba(148, 163, 184, 0.18);
}
header.header {
  background: linear-gradient(135deg, #928dab 0%, #2c5364 50%, #1f1c2c 100%);
  color: #f1f5f9;
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.55);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(8px) saturate(120%);
  -webkit-backdrop-filter: blur(8px) saturate(120%);
}
#cover.cover { display: grid; gap: 8px; padding: 8px 0 10px; border-bottom: 1px dashed var(--border); }
.TradingViewWidget { height: 36px; overflow: hidden; border-radius: 8px; background: rgba(15,23,42,.6); border: 1px solid var(--border); }
.table_main_news { display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 12px; }
.breaking_news {
  padding: 6px 10px; font-size: 12px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase;
  border: 1px solid var(--border); border-radius: 999px; color: white; background: rgb(144, 0, 255);
}
.main_news { overflow: hidden; border-radius: 8px; border: 1px solid var(--border); background: rgba(15, 23, 42, 0.55); }
.clock-box { font-variant-numeric: tabular-nums; font-size: 14px; color: white; padding: 6px 10px; border: 1px solid var(--border); border-radius: 8px; background: rgb(144, 0, 255); }
.myzindex .header-wrap { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 16px; padding: 14px 0; }
#logo .site-logo { display: block; height: 36px; width: auto; filter: drop-shadow(0 1px 0 rgba(0,0,0,.2)); transition: transform .2s ease; }
#logo a:hover .site-logo { transform: translateY(-1px); }
.nav-wrap { grid-column: 2 / 4; }
#mainnav .menu { display: flex; gap: 22px; justify-content: flex-end; align-items: center; list-style: none; margin: 0; padding: 0; }
#mainnav .menu-item a {
  position: relative; display: inline-block; padding: 8px 12px; font-weight: 600; letter-spacing: .02em; color: #f1f5f9;
  text-decoration: none; border: 2px solid transparent; border-radius: 6px; transition: all .35s ease;
}
#mainnav .menu-item a:hover {
  color: #f1f5f9; border-color: #f6b83b; box-shadow: 0 0 12px rgba(246, 184, 59, 0.5); transform: translateY(-2px);
}
@media (max-width: 1024px) { .myzindex .header-wrap { grid-template-columns: 1fr auto; } .nav-wrap { grid-column: 1 / -1; } #mainnav .menu { justify-content: center; flex-wrap: wrap; gap: 14px; } }
@media (max-width: 680px) {
  #cover.cover { grid-template-columns: 1fr; gap: 6px; }
  .table_main_news { grid-template-columns: 1fr; gap: 6px; }
  .clock-box { justify-self: start; }
  .myzindex .header-wrap { grid-template-columns: 1fr auto; gap: 10px; }
  #mainnav .menu { gap: 10px; }
  #logo .site-logo { height: 32px; }
}
/* marquee */
@keyframes rssMarquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      `}</style>
    </header>
  );
}
