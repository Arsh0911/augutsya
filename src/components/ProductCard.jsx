export default function ProductCard({ product }) {
  return (
    <div className="rounded-3xl overflow-hidden border border-neutral-200 dark:border-neutral-800">
      <img src={product.image} alt={product.title} className="h-44 w-full object-cover" />
      <div className="p-4">
        <div className="font-medium">{product.title}</div>
        <div className="mt-1 text-sm opacity-80">{product.blurb}</div>
        <div className="mt-3 flex items-center gap-2">
          {product.mrp !== product.price && (
            <span className="text-sm line-through opacity-60">₹{product.mrp}</span>
          )}
          <span className="text-lg font-semibold">₹{product.price}</span>
        </div>
        <div className="mt-4 flex gap-2">
          <button className="px-4 py-2 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-black">Add to cart</button>
          <button className="px-4 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700">Details</button>
        </div>
      </div>
    </div>
  );
}