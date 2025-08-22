// IndiaTickerTape.jsx
import { useEffect, useRef } from "react";

export default function IndiaTickerTape({ symbols }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || el.dataset.loaded) return;
    el.dataset.loaded = "true";

    const s = document.createElement("script");
    s.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    s.async = true;
    s.innerHTML = JSON.stringify({
      symbols:
        symbols || [
          { description: "NIFTY 50", proName: "NSE:NIFTY" },
          { description: "SENSEX", proName: "BSE:SENSEX" },
          { description: "RELIANCE", proName: "NSE:RELIANCE" },
          { description: "TCS", proName: "NSE:TCS" },
          { description: "INFY", proName: "NSE:INFY" },
          { description: "HDFC BANK", proName: "NSE:HDFCBANK" },
          { description: "ICICI BANK", proName: "NSE:ICICIBANK" },
          { description: "SBIN", proName: "NSE:SBIN" },
          { description: "ITC", proName: "NSE:ITC" },
          { description: "ONGC", proName: "NSE:ONGC" }
        ],
      showSymbolLogo: true,
      colorTheme: "dark",
      isTransparent: false,
      displayMode: "regular",
      locale: "in"
    });
    el.appendChild(s);

    return () => {
      el.innerHTML = "";
      el.dataset.loaded = "";
    };
  }, [symbols]);

  return (
    <div className="tradingview-widget-container" style={{ height: 36 }}>
      <div ref={ref} className="tradingview-widget-container__widget" />
    </div>
  );
}
