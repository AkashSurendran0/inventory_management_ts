'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { enqueueSnackbar } from 'notistack'

type FormData = {
    name:string,
    description:string,
    quantity:number,
    price:number
    isActive?:boolean
}

type Props = {
    isOpen:boolean,
    onClose:()=>void,
    onSave:(formdata: FormData)=>void
}

export default function AddItemModal({ isOpen, onClose, onSave }:Props) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    quantity: 0,
    price: 0,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }))
  }

  const handleSave = async () => {
    if(!formData.name) return enqueueSnackbar('Enter a product name', {variant:'error'})
    if(!formData.description) return enqueueSnackbar('Enter product description', {variant:'error'})
    if(!formData.quantity) return enqueueSnackbar('Enter a quantity', {variant:'error'})
    if((formData.quantity) < 1 || !Number.isInteger(formData.quantity)) return enqueueSnackbar('Quantity must be greater that 0 and a whole number', {variant:'error'})
    if(!formData.price) return enqueueSnackbar('Enter a price', {variant:'error'})
    if(formData.price < 1) return enqueueSnackbar('Enter a valid price', {variant:'error'})

    onSave(formData)
    setFormData({ name: '', description: '', quantity: 0, price: 0 })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-lg p-8 w-full max-w-md border border-slate-700 shadow-2xl animate-in fade-in duration-300">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Add New Item</h2>
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
              Item Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter item name"
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter item description"
              rows={3}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Price
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                step="0.01"
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
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
            Save Item
          </button>
        </div>
      </div>
    </div>
  )
}
