"use client"

import { useState } from "react"
import { initialSettings, type StoreSettings } from "@/lib/admin-store"

export function AdminSettings() {
  const [settings, setSettings] = useState<StoreSettings>(initialSettings)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState("")

  function handleSave() {
    setIsSaving(true)
    setMessage("")
    // Simulate save - in production, this would call an API
    setTimeout(() => {
      setIsSaving(false)
      setMessage("Settings saved successfully!")
      setTimeout(() => setMessage(""), 3000)
    }, 500)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Settings</h2>
        <p className="text-sm text-gray-500">Manage your store configuration</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Store Information */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h3 className="font-bold text-gray-900 mb-4">Store Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
              <input
                type="text"
                value={settings.storeName}
                onChange={(e) => setSettings((prev) => ({ ...prev, storeName: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings((prev) => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                value={settings.phone}
                onChange={(e) => setSettings((prev) => ({ ...prev, phone: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number</label>
              <input
                type="tel"
                value={settings.whatsapp}
                onChange={(e) => setSettings((prev) => ({ ...prev, whatsapp: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <textarea
                value={settings.address}
                onChange={(e) => setSettings((prev) => ({ ...prev, address: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                rows={2}
              />
            </div>
          </div>
        </div>

        {/* Notifications & Alerts */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h3 className="font-bold text-gray-900 mb-4">Notifications & Alerts</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">Low Stock Alerts</div>
                <div className="text-sm text-gray-500">Get notified when products run low</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.lowStockAlertEnabled}
                  onChange={(e) => setSettings((prev) => ({ ...prev, lowStockAlertEnabled: e.target.checked }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
              </label>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">Order Notifications</div>
                <div className="text-sm text-gray-500">Email notifications for new orders</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.orderNotificationsEnabled}
                  onChange={(e) => setSettings((prev) => ({ ...prev, orderNotificationsEnabled: e.target.checked }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
              </label>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-100">
            <h4 className="font-medium text-gray-900 mb-3">Currency Settings</h4>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
              <select
                value={settings.currency}
                onChange={(e) => setSettings((prev) => ({ ...prev, currency: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
              >
                <option value="NGN">Nigerian Naira (₦)</option>
                <option value="USD">US Dollar ($)</option>
                <option value="GBP">British Pound (£)</option>
                <option value="EUR">Euro (€)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Business Verification */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h3 className="font-bold text-gray-900 mb-4">Business Verification</h3>
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 text-green-600 mb-2">
              <CheckIcon className="w-5 h-5" />
              <span className="font-medium">Verified Business</span>
            </div>
            <div className="text-sm text-gray-600 mb-3">
              DELOIT-TECH LIMITED is registered with the Corporate Affairs Commission of Nigeria.
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-xs text-gray-500">Registration Number</div>
              <div className="font-mono font-bold">CAC/7889960</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg mt-2">
              <div className="text-xs text-gray-500">Registration Date</div>
              <div className="font-medium">September 3, 2024</div>
            </div>
          </div>
          <div className="sm:w-48">
            <img
              src="/images/img-20251115-wa0000.jpg"
              alt="CAC Certificate"
              className="w-full rounded-lg border border-gray-200 shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center justify-between bg-white rounded-xl border border-gray-100 p-4">
        {message && <div className="text-sm text-green-600 font-medium">{message}</div>}
        {!message && <div />}
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition disabled:opacity-50"
        >
          {isSaving ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </div>
  )
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}
