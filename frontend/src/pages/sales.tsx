'use client'

import { useEffect, useState } from 'react'
import DeleteModal from '../components/deleteModal'
import Sidebar from '../components/sidebar'
import Navbar from '../components/navbar'
import SalesTable from '../components/table/salesTable.tsx'
import AddSaleCard from '../components/addSaleCard.tsx'
import { deleteSale, getSales } from '../services/salesService.ts'

type Sale = {
    _id?:string,
    date:Date,
    productName:string,
    customerName:string,
    quantity:number,
    pricePerUnit:number,
    totalAmount:number
}

export default function SalesPage() {
  const [sales, setSales] = useState<Sale[]>([])

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null)
  
  // const totalSales = sales.reduce((sum, sale) => sum + parseInt(sale.totalAmount), 0)

  useEffect(()=>{
    const getAllSales = async () => {
      const sales=await getSales()
      setSales(sales.result)
    }

    getAllSales()
  }, [])

  const handleDeleteClick = (sale: Sale) => {
    setSelectedSale(sale)
    setIsDeleteModalOpen(true)
  }

  const handleDeleteConfirm = async (id: string) => {
    await deleteSale(id)
    setSales(sales.filter((s) => s._id !== id))
    setIsDeleteModalOpen(false)
    setSelectedSale(null)
  }

  const handleAddSales = (sale: Sale) => {
    console.log(sale)
    setSales([...sales, sale])
  }

  return (
    <div className="bg-slate-950">
        <Sidebar/>
        <Navbar/>
        <div className="md:ml-64 md:pt-16 pb-8 min-h-screen bg-slate-950">
        <div className="p-6">
            {/* Header */}
            <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Sales Management</h1>
            <p className="text-slate-400">Record and manage product sales</p>
            </div>


            {/* Add Sale Form Card */}
            <AddSaleCard onsuccess={handleAddSales}/>

            {/* Search and Filters */}

            {/* Sales Table */}
            <SalesTable sales={sales} handleDeleteClick={handleDeleteClick}/>
        </div>

        {/* Delete Modal */}
        {isDeleteModalOpen && selectedSale && (
            <DeleteModal
            isOpen={isDeleteModalOpen}
            item={selectedSale}
            onConfirm={handleDeleteConfirm}
            onClose={() => setIsDeleteModalOpen(false)}
            />
        )}
        </div>
    </div>
  )
}
