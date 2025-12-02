"use client"

import type React from "react"

import { useState } from "react"
import { initialPhoneModels, type PhoneModel } from "@/lib/admin-store"

export function PhoneModelsManagement() {
  const [phoneModels, setPhoneModels] = useState<PhoneModel[]>(initialPhoneModels)
  const [isAddingPhone, setIsAddingPhone] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [brandFilter, setBrandFilter] = useState("all")

  const brands = [...new Set(phoneModels.map((p) => p.brand))]

  const filteredPhones = phoneModels.filter((p) => {
    const matchesSearch =
      p.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesBrand = brandFilter === "all" || p.brand === brandFilter
    return matchesSearch && matchesBrand
  })

  function handleAddPhone(phone: Omit<PhoneModel, "id">) {
    const newPhone: PhoneModel = {
      ...phone,
      id: `${phone.brand.toLowerCase()}-${phone.model.toLowerCase().replace(/\s+/g, "-")}`,
    }
    setPhoneModels((prev) => [...prev, newPhone])
    setIsAddingPhone(false)
  }

  function handleToggleActive(id: string) {
    setPhoneModels((prev) => prev.map((p) => (p.id === id ? { ...p, isActive: !p.isActive } : p)))
  }

  function handleDeletePhone(id: string) {
    if (confirm("Are you sure you want to delete this phone model?")) {
      setPhoneModels((prev) => prev.filter((p) => p.id !== id))
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Phone Models</h2>
          <p className="text-sm text-gray-500">{phoneModels.filter((p) => p.isActive).length} active models</p>
        </div>
        <button
          onClick={() => setIsAddingPhone(true)}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition flex items-center gap-2"
        >
          <PlusIcon className="w-4 h-4" />
          Add Phone Model
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-xl border border-gray-100">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search phone models..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
          />
        </div>
        <select
          value={brandFilter}
          onChange={(e) => setBrandFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
        >
          <option value="all">All Brands</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      {/* Phone Models Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredPhones.map((phone) => (
          <div
            key={phone.id}
            className={`bg-white rounded-xl p-4 border ${
              phone.isActive ? "border-gray-100" : "border-gray-200 bg-gray-50"
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="text-sm text-orange-600 font-medium">{phone.brand}</div>
                <div className="font-bold text-gray-900">{phone.model}</div>
                <div className="text-xs text-gray-500 mt-1">Released {phone.releaseYear}</div>
              </div>
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  phone.isActive ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"
                }`}
              >
                {phone.isActive ? "Active" : "Inactive"}
              </span>
            </div>
            <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
              <button
                onClick={() => handleToggleActive(phone.id)}
                className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  phone.isActive
                    ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    : "bg-green-100 text-green-700 hover:bg-green-200"
                }`}
              >
                {phone.isActive ? "Deactivate" : "Activate"}
              </button>
              <button
                onClick={() => handleDeletePhone(phone.id)}
                className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-xs font-medium hover:bg-red-100 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredPhones.length === 0 && (
        <div className="text-center py-12 text-gray-500 bg-white rounded-xl border border-gray-100">
          No phone models found. Try adjusting your search or filters.
        </div>
      )}

      {/* Add Phone Modal */}
      {isAddingPhone && (
        <AddPhoneModal brands={brands} onAdd={handleAddPhone} onClose={() => setIsAddingPhone(false)} />
      )}
    </div>
  )
}

function AddPhoneModal({
  brands,
  onAdd,
  onClose,
}: {
  brands: string[]
  onAdd: (phone: Omit<PhoneModel, "id">) => void
  onClose: () => void
}) {
  const [brand, setBrand] = useState("")
  const [customBrand, setCustomBrand] = useState("")
  const [model, setModel] = useState("")
  const [releaseYear, setReleaseYear] = useState(new Date().getFullYear())

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const finalBrand = brand === "custom" ? customBrand : brand
    if (!finalBrand || !model) return
    onAdd({
      brand: finalBrand,
      model,
      releaseYear,
      isActive: true,
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-bold">Add Phone Model</h3>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
              required
            >
              <option value="">Select brand...</option>
              {brands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
              <option value="custom">+ Add new brand</option>
            </select>
          </div>
          {brand === "custom" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Brand Name</label>
              <input
                type="text"
                value={customBrand}
                onChange={(e) => setCustomBrand(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                required
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Model Name</label>
            <input
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
              placeholder="e.g. iPhone 15 Pro"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Release Year</label>
            <input
              type="number"
              value={releaseYear}
              onChange={(e) => setReleaseYear(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
              min={2010}
              max={2030}
            />
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
              Add Model
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
