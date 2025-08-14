// src/pages/Store.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import "./Store.css";

const CURRENCY = "INR";
const fmt = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: CURRENCY,
});

const API_URL = "/api/products";

function ProductCard({ p, onAdd }) {
  return (
    <article className="wc-card" data-testid="product-card">
      <div className="wc-media">
        <img
          src={p.image || "https://placehold.co/600x400?text=Product"}
          alt={p.title}
          loading="lazy"
        />
        {p.badge ? <span className="wc-badge">{p.badge}</span> : null}
      </div>
      <div className="wc-body">
        <h3 className="wc-title" title={p.title}>
          {p.title}
        </h3>
        <p className="wc-desc">{p.description}</p>
        <div className="wc-price-row">
          <span className="wc-price">{fmt.format(p.price_cents / 100)}</span>
          <button className="wc-btn" onClick={() => onAdd(p)}>
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
}

export default function Store() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fallback mock data with vegan product images
  const MOCK = useRef([
    {
      id: 1,
      title: "Vegan Leather Tote Bag",
      slug: "vegan-leather-tote-bag",
      description: "Premium vegan leather tote with a timeless design.",
      price_cents: 459900,
      image: "/veganbag.png",
      category: "Bags",
      badge: "New",
    },
    {
      id: 2,
      title: "Vegan Leather Belt",
      slug: "vegan-leather-belt",
      description: "Elegant vegan leather belt with brushed metal buckle.",
      price_cents: 299900,
      image: "/veganbelt.png",
      category: "Accessories",
    },
    {
      id: 3,
      title: "Vegan Leather Jacket",
      slug: "vegan-leather-jacket",
      description: "Classic aviator jacket with faux shearling collar.",
      price_cents: 799900,
      image: "/veganjacket.png",
      category: "Apparel",
      badge: "Hot",
    },
    {
      id: 4,
      title: "Vegan Leather Loafers",
      slug: "vegan-leather-loafers",
      description: "Textured vegan leather loafers with durable rubber sole.",
      price_cents: 549900,
      image: "/veganshoe.png",
      category: "Footwear",
    },
    {
      id: 5,
      title: "Vegan Leather Wallet",
      slug: "vegan-leather-wallet",
      description: "Slim profile vegan leather wallet with multiple slots.",
      price_cents: 199900,
      image: "/veganwallet.png",
      category: "Accessories",
    },
  ]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const r = await fetch(API_URL);
        if (!r.ok) throw new Error("Fetch failed");
        const data = await r.json();
        if (mounted) setProducts(Array.isArray(data) ? data : []);
      } catch {
        if (mounted) setProducts(MOCK.current);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("relevance");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category).filter(Boolean));
    return ["all", ...Array.from(set)];
  }, [products]);

  const filtered = useMemo(() => {
    let list = [...products];
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.title?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
      );
    }
    if (category !== "all") {
      list = list.filter(
        (p) => (p.category || "").toLowerCase() === category.toLowerCase()
      );
    }
    const min = minPrice ? Math.max(0, Math.round(Number(minPrice) * 100)) : null;
    const max = maxPrice ? Math.max(0, Math.round(Number(maxPrice) * 100)) : null;
    if (min != null) list = list.filter((p) => p.price_cents >= min);
    if (max != null) list = list.filter((p) => p.price_cents <= max);

    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price_cents - b.price_cents);
        break;
      case "price-desc":
        list.sort((a, b) => b.price_cents - a.price_cents);
        break;
      case "name-asc":
        list.sort((a, b) => String(a.title).localeCompare(String(b.title)));
        break;
      case "name-desc":
        list.sort((a, b) => String(b.title).localeCompare(String(a.title)));
        break;
      default:
        break;
    }
    return list;
  }, [products, query, category, sort, minPrice, maxPrice]);

  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("wc_cart") || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("wc_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (p) => {
    setCart((prev) => {
      const i = prev.findIndex((x) => x.slug === p.slug);
      if (i > -1) {
        const copy = [...prev];
        copy[i] = { ...copy[i], qty: copy[i].qty + 1 };
        return copy;
      }
      return [
        ...prev,
        {
          slug: p.slug,
          title: p.title,
          price_cents: p.price_cents,
          image: p.image,
          qty: 1,
        },
      ];
    });
    setCartOpen(true);
  };

  const updateQty = (slug, qty) =>
    setCart((prev) =>
      prev.map((it) => (it.slug === slug ? { ...it, qty: Math.max(1, qty) } : it))
    );
  const removeItem = (slug) =>
    setCart((prev) => prev.filter((it) => it.slug !== slug));
  const subtotal = cart.reduce((s, it) => s + it.price_cents * it.qty, 0);

  const clearFilters = () => {
    setQuery("");
    setCategory("all");
    setSort("relevance");
    setMinPrice("");
    setMaxPrice("");
  };

  return (
    <>
      {/* Colorful gradient hero */}
      <section className="wc-hero">
        <div className="wc-hero-inner">
          <div>
            <span className="wc-badge-soft">Cruelty-free • Cactus leather</span>
            <h1 className="wc-h1">Aeon &amp; Co — Store</h1>
            <p className="wc-sub">
              {loading
                ? "Loading collection…"
                : `${filtered.length} curated items · Free returns within 10 days`}
            </p>
          </div>

          <div className="wc-header-right">
            <button
              className="wc-cart-btn wc-cart-btn--solid"
              onClick={() => setCartOpen(true)}
              aria-label="Open cart"
              title="Open cart"
            >
              Cart <span className="wc-cart-dot">{cart.length}</span>
            </button>
          </div>
        </div>

        <div className="wc-hero-perks">
          <div className="wc-perk">🚚 Free shipping over ₹1,999</div>
          <div className="wc-perk">🌵 Plant-based, animal-friendly</div>
          <div className="wc-perk">🔒 Secure checkout</div>
        </div>
      </section>

      {/* Toolbar */}
      <section className="wc-toolbar" role="search">
        <input
          className="wc-input"
          type="search"
          placeholder="Search products…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search products"
        />
        <select
          className="wc-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          aria-label="Category"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c[0].toUpperCase() + c.slice(1)}
            </option>
          ))}
        </select>
        <div className="wc-price-filter" aria-label="Price range">
          <input
            className="wc-input wc-input--num"
            type="number"
            min="0"
            step="1"
            placeholder="Min ₹"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <span className="wc-sep">–</span>
          <input
            className="wc-input wc-input--num"
            type="number"
            min="0"
            step="1"
            placeholder="Max ₹"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
        <select
          className="wc-select"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          aria-label="Sort"
        >
          <option value="relevance">Sort: Relevance</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
          <option value="name-asc">Name: A → Z</option>
          <option value="name-desc">Name: Z → A</option>
        </select>
        <button className="wc-btn wc-btn--ghost" onClick={clearFilters}>
          Clear
        </button>
      </section>

      {/* Product Grid */}
      <section className="wc-grid">
        {loading ? (
          <div className="wc-skeletons">
            {Array.from({ length: 8 }).map((_, i) => (
              <div className="wc-skel" key={i} />
            ))}
          </div>
        ) : filtered.length ? (
          filtered.map((p) => (
            <ProductCard key={p.id || p.slug} p={p} onAdd={addToCart} />
          ))
        ) : (
          <p className="wc-empty">No products found. Try adjusting filters.</p>
        )}
      </section>

      {/* Cart Drawer */}
      <aside
        className={`wc-drawer ${cartOpen ? "is-open" : ""}`}
        aria-hidden={!cartOpen}
      >
        <div className="wc-drawer-head">
          <h2>Cart</h2>
          <button
            className="wc-x"
            onClick={() => setCartOpen(false)}
            aria-label="Close cart"
          >
            ×
          </button>
        </div>
        <div className="wc-drawer-body">
          {cart.length === 0 ? (
            <p className="wc-empty">Your cart is empty.</p>
          ) : (
            <ul className="wc-cart-list">
              {cart.map((it) => (
                <li key={it.slug} className="wc-cart-item">
                  <img
                    src={it.image || "https://placehold.co/80x80"}
                    alt={it.title}
                    className="wc-cart-thumb"
                  />
                  <div className="wc-cart-main">
                    <div className="wc-cart-title">{it.title}</div>
                    <div className="wc-cart-price">
                      {fmt.format((it.price_cents * it.qty) / 100)}
                    </div>
                    <div className="wc-cart-qty">
                      <label className="sr-only" htmlFor={`qty-${it.slug}`}>
                        Quantity
                      </label>
                      <input
                        id={`qty-${it.slug}`}
                        type="number"
                        min="1"
                        value={it.qty}
                        onChange={(e) =>
                          updateQty(it.slug, parseInt(e.target.value || "1", 10))
                        }
                      />
                      <button
                        className="wc-link"
                        onClick={() => removeItem(it.slug)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="wc-drawer-foot">
          <div className="wc-subtotal">
            Subtotal: <strong>{fmt.format(subtotal / 100)}</strong>
          </div>
          <button
            className="wc-btn wc-btn--block"
            onClick={() => alert("Plug your checkout flow here")}
          >
            Checkout
          </button>
        </div>
      </aside>

      {cartOpen && <div className="wc-backdrop" onClick={() => setCartOpen(false)} />}
    </>
  );
}
