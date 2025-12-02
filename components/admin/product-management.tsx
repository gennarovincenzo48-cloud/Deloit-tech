"use client"

import type React from "react"

import { useState } from "react"
import { initialProducts, categories, initialPhoneModels, type Product } from "@/lib/admin-store"

export function ProductManagement() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [isAddingProduct, setIsAddingProduct] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || p.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const lowStockProducts = products.filter((p) => p.stock <= p.lowStockThreshold)

  function handleSaveProduct(product: Product) {
    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? { ...product, updatedAt: new Date().toISOString() } : p)),
      )
      setEditingProduct(null)
    } else {
      setProducts((prev) => [
        ...prev,
        { ...product, id: `p${Date.now()}`, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      ])
      setIsAddingProduct(false)
    }
  }

  function handleDeleteProduct(id: string) {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id))
    }
  }

  return (
    <div className="space-y-6">
      {/* Low Stock Alerts */}
      {lowStockProducts.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-center gap-2 text-red-700 font-medium mb-2">
            <AlertIcon className="w-5 h-5" />
            Low Stock Alert ({lowStockProducts.length} items)
          </div>
          <div className="flex flex-wrap gap-2">
            {lowStockProducts.map((p) => (
              <span key={p.id} className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                {p.title} ({p.stock} left)
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Product Management</h2>
          <p className="text-sm text-gray-500">{products.length} products total</p>
        </div>
        <button
          onClick={() => setIsAddingProduct(true)}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition flex items-center gap-2"
        >
          <PlusIcon className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-xl border border-gray-100">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by name or SKU..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Product List */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Product</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">SKU</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Category</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Price</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Stock</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.img || "/placeholder.svg"}
                        alt={product.title}
                        className="w-10 h-10 rounded-lg object-cover bg-gray-100"
                      />
                      <div>
                        <div className="font-medium text-gray-900 text-sm">{product.title}</div>
                        <div className="text-xs text-gray-500 line-clamp-1">{product.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 font-mono">{product.sku}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm font-medium">₦{product.price.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.stock <= product.lowStockThreshold
                          ? "bg-red-100 text-red-700"
                          : product.stock <= product.reorderPoint
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                      }`}
                    >
                      {product.stock} units
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setEditingProduct(product)}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                        title="Edit"
                      >
                        <EditIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="Delete"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredProducts.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No products found. Try adjusting your search or filters.
          </div>
        )}
      </div>

      {/* Add/Edit Product Modal */}
      {(isAddingProduct || editingProduct) && (
        <ProductForm
          product={editingProduct}
          onSave={handleSaveProduct}
          onClose={() => {
            setIsAddingProduct(false)
            setEditingProduct(null)
          }}
        />
      )}
    </div>
  )
}

function ProductForm({
  product,
  onSave,
  onClose,
}: {
  product: Product | null
  onSave: (product: Product) => void
  onClose: () => void
}) {
  const [formData, setFormData] = useState<Partial<Product>>(
    product || {
      title: "",
      description: "",
      price: 0,
      category: categories[0],
      sku: "",
      img: "",
      stock: 0,
      lowStockThreshold: 10,
      reorderPoint: 25,
      supplier: "",
      compatiblePhones: [],
    },
  )

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSave(formData as Product)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-bold">{product ? "Edit Product" : "Add New Product"}</h3>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
              <input
                type="text"
                value={formData.title || ""}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={formData.description || ""}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
              <input
                type="text"
                value={formData.sku || ""}
                onChange={(e) => setFormData((prev) => ({ ...prev, sku: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={formData.category || categories[0]}
                onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (₦)</label>
              <input
                type="number"
                value={formData.price || ""}
                onChange={(e) => setFormData((prev) => ({ ...prev, price: Number(e.target.value) }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                required
                min={0}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
              <input
                type="number"
                value={formData.stock || ""}
                onChange={(e) => setFormData((prev) => ({ ...prev, stock: Number(e.target.value) }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                required
                min={0}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Low Stock Threshold</label>
              <input
                type="number"
                value={formData.lowStockThreshold || ""}
                onChange={(e) => setFormData((prev) => ({ ...prev, lowStockThreshold: Number(e.target.value) }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                min={0}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reorder Point</label>
              <input
                type="number"
                value={formData.reorderPoint || ""}
                onChange={(e) => setFormData((prev) => ({ ...prev, reorderPoint: Number(e.target.value) }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                min={0}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Supplier</label>
              <input
                type="text"
                value={formData.supplier || ""}
                onChange={(e) => setFormData((prev) => ({ ...prev, supplier: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
              <input
                type="text"
                value={formData.img || ""}
                onChange={(e) => setFormData((prev) => ({ ...prev, img: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                placeholder="/products/image.jpg"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Compatible Phone Models</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-40 overflow-y-auto p-2 border border-gray-200 rounded-lg">
                {initialPhoneModels
                  .filter((p) => p.isActive)
                  .map((phone) => (
                    <label key={phone.id} className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={formData.compatiblePhones?.includes(phone.id) || false}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData((prev) => ({
                              ...prev,
                              compatiblePhones: [...(prev.compatiblePhones || []), phone.id],
                            }))
                          } else {
                            setFormData((prev) => ({
                              ...prev,
                              compatiblePhones: prev.compatiblePhones?.filter((id) => id !== phone.id) || [],
                            }))
                          }
                        }}
                        className="rounded text-orange-500 focus:ring-orange-500"
                      />
                      {phone.brand} {phone.model}
                    </label>
                  ))}
              </div>
            </div>
          </div>
          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
            >
              {product ? "Save Changes" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  )
}

function EditIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
      />
    </svg>
  )
}

function TrashIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      />
    </svg>
  )
}

function AlertIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
    </svg>
  )
}
