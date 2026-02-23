'use client'

import { AlertTriangle } from 'lucide-react'

type Item = {
    _id?:string,
    name?:string,
    productId?:string,
}

type Sale = {
    _id?:string,
    date:Date,
    productId:string,
    customerId:string,
    quantity:number,
    pricePerUnit:number,
    totalAmount:number
}

type ProductDetails = {
    _id:string,
    productName:string
}

type CustomerDetails = {
    _id:string,
    customerName:string
}

type SaleData = Sale & {
    productDetails:ProductDetails,
    customerDetails:CustomerDetails
}

type Props = {
    isOpen:boolean,
    onClose:()=>void,
    onConfirm:(id:string)=>void,
    item:Item | SaleData
}

export default function DeleteModal({ isOpen, onClose, onConfirm, item }: Props) {
    if (!isOpen) return null

    return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-slate-800 rounded-lg p-8 w-full max-w-sm border border-slate-700 shadow-2xl animate-in fade-in duration-300">
            {/* Icon */}
            <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                    <AlertTriangle className="text-red-500" size={24} />
                </div>
            </div>

            {'productDetails' in item ? (
                <>
                    <h2 className="text-xl font-semibold text-white text-center mb-2">
                        Delete Item
                    </h2>
                    <p className="text-slate-400 text-center mb-6">
                        Are you sure you want to delete{" "}
                        <span className="font-semibold text-white">
                            {`Sale - ${item.productDetails.productName}`}
                        </span>
                        ? This action cannot be undone.
                    </p>
                </>
                ) : (
                <>
                    <h2 className="text-xl font-semibold text-white text-center mb-2">
                        Change Status
                    </h2>
                    <p className="text-slate-400 text-center mb-6">
                        Are you sure you want to change status of{" "}
                        <span className="font-semibold text-white">
                            "{item.name}"
                        </span>
                        ?
                    </p>
                </>
            )}
            {/* Content */}

            {/* Buttons */}
            <div className="flex gap-3">
                <button
                    onClick={onClose}
                    className="flex-1 px-4 py-2 bg-slate-700 text-slate-200 rounded-lg hover:bg-slate-600 transition-colors font-medium"
                >
                    Cancel
                </button>
            <button
                onClick={()=>onConfirm(item._id!)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
                Confirm
            </button>
            </div>
        </div>
    </div>
    )
}
