import React, { useMemo, useState } from "react";
import { Plus, Search, Package, AlertTriangle, ArrowUpRight, PlusCircle, MinusCircle } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { Product, formatINR } from "../../data/demoData";
import { Card, Button, Input, Badge, EmptyState, Modal, Select } from "../../components/ui/Primitives";
import PageHeader from "../../components/ui/PageHeader";

function stockStatus(p: { stock: number; minStock: number }) {
  if (p.stock === 0) return { label: "Out of stock", tone: "danger" as const };
  if (p.stock <= p.minStock) return { label: "Low stock", tone: "warning" as const };
  return { label: "In stock", tone: "success" as const };
}

export default function Products() {
  const { products, addProduct, adjustStock, terminology } = useApp();

  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Modal States
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    category: "General",
    price: "650",
    cost: "300",
    stock: "15",
    minStock: "5",
    description: ""
  });

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return ["all", ...Array.from(set)];
  }, [products]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(query.toLowerCase()) || p.sku.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, query, selectedCategory]);

  const inventoryValue = products.reduce((sum, p) => sum + p.cost * p.stock, 0);
  const potentialRevenue = products.reduce((sum, p) => sum + p.price * p.stock, 0);
  const lowStockCount = products.filter((p) => p.stock <= p.minStock).length;

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name) return;

    addProduct({
      name: form.name,
      sku: `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
      category: form.category,
      price: Number(form.price) || 500,
      cost: Number(form.cost) || 200,
      stock: Number(form.stock) || 10,
      minStock: Number(form.minStock) || 5,
      type: "product",
      description: form.description
    });

    setForm({ name: "", category: "General", price: "650", cost: "300", stock: "15", minStock: "5", description: "" });
    setIsAddOpen(false);
  };

  return (
    <div className="flex flex-col gap-6 animate-fadeIn">
      <PageHeader
        title={terminology.productsLabel}
        subtitle={`Manage ${terminology.productsLabel.toLowerCase()} and stock control`}
        action={<Button icon={Plus} onClick={() => setIsAddOpen(true)}>+ Add Item</Button>}
      />

      {/* Financial Inventory Cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Card className="p-5 flex flex-col gap-1">
          <span className="text-xs text-bronze font-semibold uppercase tracking-wider">Inventory Asset Value</span>
          <p className="font-display text-2xl font-bold text-charcoal">{formatINR(inventoryValue)}</p>
          <span className="text-[11px] text-bronze">Total cost value in stock</span>
        </Card>
        <Card className="p-5 flex flex-col gap-1">
          <span className="text-xs text-bronze font-semibold uppercase tracking-wider">Potential Revenue</span>
          <p className="font-display text-2xl font-bold text-charcoal">{formatINR(potentialRevenue)}</p>
          <span className="text-[11px] text-[#3E5C3A] font-semibold">Expected retail value</span>
        </Card>
        <Card className="p-5 flex flex-col gap-1">
          <span className="text-xs text-bronze font-semibold uppercase tracking-wider">Low Stock Items</span>
          <p className="font-display text-2xl font-bold text-[#7A2E2E]">{lowStockCount}</p>
          <span className="text-[11px] text-bronze">Items at or below reorder threshold</span>
        </Card>
      </div>

      {/* Filters Toolbar */}
      <Card className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 max-w-sm w-full">
          <Search size={15} className="text-bronze" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search ${terminology.productsLabel.toLowerCase()} or SKU...`}
            className="bg-transparent outline-none text-sm w-full placeholder:text-bronze/60"
          />
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-semibold capitalize border transition ${
                selectedCategory === cat
                  ? "bg-espresso text-ivory border-espresso"
                  : "bg-white/40 text-bronze border-bronze/20 hover:bg-white/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </Card>

      {/* Products & Inventory Table */}
      {filtered.length === 0 ? (
        <Card>
          <EmptyState
            icon={Package}
            title={`No ${terminology.productsLabel.toLowerCase()} found`}
            message="Try searching for another item or adjust category filters."
            actionLabel="+ Add Item"
            onAction={() => setIsAddOpen(true)}
          />
        </Card>
      ) : (
        <Card className="overflow-hidden">
          <table className="w-full text-sm hidden md:table">
            <thead>
              <tr className="text-left text-bronze border-b border-bronze/15 bg-white/40">
                <th className="px-5 py-3.5 font-semibold text-xs uppercase tracking-wider">Item Details</th>
                <th className="px-5 py-3.5 font-semibold text-xs uppercase tracking-wider">SKU Code</th>
                <th className="px-5 py-3.5 font-semibold text-xs uppercase tracking-wider">Category</th>
                <th className="px-5 py-3.5 font-semibold text-xs uppercase tracking-wider">Price / Cost</th>
                <th className="px-5 py-3.5 font-semibold text-xs uppercase tracking-wider">Stock Level</th>
                <th className="px-5 py-3.5 font-semibold text-xs uppercase tracking-wider">Status</th>
                <th className="px-5 py-3.5 text-right font-semibold text-xs uppercase tracking-wider">Stock Adjustment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bronze/10">
              {filtered.map((p) => {
                const s = stockStatus(p);
                return (
                  <tr key={p.id} className="hover:bg-espresso/[0.02] transition">
                    <td className="px-5 py-3.5">
                      <p className="text-charcoal font-bold text-sm">{p.name}</p>
                      <p className="text-xs text-bronze">{p.description || "Standard item"}</p>
                    </td>
                    <td className="px-5 py-3.5 text-xs text-bronze font-mono">{p.sku}</td>
                    <td className="px-5 py-3.5 text-xs font-semibold text-charcoal">{p.category}</td>
                    <td className="px-5 py-3.5 text-charcoal font-bold text-sm">
                      {formatINR(p.price)}
                      <br />
                      <span className="text-[10px] text-bronze font-normal">Cost: {formatINR(p.cost)}</span>
                    </td>
                    <td className="px-5 py-3.5 text-xs font-bold text-charcoal">{p.stock} units</td>
                    <td className="px-5 py-3.5">
                      <Badge tone={s.tone}>{s.label}</Badge>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => adjustStock(p.id, -1)}
                          className="p-1 text-bronze hover:text-[#7A2E2E] rounded hover:bg-white/80"
                          title="Decrease Stock (-1)"
                        >
                          <MinusCircle size={18} />
                        </button>
                        <span className="text-xs font-bold w-6 text-center">{p.stock}</span>
                        <button
                          onClick={() => adjustStock(p.id, 1)}
                          className="p-1 text-bronze hover:text-green-800 rounded hover:bg-white/80"
                          title="Increase Stock (+1)"
                        >
                          <PlusCircle size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Mobile View */}
          <div className="md:hidden divide-y divide-bronze/10">
            {filtered.map((p) => {
              const s = stockStatus(p);
              return (
                <div key={p.id} className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-charcoal">{p.name}</p>
                    <p className="text-xs text-bronze">{p.category} • {p.sku}</p>
                    <p className="text-xs font-bold text-espresso mt-1">{formatINR(p.price)} • {p.stock} in stock</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => adjustStock(p.id, -1)} className="p-1.5 text-bronze hover:text-espresso"><MinusCircle size={20} /></button>
                    <button onClick={() => adjustStock(p.id, 1)} className="p-1.5 text-bronze hover:text-espresso"><PlusCircle size={20} /></button>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* Add Item Modal */}
      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="Add Catalog Item">
        <form onSubmit={handleCreate} className="flex flex-col gap-4 text-xs">
          <div>
            <label className="font-semibold text-bronze mb-1 block">Item Name *</label>
            <Input required placeholder="Product or Service Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          </div>
          <div>
            <label className="font-semibold text-bronze mb-1 block">Category</label>
            <Input placeholder="e.g. Hair Care, Skin Care, Menu" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-bronze mb-1 block">Selling Price (₹) *</label>
              <Input required type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
            </div>
            <div>
              <label className="font-semibold text-bronze mb-1 block">Cost Price (₹)</label>
              <Input type="number" value={form.cost} onChange={e => setForm({ ...form, cost: e.target.value })} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-bronze mb-1 block">Stock Quantity *</label>
              <Input required type="number" value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} />
            </div>
            <div>
              <label className="font-semibold text-bronze mb-1 block">Low Stock Threshold</label>
              <Input type="number" value={form.minStock} onChange={e => setForm({ ...form, minStock: e.target.value })} />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-4 border-t border-bronze/20">
            <Button variant="secondary" size="sm" type="button" onClick={() => setIsAddOpen(false)}>Cancel</Button>
            <Button variant="primary" size="sm" type="submit">Save Item</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
