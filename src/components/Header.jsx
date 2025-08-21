import { useEffect, useMemo, useState } from "react";
import "./Header.css";

import NewsTickerHindi from "pages/NewsTickerHindi";

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

/* ---------- Geolocation → City (reverse geocode) ---------- */
function useGeolocationCity() {
  const [coords, setCoords] = useState(null);
  const [city, setCity] = useState(null);
  const [region, setRegion] = useState(null);
  const [country, setCountry] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | asking | ok | denied | error

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
      (err) => {
        // Permission denied, unavailable, or timeout
        setStatus(err?.code === 1 ? "denied" : "error");
      },
      {
        enableHighAccuracy: false,
        maximumAge: 10 * 60 * 1000, // 10 minutes cache
        timeout: 8000,
      }
    );
  }, []);

  useEffect(() => {
    if (!coords) return;

    // Reverse geocode with OpenStreetMap Nominatim (no key required)
    const controller = new AbortController();
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coords.lat}&lon=${coords.lon}`;
    fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      signal: controller.signal,
    })
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
      .catch(() => {
        // Network/CORS/usage-limit error — leave city null
      });

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

/* ---------- News strip (uses your NewsTicker) ---------- */
function NewsStrip({ newsItems = [] }) {
  const { dateStr, timeStr, zoneCity } = useGeoClock();
  const { status, label } = useGeolocationCity();

  // Prefer precise city if available; else timezone city fallback.
  const place = label || zoneCity;

  return (
    <div className="table_main_news">
      <div className="breaking_news">Latest News</div>

      <div className="main_news">
        {/* Use your NewsTicker here */}
       <NewsTickerHindi />
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
export default function Header({ newsItems = [] }) {
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
              {/* NewsTicker plugged in via NewsStrip */}
              <NewsStrip newsItems={newsItems} />
            </div>

            {/* Main header */}
            <div className="col-12 myzindex">
              <div className="header-wrap">
                {/* Logo */}
                {/* <div id="logo" className="logo">
                  <a href="https://www.augutsya.com/" title="Augutsya">
                    <img
                      className="site-logo"
                      src="https://www.augutsya.com/wp-content/uploads/2020/08/atplogo_new-copy.png"
                      alt="Augutsya"
                      width="217"
                      height="35"
                    />
                  </a>
                </div> */}

                {/* (Optional) Search dropdown kept wired, toggle button can be added */}
                <div className={`show-search ${searchOpen ? "active" : ""}`}>
                  <div id="logo" className="logo">
                  <a href="https://www.augutsya.com/" title="Augutsya">
                    <img
                      className="site-logo"
                      // src="https://www.augutsya.com/wp-content/uploads/2020/08/atplogo_new-copy.png"
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
    </header>
  );
}
