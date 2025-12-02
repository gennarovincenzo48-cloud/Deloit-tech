"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ProductManagement } from "@/components/admin/product-management"
import { InventoryControl } from "@/components/admin/inventory-control"
import { PhoneModelsManagement } from "@/components/admin/phone-models-management"
import { AdminSettings } from "@/components/admin/admin-settings"

type Tab = "products" | "inventory" | "phones" | "settings"

const ADMIN_PASSWORD = "deloit2024" // Change this to your desired password

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<Tab>("products")

  // Check if already logged in (session storage)
  useEffect(() => {
    const auth = sessionStorage.getItem("deloit-admin-auth")
    if (auth === "true") {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      sessionStorage.setItem("deloit-admin-auth", "true")
      setError("")
    } else {
      setError("Incorrect password. Please try again.")
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem("deloit-admin-auth")
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full"></div>
      </div>
    )
  }

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-400 via-orange-300 to-amber-200 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <img
              src="/images/img-20251115-wa0001.jpg"
              alt="Deloit Tech"
              className="w-32 h-auto mx-auto mb-4 rounded-lg"
            />
            <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
            <p className="text-gray-500 mt-1">Enter your password to access the dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                autoFocus
              />
            </div>

            {error && <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">{error}</div>}

            <button
              type="submit"
              className="w-full py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition shadow-sm"
            >
              Login to Dashboard
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="/" className="text-sm text-orange-600 hover:text-orange-700 font-medium">
              ← Back to Store
            </a>
          </div>
        </div>
      </div>
    )
  }

  // Admin Dashboard (authenticated)
  const tabs = [
    { id: "products" as Tab, label: "Products", icon: PackageIcon },
    { id: "inventory" as Tab, label: "Inventory", icon: WarehouseIcon },
    { id: "phones" as Tab, label: "Phone Models", icon: SmartphoneIcon },
    { id: "settings" as Tab, label: "Settings", icon: SettingsIcon },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <img src="/images/img-20251115-wa0001.jpg" alt="Deloit Tech" className="w-10 h-auto rounded-lg" />
              <div>
                <h1 className="text-lg font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-xs text-gray-500">Deloit Tech Management</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="/"
                className="px-4 py-2 text-sm font-medium text-orange-600 hover:bg-orange-50 rounded-lg transition"
              >
                View Store
              </a>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tab Navigation */}
        <nav className="flex gap-2 mb-6 bg-white p-2 rounded-xl shadow-sm border border-gray-100">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition ${
                activeTab === tab.id ? "bg-orange-500 text-white shadow-sm" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Tab Content */}
        <main>
          {activeTab === "products" && <ProductManagement />}
          {activeTab === "inventory" && <InventoryControl />}
          {activeTab === "phones" && <PhoneModelsManagement />}
          {activeTab === "settings" && <AdminSettings />}
        </main>
      </div>
    </div>
  )
}

// Existing code
function PackageIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
      />
    </svg>
  )
}

function WarehouseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h18v18H3V3zm0 9h18M9 21V12m6 9V12" />
    </svg>
  )
}

function SmartphoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
      />
    </svg>
  )
}

function SettingsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}
