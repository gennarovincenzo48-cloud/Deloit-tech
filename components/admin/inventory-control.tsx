"use client"

import { useState } from "react"
import { initialProducts, type Product, type StockLog } from "@/lib/admin-store"

export function InventoryControl() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [stockLogs, setStockLogs] = useState<StockLog[]>([
    {
      id: "log1",
      productId: "p3",
      productTitle: "FastCharge 20W USB-C Adapter",
      previousStock: 25,
      newStock: 8,
      change: -17,
      reason: "Sold",
      changedBy: "Admin",
      timestamp: "2024-11-22T16:45:00Z",
    },
    {
      id: "log2",
      productId: "p1",
      productTitle: "Clear Shield Tempered Glass (2-pack)",
      previousStock: 100,
      newStock: 150,
      change: 50,
      reason: "Restocked from supplier",
      changedBy: "Admin",
      timestamp: "2024-11-20T14:30:00Z",
    },
    {
      id: "log3",
      productId: "p2",
      productTitle: "Slim Silicone Case - iPhone 14",
      previousStock: 90,
      newStock: 75,
      change: -15,
      reason: "Sold",
      changedBy: "Admin",
      timestamp: "2024-11-18T11:20:00Z",
    },
  ])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [adjustmentAmount, setAdjustmentAmount] = useState(0)
  const [adjustmentReason, setAdjustmentReason] = useState("")

  const lowStockItems = products.filter((p) => p.stock <= p.lowStockThreshold)
  const reorderItems = products.filter((p) => p.stock <= p.reorderPoint && p.stock > p.lowStockThreshold)
  const totalStockValue = products.reduce((sum, p) => sum + p.price * p.stock, 0)

  function handleStockAdjustment() {
    if (!selectedProduct || adjustmentAmount === 0 || !adjustmentReason) return

    const newStock = Math.max(0, selectedProduct.stock + adjustmentAmount)
    const log: StockLog = {
      id: `log${Date.now()}`,
      productId: selectedProduct.id,
      productTitle: selectedProduct.title,
      previousStock: selectedProduct.stock,
      newStock,
      change: adjustmentAmount,
      reason: adjustmentReason,
      changedBy: "Admin",
      timestamp: new Date().toISOString(),
    }

    setProducts((prev) =>
      prev.map((p) =>
        p.id === selectedProduct.id ? { ...p, stock: newStock, updatedAt: new Date().toISOString() } : p,
      ),
    )
    setStockLogs((prev) => [log, ...prev])
    setSelectedProduct(null)
    setAdjustmentAmount(0)
    setAdjustmentReason("")
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-100">
          <div className="text-sm text-gray-500 mb-1">Total Stock Value</div>
          <div className="text-2xl font-bold text-gray-900">₦{totalStockValue.toLocaleString()}</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100">
          <div className="text-sm text-gray-500 mb-1">Total Products</div>
          <div className="text-2xl font-bold text-gray-900">{products.length}</div>
        </div>
        <div className="bg-red-50 p-4 rounded-xl border border-red-100">
          <div className="text-sm text-red-600 mb-1">Low Stock Items</div>
          <div className="text-2xl font-bold text-red-700">{lowStockItems.length}</div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100">
          <div className="text-sm text-yellow-600 mb-1">Need Reorder</div>
          <div className="text-2xl font-bold text-yellow-700">{reorderItems.length}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stock Levels */}
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-900">Real-Time Stock Levels</h3>
          </div>
          <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
            {products.map((product) => (
              <div key={product.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="font-medium text-sm">{product.title}</div>
                    <div className="text-xs text-gray-500">SKU: {product.sku}</div>
                  </div>
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="text-xs text-orange-600 hover:text-orange-700 font-medium"
                  >
                    Adjust
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        product.stock <= product.lowStockThreshold
                          ? "bg-red-500"
                          : product.stock <= product.reorderPoint
                            ? "bg-yellow-500"
                            : "bg-green-500"
                      }`}
                      style={{ width: `${Math.min(100, (product.stock / (product.reorderPoint * 2)) * 100)}%` }}
                    />
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      product.stock <= product.lowStockThreshold
                        ? "text-red-600"
                        : product.stock <= product.reorderPoint
                          ? "text-yellow-600"
                          : "text-green-600"
                    }`}
                  >
                    {product.stock}
                  </span>
                </div>
                <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                  <span>Reorder: {product.reorderPoint}</span>
                  <span>Low: {product.lowStockThreshold}</span>
                  <span>Supplier: {product.supplier}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stock Adjustment Logs */}
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-900">Stock Adjustment History</h3>
          </div>
          <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
            {stockLogs.map((log) => (
              <div key={log.id} className="p-4">
                <div className="flex items-start justify-between mb-1">
                  <div className="font-medium text-sm">{log.productTitle}</div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      log.change > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}
                  >
                    {log.change > 0 ? "+" : ""}
                    {log.change}
                  </span>
                </div>
                <div className="text-xs text-gray-500 mb-1">
                  {log.previousStock} → {log.newStock} units
                </div>
                <div className="text-xs text-gray-600">{log.reason}</div>
                <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
                  <span>By: {log.changedBy}</span>
                  <span>{new Date(log.timestamp).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stock Adjustment Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-bold">Adjust Stock</h3>
              <p className="text-sm text-gray-500 mt-1">{selectedProduct.title}</p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <div className="text-sm text-gray-500 mb-1">Current Stock</div>
                <div className="text-2xl font-bold">{selectedProduct.stock} units</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Adjustment</label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setAdjustmentAmount((prev) => prev - 1)}
                    className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={adjustmentAmount}
                    onChange={(e) => setAdjustmentAmount(Number(e.target.value))}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-center focus:border-orange-500 focus:outline-none"
                  />
                  <button
                    onClick={() => setAdjustmentAmount((prev) => prev + 1)}
                    className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                  >
                    +
                  </button>
                </div>
                <div className="text-center mt-2 text-sm">
                  New stock: <span className="font-bold">{Math.max(0, selectedProduct.stock + adjustmentAmount)}</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                <select
                  value={adjustmentReason}
                  onChange={(e) => setAdjustmentReason(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                >
                  <option value="">Select reason...</option>
                  <option value="Restocked from supplier">Restocked from supplier</option>
                  <option value="Sold">Sold</option>
                  <option value="Returned by customer">Returned by customer</option>
                  <option value="Damaged/Defective">Damaged/Defective</option>
                  <option value="Inventory correction">Inventory correction</option>
                  <option value="Sample/Promotional">Sample/Promotional</option>
                </select>
              </div>
            </div>
            <div className="p-6 border-t border-gray-100 flex gap-3">
              <button
                onClick={() => {
                  setSelectedProduct(null)
                  setAdjustmentAmount(0)
                  setAdjustmentReason("")
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleStockAdjustment}
                disabled={adjustmentAmount === 0 || !adjustmentReason}
                className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition disabled:opacity-50"
              >
                Apply Adjustment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
