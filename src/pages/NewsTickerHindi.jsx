// src/components/NewsTickerHindi.jsx
import { useEffect, useMemo, useState } from "react";
import Marquee from "react-fast-marquee";
import  "./NewsTickerHindi.css"; // Add your styles here

/**
 * Hindi Global News Ticker
 * Using GNews API with your provided key
 */
const GNEWS_KEY = "a6e21fe295f3d2b7769741f13c09ce52";

const HINDI_WORLD_ENDPOINT = `https://gnews.io/api/v4/top-headlines?lang=hi&topic=world&max=50&token=${GNEWS_KEY}`;

function useHindiWorldNews(refreshMs = 60_000) {
  const [articles, setArticles] = useState([]);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let timer;
    const fetchNews = async () => {
      try {
        const res = await fetch(HINDI_WORLD_ENDPOINT, { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        const list = Array.isArray(data?.articles) ? data.articles : [];
        // Normalize + dedupe by title
        const seen = new Set();
        const clean = list
          .map((a) => ({
            title: a?.title?.trim() || "",
            url: a?.url,
            source: a?.source?.name || "",
            publishedAt: a?.publishedAt || "",
          }))
          .filter((a) => a.title && a.url && !seen.has(a.title) && seen.add(a.title));

        setArticles(clean);
        setErr(null);
      } catch (e) {
        setErr(e.message || "Failed to fetch");
      }
    };

    fetchNews();
    timer = setInterval(fetchNews, refreshMs);
    return () => clearInterval(timer);
  }, [refreshMs]);

  return { articles, error: err };
}

export default function NewsTickerHindi() {
  const { articles, error } = useHindiWorldNews(90_000); // refresh every 90s

  // Build display strings: Title — Source (time)
  const items = useMemo(() => {
    return articles.map((a) => {
      let time = "";
      try {
        if (a.publishedAt) {
          const d = new Date(a.publishedAt);
          time = new Intl.DateTimeFormat("hi-IN", {
            hour: "2-digit",
            minute: "2-digit",
          }).format(d);
        }
      } catch {}
      return {
        ...a,
        label: `${a.title}${a.source ? ` — ${a.source}` : ""}${time ? ` • ${time}` : ""}`,
      };
    });
  }, [articles]);

  return (
    <div className="news-marquee" role="region" aria-label="Hindi global news">
      <Marquee gradient={false} speed={55} pauseOnHover={true}>
        {error && (
          <span className="news-item" style={{ margin: "0 24px"}}>
            लाइव समाचार प्राप्त करने में समस्या: {error}
          </span>
        )}
        {!error && items.length === 0 && (
          <span className="news-item" style={{ margin: "0 24px" }}>
            नवीनतम वैश्विक समाचार लोड हो रहे हैं…
          </span>
        )}
        {items.map((it, idx) => (
          <span key={idx} className="news-item" style={{ margin: "0 24px" }}>
            <a href={it.url} target="_blank" rel="noopener noreferrer">
              {it.label}
            </a>
          </span>
        ))}
      </Marquee>
    </div>
  );
}
