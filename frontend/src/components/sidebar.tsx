'use client'

import { useState } from 'react'
import { Menu, X, Package, Users, ShoppingCart, BarChart3, LogOut } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { logoutUser } from '../services/authService'
import { useAuth } from '../hooks/useAuth'

export default function Sidebar() {
  const location=useLocation()
  const navigate=useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const {setIsAuth}=useAuth()

  const menuItems = [
    { icon: Package, label: 'Inventory', href: '/inventoryManagement', active: false },
    { icon: Users, label: 'Customers', href: '/customerManagement', active:false },
    { icon: ShoppingCart, label: 'Sales', href: '/sales', active:false },
    { icon: BarChart3, label: 'Reports', href: '/reports', active:false },
  ]

  const logout = async () => {
    await logoutUser()
    setIsAuth(false)
    navigate('/login')
  }

  return (
    <div className='print:hidden'>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-lg bg-slate-800 text-white"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-slate-900 text-slate-100 p-6 flex flex-col transition-transform duration-300 z-40 md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="mb-8 mt-8 md:mt-0">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            InventoryPro
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <p
              key={item.label}
              onClick={()=>navigate(item.href)}
              className={`cursor-pointer flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                location.pathname == item.href
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </p>
          ))}
        </nav>

        {/* Logout */}
        <button 
        className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors duration-200"
        onClick={logout}
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </aside>
    </div>
  )
}
