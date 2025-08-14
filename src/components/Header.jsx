import { useEffect, useMemo, useState } from "react";
import "./Header.css";

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

/* ---------- Live clock ---------- */
function useClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => { const id = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(id); }, []);
  const text = useMemo(() => {
    const tday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const tmonth = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let h = now.getHours();
    const m = String(now.getMinutes()).padStart(2,"0");
    const ap = h === 0 ? " AM" : h < 12 ? " AM" : h === 12 ? " PM" : " PM";
    if (h === 0) h = 12; else if (h > 12) h -= 12;
    return `${tday[now.getDay()]}, ${now.getDate()} ${tmonth[now.getMonth()]}, ${now.getFullYear()} ${h}:${m}${ap}`;
  }, [now]);
  return text;
}

/* ---------- News strip ---------- */
function NewsStrip({ newsItems = [] }) {
  return (
    <div className="table_main_news">
      <div className="breaking_news">Latest News</div>
      <div className="main_news">
        <div className="news-marquee">
          <div className="news-track">
            {(newsItems.length ? newsItems : ["Add newsItems prop to populate this strip."])
              .map((n, i) => <span className="news-item" key={i}>{n}</span>)}
          </div>
        </div>
      </div>
      <div className="weather-box" id="augutsyaweather">
        <a target="_blank" rel="noreferrer" href="https://www.booked.net/weather/new-delhi-18038">
          <img
            src="https://w.bookcdn.com/weather/picture/12_18038_1_1_2071c9_118_2071c9_ffffff_ffffff_3_2071c9_ffffff_0_6.png?scode=124&domid=w209&anc_id=80193"
            alt="weather"
          />
        </a>
      </div>
      <div className="clock-box" id="augutsyaclockbox">
        <span>{useClock()}</span>
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
              <NewsStrip newsItems={newsItems} />
            </div>

            {/* Main header */}
            <div className="col-12 myzindex">
              <div className="header-wrap">

                {/* ======= ADDED BLOCK (Reactified) ======= */}
                <div id="logo" className="logo">
                  <a href="https://www.augutsya.com/" title="Augutsya">
                    <img
                      className="site-logo"
                      src="https://www.augutsya.com/wp-content/uploads/2020/08/atplogo_new-copy.png"
                      alt="Augutsya"
                      width="217"
                      height="35"
                    />
                  </a>
                </div>

                <div className="wrap-cart-count">
                  <a className="icon-cart" href="https://www.augutsya.com/cart/" title="View your shopping cart">
                    <i className="fa fa-shopping-cart" aria-hidden="true" />
                  </a>
                  <a className="cart-contents" href="https://www.augutsya.com/cart/" title="View your shopping cart" />
                </div>

                <div className={`show-search ${searchOpen ? "active" : ""}`}>
                  <button className="search-toggle" onClick={() => setSearchOpen(v => !v)} aria-label="Search">
                    <i className="fa fa-search" />
                  </button>
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

                <div className={`nav-wrap ${menuOpen ? "open" : ""}`}>
                  <button className="btn-menu" onClick={() => setMenuOpen(v => !v)} aria-label="Toggle menu">
                    <span />
                  </button>

                  <nav id="mainnav" className="mainnav" role="navigation" onClick={() => setMenuOpen(false)}>
                    <ul id="menu-main" className="menu">
                      <li className="menu-item current-menu-item">
                        <a href="/" aria-current="page">HOME</a>
                      </li>
                      <li className="menu-item">
                        <a href="/services/">SERVICES</a>
                      </li>
                      <li className="menu-item">
                        <a href="/store/">STORE</a>
                      </li>
                      <li className="menu-item">
                        <a href="/utilities/">UTILITIES</a>
                      </li>
                      <li className="menu-item">
                        <a href="/contact-us/">CONTACT</a>
                      </li>
                      <li className="menu-item">
                        <a href="/about-us/">ABOUT US</a>
                      </li>
                    </ul>
                  </nav>
                </div>
                {/* ======= /ADDED BLOCK ======= */}

              </div>
            </div>

          </div>
        </div>
      </div>
    </header>
  );
}
