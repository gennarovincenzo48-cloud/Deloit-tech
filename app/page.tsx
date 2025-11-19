'use client'

import React, { useState } from 'react'

export default function DeloitTechStore() {
  const [showIntro, setShowIntro] = useState(true)

  // Sample products - replace with real product data or connect to a CMS
  const initialProducts = [
    {
      id: 'p1',
      title: 'Clear Shield Tempered Glass (2-pack)',
      price: 6.99,
      category: 'Screen Protectors',
      sku: 'TS-GL-2',
      img: '/tempered-glass-screen-protector.jpg'
    },
    {
      id: 'p2',
      title: 'Slim Silicone Case - iPhone 14',
      price: 9.99,
      category: 'Cases',
      sku: 'CASE-SL-IP14',
      img: '/silicone-phone-case.jpg'
    },
    {
      id: 'p3',
      title: 'FastCharge 20W USB-C Adapter',
      price: 12.5,
      category: 'Chargers',
      sku: 'FC-20W',
      img: '/usb-c-fast-charger.jpg'
    },
    {
      id: 'p4',
      title: 'Braided Lightning Cable - 1.5m',
      price: 7.25,
      category: 'Cables',
      sku: 'CABL-LT-1_5',
      img: '/braided-lightning-cable.jpg'
    },
    {
      id: 'p5',
      title: 'MagSafe-Compatible Wallet',
      price: 14.99,
      category: 'Accessories',
      sku: 'WLT-MG',
      img: '/magsafe-wallet.jpg'
    }
  ]

  const [products] = useState(initialProducts)
  const [cart, setCart] = useState<typeof initialProducts[0][] & { qty: number }[]>([])
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  function addToCart(product: typeof initialProducts[0]) {
    setCart(prev => {
      const found = prev.find(p => p.id === product.id)
      if (found) {
        return prev.map(p =>
          p.id === product.id ? { ...p, qty: p.qty + 1 } : p
        )
      }
      return [...prev, { ...product, qty: 1 }]
    })
  }

  function changeQty(id: string, delta: number) {
    setCart(prev =>
      prev.map(p =>
        p.id === id ? { ...p, qty: Math.max(1, p.qty + delta) } : p
      )
    )
  }

  function removeFromCart(id: string) {
    setCart(prev => prev.filter(p => p.id !== id))
  }

  const subtotal = cart.reduce((s, p) => s + p.price * p.qty, 0)

  async function sendOrderEmail(order: any) {
    setLoading(true)
    setMessage('')
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
      })
      if (!res.ok) throw new Error('Email API error')
      setMessage('Order placed — a confirmation was sent to your email.')
      setCart([])
      setName('')
      setEmail('')
    } catch (err) {
      console.error(err)
      setMessage('Could not send confirmation email. Save your order reference and contact us on WhatsApp.')
    } finally {
      setLoading(false)
    }
  }

  function placeOrder() {
    if (!name || !email) {
      setMessage('Please provide name and email for order confirmation.')
      return
    }
    if (cart.length === 0) {
      setMessage('Your cart is empty.')
      return
    }

    const order = {
      store: 'Deloit Tech',
      businessId: 'CAC/7889960',
      customer: { name, email },
      items: cart.map(p => ({
        sku: p.sku,
        title: p.title,
        qty: p.qty,
        price: p.price
      })),
      subtotal: Number(subtotal.toFixed(2)),
      createdAt: new Date().toISOString()
    }

    sendOrderEmail(order)
  }

  if (showIntro) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-400 via-orange-300 to-amber-200 p-6 text-center">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20251115-WA0001-1X7ql5u1cfL3xDx1sA736QW7DbWHKO.jpg"
          alt="Deloit Tech"
          className="w-80 h-auto mb-6 object-contain drop-shadow-lg"
        />
        <img
          src="/delivery-truck-shipping-vehicle.jpg"
          alt="Fast shipping delivery vehicle"
          className="w-72 h-auto mb-8 object-contain drop-shadow-lg"
        />
        <h1 className="text-4xl font-bold mb-2 text-white drop-shadow-md">Welcome</h1>
        <p className="text-white max-w-md mb-8 leading-relaxed drop-shadow text-lg font-medium">
          Your trusted supplier of premium phone accessories. Government-verified & nationwide fast delivery.
        </p>
        <button
          onClick={() => setShowIntro(false)}
          className="px-8 py-3 bg-white text-orange-600 rounded-xl shadow-lg hover:bg-gray-50 transition font-bold text-lg"
        >
          Continue Shopping
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white text-gray-900">
      <header className="max-w-6xl mx-auto p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20251115-WA0001-1X7ql5u1cfL3xDx1sA736QW7DbWHKO.jpg"
            alt="Deloit Tech Logo"
            className="w-14 h-auto rounded-lg object-contain bg-orange-100 ring-1 ring-orange-200 p-1"
          />
          <div>
            <h1 className="text-xl font-bold">Deloit Tech</h1>
            <p className="text-sm text-gray-600">Phone accessories • Verified seller</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <CertificateBadge />
          <a
            href="#contact"
            className="px-4 py-2 bg-orange-100 text-orange-800 rounded-md text-sm font-medium ring-1 ring-orange-200 hover:bg-orange-200 transition"
          >
            Contact
          </a>
        </div>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 p-6">
        <section className="md:col-span-3">
          <Hero />
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map(p => (
                <div
                  key={p.id}
                  className="bg-white rounded-xl p-4 shadow-sm border border-orange-50 hover:shadow-md transition"
                >
                  <div className="h-40 bg-gray-50 rounded-md flex items-center justify-center overflow-hidden">
                    <img
                      src={p.img || "/placeholder.svg"}
                      alt={p.title}
                      className="object-contain h-full w-full"
                    />
                  </div>
                  <h3 className="mt-3 font-medium line-clamp-2">{p.title}</h3>
                  <p className="text-sm text-gray-500">{p.category}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="text-lg font-bold text-orange-600">${p.price.toFixed(2)}</div>
                    <button
                      onClick={() => addToCart(p)}
                      className="px-3 py-1 bg-orange-500 text-white rounded-md text-sm hover:bg-orange-600 transition"
                    >
                      Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <aside className="md:col-span-1 bg-white p-4 rounded-xl shadow-sm border border-orange-50 sticky top-6 h-fit">
          <h3 className="font-bold text-lg">Shopping Cart</h3>
          {cart.length === 0 ? (
            <p className="text-sm text-gray-500 mt-3">Cart is empty</p>
          ) : (
            <div className="mt-3 space-y-3">
              {cart.map(item => (
                <div key={item.id} className="flex items-start gap-3 pb-3 border-b border-orange-50">
                  <div className="w-12 h-12 bg-gray-50 rounded-md flex items-center justify-center flex-shrink-0">
                    <img
                      src={item.img || "/placeholder.svg"}
                      alt={item.title}
                      className="object-contain h-full w-full"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm line-clamp-1">{item.title}</div>
                    <div className="text-xs text-gray-500">${item.price.toFixed(2)}</div>
                    <div className="mt-1 flex items-center gap-2">
                      <button
                        onClick={() => changeQty(item.id, -1)}
                        className="px-2 py-0.5 rounded bg-orange-50 text-orange-700 hover:bg-orange-100 transition text-xs"
                      >
                        −
                      </button>
                      <span className="text-sm font-medium w-6 text-center">{item.qty}</span>
                      <button
                        onClick={() => changeQty(item.id, 1)}
                        className="px-2 py-0.5 rounded bg-orange-50 text-orange-700 hover:bg-orange-100 transition text-xs"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-auto text-xs text-red-500 hover:text-red-700 transition"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="border-t pt-3 flex items-center justify-between font-bold">
                <div>Subtotal</div>
                <div className="text-orange-600">${subtotal.toFixed(2)}</div>
              </div>
              <div className="mt-3 space-y-2">
                <input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Full name"
                  className="w-full px-3 py-2 rounded border border-gray-300 text-sm focus:border-orange-500 focus:outline-none"
                />
                <input
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Email for receipt"
                  className="w-full px-3 py-2 rounded border border-gray-300 text-sm focus:border-orange-500 focus:outline-none"
                />
                <button
                  onClick={placeOrder}
                  disabled={loading}
                  className="w-full py-2 bg-orange-500 text-white rounded-md font-medium hover:bg-orange-600 transition disabled:opacity-50"
                >
                  {loading ? 'Placing Order...' : 'Place Order'}
                </button>
                <p className="text-xs text-gray-500 text-center">
                  We'll send a confirmation to your email.
                </p>
              </div>
            </div>
          )}
          {message && (
            <div className="mt-3 text-sm text-center text-gray-700 bg-orange-50 p-2 rounded">
              {message}
            </div>
          )}
          <div className="mt-4 pt-4 border-t border-orange-50 text-xs text-gray-500">
            <strong className="block mb-2">Need help?</strong>
            <a
              href={`https://wa.me/09060571455?text=${encodeURIComponent(
                'Hi Deloit Tech, I want to order'
              )}`}
              className="text-orange-600 hover:text-orange-700 font-medium block mb-2"
            >
              WhatsApp: +234 906 057 1455
            </a>
            <a
              href="mailto:Ezenemebath@gmail.com"
              className="text-orange-600 hover:text-orange-700 font-medium"
            >
              Email: Ezenemebath@gmail.com
            </a>
          </div>
        </aside>
      </main>

      <div className="max-w-6xl mx-auto p-6 mt-10">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-orange-50 text-center">
          <h3 className="text-lg font-bold mb-2">Government Verification</h3>
          <p className="text-sm text-gray-600 mb-4">
            DELOIT-TECH LIMITED is registered with the Corporate Affairs Commission of Nigeria. Certificate ID: CAC/7889960
          </p>
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20251115-WA0000-Nj2n9A3rwXzpL6EOtqfrOrNiUMaZrN.jpg"
            alt="Deloit Tech Government Certificate of Incorporation - CAC Registration 7889960"
            className="mx-auto rounded-lg border border-gray-200 shadow-md max-h-96 object-contain"
          />
        </div>
      </div>

      <footer id="contact" className="max-w-6xl mx-auto p-6 text-sm text-gray-600 mt-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="font-bold text-gray-900">Deloit Tech</div>
            <div>Premium phone accessories • Verified seller</div>
            <div className="mt-2 text-xs">
              Registered & Verified — ID:{' '}
              <span className="font-mono">CAC/7889960</span>
            </div>
          </div>
          <div className="w-full md:w-96 bg-white p-4 rounded-lg shadow-sm border border-orange-50">
            <div className="font-bold text-gray-900 mb-2">Subscribe for offers</div>
            <div className="text-xs text-gray-500 mb-3">
              Enter your email and we'll notify you about new stock and discounts.
            </div>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="you@example.com"
                className="flex-1 px-3 py-2 rounded border border-gray-300 text-sm"
              />
              <button className="px-4 py-2 bg-orange-500 text-white rounded font-medium hover:bg-orange-600 transition">
                Subscribe
              </button>
            </div>
            <div className="text-xs text-gray-400 mt-2">We respect your privacy.</div>
          </div>
        </div>
        <div className="mt-6 text-gray-500 text-xs">
          © {new Date().getFullYear()} Deloit Tech — All rights reserved.
        </div>
      </footer>
    </div>
  )
}

function Hero() {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-orange-50">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-balance">
            Premium Phone Accessories Made Easy
          </h2>
          <p className="mt-3 text-gray-600 leading-relaxed">
            Quality cases, chargers, cables and more. Government-verified retailer — buy with confidence and get fast nationwide delivery.
          </p>
          <div className="mt-6 flex gap-3">
            <button className="px-4 py-2 bg-orange-500 text-white rounded-md font-medium hover:bg-orange-600 transition">
              Shop Now
            </button>
            <a
              href="#contact"
              className="px-4 py-2 bg-transparent text-orange-600 rounded-md ring-1 ring-orange-500 hover:bg-orange-50 transition font-medium"
            >
              Contact Us
            </a>
          </div>
        </div>
        <div className="w-56 h-40 bg-orange-50 rounded-lg flex items-center justify-center">
          <svg
            width="140"
            height="100"
            viewBox="0 0 140 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="6"
              y="6"
              width="60"
              height="60"
              rx="8"
              stroke="#FB923C"
              strokeWidth="2"
            />
            <rect
              x="74"
              y="20"
              width="60"
              height="60"
              rx="8"
              stroke="#FB923C"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}

function CertificateBadge() {
  return (
    <div className="flex items-center gap-2">
      <div className="px-3 py-1.5 bg-white rounded-md shadow-sm border border-orange-50 flex items-center gap-2">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
            stroke="#FB923C"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className="text-xs">
          <div className="font-bold leading-tight">Gov Verified</div>
          <div className="text-gray-500 text-xs leading-tight">CAC/7889960</div>
        </div>
      </div>
    </div>
  )
}
