'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { enqueueSnackbar } from 'notistack'

type FormData = {
    name:string,
    normalizedName?:string,
    address:string,
    phone:string,
    isActive?:boolean,
}

type Props = {
    isOpen: boolean,
    onClose:()=>void,
    onSave:(formData: FormData)=>void
}

export default function AddCustomerModal({ isOpen, onClose, onSave } : Props) {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    if(!formData.name.trim()) return enqueueSnackbar('Provide a name', {variant:'error'})
    if(!(/^[A-Za-z\s]+$/).test(formData.name) || formData.name.trim().length<3) return enqueueSnackbar('Provide a valid name', {variant:'error'})
    if(!formData.address.trim()) return enqueueSnackbar('Provide an address', {variant:'error'})
    if(formData.address.trim().length<5) return enqueueSnackbar('Provide a valid address', {variant:'error'})
    if(!formData.phone) return enqueueSnackbar('Provide a phone number', {variant:'error'})
    if(!(/^[0-9]{10}$/).test(formData.phone)) return enqueueSnackbar('Provide a valid phone number', {variant:'error'})

    onSave(formData)
    setFormData({ name: '', address: '', phone: '' })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-lg p-8 w-full max-w-md border border-slate-700 shadow-2xl animate-in fade-in duration-300">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Add New Customer</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Customer Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter customer name"
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter customer address"
              rows={3}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Mobile Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter mobile number"
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-8">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-slate-700 text-slate-200 rounded-lg hover:bg-slate-600 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all font-medium shadow-lg"
          >
            Save Customer
          </button>
        </div>
      </div>
    </div>
  )
}
